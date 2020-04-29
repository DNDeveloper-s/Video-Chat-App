const media = require('./Peer Connections/Media/getMedia');
const getPeers = require('./Server/getPeers');
const utils = require('../utilities');

// Some room imports
const roomSettings = require('./Client/roomSettings');

// Initializing WebSockets
require('../Sockets/socket')();

// Storing roomid as global variable
window.roomId = document.body.dataset.roomid;

// Initializing some room user actions 
// 1. Individual User actions
roomSettings.initIndividualUserActionBtns();


// roomSettings.initCloseCamera();

(async function () {
    // Fetch Peers
    utils.fetchPeersToSS();

    initMedia();

    async function initMedia() {
        // Put Media to UI
        const mediaToPut = await media.getCameraMedia();


        window.mediaStream = mediaToPut;
        console.log(window.mediaStream);

        const videoEl = document.getElementById('myVideo');
        videoEl.srcObject = mediaToPut;

        // Initializing Peer Connections
        require('./Peer Connections/peer')();
    }
})();