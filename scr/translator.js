
__page = "";

function InitTranslator(page="main") {
    //console.log("translator START");
    __page = page;
    check_lang_cookie();
    var lang_menu = '<button onclick="change_lang(this);"><img src="/claus.info/img/lang_ru.png"></img></button>';

    $(".language_float_btn").html(lang_menu);
}

function change_lang(btn) {
    //console.log("change_lang START");
    var lang_en = true;
    var img = $(btn).children();
    var src = $(img).attr("src");
    //console.log(src);
    if(src.includes("lang_en")) {
        lang_en = false;
    }
    
    var url_lang_ru = "dat/lang_ru.json";
    var url_lang_en = "dat/lang_en.json";
    
    if(__page!="main" ) {
        url_lang_ru = "../dat/lang_ru.json";
        url_lang_en = "../dat/lang_en.json";
    }
    
    if(lang_en) {
        $(img).attr( "src", src.replace("lang_ru","lang_en"));
        $.getJSON(url_lang_ru, function(data){           
            set_lang(data.ru);
            save_lang_cookie("ru");
        }).fail(function(){
            console.log("getJSON : An error has occurred.");
        });
    }
    else {
        $(img).attr( "src", src.replace("lang_en","lang_ru"));
        $.getJSON(url_lang_en, function(data){
            set_lang(data.en);
            save_lang_cookie("en");
        }).fail(function(){
            console.log("getJSON : An error has occurred.");
        });
    }
}

function init_lang(lang) {
    if(lang === "ru") {
        var url_lang_ru = "dat/lang_ru.json";

        if(__page!="main" ) {
            url_lang_ru = "../dat/lang_ru.json";
        }
        $.getJSON(url_lang_ru, function(data){
            //change default icon
            var img = $(".language_float_btn").find("img");
            if(img.length>0) {
                var src = $(img).attr("src");
                $(img).attr( "src", src.replace("lang_ru","lang_en"));
            }
            set_lang(data.ru);
        }).fail(function(){
            console.log("getJSON : An error has occurred.");
        });
    }
}

function set_lang(json) {
    //console.log("set_lang START"); console.log(json);
    // set main menu
    var menu_index = 0;
    $.each($(".mainmenu").find("div"), function() { 
        $(this).html(json.main_menu[menu_index]);
        menu_index++;
    });
    if(__page==="tool_menu" ) {
        // main buttons
        var div_container = $(".btn_area");
        if(div_container.length > 0) {
            var chart_main_btn = $(div_container).find("#btn_radiant_chart_demo");
            var keys = Object.keys(json.tool_menu[0]);
            if(chart_main_btn.length > 0) {
                $(chart_main_btn).html(keys[0]);
            }
//            var demo_control_panel = $(".main_tools_area");
//            if(demo_control_panel.length > 0) {
//                console.log("main_tools_area");
//                var chart_create_btn = $(demo_control_panel).find("#btn_create_chart_demo");
//                if(chart_create_btn.length > 0) {
//                    console.log(json.tool_menu[0].keys[0][0]);
//                    $(chart_create_btn).html(json.tool_menu[0].keys[0][0]);
//
//                }
//            }
        }
    }
    if(__page==="about" ) {
        var main_area = $(".textContent")
        $(main_area).find("h1").html(json.about[0].about_me.header);
        $(main_area).find("p").html(json.about[0].about_me.text);       
    }
}

function check_lang_cookie() {
    //console.log("check_lang_cookie START");
    if(document.cookie.indexOf("lang=ru")>0) {
        init_lang("ru");
    }
}

function save_lang_cookie(val) {
    //console.log("save_lang_cookie START");
    document.cookie = "default_lang=" + val + ";samesite=lax;path=/";
}