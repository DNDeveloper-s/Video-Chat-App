const User = require('../models/User');
const Room = require('../models/Room');

const roomController = require('../controllers/roomController');

module.exports.s = async (req, res, next) => {
    let socket_id = [];

    const io = req.app.get('socket.io');
  
    // Updating Connected Details to User Schema
    io.on('connection', async function(socket) {

        socket_id.push(socket.id);
        if (socket_id[0] === socket.id) {
            // remove the connection listener for any subsequent 
            // connections with the same ID
            io.removeAllListeners('connection'); 
        }


        // Fetching Current User
        const user = await User.findById(req.session.user._id);

        io.to(socket.id).emit('haha', {id: socket.id});
        console.log('Connected, Line 16');

        // Updaing Connected Details to User Schema
        user.connectedDetails.socketId = socket.id;
        await user.save();

        socket.on('disconnect', async function() {

            // if(user.connectedDetails.roomId) {
            //     // Deleting From Room
            //     await roomController.deleteMemberFromRoom(user.connectedDetails.roomId, user._id);
            //     user.connectedDetails.roomId = undefined;
            // }
            
            // user.connectedDetails.socketId = undefined;
            // await user.save();
        })
    })

    next();
}