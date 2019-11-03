const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// Load User model
const AdminModel = require('../Model/admin');
const { forwardAuthenticated } = require('../../config/auth');


// Register
router.post('/signup', (req, res) => {
  const { name, email, password, password2, tel, address } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || tel || address) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
 else {
    AdminModel.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2,
          tel,
          address
        });
      } else {
        const newUser = new AdminModel({
          name,
          email,
          password,
          tel,
          address
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
                res.redirect('/api/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/dashboard/welcome',
    failureRedirect: '/api/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/api/login');
});

module.exports = router;