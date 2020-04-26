const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/isAuth');
const initSocket = require('../middleware/socket');

// Routes comes under 'dashboard'

router.get('/home', auth.isAuth, initSocket.s, dashboardController.getHome);

// Login Routes
// router.get('/login', dashboardController.getLogin);
// router.post('/login', dashboardController.postLogin);

// Signup Routes
// router.get('/signup', dashboardController.getSignUp);
// router.post('/signup', dashboardController.postSignUp);

module.exports = router;