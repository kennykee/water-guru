var frame_width = 1920; /* Standard width */
var frame_height = 1080; /* Standard height */
var ratio = 1; /* Current ratio */
var current_location = "Bathroom"; /* Current page */
var current_level = 1;
var total_remaining = 5;
var total_limit = 5;
var popup_opened_list = [];
var toastTimer;
var idle_second = 300;
var current_idle = 0;

var current_function = "";
var current_parameter_1 = "";
var current_parameter_2 = "";

$(function(){
    
    if(idle_second != 0){
        var idle = setInterval(function(){ 
            current_idle++;
            if(current_idle > idle_second){
                current_idle = 0;
                init_home_page();
            }
        }, 1000);
        
        $('body').click(function(){
            current_idle = 0;
        });    
    }
    
    fullScreen();//to be uncommented
    
    /* Determine screen ratio */
    setTimeout(function(){
        calculateRatio();
        init_home_page();
    }, 300);    
    
    $(window).on('resize', function(event){
        calculateRatio();
        
        $(".full-screen-button").remove();
        
		/*
        if(!chrome.app.window.current().isFullscreen()){
            var obj = $("<div class='full-screen-button'><img class='tile-thumbnail' src='../assets/images/Full-Screen-Button.png'/></div>");
            
            $("#container").append(obj);
            rescale(obj, ["left", "top"]);
            
            obj.click(function(){
                fullScreen();
            });
        }
		*/
        
        /* reload page */
        switch(current_function){
            case "init_home_page": init_home_page(); break;
            case "init_location_selection": init_location_selection(); break;
            case "init_location_bathroom": init_location_bathroom(); break;
            case "init_location_kitchen": init_location_kitchen(); break;
            case "init_end_game": init_end_game(current_parameter_1); break;
            case "init_level": init_level(current_parameter_1, current_parameter_2); break;
        }
    });
});

function calculateRatio(){
    var container_width = $("#container").width();
    ratio = container_width / frame_width;
}

function init_home_page(){
    clearPage();
    changeBackground("../assets/images/Home-Main.png");
    clearTimer();
    
    var obj = $("<div class='home-visit-button'></div>");
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    obj.click(function(){
        init_location_selection();
    });
    
    current_function = "init_home_page";
}

function changeBackground(src){
    $(".page-background").remove();
    $("#container").append('<img class="tile-thumbnail page-background" src="' + src + '"/>');
}

function clearPage(){
    $("#page-container").empty();
    calculateRatio();
}

function clearTimer(){
    clearTimeout(toastTimer);
}

function fullScreen(){
    //chrome.app.window.current().fullscreen();
}

function rescale(obj, options){
    
    $.each(obj, function(){
        $(this).width($(this).width() * ratio).height($(this).height() * ratio);
        var target_obj = $(this);
        
        if(typeof options !== 'undefined'){
            $.each(options, function(i, val){
                switch(val){
                    case "left":
                        target_obj.css("left", (target_obj.position().left * ratio) + "px");
                        break;
                    case "top": 
                        target_obj.css("top", (target_obj.position().top * ratio) + "px");
                        break;
                    case "right": 
                        target_obj.css("right", (parseInt(target_obj.css("right").replace("px", "")) * ratio) + "px");
                        break;
                    case "font":
                        target_obj.css("font-size", (parseInt(target_obj.css("font-size").replace("px", "")) * ratio) + "px");
                        break;
                    case "padding": 
                        target_obj.css("padding", (parseInt(target_obj.css("padding").replace("px", "")) * ratio) + "px");
                        break;
                    case "border-radius": 
                        target_obj.css("border-radius", (parseInt(target_obj.css("border-radius").replace("px", "")) * ratio) + "px");
                        break;
                    case "border-width":
                        target_obj.css("borderWidth", (parseInt(target_obj.css("borderWidth").replace("px", "")) * ratio) + "px"); 
                        break;
                }
            });
        }
    });    
}

