const authUI = require('./authUI');
const postDetailsToServer = require('../Server/postDetailsToServer');

function initEventListenerToButtons(cb) {
    // Get Action Button through DOM
    const actionBtn = document.querySelector('.submit > button');
    const actionType = actionBtn.dataset.type; // Getting Action Type of Button // Login or SignUp

    actionBtn.addEventListener('click', function() {
        console.log(actionType);
        cb(actionType);
    });

}

function initEventListenerToInput(cb) {
    // Grabbing all these input fields
    const inputEls = document.querySelectorAll('.input-control > input');
    const actionBtn = document.querySelector('.submit > button');
    const actionType = actionBtn.dataset.type; // Getting Action Type of Button // Login or SignUp

    // Attaching Event listener
    inputEls.forEach(inputEl => {
        inputEl.addEventListener('keyup', function(e) {
            if(e.key === 'Enter') {
                cb(actionType);
            }
        })
    })
}

async function postDetailsToServerByActionType(actionType, cb) {
    // Fetching form details from UI
    const details = authUI.getDetailsFromUI(actionType); // Will recieve object filled with details

    // Posting to server
    const data = await postDetailsToServer(details);

    cb(data);
}

module.exports = {
    initEventListenerToButtons,
    initEventListenerToInput,
    postDetailsToServerByActionType
}