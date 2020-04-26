function getDetailsFromUI(actionType = String) {
    // Details Object
    // Where all the details about the form to this object
    const detailsObj = {};

    // Attaching Action Type to the object
    detailsObj.actionType = actionType;

    // Grabbing some Common Details across both actionTypes
    detailsObj.userName = document.getElementsByName('user_name')[0].value;
    detailsObj.password = document.getElementsByName('password')[0].value;

    // Now grabbing some unCommon details using some conditionals
    if(actionType === 'signup') {
        detailsObj.fullName = document.getElementsByName('full_name')[0].value;
        detailsObj.email = document.getElementsByName('email')[0].value;
    }

    // Returning Details 
    return detailsObj;
}

async function showMessage(data) {
    /**
     * 
     * data = {
     *      type: String, // success or error
     *      message: String
     * }
     * 
     */
    // Checking if there is already message 
    let showMessageEl = document.querySelector('.show_message');
    if(showMessageEl) {
        showMessageEl.classList.add('remove');
        await new Promise((res, rej) => {
            setTimeout(() => {
                showMessageEl.remove();
                res();
            }, 200);
        });
    }

    const htmlToAdd = `
        <div class="show_message ${data.type}">
            <p>${data.message}</p>
        </div>
    `;

    // Form Element through DOM 
    const formEl = document.querySelector('.form');

    // Injecting to formEl
    formEl.insertAdjacentHTML('afterbegin', htmlToAdd);
}

module.exports = {
    getDetailsFromUI,
    showMessage
}