function init_location_selection(){
    clearPage();
    changeBackground("../assets/images/Home-Selection-Location.png");
    clearTimer();
    var obj = $("<div class='home-button'></div><div class='location-kitchen-button'></div><div class='location-bathroom-button'></div>");
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    $(".home-button").click(function(){
        init_home_page();
    });
    
    $(".location-kitchen-button").click(function(){
        init_location_kitchen();
    });
    
    $(".location-bathroom-button").click(function(){
        init_location_bathroom();
    });
    
    current_function = "init_location_selection";
}

function init_location_bathroom(){
    clearPage();
    changeBackground("../assets/images/levels/Bathroom-Level-Selection.png");
    clearTimer();
    var obj = $("<div class='home-button'></div><div class='return-button'></div><div class='level-button bathroom-advanced-button' data-level='3'></div><div class='level-button bathroom-intermediate-button' data-level='2'></div><div class='level-button bathroom-begineer-button' data-level='1'></div>");
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    $(".home-button").click(function(){
        init_home_page();
    });
    
    $(".return-button").click(function(){
        init_location_selection();
    });
    
    $(".level-button").click(function(){
        var level = $(this).data("level");
        init_level("Bathroom", level);
    });
    
    current_function = "init_location_bathroom";
}

function init_location_kitchen(){
    clearPage();
    changeBackground("../assets/images/levels/Kitchen-Level-Selection.png");
    var obj = $("<div class='home-button'></div><div class='return-button'></div><div class='level-button kitchen-advanced-button' data-level='3'></div><div class='level-button kitchen-intermediate-button' data-level='2'></div><div class='level-button kitchen-begineer-button' data-level='1'></div>");
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    $(".home-button").click(function(){
        init_home_page();
    });
    
    $(".return-button").click(function(){
        init_location_selection();
    });
    
    $(".level-button").click(function(){
        var level = $(this).data("level");
        init_level("Kitchen", level);
    });
    
    current_function = "init_location_kitchen";
}

function init_end_game(location){
    
    clearPage();
    changeBackground("../assets/images/End-Game.png");
    var obj = $("<div class='home-button'></div><div class='try-other-level-button'></div><div class='try-other-location-button'></div>");
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    $(".home-button").click(function(){
        init_home_page();
    });
    
    $(".try-other-level-button").click(function(){
        if(location == "Kitchen"){
            init_location_kitchen();
        }else{
            init_location_bathroom();
        }
    });
    
    $(".try-other-location-button").click(function(){
        init_location_selection();
    });
    
    current_function = "init_end_game";
    current_parameter_1 = location;
}

