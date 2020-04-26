async function getCameraMedia(cb) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    const constraints = {
        video: true,
        audio: true
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return stream;
    
}

async function getCaptureMedia(cb) {
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    return captureStream;
}

module.exports = {
    getCameraMedia,
    getCaptureMedia
}