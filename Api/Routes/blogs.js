const express = require('express');
const router=express.Router();

//**************** Route To Display Blogs Page ****************//
router.get('/blogs',(req,res)=>{
    res.render('blog');
});

module.exports=router;