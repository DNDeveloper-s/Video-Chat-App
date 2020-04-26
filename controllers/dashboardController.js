const User = require('../models/User');
const Room = require('../models/Room');

// Custom Utilities Functions
const waitAMin = require('../Utils/waitAMin');
const roomController = require('../controllers/roomController');

module.exports.getHome = async (req, res, next) => {

    return res.render('home', {
        pageTitle: `${req.session.user.userName} | Dashboard`
    });
}