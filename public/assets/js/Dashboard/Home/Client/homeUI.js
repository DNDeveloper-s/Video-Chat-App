function createRoomUpdateToUI(message = String) {
    const messageContainer = document.querySelector('.actions');

    // Checking if already exists
    let messageEl = messageContainer.querySelector('.show_message');
    if(!messageEl) {
        // If not, Creating new one
        const htmlToAdd = `
            <div class="show_message display">
                <p>${message}</p>
            </div>
        `;
        messageContainer.insertAdjacentHTML('afterbegin', htmlToAdd);

        messageEl = messageContainer.querySelector('.show_message');
    }

    // If yes, updating
    messageEl.querySelector('p').innerHTML = message;
}

module.exports = {
    createRoomUpdateToUI
}