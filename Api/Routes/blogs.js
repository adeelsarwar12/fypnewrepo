const express = require('express');
const router=express.Router();


//Require Models
const BlogData = require('../Model/blog');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
//**************** Route To Display Blogs Page ****************//
router.get('/blogs',(req,res)=>{
    res.render('blog');
});
//****************To create Post ****************//
router.post('/blogs/create',ensureAuthenticated,(req,res)=>{
let Alpha=req.user
    const blog = new BlogData({
          userId:Alpha._id,
         post: req.body.post,
         name: req.body.name,  
       });
       blog
         .save()
         .then(result => {
           console.log(result);
          res.json(result);
           //res.redirect('/blog');
         })
         .catch(err => {
           console.log(err);
         });
})

//To Delete Post
router.delete('/:id',(req, res) => {
      BlogData.findOne({ _id: req.body._id }).then(profile => {
        
    }
  )
});
  router.put('/:id',(req,res)=>{
  })

module.exports=router;