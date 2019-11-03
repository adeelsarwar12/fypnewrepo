const express = require('express');
const router=express.Router();

//**************** Route To Display Blogs Page ****************//
router.get('/contact',(req,res)=>{
    res.render('contact');
});

module.exports=router;