function init_level(location, level){
    clearPage();
    changeBackground("../assets/images/levels/" + location + "-Level-" + level + ".png");
    var obj = $("<div class='home-button'></div><div class='return-button'></div><div class='counter-display'><span class='counter-number'>" + total_limit + "</span><img class='tile-thumbnail circle' src='../assets/images/counter/" + location + "-" + level + "-counter" + ".png'/></div>");
    
    current_location = location;
    current_level = level;
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    $(".home-button").click(function(){
        
        /* Show ask quit popup first. */
        
        var obj = $('<div class="quit-popup"><img class="tile-thumbnail" src="../assets/images/Quit-Popup.png"/></div>');
        
        $("#page-container").append(obj);
        rescale(obj, ["left", "top"]);
        
        /* Continue and quit button */
        obj = $("<div class='continue-button'></div><div class='quit-button'></div>");
       
        $("#page-container").append(obj);
        rescale(obj, ["left", "top"]);
        
        obj.find(".continue-button").addBack('.continue-button').click(function(event){
            $(".quit-popup").remove();
            $(".continue-button").remove();
            $(".quit-button").remove();
        });
        
        obj.find(".quit-button").addBack('.quit-button').click(function(event){
           
           /* Go back homepage or show summary. */
           
           if(popup_opened_list.length > 0){
                
                $(".quit-popup").remove();
                $(".continue-button").remove();
                $(".quit-button").remove();
                
                showSummaryInfo(current_location, current_level, 200);   
                
                /* Fade all popup box. */
                setTimeout(function(){
                    
                    $(".popup").each(function(){
                
                        var current_obj = $(this);
                        var current_top = $(this).position().top;
                        
                        current_obj.fadeOut(700).animate({
                            'opacity':"0",
                            'top': ((current_top + 100 * ratio) + "px")
                        }, {
                            duration:300, 
                            queue: false, 
                            easing: "easeInOutBack", 
                            always: function(){
                                $(this).remove();
                            }
                        });
                    });    
                }, 10000);
                
                setTimeout(function(){
                    init_end_game(current_location);
                }, 11500);
                
           }else{
                init_home_page();   
           }
        });
    });
    
    $(".return-button").click(function(){        
        if(location == "Kitchen"){
            init_location_kitchen();
        }else{
            init_location_bathroom();
        }
        
    });
    
    /* Counter font */
    $(".counter-number").css("font-size", (parseInt($(".counter-number").css("font-size").replace("px", "")) * ratio) + "px");
    
    /* Load differences */
    var r = new Array(), j = -1;
    var points = differences[current_location][current_level];
    $.each(points, function(i, val) {
        var x = val.x;
        var y = val.y;
        var width = val.width;
        var height = val.height;
        var popup = val.popup;
        
        r[++j] = "<div class='touch-point' data-popup='" + popup + "' style='width:" + width + "px;height:" + height + "px;left:" + x + "px;top:" + y + "px'></div>";
    });
    
    var obj = $(r.join(""));
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top"]);
    
    /* Init click */
    obj.click(function(event){
        showPopup($(this).data("popup"));
    });
    
    /* Click other than points. Close all popups. */
    $(".page-background").click(function(){
        
        $(".popup").each(function(i, val){
            
            var current_obj = $(this);
            var current_top = $(this).position().top;
            
            $(this).animate({
                'opacity':"0",
                'top': ((current_top + 100 * ratio) + "px")
            }, {
                duration: 300, 
                queue: false, 
                easing: "easeInOutBack",
                always: function(){
                    current_obj.remove();
                }
            });    
        });
    });
    
    /* Load Defaults */
    total_remaining = total_limit;
    popup_opened_list = [];
    
    current_function = "init_level";
    current_parameter_1 = location;
    current_parameter_2 = level;
}

function showPopup(popup_index){
    
    var defer = $.Deferred();
    var promise = defer.promise();
    
    promise.then(function(){
        
        var popup = popups[popup_index];
        var x = popup.x;
        var y = popup.y;
        var width = popup.width;
        var height = popup.height;
        
        var r = new Array(), j = -1;
        r[++j] = "<div class='popup' style='opacity: 0; width:" + width + "px;height:" + height + "px;left:" + x + "px;top:" + (y+100*ratio) + "px'>";
        r[++j] =    "<img class='tile-thumbnail' src='../assets/images/popups/" + popup_index + ".png'/>";
        r[++j] = "</div>";
        
        var obj = $(r.join(""));
        
        $("#page-container").append(obj);
        rescale(obj, ["left", "top"]);
        
        obj.animate({
            'opacity':"1",
            'top': ((y * ratio) + "px")
        }, {
            duration:600, 
            queue: false, 
            easing: "easeInOutBack"          
        });
        
        /* Update counters if not open yet. */
        if(popup_opened_list.indexOf(popup_index) == -1){
            popup_opened_list.push(popup_index);
            total_remaining = total_limit - popup_opened_list.length;
            
            /* refreshCounter */
            $(".counter-number").animate({
                'top': ((128 * ratio) + "px")
            }, {duration:200, queue: false, easing: "swing", always: function(){
                $(".counter-number").html(total_remaining);
                $(".counter-number").css("top", (-128*ratio) + "px");
                $(".counter-number").animate({'top':"0px"},{duration:200,queue:false,easing:"swing"});
            }});
            
            /* Completed */
            if(total_remaining == 0){
                moveNextLevel();
            }
        }
    });
    
    if($(".popup").length > 0){
        $(".popup").fadeOut(0, function(){
            $(this).remove();
            defer.resolve(); 
        });
    }else{
        defer.resolve();
    }
}

