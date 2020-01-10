const express = require('express');
const router=express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
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
module.exports=router;