function waitAMin(time = Number /** In milliseconds  */) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, time);
    })
}

async function fetchPeersToSS() {
    const data = await require('./Room/Server/getPeers')();

    console.log(data);

    sessionStorage.setItem('current_peers', JSON.stringify(data.acknowledgement.peerObj));
}

function fetchPeersFromSS() {
    const jsonPeers = sessionStorage.getItem('current_peers');
    console.log(jsonPeers);
    const peerObj = JSON.parse(jsonPeers);
    return peerObj;
}

async function fetchCurrentUser() {
    const res = await fetch(`${window.location.origin}/room/fetch?details=curUser`, {
        method: 'GET'
    });

    return res.json();
}

function pauseVideo(videoEl) {
    const video = document.querySelector(videoEl);
    const videoHolder = video.parentElement;

    // Creating new canvas element
    const canvasEl = document.createElement('canvas');
    videoHolder.append(canvasEl);

    // Grabbing some canvas stuff, el and context
    const canvas = videoHolder.querySelector('canvas');
    const context = canvas.getContext('2d');

    // some global variables
    let myWidth, myHeight, ratio;
    
    // Event handler on the video element
    video.addEventListener('loadedmetadata', function() {
        ratio = video.videoWidth/video.videoHeight;
        myWidth = video.videoWidth-100;
        myHeight = parseInt(myWidth/ratio,10);
        canvas.width = myWidth;
        canvas.height = myHeight;

        // Put it all together
        context.fillRect(0,0,myWidth,myHeight);
        context.drawImage(video,0,0,myWidth,myHeight);

        // Video is paused, Lets add some utiility classes on video parent element
        videoHolder.classList.add('videoPaused');
    },false);

}

module.exports = {
    waitAMin,
    fetchPeersToSS,
    fetchPeersFromSS,
    fetchCurrentUser,
    pauseVideo
}