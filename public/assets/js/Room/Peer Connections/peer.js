const utils = require('../../utilities');
const media = require('./Media/getMedia');

module.exports = async () => {
    // Official Peer Module
    // const Peer = require('peerjs');

    const postPeerId = require('../Server/postPeerId');

    const data = await utils.fetchCurrentUser();
    // Setting UserId
    document.body.dataset.userid = data.acknowledgement.user._id;

    window.peer = new Peer(document.body.dataset.userid, {
        host: '192.168.43.38',
        // host: '13.127.166.55',
        port: 8000,
        path: '/myapp'
    })

    console.log(peer);

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
    
            connectToPeers(peers)
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

                console.log(curPeer);

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

                    // window.mediaConnection1 = new MediaConnection();

                    // mediaConnection1.answer(stream);
            
                    // mediaConnection1.on('close', function(data) {
                    //     console.log(data);
                    //     console.log('Peer closed');
                    // })

                    const videoContainer = document.querySelector('.video_container');

                    let videoEl = document.querySelector(`.video_holder > video[data-peerid="${curPeer.peerId}"]`);

                    if(!videoEl) {
                        const htmlToAdd = `
                            <div class="video_holder">
                                <video class="peersVideo" data-peerid="${curPeer.peerId}" autoplay="autoplay"></video>
                            </div>
                        `;
                        videoContainer.insertAdjacentHTML('beforeend', htmlToAdd);
                        videoEl = document.querySelector(`.video_holder > video[data-peerid="${curPeer.peerId}"]`);
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

            // window.mediaConnection2 = new MediaConnection();
    
            // mediaConnection2.answer(window.mediaStream);
    
            // mediaConnection2.on('close', function(data) {
            //     console.log(data);
            //     console.log('Peer closed');
            // })

            const videoContainer = document.querySelector('.video_container');

            let videoEl = videoContainer.querySelector(`.video_holder > video[data-peerid="${call.peer}"]`);

            if(!videoEl) {
                const htmlToAdd = `
                    <div class="video_holder">
                        <video class="peersVideo" data-peerid="${call.peer}" autoplay="autoplay"></video>
                    </div>
                `;
                videoContainer.insertAdjacentHTML('beforeend', htmlToAdd);
                videoEl = videoContainer.querySelector(`.video_holder > video[data-peerid="${call.peer}"]`);
            }
            
            videoEl.srcObject = stream;
        })
    })

    // peer.on('close', function(data) {
    // })

    // setInterval(() => {
    //     
    // }, 5000);
}