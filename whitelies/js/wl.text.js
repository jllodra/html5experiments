WL.Text = {};

WL.Text.fire = function() {
    $('body').append('<p class="' + WL.Queue.currentEvent + '">' + WL.Queue.getCurrentEventText() + '</p>');
    var t = $('.' + WL.Queue.currentEvent);
    
    var left = Math.round(window.innerWidth/(Math.random()*2 + 3)  + (Math.random()-1) * window.innerWidth/10);
    var top = Math.round(window.innerHeight/ (Math.random()*2 + 1.2)  + (Math.random()-1) * window.innerWidth/10);
    var color = Math.round(0xffffff * (Math.random()+1)/2).toString(16);

    t.css('left', left);
    t.css('top',  top);
    t.css('color', '#' + color);
    
    var cls = (top < window.innerHeight/2) ? "_0" : "_1";
    
    setTimeout(function() {t.toggleClass('show ' + cls)}, 1);
    $(t).bind('transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd', function(){
      setTimeout(function() {$(t).toggleClass('show hide ' + cls + '_')}, 1000);
      $(this).unbind();
   });
};