function showSummaryInfo(location, level_index, wait_duration){
    
    var defer = $.Deferred();
    var promise = defer.promise();
    
    if(typeof wait_duration === 'undefined'){
        wait_duration = 4000;
    }
    
    promise.then(function(){
        
        /* Change Header To Show Summary. Pointer-event: none. */
        var text = "<div class='summary-header'><img class='tile-thumbnail' src='../assets/images/summary-header/" + current_location + "-Level-" + current_level  + "-Summary-Header.png'/></div>";
        
        var obj = $(text);
    
        $("#page-container").append(obj);
        rescale(obj, ["left", "top"]);
        
        obj.animate({
            'top': "0px"
        }, {
            duration:900, 
            queue: false, 
            easing: "easeInOutBack"          
        });
        
        /* Unbind click to prevent popup disappear. */
        $(".page-background").off("click");
        $(".touch-point").off("click");
        $(".home-button").unbind("click");
        
        /* Show all popup */
        for(var i = 1; i <=5; i++){
            
            var popup_index = location + "_" + level_index + "_" + i;
            var popup = popups[popup_index];
            var x = popup.x;
            var y = popup.y;
            var width = popup.width;
            var height = popup.height;
            
            var r = new Array(), j = -1;
            r[++j] = "<div class='popup' style='opacity: 0; width:" + width + "px;height:" + height + "px;left:" + x + "px;top:" + (y+100*ratio) + "px'>";
            r[++j] =    "<img class='tile-thumbnail' src='../assets/images/popups/" + popup_index + ".png'/>";
            r[++j] = "</div>";
            
            var obj = $(r.join(""));
            
            $("#page-container").append(obj);
            rescale(obj, ["left", "top"]);
            
            obj.animate({
                'opacity':"1",
                'top': ((y * ratio) + "px")
            }, {
                duration:900, 
                queue: false, 
                easing: "easeInOutBack"          
            });
        }
    });
        
    setTimeout(function(){
               
        if($(".popup").length > 0){
                    
            $(".popup").each(function(){
                
                var current_obj = $(this);
                var current_top = $(this).position().top;
                
                current_obj.fadeOut(700).animate({
                    'opacity':"0",
                    'top': ((current_top + 100 * ratio) + "px")
                }, {
                    duration:300, 
                    queue: false, 
                    easing: "easeInOutBack", 
                    always: function(){
                        $(this).remove();
                        defer.resolve(); /* Calling multiple times is fine, defer will resolve once only. */
                    }
                });
            });
        }else{
            defer.resolve();
        }
    },wait_duration);
}

function moveNextLevel(){
   
    /* Show All Popup. */
    showSummaryInfo(current_location, current_level);
   
    /* Show toast */
    var text = "<div class='toast-box'><span>Congratulations! You have completed this level. Moving to next level.</span></div>";
   
    if(current_level == "3"){
        text = "<div class='toast-box'><span>Congratulations! You have completed advanced level.</span></div>";
    } 
   
    var obj = $(text);
    
    $("#page-container").append(obj);
    rescale(obj, ["left", "top", "font"]);
    
    rescale(obj.find("span"), ["padding","border-radius","border-width"]);
    
    /* Show Toast After 5 Seconds */
    setTimeout(function(){
        $(".toast-box").fadeIn(700).animate({
            'top': ((821 * ratio) + "px")
        }, {duration:1000, queue: false, easing: "easeInOutBack"});
    }, 8000);
    
    /* Hide Toast. Animate move up and fade out. */
    setTimeout(function(){
        $(".toast-box").fadeOut(700).animate({
            'top':"1080px"
        }, {
            duration:1000, 
            queue: false, 
            easing: "easeInOutBack", 
            always: function(){
                
                $(".toast-box").remove();
            
                /* Fade all popup box. */
                $(".popup").each(function(){
                
                    var current_obj = $(this);
                    var current_top = $(this).position().top;
                    
                    current_obj.fadeOut(700).animate({
                        'opacity':"0",
                        'top': ((current_top + 100 * ratio) + "px")
                    }, {
                        duration:300, 
                        queue: false, 
                        easing: "easeInOutBack", 
                        always: function(){
                            $(this).remove();
                        }
                    });
                });
            }
        });
    }, 19000);
    
    /* Check for last level, then go conclusion page. */
    toastTimer = setTimeout(function(){
        if(current_level == 3){
            init_end_game(current_location);
        }else{
            init_level(current_location, current_level + 1);
        }
    }, 21000);
}
