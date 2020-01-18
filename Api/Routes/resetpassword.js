const express = require('express');
const router=express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const User = require('../Model/user');
const bcrpt = require('bcrypt')

//**************** Route To Display reset password Page ****************//
router.get('/forget',(req,res)=>{
    res.render('reset');
});

//*********************Forget*************************/
router.post('/forget',(req,res,next)=>{
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/pass/forget');
            }
    
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'theproreactdev@gmail.com',
              pass: 'database12'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'theproreactdev@gmail.com',
            subject: 'RealEstate Password Reset',
            text: 'You have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/pass/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/pass/forget');
      });
})

router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error_msg', 'Password reset token is invalid or has expired.');
        return res.redirect('/pass/forgot');
      }
      res.render('resetpass', {token: req.params.token});
    });
  });

  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            // user.setPassword(req.body.password, function(err) {
            //   user.resetPasswordToken = undefined;
            //   user.resetPasswordExpires = undefined;
  
            //   user.save(function(err) {
            //     req.logIn(user, function(err) {
            //       done(err, user);
            //     });
            //   });
            // })

            bcrpt.hash(req.body.password,10,(err,hash)=>{
              if(err){
                  return res.status(500).json({
                      error: err
                  });
              }
                  else{
          User.findOneAndUpdate({
            resetPasswordToken:req.params.token
            },{$set:{
              password:hash,
              
            }},{new:true})
            .then(user=>{
              if(user){
                req.flash('success_msg', 'Success! Your password has been changed.');
                res.redirect('/api/login');
              }
            })
            .catch()
          }
          })
         }
          else {
              req.flash("error_msg", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function completefun(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'theproreactdev@gmail.com',
              pass: 'database12'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'theproreactdev@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success_msg', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/api/login');
    });
  });

module.exports=router;