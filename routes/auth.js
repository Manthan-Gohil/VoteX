const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const { registerUser, loginUser, logout } = require('../controllers/authController');
const userModel = require('../models/user-model');

router.get('/',(req,res)=>{res.render('home')});
router.get('/register', (req, res) => res.render('register'));
router.post('/register', registerUser);
router.get('/login', (req, res) => res.render('login'));
router.post('/login',loginUser);
router.get('/logout',logout);

router.get('/dashboard', isLoggedIn, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email})
    // console.log(user);
    res.render('dashboard',{user});
});

module.exports = router;
