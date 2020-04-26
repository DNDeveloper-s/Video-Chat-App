const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports.getLogin = (req, res, next) => {
    // Checking for reason query if its redirecting from unauthorized page
    const reason = req.query.reason;

    return res.render('auth/auth', {
        pageTitle: 'Login | DNDeye',
        login: true,
        reason: reason
    });
}

module.exports.getSignUp = (req, res, next) => {
    return res.render('auth/auth', {
        pageTitle: 'SignUp | DNDeye',
        login: false
    });
}

module.exports.postLogin = async (req, res, next) => {
    /**
     * 
     * details = {
     *      actionType: String,
     *      userName: String,
     *      password: String
     * }
     * 
     */
    const details = req.body;
    
    // Checking if user exists with the email or what
    let user = await User.findOne({userName: details.userName});
    if(!user) {
        return next('UserName is invalid!');
    }

    //Checking for password Match 
    const doMatch = await bcrypt.compare(details.password, user.password);

    if(!doMatch) {
        return next('Password doesn\'t match!');
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save();

    /**
     * 
     *      Implementing WebSockets
     * 
     */

    const io = req.app.get('socket.io');

    io.on('connection', function(socket) {
        user.connectedDetails.socketId = socket._id;
    })

    return res.json({
        acknowledgement : {
            type: 'success',
            message: 'Successfully Logged In!',
            data: details
        }
    })
}

module.exports.postSignUp = async (req, res, next) => {
    /**
     * 
     * details = {
     *      actionType: String,
     *      fullName: String,
     *      userName: String,
     *      email: String,
     *      password: String
     * }
     * 
     */
    const details = req.body;

    // Checking if User is already exists with the provided Details
    // Checking if username is already in use
    let user = await User.findOne({userName: details.userName});
    if(user) {
        return next('Please try another UserName');
    }

    // Checking if user already exists with the email
    user = await User.findOne({email: details.email});
    if(user) {
        return next('User already exists with the email');
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(details.password, 12);
    if(!hashedPassword) {
        return next('Something Went Wrong with the server! Please Try Again');
    }

    // Creating new user
    user = new User({
        userName: details.userName,
        fullName: details.fullName,
        image: '/assets/images/default.jpg',
        email: details.email,
        password: hashedPassword,
    });

    await user.save();

    console.log(details);
    return res.json({
        acknowledgement : {
            type: 'success',
            message: 'User created successfully!',
            data: details
        }
    })
}