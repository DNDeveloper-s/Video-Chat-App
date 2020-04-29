const authSettings = require('./Client/authSettings');
const authUI = require('./Client/authUI');
const utils = require('../utilities');

// Home Imports
const homeSettings = require('../Dashboard/Home/Client/homeSettings');

// Add Event Listener to action buttons
authSettings.initEventListenerToButtons(
    // Callback recieves actionType of Button
    async function(actionType) {
        authSettings.postDetailsToServerByActionType(actionType, 
            // Callback recieves data recieved from the server
            async function(data) {
                console.log(data);
                // Showing Message to UI that what went wrong or right
                authUI.showMessage({
                    type: data.acknowledgement.type,
                    message: data.acknowledgement.message
                })

                // Waiting 1500ms or 1.5s before redirecting
                await utils.waitAMin(1500);
                
                // Loading Home Page
                if(data.acknowledgement.type === 'success') {
                    homeSettings.loadHome();
                }
            }
        );
    }
);

// Add Event Listener to input 'Submit on Enter'
authSettings.initEventListenerToInput(
    // Callback recieves actionType of Button
    async function (actionType) {
        authSettings.postDetailsToServerByActionType(actionType, 
            // Callback recieves data recieved from the server
            async function(data) {
                console.log(data);
                // Showing Message to UI that what went wrong or right
                authUI.showMessage({
                    type: data.acknowledgement.type,
                    message: data.acknowledgement.message
                })

                // Waiting 1500ms or 1.5s before redirecting
                await utils.waitAMin(1500);
                
                // Loading Home Page
                if(data.acknowledgement.type === 'success') {
                    const redirectUrl = window.location.search.split('&')[1];
                    
                    if(redirectUrl && redirectUrl.length > 0) {
                        const refinedRedirectUrl = redirectUrl.slice(11);
                        window.location.replace(`${window.location.origin}${refinedRedirectUrl}`);
                    } else {
                        homeSettings.loadHome();
                    }
                }
            }
        );
    }    
);