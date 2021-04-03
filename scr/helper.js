function InitHelper() {
    DrawMainChart();
}

function DrawMainChart() {
    var json = '{"C#":9,"ASP":8,"PHP":8,"JS":10,"AS":6,"SQL":8}';
    var area_size = 500;
    rigaard_radiant_chart.init(json,area_size);
    rigaard_radiant_chart.author(area_size);
}

function init_demo_radiant_chart() {
    //console.log("init_demo_radiant_chart START");
    $(".btn_area").hide();//hide control panel
    var main_div = $(".main_tools_area");
    
    //create demo area
    var div_demo_area = '<div class="main_demo_area"><div class="demo_control_panel">'
            + '<span id="demo_error_log"></span></br>'
            + '<div class="tooltip"><span class="tooltiptext">Replace or edit this json</span>'
            + '<textarea type="textarea" id="txt_json_input" rows="3" cols="65">'
            + '{"Pyton":7,"C++":6,"Perl":7,"VB":9,"Java":6,"Delphi":8,"Ruby":6}'//default json line
            + '</textarea></div></br><button onclick="demo_radiant_chart();" '
            + 'id="btn_create_chart_demo" class="btn_tool">CREATE CHART</button>'
            + '</div><div class="rigaard_canvas"></div></div>';
    $(main_div).html(div_demo_area);
}

function demo_radiant_chart() {
    try {
        var scale_size = 10;
        //console.log("demo_radiant_chart START");
        $(".demo_error_log").text('');
        $(".demo_error_log").removeClass('demo_error_log');
        var text = $("#txt_json_input").val();
        //console.log(text);
        //validate json
        try
        {
            var json = $.parseJSON(text);
            //console.log(json);
        }
        catch($j_ex) {
            console.log("demo_radiant_chart-> " + $j_ex);
            $("#demo_error_log").addClass('demo_error_log');
            $("#demo_error_log").html('json input string contains errors');
            return;
        }
        //check scale
        var json_keys = Object.keys(json);
        try
        {
            var maxValue = 0;
            do
            {
                maxValue = 0;
                $.each(json_keys, function() {
                    if(maxValue<json[this]) {
                        maxValue=json[this];
                    }
                });
                if(maxValue < 1) {
                    throw("max_coordinate_scale < 1");
                }
                if(maxValue>10) {
                    var default_delimiter = 5;
                    if(maxValue<=20) {
                        scale_size= 20;
                    }
                    else {
                        if(maxValue>99) {
                              default_delimiter = 10;
                        }
                        $.each(json_keys, function() {
                            json[this] = Math.round(json[this]/default_delimiter);
                        });
                    }
                }
            }
            while(maxValue>20);
        }
        catch($j_ex) {
            console.log("demo_radiant_chart-> " + $j_ex);
            $("#demo_error_log").addClass('demo_error_log');
            $("#demo_error_log").html('json contains unsupported parameters');
            return;
        }
        var area_size = 500;
        rigaard_radiant_chart.init(JSON.stringify(json),area_size,scale_size);
        rigaard_radiant_chart.author(area_size);
        
    }
    catch($ex) {
        console.log("demo_radiant_chart-> " + $ex);
    }
}

function GetScript(url) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: function() {
            console.log(url + ' - load success');
        },
        async: false
    });
}