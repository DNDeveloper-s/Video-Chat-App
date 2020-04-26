const Room = require('../models/Room');
const User = require('../models/User');
const randomatic = require('randomatic');

// Custom Utilities Functions
const pushDetails = require('../Utils/showDetailsToUI');

module.exports.createRoom = async (req, res, next) => {
    // Initiating WebSockets
    const io = req.app.get('socket.io');

    // Fetching Current User
    const user = await User.findById(req.session.user._id);

    // Setting Constraints for this middleware
    pushDetails.setConstraints({
        io: io,
        user: user,
        emitMessage: 'createRoomUpdate',
        waitTime: 1000
    })
    
    // Generating uniqueId
    await pushDetails.show({
        message: 'Generating UniqueId',
    })


    let id;
    while(true) {
        id = randomatic('Aa0', 15);
        console.log(id, 'ID Line 32');
        const room = await Room.findOne({uniqueId: id});
        if(!room) {
            break
        }
    }
    
    // UniqueId Generated
    await pushDetails.show({
        message: 'UniqueId generated successfully!',
    })

    // Creating New Room
    const room = new Room({
        uniqueId: id,
        host: req.session.user._id
    })

    // Initializing Room Environment
    await pushDetails.show({
        message: 'Initializing Room Environment for you!',
    })

    room.members.push({
        user: user._id
    })

    // Room Created
    await pushDetails.show({
        message: 'Room Created successfully!',
    })

    await room.save();

    // Room Created
    await pushDetails.show({
        message: 'Redirecting you to room!',
    })

    return res.json({
        acknowledgement : {
            type: 'success',
            message: 'Successfully Created the Room!',
            invLink: room.uniqueId
        }
    })
}

module.exports.loadRoom = async (req, res, next) => {
    // Fetching Room id from query
    const roomUniqueId = req.query.id;
    console.log(roomUniqueId);

    // Fetching Room from database
    const room = await Room.findOne({uniqueId: roomUniqueId})
                .populate('host');

    const user = await User.findById(req.session.user._id);

    if(!user) {
        return next('You are not a valid user!');
    }

    if(!room) {
        return next('Room is no more valid!');
    }
    
    user.connectedDetails.roomId = roomUniqueId;
    await user.save();

    return res.render('dashboard/room', {
        pageTitle: `Welcome to Room | ${room.host.userName}`,
        roomId: roomUniqueId
    })

    // return res.json({
    //     acknowledgement: {
    //         type: 'success',
    //         room: room.host
    //     }
    // })

}

module.exports.postNewPeerId = async (req, res, next) => {
    const peerId = req.query.peerId;
    const roomId = req.query.roomId;

    // Fetching Room and User from database
    const room = await Room.findOne({uniqueId: roomId});
    const user = await User.findById(req.session.user._id);

    if(!room) {
        return next('Room is not valid!');
    }

    // Creating Member Object
    let memberObj = {
        user: req.session.user._id,
        peerId: peerId
    };

    let oldMember = room.members.filter(cur => cur.user.toString() === req.session.user._id.toString())[0];

    if(oldMember) {
        oldMember.peerId = peerId;
    } else {
        // Pushing to the member object to the Room Mongoose Object
        room.members.push(memberObj);
    }

    await room.save();

    // Updating User Object
    user.connectedDetails.roomId = roomId;

    await user.save();

    return res.json({
        acknowledgement: {
            type: 'success',
            message: 'Successfully posted the peer id!',
            peerId: peerId
        }
    })
}

module.exports.fetchPeers = async (req, res, next) => {
    const roomId = req.query.roomId; // Room uniqueId

    // Fetching Room from database
    const room = await Room.findOne({uniqueId: roomId})
                .populate('members.user');

    if(!room) {
        return next('Invalid Room Id');
    }

    const peerObj = room.members.map(member => {
        if(member.user._id.toString() !== req.session.user._id.toString()) {
            return {
                user: {
                    userName: member.user.userName,
                    image: member.user.image,
                    fullName: member.user.fullName,
                    _id: member.user._id
                },
                peerId: member.peerId
            }
        }
        return undefined;
    })

    return res.json({
        acknowledgement: {
            type: 'success',
            message: 'Peers Fetched Successfully',
            peerObj: peerObj,
            userId: req.session.user._id
        }
    })
}

module.exports.fetch = async(req, res, next) => {
    const details = req.query.details;

    if(details === 'curUser') {

        return res.json({
            acknowledgement: {
                type: 'success',
                message: 'User Fetched Successfully',
                user: {
                    _id: req.session.user._id,
                    fullName: req.session.user.fullName,
                    userName: req.session.user.userName,
                    image: req.session.user.image,
                }
            }
        })
    }
}

module.exports.closePeer = async(req, res, next) => {
    const peerId = req.query.peerId;
    const roomId = req.query.roomId;

    const room = await Room.findOne({uniqueId: roomId});

    await Room.updateOne({uniqueId: roomId}, {
            members: room.members.filter(cur => cur.user.toString() !== peerId.toString())
        }, function(err, affected, resp) {
            console.log(err, 'Line 201');
            console.log(affected, 'Line 202');
            console.log(resp, 'Line 203');
    });

    return res.json({
        acknowledgement: {
            type: 'success',
            message: 'Peer Closed Successfully'
        }
    })
}


module.exports.deleteMemberFromRoom = async (roomId, userId) => {
    console.log(roomId, 'Line 186')
    const room = await Room.findOne({uniqueId: roomId});

    await Room.updateOne({uniqueId: roomId}, {
            members: room.members.filter(cur => cur.user.toString() !== userId.toString())
        }, function(err, affected, resp) {
            console.log(err, 'Line 201');
            console.log(affected, 'Line 202');
            console.log(resp, 'Line 203');
    });
}