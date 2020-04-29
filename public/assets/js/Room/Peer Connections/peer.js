const utils = require('../../utilities');
const media = require('./Media/getMedia');

// Some Room imports
const roomUI = require('../Client/roomUI');

module.exports = async () => {
    // Official Peer Module
    // const Peer = require('peerjs');

    const postPeerId = require('../Server/postPeerId');

    const data = await utils.fetchCurrentUser();
    console.log(data);
    // Setting UserId
    document.body.dataset.userid = data.acknowledgement.user._id;



    window.peer = new Peer(document.body.dataset.userid, {
        host: '35.154.219.171',
        port: 8000,
        path: '/myapp',
        secure: false,
        debug: true
    });

    peer.on('open', async function(id) {
        // Injecting peer id to own camera
        const videoEl = document.getElementById('myVideo');
        videoEl.dataset.peerid = id;
        console.log(id);

        const data = await postPeerId(id, roomId);
        console.log(data);

        const peers = utils.fetchPeersFromSS();
        console.log(peers);

        // Time to connect with fetched Peers
        connectToPeers(peers);

        // Share Screen Button
        const screenShareBtn = document.getElementById('screenBtn');
        screenShareBtn.addEventListener('click', async function (e) {
            const screenMedia = await media.getCaptureMedia();
    
            window.mediaStream = screenMedia;
            console.log(window.mediaStream);
    
            const videoEl = document.getElementById('myVideo');
            videoEl.srcObject = screenMedia;
    
            connectToPeers(peers);
        })
    });

    peer.on('connection', function(connection) {
        console.log('Connected');
    });

    function connectToPeers(peers) {
        let call = null;
        peers.forEach(curPeer => {
            if(curPeer) {
                peer.connect(curPeer.peerId);

                call = peer.call(curPeer.peerId, window.mediaStream);

                // Call Stream
                call.on('stream', function(stream) {
                    console.log('calling in open');

                    console.log(call);

                    call.on('close', function() {
                        const peerVideos = document.querySelectorAll('.peersVideo');
                        console.log(peerVideos);
                        peerVideos.forEach( async (cur) => {
                            const peerId = cur.dataset.peerid;
                            
                            // Last element in peerconnection array
                            if(peer.connections[peerId][peer.connections[peerId].length - 1].peerConnection.connectionState === "closed") {

                                const roomId = document.body.dataset.roomid;

                                const closePeerID = require('../Server/closePeerID');
                                const data = await closePeerID(peerId, roomId);

                                console.log(data);

                                const peerVideoEl = document.querySelector(`.peersVideo[data-peerid="${peerId}"]`);
                                peerVideoEl.closest('.video_holder').remove();
                            }
                        });
                    })

                    const videoContainer = document.querySelector('.video_container');

                    let videoEl = document.querySelector(`.video_holder > video[data-peerid="${curPeer.peerId}"]`);

                    if(!videoEl) {
                        videoEl = roomUI.createNewUserVideoEl({
                            peerId: curPeer.peerId
                        });
                    }

                    videoEl.srcObject = stream;
                })
            }
        })
    }

    peer.on('call', function(call) {
        console.log(call);
        console.log('calling in call');

        call.answer(window.mediaStream);

        call.on('stream', function(stream) {

            call.on('close', function(data) {
                const peerVideos = document.querySelectorAll('.peersVideo');
                console.log(peerVideos);
                peerVideos.forEach(async (cur) => {
                    const peerId = cur.dataset.peerid;

                    const roomId = document.body.dataset.roomid;

                    const closePeerID = require('../Server/closePeerID');
                    const data = await closePeerID(peerId, roomId);

                    console.log(data);

                    if(peer.connections[peerId][peer.connections[peerId].length - 1].peerConnection.connectionState === "closed") {
                        const peerVideoEl = document.querySelector(`.peersVideo[data-peerid="${peerId}"]`);
                        peerVideoEl.closest('.video_holder').remove();
                    }
                });
            })


            const videoContainer = document.querySelector('.video_container');

            let videoEl = videoContainer.querySelector(`.video_holder > video[data-peerid="${call.peer}"]`);

            if(!videoEl) {
                videoEl = roomUI.createNewUserVideoEl({
                    peerId: call.peer
                });
            }
            
            videoEl.srcObject = stream;
        })
    })

}