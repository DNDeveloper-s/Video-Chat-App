// const {recStream} = require('../Media/gettingMedia');
const homeUI = require('../Dashboard/Home/Client/homeUI');

module.exports = () => {
    console.log('Coming!');
    const io = require('socket.io-client');

    window.nsSocket = io(`${window.location.origin}`, {transports: ['websocket'], upgrade: false})

    nsSocket.on('haha', function(socket) {
        console.log('Connected to ' + socket.id);
    })

    nsSocket.on('createRoomUpdate', function(data) {
        homeUI.createRoomUpdateToUI(data.message);
    })
}