var size = 250;
var x, y;
var light = true;

$(document).ready(function() {

    // Init
    x = window.innerWidth/2;
    y = window.innerHeight/2;
    placeLightXY();

    // Mouse handler
    $(window).mousemove(function(e) {
        x = e.pageX;
        y = e.pageY;
        placeLightXY();  
    });
    
    // Key handler
    $(window).keypress(function(e) {
        switch(e.which) {
            case 43: // +
                size += 30;
                placeLightXY();                 
                break;
            case 45: // -
                if (size >= 100) size -= 30;
                placeLightXY();                
                break;
            case 13: // enter
                if(light) {
                    $('#light').hide();
                } else {
                    $('#light').show();                    
                }
                light = !light;
                break;
        }
    });
    
    function placeLightXY() {
        $('#light').css('background', '-moz-radial-gradient('+x+'px '+y+'px 45deg, circle closest-side, transparent 0, transparent ' + Math.round(size*0.85) + 'px,rgba(0,0,0,0.85) ' + size + 'px)');
        $('#light').css('background', '-webkit-radial-gradient('+x+'px '+y +'px, '+size+'px '+size+'px, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 85%,rgba(0,0,0,0.85) 100%)');
        $('#light').css('background', '-o-radial-gradient('+x+'px '+y +'px, '+size+'px '+size+'px, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 85%,rgba(0,0,0,0.85) 100%)');
        $('#light').css('background', '-ms-radial-gradient('+x+'px '+y +'px, '+size+'px '+size+'px, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 85%,rgba(0,0,0,0.85) 100%)');
        $('#light').css('background', 'radial-gradient('+x+'px '+y +'px, '+size+'px '+size+'px, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 85%,rgba(0,0,0,0.85) 100%)');
        /* For old Chrome3, Safari4 */
        $('#light').css('background', '-webkit-radial(radial, '+x+'px '+y +'px, 0, ' +x+'px '+y +'px, '+size+'px, from(rgba(0,0,0,0)), to(rgba(0,0,0,0)), color-stop(1, rgba(0,0,0,0.85))');
    }

});