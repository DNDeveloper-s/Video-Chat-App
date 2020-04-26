// import Peer from 'peerjs';

// import {getUserMedia, recStream} from './Media/gettingMedia';

// const id = Math.ceil(Math.random() * 2000) + 1826381723;

const peer = new Peer({
    key: 'lwjd5qra8257b9'
});

let conn;

let peer_id;


console.log(peer);


peer.on('open', function(id) {
    document.querySelector('.peer_id').innerHTML = peer.id;
});


peer.on('connection', function(connection) {
    conn = connection;
    peer_id = connection.peer;

    document.querySelector('#connId').value = peer_id;

    console.log('Connected');
});

document.getElementById('connBtn').addEventListener('click', function() {
    peer_id = document.querySelector('#connId').value;

    if(peer_id) {
        conn = peer.connect(peer_id);
    } else {
        alert('Enter peer id!')
        return false;
    }
})

peer.on('call', function(call) {
    const acceptCall = confirm('Do you want to accept the call?');

    if(acceptCall) {
        call.answer(window.localStream);

        call.on('stream', function (stream){
            window.peer_stream = stream;

            recStream(stream, 'rVideo');
        })

        call.on('close', function () {
            alert('Call has been ended!');
        })
    } else {
        console.log('Call has been declined');
    }
})

document.getElementById('callBtn').addEventListener('click', function() {
    console.log('Calling a peer!');
    console.log(peer);

    const call = peer.call(peer_id, window.localStream);

    call.on('stream', function(stream) {
        window.peer_stream = stream;

        recStream(stream, 'rVideo');
    })
})

// conn.on('open', function() {
//     // Receive messages
//     conn.on('data', function(data) {
//       console.log('Received', data);
//     });
  
//     // Send messages
//     conn.send('Hello!');
// });


getUserMedia();



function  getUserMedia() {
    async function getLVideo(callbacks) {

        // const device = await navigator.mediaDevices.enumerateDevices();

        // console.log(device);

        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );
        
        // if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        //     navigator.getUserMedia({
        //         audio: true
        //     }, streamHandler, errorHandler);
        // } else {
        //     navigator.mediaDevices.getUserMedia({
        //         audio: true
        //     }).then(streamHandler).catch(errorHandler);
        // }
        
        const constraints = {
            video: true,
            audio: true
        }

        // console.log(navigator.getUserMedia);
        // console.log(navigator);

        navigator.mediaDevices.getUserMedia(constraints)
            .then(callbacks.success)
            .catch(callbacks.error);

        navigator.getUserMedia(constraints, callbacks.success, callbacks.error)

    }

    getLVideo ({
        success: function(stream) {
            window.localStream = stream;
            recStream(stream, 'lVideo')
        },
        error: function(err) {
            alert('Cannot access your camera!');
            console.log(err);
        }
    })
};  



function recStream(stream, elemId) {
    const video = document.getElementById(elemId);

    video.srcObject = stream;

    window.peer_stream = stream;
}
