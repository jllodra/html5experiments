var size = 700;
var x, y;
var pagex, pagey;
var light = true;

$(document).ready(function() {

    // Init
    setLightSize();
    $('#light').css('left', (window.innerWidth/2 - size/2)+ 'px');
    $('#light').css('top', (window.innerHeight/2 - size/2)+ 'px');
    pagex = window.innerWidth/2;
    pagey = window.innerHeight/2;
    calculateLightXY();
    placeCover();

    // Mouse handler
    $(window).mousemove(function(e) {
        pagex = e.pageX;
        pagey = e.pageY;
        calculateLightXY();
        placeLightXY();  
        placeCover();
    });
    
    // Key handler
    $(window).keypress(function(e) {
        switch(e.which) {
            case 43: // +
                size += 30;
                setLightSize();
                calculateLightXY();
                placeLightXY();                 
                placeCover();
                break;
            case 45: // -
                if (size >= 30) size -= 30;
                setLightSize();
                calculateLightXY();
                placeLightXY();                
                placeCover();
                break;
            case 13: // enter
                if(light) {
                    $('#light, #top, #bottom, #left, #right').hide();
                } else {
                    $('#light, #top, #bottom, #left, #right').show();                    
                }
                light = !light;
                break;
        }
    });
    
    function placeCover() {
        (y > 0) ? $('#top').css('height', y+1 + 'px') : $('#top').css('height', '0px');
        $('#bottom').css('top', y-1 + size + 'px');
        $('#bottom').css('height', window.innerHeight - ( y+1 + size/2 ) + 'px');
        (x > 0) ? $('#left').css('width', x+1 + 'px') : $('#left').css('width', '0px');
        $('#right').css('left', x-1 + size + 'px');
        $('#right').css('width', window.innerWidth - ( x+1 + size/2 ) + 'px');
    }
    
    function calculateLightXY() {
        x = Math.round(pagex - size/2);
        y = Math.round(pagey - size/2);
    }

    function setLightSize() {
        $('#light').css('width', size + 'px');
        $('#light').css('height', size + 'px');
    }
    
    function placeLightXY() {
        $('#light').css('left', x + 'px');
        $('#light').css('top', y + 'px');
    }

});