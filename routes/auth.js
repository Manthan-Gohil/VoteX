const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { registerUser, loginUser, logout } = require('../controllers/authController');


router.get('/register', (req, res) => res.render('register'));
router.post('/register', registerUser);
router.get('/login', (req, res) => res.render('login'));
router.post('/login',loginUser);
router.get('/logout',logout);

module.exports = router;
