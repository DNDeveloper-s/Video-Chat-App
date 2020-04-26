const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const auth = require('../middleware/isAuth');

// Routes comes under 'auth'

// Login Routes
router.get('/login', auth.isNotAuth, authController.getLogin);
router.post('/login', auth.isNotAuth, authController.postLogin);

// Signup Routes
router.get('/signup', auth.isNotAuth, authController.getSignUp);
router.post('/signup', auth.isNotAuth, authController.postSignUp);

module.exports = router;