const express = require('express');
const router=express.Router();
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
//****************** */
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//**********************/
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//Require Models
const BlogData = require('../Model/blog');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
//**************** Route To Display Blogs Page ****************//
router.get('/blogs',(req,res)=>{
    res.render('createBlogs');
});
//****************To create Post ****************//
router.post('/blogs/create',upload.single('photo'),ensureAuthenticated,(req,res)=>{
let Alpha=req.user
    const blog = new BlogData({
          userId:Alpha._id,
          author:req.body.author,
          title:req.body.title,
         desc: req.body.desc,
         file: req.file.path  
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