function initActionButtonHandler(cb) {
    // Grabbing those buttons
    const createActionBtn = document.querySelector('.create_room_btn');
    const joinActionBtn = document.querySelector('.join_room_btn');

    // Adding Event Handlers
    createActionBtn.addEventListener('click', function() {
        cb('createRoom');
    });
    joinActionBtn.addEventListener('click', function() {
        cb('joinRoom');
    });
}

function loadHome() {
    window.location.replace(`${window.location.origin}/dashboard/home`);
}

module.exports = {
    initActionButtonHandler,
    loadHome,
}