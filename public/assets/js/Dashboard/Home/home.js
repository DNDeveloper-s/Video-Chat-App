const homeUI = require('./Client/homeUI');
const homeSettings = require('./Client/homeSettings');
const postCreateRoom = require('./Server/postCreateRoom');

module.exports = () => {
    // Initializing Button Event Listeners // Action Buttons
    homeSettings.initActionButtonHandler(
        // Callback recieves action type
        function (actionType) {
            if(actionType === 'joinRoom') {
                initJoinRoomHandler();
            } else if(actionType === 'createRoom') {
                initCreateRoomHandler();
            }
        }
    );
}

function initJoinRoomHandler() {
    window.location.replace(`${window.location.origin}/room/load?id=FDkTYln4BZBDLCM`);
}

async function initCreateRoomHandler() {
    // Post Creating Room
    const data = await postCreateRoom();
    window.location.replace(`${window.location.origin}/room/load?id=${data.acknowledgement.invLink}`);
}