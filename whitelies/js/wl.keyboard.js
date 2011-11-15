WL.Keyboard = {};

WL.Keyboard.initalize = function() {
    $(window).keypress(function(key) {
        if(key.which == 32) { // space bar
            WL.log(WL.videoDOM.currentTime);
        }
        if(key.which == 13) { // enter key
            WL.video.trigger('pause');
        }
    });
};