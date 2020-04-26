// Initializing WebSockets
require('./Sockets/socket')();

// Initializing Room
require('./Dashboard/Home/home')();


// // import Peer from 'peerjs';

// import {getUserMedia, recStream} from './Media/gettingMedia';

// const id = Math.ceil(Math.random() * 2000) + 1826381723;

// require('./Sockets/socket')();

// let peer = null;

// window.peer = peer = new Peer({
//     key: 'lwjd5qra8257b9'
// });

// let conn;

// let peer_id;


// console.log(peer);


// peer.on('open', function(id) {
//     document.querySelector('.peer_id').innerHTML = peer.id;
// });


// peer.on('connection', function(connection) {
//     conn = connection;
//     peer_id = connection.peer;

//     document.querySelector('#connId').value = peer_id;

//     console.log('Connected');
// });

// document.getElementById('connBtn').addEventListener('click', function() {
//     peer_id = document.querySelector('#connId').value;

//     if(peer_id) {
//         conn = peer.connect(peer_id);
//     } else {
//         alert('Enter peer id!')
//         return false;
//     }
// })

// peer.on('call', function(call) {
//     const acceptCall = confirm('Do you want to accept the call?');

//     if(acceptCall) {
//         call.answer(window.localStream);

//         call.on('stream', function (stream){
//             window.peer_stream = stream;

//             recStream(stream, 'rVideo');

//             peer.on('change', function(data) {
//                 window.peer_stream = data.stream;
//                 recStream(data.stream, 'rVideo');
//             })
//         })

//         call.on('close', function () {
//             alert('Call has been ended!');
//         })
//     } else {
//         console.log('Call has been declined');
//     }
// })

// document.getElementById('callBtn').addEventListener('click', function() {
//     console.log('Calling a peer!');
//     console.log(peer);

//     const call = peer.call(peer_id, window.localStream);

//     call.on('stream', function(stream) {
//         window.peer_stream = stream;

//         recStream(stream, 'rVideo');
//     })
// })

// // conn.on('open', function() {
// //     // Receive messages
// //     conn.on('data', function(data) {
// //       console.log('Received', data);
// //     });
  
// //     // Send messages
// //     conn.send('Hello!');
// // });


// getUserMedia();


