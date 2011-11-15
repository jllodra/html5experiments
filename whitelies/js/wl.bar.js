WL.Bar = {};

WL.Bar.fire = function() {
    var curr = WL.Queue.currentEvent;
    var cls = WL.Queue.getCurrentEventClass();
    
    $('body').append('<div class="' + cls + ' ' + curr + '"></div>');
    var bar = $('.' + curr);
    setTimeout(function() {
        bar.toggleClass(cls + 'hide')
        }, 1);
    
    bar.bind('transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd', function(){
        $(this).unbind();
    });
};