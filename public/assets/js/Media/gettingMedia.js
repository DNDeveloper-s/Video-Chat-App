function  getUserMedia() {
    async function getLVideo(btn, callbacks) {
        if(btn === 'screenBtn') {
            
            let captureStream = null;
            
            try {
                captureStream = await navigator.mediaDevices.getDisplayMedia();
                callbacks.success(captureStream);
            } catch(err) {
                console.error("Error: " + err);
            }

        } else if(btn === 'cameraBtn') {

            navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
            const constraints = {
                video: true,
                audio: true
            }
    
            navigator.mediaDevices.getUserMedia(constraints)
                .then(callbacks.success)
                .catch(callbacks.error);
    
        }
    }

    document.getElementById('screenBtn').addEventListener('click', function(e) {


        getLVideo ('screenBtn', {
            success: function(stream) {

                // console.log(stream);
                // nsSocket.emit('nice', {stream: JSON.stringify(stream)});

                window.localStream = stream;
                recStream(stream, 'lVideo');
            },
            error: function(err) {
                alert('Cannot access your camera!');
                console.log(err);
            }
        })
    })

    document.getElementById('cameraBtn').addEventListener('click', function(e) {

        getLVideo ('cameraBtn', {
            success: function(stream) {
                window.localStream = stream;
                recStream(stream, 'lVideo')
            },
            error: function(err) {
                alert('Cannot access your camera!');
                console.log(err);
            }
        })
    })
    
};  


function recStream(stream, elemId) {
    const video = document.getElementById(elemId);

    video.srcObject = stream;

    window.peer_stream = stream;
}

module.exports = {
    recStream,
    getUserMedia
}