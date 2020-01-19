const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
// Load User model
const AdminModel = require('../Model/user');


// Register
router.post('/signup', (req, res) => {
  console.log("here")
  const { name, email, password, password2, tel, address,userType } = req.body;
  let errors = [];
  if (password != password2) {
    req.flash(
      'error_msg',
      'Password do not Match'
    );
    res.redirect('/api/signup');
  }
console.log(userType);
  if (password.length < 6) {
    req.flash(
      'error_msg',
      'Password must be at least 6 characters'
    );
    res.redirect('/api/signup');
  }
 else {
    AdminModel.findOne({ email: email }).then(user => {
      console.log('here29')
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2,
          tel,
          address,
          userType
        });
      } else {
        const newUser = new AdminModel({
          name,
          email,
          password,
          tel,
          address,
          role:userType
        });

        bcrypt.genSalt(10, (err, salt) => {
          console.log('here1')
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
                res.redirect('/api/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

mongoose = require('mongoose')
  contactModel = mongoose.model('ContactUs')

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/role/',
    failureRedirect: '/api/login',
    failureFlash: true
  })(req, res, next);
});
//admin route
router.get('/dashboard',ensureAuthenticated,async (req,res)=>{
  data =req.user
  let chek= await contactModel.find({status: 'unread'})
  
  console.log(chek)
  beta = chek.length
  res.render('admin', {
    user:data,
    unread:beta
  })
})
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/api/login');
});


module.exports = router;