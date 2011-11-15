WL.Sequencer = {};

WL.Sequencer.timer = null;
WL.Sequencer.time = 0;

WL.Sequencer.initialize = function() {
    WL.video.bind('timeupdate', WL.Sequencer.next);
};

WL.Sequencer.next = function() {
    while(WL.Queue.moreEvents() && WL.videoDOM.currentTime > WL.Queue.getCurrentEventTime() - 0.1) {
        WL.Sequencer.triggerEvent();
    }      
};

WL.Sequencer.triggerEvent = function() {
    switch(WL.Queue.getCurrentEventType()) {
        case 'text':
            WL.Text.fire();
            break;
        case 'bar':
            WL.Bar.fire();
        default:
            break;
    }
    WL.Queue.nextEvent();
};