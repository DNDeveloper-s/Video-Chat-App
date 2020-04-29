// const {recStream} = require('../Media/gettingMedia');
const homeUI = require('../Dashboard/Home/Client/homeUI');
const roomSettings = require('../utilities');

module.exports = () => {
    console.log('Coming!');
    const io = require('socket.io-client');

    window.nsSocket = io(`http://localhost:3000`)

    nsSocket.on('haha', function(socket) {
        console.log('Connected to ' + socket.id);
    })

    nsSocket.on('createRoomUpdate', function(data) {
        homeUI.createRoomUpdateToUI(data.message);
    })

    nsSocket.on('peer', function(data) {
        console.log('peer socket event');
        if(data.type === 'newPeerAdded') {
            roomSettings.fetchPeersToSS();
        }
    })
}