WL.Mouse = {};

WL.Mouse.initialize = function() {
    $(window).mousemove(function(e) {
        var x = (e.pageX - (window.innerWidth / 2)) / window.innerWidth;
        var y = (e.pageY - (window.innerHeight / 2)) / window.innerHeight;
        var scale = (Math.abs(x)+Math.abs(y))+0.9; // Magic number, instead of 1
        x = x*105; //degs
        y = -y*105;
        var xorg = Math.round(e.pageX / window.innerWidth * 100);
        var yorg = Math.round(e.pageY / window.innerHeight * 100);
        WL.video.css('-webkit-transform', 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)');
        WL.video.css('-moz-transform', 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)');
        WL.video.css('-o-transform', 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)');
        WL.video.css('-ms-transform', 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)');
        WL.video.css('transform', 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)');
        $('body').css('-webkit-transform', 'scale(' + scale + ')');
        $('body').css('-moz-transform', 'scale(' + scale + ')');
        $('body').css('-o-transform', 'scale(' + scale + ')');
        $('body').css('-ms-transform', 'scale(' + scale + ')');
        $('body').css('transform', 'scale(' + scale + ')');
    });
};
