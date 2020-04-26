const waitAMin = require('./waitAMin');

let details = {};

module.exports = {
    setConstraints: (options = {
            user: Object,
            message: String,
            emitMessage: String,
            waitTime: Number,
            io: Object
        }) => {
            details.user = options.user || details.user;
            details.message = options.message || details.message;
            details.emitMessage = options.emitMessage || details.emitMessage;
            details.waitTime = options.waitTime || details.waitTime;
            details.io = options.io || details.io;
    },
    show: (options = {
            message: String,
        }) => {
            // Emitting via WebSockets
            details.io.to(details.user.connectedDetails.socketId).emit(details.emitMessage, {message: options.message});
            // Waiting for given Time
            return waitAMin(details.waitTime);
    }
}