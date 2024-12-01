const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try{
        const { username, image, email, password, student_id } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) return res.status(400).send('Already Registered');
      
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
              if(err) return res.send(err.message);
              else{
                  const user = await userModel.create({ 
                      username, 
                      email, 
                      student_id, 
                      image, 
                      password: hash
                  });
      
                  const token = generateToken(user);
                  res.cookie('token', token);
                  res.redirect('/dashboard');
              }
          });
        });
    }
    catch(err){
        res.send(err.message);
    };
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(400).send('Invalid credentials');

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = generateToken(user);
      res.cookie('token', token);
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
};
