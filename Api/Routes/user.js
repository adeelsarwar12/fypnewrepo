const express = require('express');
const router=express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');

mongoose = require('mongoose')
  propertyData = mongoose.model('PropertyDataModel')


//**************** Route To Display User Page ****************//
router.get('/',(req,res)=>{
    res.render('user');
});
//**************To get page of pro**********************/
router.get('/property',ensureAuthenticated,(req,res)=>{
    res.render('userProperty');
})
router.get('/blog',(req,res)=>{
    res.render('createBlogs');
})
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/api/login');
  });
  router.get('/profile', (req, res) => {
    
    
    res.render('userProfile');
  });
  router.get('/user/propertyList',ensureAuthenticated,async(req,res)=>{
    let data=await propertyData.find({userId:req.user.id})
    
      res.render('propertyList',{data})
    })
module.exports=router;