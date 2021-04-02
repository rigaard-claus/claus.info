///set element class=rigaard_canvas (or whatever you want)
const __mainClassAreaCanvas = "rigaard_canvas";

/////////////////////////
///canvas chart helper///
/////////////////////////
////////////////Rigaard//
/////////////02.04.2021//
var rigaard_canvas = (function() {
    var error;
    
    function init() {
        try
        {
//            console.log("INIT START");
            //throw "ERROR MESSAGE";
        }
        catch (ex) 
        {
            error = "rigaard_canvas.init " + ex;
            console.log(error);
        }
    }
    
    function area(area_width, area_height, area_border=0, border_type="", border_color="") {
        try
        {
//            console.log("AREA START");
            $mainCanvas = "";
            if(area_border>0 && border_type.length>0 && border_color.length>0) {
                $mainCanvas = string.format('<canvas id="mainCanvas" width="{0}" height="{1}" style="border:{2}px {3} {4};"></canvas>'
                ,area_width,area_height,area_border,border_type,border_color);
            }
            else {
                $mainCanvas = string.format('<canvas id="mainCanvas" width="{0}" height="{1}"></canvas>'
                ,area_width,area_height);
            }
            var mainClassName = '.' + __mainClassAreaCanvas;
            $(mainClassName).addClass("mainContainer");
            $(mainClassName).html($mainCanvas);
        }
        catch (ex) 
        {
            error = "rigaard_canvas.area " + ex;
            console.log(error);
        }
    } 
    
    function message (x,y,message,font_size,font_name,color,background="",reverse_x=false) {
        try {
//            console.log("message START");
            //get main width|height
            var canvas_text = document.createElement("canvas");
            var ctx= canvas_text.getContext("2d");
            
            //get size message
            //set main area size
            ctx.font = string.format('bolder {0}px {1}',font_size,font_name);
            var rect_heght = font_size + 7;
            var rect_width = ctx.measureText(message).width + 12;
            canvas_text.height = rect_heght;
            canvas_text.width = rect_width;
            //console.log("height="+rect_heght);console.log("width="+rect_width);
            
            if (background != "") {
                ctx.fillStyle = background;        
                ctx.beginPath();
                ctx.moveTo(5,0);
                ctx.lineTo(rect_width-5,0);
                ctx.quadraticCurveTo(rect_width,0,rect_width,5);
                ctx.lineTo(rect_width,rect_heght-5);
                ctx.quadraticCurveTo(rect_width,rect_heght,rect_width-5,rect_heght);
                ctx.lineTo(5,rect_heght);
                ctx.quadraticCurveTo(0,rect_heght,0,rect_heght-5);
                ctx.lineTo(0,5);
                ctx.quadraticCurveTo(0,0,5,0);
                ctx.closePath();
                ctx.fill();
            }

            ctx.fillStyle = color;
            ctx.font = string.format('bolder {0}px {1}',font_size,font_name);
            ctx.fillText(message, 5, rect_heght-5);

            var area = $("#mainCanvas")[0];
            var ctx_main = area.getContext("2d");
            if(reverse_x) {
                ctx_main.drawImage(canvas_text, x-rect_width, y);
            }
            else {
                ctx_main.drawImage(canvas_text, x, y);
            }
        }
        catch (ex) 
        {
            error = "rigaard_canvas.message " + ex;
            console.log(error);
        }        
    }
    
    function text(message,font,color,x,y,fill_text=true,align="center") {
        try
        {
            var area = $("#mainCanvas")[0];
            var ctx = area.getContext("2d");
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.textAlign = align;
            if(fill_text === true) {
                ctx.fillText(message, x, y); 
            }
            else {
                ctx.strokeText(message, x, y);
            }
            
        }
        catch (ex) 
        {
            error = "rigaard_canvas.text " + ex;
            console.log(error);
        }
    }
    
    function circle(x_center, y_center, radius, size, color, style="default", fill=false) {
        try
        {
//            console.log("circle START");
            var area = $("#mainCanvas")[0];
            var ctx = area.getContext("2d");
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            if(style=="dotted") {
                ctx.save();
                ctx.setLineDash([5, 15]);
            }
            ctx.beginPath();
            ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI);
            if(fill==false) {
                ctx.stroke();
            }
            else {
                ctx.fill();
            }
            ctx.restore();
        }
        catch (ex) 
        {
            error = "rigaard_canvas.circle " + ex;
            console.log(error);
        }
    }
    
    function path(coordinate_array,size,color,fill_style="default") {
        try
        {
            var area = $("#mainCanvas")[0];
            var ctx = area.getContext("2d");
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            if(fill_style=="default") {
                ctx.fillStyle = "#EEEEEE";
            }
            if(fill_style=="color") {
                ctx.fillStyle = color;
            }
            if(fill_style=="hatch") {
                
                //create hatch pattern
                var canvas_pattern = document.createElement("canvas");
                canvas_pattern.width = 10;
                canvas_pattern.height = 10;
                var ctx_pattern = canvas_pattern.getContext("2d");
                //draw pattern
                ctx_pattern.strokeStyle = "#D64566";//"#81C0CF";
                ctx_pattern.lineWidth = 1;
                ctx_pattern.moveTo(10, 0);
                ctx_pattern.lineTo(0, 10);
                ctx_pattern.stroke();
                
                //set pattern
                var pattern = ctx.createPattern(canvas_pattern,"repeat");
                ctx.fillStyle = pattern;
            }
            ctx.beginPath();
            var start_point = true;
            var i = 0;
            for(i=0;i<coordinate_array.length;i++) {
                if(start_point) {
                    start_point = false;
                    ctx.moveTo(coordinate_array[i]["x"],coordinate_array[i]["y"]);
                }
                else {
                    ctx.lineTo(coordinate_array[i]["x"],coordinate_array[i]["y"]);
                }
                //console.log("{" + coordinate_array[i]["x"] + "," + coordinate_array[i]["y"] + "}");
            }
            if(fill_style=="stroke") {
                ctx.closePath();
                ctx.stroke();
            }
            else {
                ctx.fill();
            }
        }
        catch (ex) 
        {
            error = "rigaard_canvas.path " + ex;
            console.log(error);
        }
    }
    
    function line(x_from, y_from, x_to, y_to, size, color) {
        try
        {
            var area = $("#mainCanvas")[0];
            var ctx = area.getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.moveTo(x_from, y_from);
            ctx.lineTo(x_to, y_to);
            ctx.stroke();
        }
        catch (ex) 
        {
            error = "rigaard_canvas.line " + ex;
            console.log(error);
        }
    }
    
    function point(x,y,size,color) {
        try
        {
//            console.log("POINT START");
            var area = $("#mainCanvas")[0]; // convert $ to js
            var ctx = area.getContext("2d");
            ctx.strokeStyle = color;
            ctx.fillStyle = color;

            if(size == 1) {
                ctx.fillRect(x,y,1,1);
            }
            if(size>1) {
                ctx.beginPath();
                ctx.arc(x,y,size,0,2*Math.PI,false);
                ctx.fill();
            }
        }
        catch (ex) 
        {
            error = "rigaard_canvas.point " + ex;
            console.log(error);
        }
    
    }
    //simple formatting string like c#
    var string = (function(){
        function format() {
            try 
            {
                var s = arguments[0];
                for (var i = 0; i < arguments.length - 1; i++) {       
                  var reg = new RegExp("\\{" + i + "\\}", "gm");             
                  s = s.replace(reg, arguments[i + 1]);
                }
                return s;
            }
            catch (ex) 
            {
                error = "rigaard_canvas.string.format " + ex;
                console.log(error);
            }
        }
        return {
            format : format
        }
    }());
    
    return {
        init : init,
        area : area,
        point : point,
        path : path,
        circle: circle,
        line : line,
        message : message,
        text : text
    };
}());

