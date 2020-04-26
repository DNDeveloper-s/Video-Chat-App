const express = require('express');

const router = express.Router();

const roomController = require('../controllers/roomController');
const auth = require('../middleware/isAuth');
const initSocket = require('../middleware/socket');

// Routes comes under 'room'

router.post('/create', auth.isAuth, roomController.createRoom);

router.get('/load', auth.isAuth, initSocket.s, roomController.loadRoom);

router.post('/postNewPeer', auth.isAuth, roomController.postNewPeerId);

router.get('/getPeers', auth.isAuth, roomController.fetchPeers);

router.get('/fetch', auth.isAuth, roomController.fetch);

router.post('/closePeer', auth.isAuth, roomController.closePeer);

// Login Routes
// router.get('/login', auth.isAuth, roomController.getLogin);
// router.post('/login', auth.isAuth, roomController.postLogin);

// // Signup Routes
// router.get('/signup', auth.isAuth, roomController.getSignUp);
// router.post('/signup', auth.isAuth, roomController.postSignUp);

module.exports = router;