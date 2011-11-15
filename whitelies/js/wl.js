var WL = WL || {};

WL.video = null;
WL.videoDOM = null;

WL.progress = null;

WL.scanlines = false;

WL.startTime = 0;

WL.initialize = function(startTime) {
    
    if(startTime != undefined) {
        WL.startTime = startTime;
    }
    
    WL.video = $('#video');
    WL.videoDOM = document.getElementById('video');
    
    WL.videoDOM.addEventListener('loadedmetadata', function() {
        WL.log("loadedmetadata");
        WL.videoDOM.addEventListener('canplaythrough', function() {
            WL.log("canplaythrough");
            // Skip Queue events
            while(WL.startTime > WL.Queue.getCurrentEventTime() && WL.Queue.moreEvents()) {
                WL.Queue.nextEvent();
            }
            if(WL.startTime != 0) {
                WL.videoDOM.currentTime = startTime;
            }       
            $('#button').html('Start');
            $('#button').click(function() {
                $('#welcome').remove();
                WL.StartExperience();
            });
        }); 
    });
};

WL.StartExperience = function() {
    $('body').addClass('experience');
    WL.video.toggleClass('hidden');
    WL.setFullscreen();
    WL.addRemoveScanlines();
    
    WL.video.trigger('play');
    
    // Start sequencer

    WL.Sequencer.initialize();

    // Event handlers
    
    WL.Mouse.initialize();
    //WL.Keyboard.initialize();
    
    // Window resize
    
    $(window).resize(WL.onResize);
    
}

WL.onResize = function() {
    WL.setFullscreen();
}

WL.setFullscreen = function() {
    WL.video.css({
        'width': window.innerWidth + 'px', 
        'height': window.innerHeight + 'px'
    });
}

WL.addRemoveScanlines = function() {   
    $('#video').toggleClass('scanlines');
    WL.scanlines = !WL.scanlines;
}

WL.log = function(l) {
    if(console != null) {
        console.log("WL: " + l);
    }
}