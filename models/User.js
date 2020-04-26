const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    image: String,
    email: {
        type: String,
        required: true
    },
    connectedDetails: {
        socketId: String,
        roomId: String
    },
    password: {
        type: String,
        required: true
    },
    friendsList: [
        {
            type: Schema.Types.ObjectID,
            ref: 'User'
        }
    ],
    config: {
        defaultWorkSpace: {
            type: Schema.Types.ObjectID,
            ref: 'WorkSpace'
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);