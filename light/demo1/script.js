var x, y, pos;

$(document).ready(function() {
    $(window).mousemove(function(e) {
        x = Math.round(e.pageX - window.innerWidth/2);
        y = Math.round(e.pageY - window.innerHeight/2);
        pos = x + 'px ' + y + 'px';
        $('#light').css('background-position', pos);
    });
});