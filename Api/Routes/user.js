const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// Load User model
const UserModel = require('../Model/user');
const { forwardAuthenticated } = require('../../config/userAuth');

//To Render user Login page
router.get('/userlogin',(req,res)=>res.render('userLogin'));
//To Render User SignUp
router.get('/userSignup',(req,res)=>res.render('userSignup'));
//To Register User
router.post('/signup', (req, res) => {
  const { name, email, password, password2, tel, cnic } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || tel || cnic) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
 else {
    UserModel.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2,
          tel,
          cnic
        });
      } else {
        const newUser = new UserModel({
          name,
          email,
          password,
          tel,
          cnic
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                //To Redirect to user login page
                res.redirect('/api/user/userlogin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/user/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/dashboard/welcome',
    failureRedirect: '/api/user/userlogin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/user/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/api/user/userlogin');
});

module.exports = router;