var FFT = FFT || {};

FFT.context = new webkitAudioContext();
FFT.source = FFT.context.createBufferSource();
FFT.analyser = FFT.context.createAnalyser();

FFT.analyser.fftSize = 2048;
FFT.analyser.smoothingTimeConstant = 0.8; // avg
FFT.freqByteData = new Uint8Array(FFT.analyser.frequencyBinCount);

FFT.initialize = function() {
    FFT.source.connect(FFT.analyser);
    FFT.analyser.connect(FFT.context.destination);
}
