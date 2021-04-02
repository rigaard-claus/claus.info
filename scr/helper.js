function InitHelper() {
    DrawMainChart();
}

function DrawMainChart() {
    var json = '{"C#":9,"ASP":8,"PHP":8,"JS":10,"AS":6,"SQL":8}';
    var area_size = 500;
    rigaard_radiant_chart.init(json,area_size);
    rigaard_radiant_chart.author(area_size);
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