///////////////////
///radiant chart///
//////////Rigaard//
///////02.04.2021//
var rigaard_radiant_chart = (function() {
    function init(json_string,area_size,max_value=10) {
        try 
        {
            if(max_value<1) {
                throw("max_value must be more 0");
            }
            
            var json = $.parseJSON(json_string);
            var json_keys = Object.keys(json); 
            var countParameters = json_keys.length;
//            console.log('length=' + countParameters);
            
            var round_delimiter = Math.round(countParameters/4);
//            console.log(round_delimiter);
            
            //init canvas area
            rigaard_canvas.area(area_size + area_size/2,area_size);
            
            if(countParameters<3) {
                rigaard_canvas.message((area_size + area_size/2)/2,area_size/2,"less than three parameters obtained",10,"Comic Sans MS","#130C05","#FD864F");
                return;
            }
            
            var x_center_point = (area_size + area_size/2)/2;
            var y_center_point = area_size/2;
            var max_radius = area_size/2 - Math.floor(area_size/12);

            var delimiter = 2*Math.PI/countParameters;
            var scale_delimiter = max_radius/max_value;
            
            var curent_scale_range = 0;
            
            var main_figure_xy = []; //set all point main figure            
            var coordinate_sheet = []; //set all point background coordinate sheet
            
            for(d=0;d<max_value;d++){
                coordinate_sheet[d] = []; //set delimiter rings
                var current_angle = -Math.PI/2; // start point on top Y
                curent_scale_range +=scale_delimiter;
                for(i=0;i<countParameters;i++) {
                    var key = json_keys[i];
                    //console.log(key + "  is " + json[key]);
                    
                    var x_cursor = x_center_point + curent_scale_range * Math.cos(current_angle);
                    var y_cursor = y_center_point + curent_scale_range * Math.sin(current_angle);
                                        
                    if(json[key]==d+1) {
                        main_figure_xy[i] = []; // array index (need sorted json elements)
                        main_figure_xy[i]["x"]=x_cursor;
                        main_figure_xy[i]["y"]=y_cursor;
                        
//                        console.log(json[key]);
                    }
                    var coordinate = [];
                    coordinate["x"]=x_cursor;
                    coordinate["y"]=y_cursor;
                    coordinate_sheet[d].push(coordinate); //set delimiter rings
//                    coordinate_sheet[d]["x"]=x_cursor;
//                    coordinate_sheet[d]["y"]=y_cursor;
                    current_angle += delimiter;
                }
            }
            
            // sort no need - index sorted automatically
            //main_figure_xy.sort();
            
            //draw coordinate sheet
            var quadrant = 1;//sector
            var message_key = 0;
            for(d=0;d<coordinate_sheet.length;d++){
                var first_round = true;
                $.each(coordinate_sheet[d], function() {
                    if(first_round == true) {
                        var radius = y_center_point - this["y"]; // circle radius
                        if(d+1==coordinate_sheet.length) {
                            //console.log("coordinate_sheet LAST ROUND");
                            rigaard_canvas.circle(x_center_point,y_center_point,radius,1,"#919090");
                        }
                        else {
                            rigaard_canvas.circle(x_center_point,y_center_point,radius,1,"#919090","dotted");
                        }
                        first_round = false;
                    }
                    rigaard_canvas.point(this["x"],this["y"],3,"#2E90E8"); // coordinate point
                    if(d + 1 == coordinate_sheet.length) { // last round, draw coordinate line
                        rigaard_canvas.line(x_center_point,y_center_point,this["x"],this["y"],2,"#2E90E8");
                        //set name coordinate line
                        if(quadrant==1) {
                            rigaard_canvas.message(this["x"]+Math.floor(area_size/100),this["y"]-Math.floor(area_size/20),json_keys[message_key],Math.floor(area_size/32),"sans-serif","#FFFFFF","#529CC1");
                        }
                        if(quadrant==2) {
                            rigaard_canvas.message(this["x"]+Math.floor(area_size/100),this["y"]+Math.floor(area_size/100),json_keys[message_key],Math.floor(area_size/32),"sans-serif","#FFFFFF","#529CC1");
                        }
                        if(quadrant==3) {
                            rigaard_canvas.message(this["x"]-Math.floor(area_size/100),this["y"]+Math.floor(area_size/100),json_keys[message_key],Math.floor(area_size/32),"sans-serif","#FFFFFF","#529CC1",true);
                        }
                        if(quadrant==4) {
                            rigaard_canvas.message(this["x"]-Math.floor(area_size/100),this["y"]-Math.floor(area_size/20),json_keys[message_key],Math.floor(area_size/32),"sans-serif","#FFFFFF","#529CC1",true);
                        }
//                        console.log("quadrant="+quadrant+", "+json_keys[message_key] + " : " + message_key + "/" + round_delimiter);
                        message_key++;

                        //find the position for the next message
                        if(countParameters > 3 && ((quadrant == 1 && message_key%round_delimiter==0 && countParameters%2==0) || //even
                                (quadrant == 1 && message_key>1 && (message_key-1)%round_delimiter==0 && countParameters%2!=0) || //not even
                                (quadrant>1 && (message_key+1)%round_delimiter==0 && countParameters%2==0) || //even 
                                (quadrant>1 && (message_key)%round_delimiter>0 && countParameters%2!=0))) { //not even 
                            quadrant++;
                        }
                        else {
                            if(countParameters==3) {
                                quadrant++;
                            }
                        }
                    }
                });
            }
            
            //point center
            rigaard_canvas.point(x_center_point,y_center_point,5,"#2E90E8");
            
            //draw main figure 
            //rigaard_canvas.path(main_figure_xy,3,main_color,"color");
            rigaard_canvas.path(main_figure_xy,3,"#D64566","hatch"); //hatch area
            rigaard_canvas.path(main_figure_xy,3,"#D64566","stroke"); //draw borders
            //set bold main points
            for(d=0;d<main_figure_xy.length;d++){
                rigaard_canvas.point(main_figure_xy[d]["x"],main_figure_xy[d]["y"],5,"#D64566");    
            }
//            console.log(Math.round(7/4));
        }
        catch (ex) {
            console.log("rigaard_radiant_chart.chart "+ex);
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////////
    ///Please do not remove this line if you are using this code in your project. ///
    //////////////////Otherwise, it will badly affect your karma. ///////////////////
    ////////////////////////////////////////////////////////////////////////Rigaard//
    /////////////////////////////////////////////////////////////////////02.04.2021//
    function author(area_size) {
        try 
        { 
            //rigaard_canvas.message(400,480,"RIGAARD\u00A9CHART",10,"Comic Sans MS","#1A120D");
            rigaard_canvas.text("RIGAARD\u00A9CHART","10px Comic Sans MS","#1A120D",area_size+area_size/2-50,area_size-10);
        }
        catch (ex) {
            console.log("rigaard_radiant_chart.author "+ex);
        }
    }
    return {
        init : init,
        author : author
    };
}());