const express = require('express');
const router=express.Router();
const contactData = require('../Model/Contact');

const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');

//**************** Route To Display Blogs Page ****************//
router.get('/contact',(req,res)=>{
    res.render('contact');
});

//****************To create Post ****************//
router.post('/contactus',(req,res)=>{
        const contact = new contactData({
             message: req.body.message,
             name: req.body.name,
             email: req.body.email,
             subject: req.body.subject,
             status :'unread'
           });
           contact.save()
             .then(result => {
                 if(result){
                    req.flash('success_msg', 'Email Sent Successfuly');
                    res.redirect('/api/contact')}
             })
             .catch(err => {
               console.log(err);
             });
    })
    
    //to get mailbox
    router.get('/mailbox',ensureAuthenticated,async (req,res)=>{
        user =req.user
        let Alpha =await contactData.find({status: 'unread'}).catch(e=>console.log(e))
        beta = Alpha.length

        res.render('mailbox', {
          user,
          unread:beta,
          Alpha:Alpha
        })
    })
module.exports=router;