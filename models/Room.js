const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    uniqueId: {
        type: String,
        required: true
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            peerId: String
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Room', roomSchema);