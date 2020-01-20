const express = require('express');
const router = express.Router();
const Agents_form=require('../controllers/Agents_form')
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
// Load User model
const AgentsModel = require('../Model/user');
const multer = require('multer');
mongoose = require('mongoose')
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

//agents route
router.get('/dashboard',ensureAuthenticated,async(req,res)=>{
 let alpha= req.user;
 let data
 console.log('here')
 data= await AgentsModel.findOne({_id:alpha._id})
    res.render('agents_dashboard',{
      post:data
    })
  })
  //to display editProfile form
  router.get('/form',ensureAuthenticated,async(req,res)=>{
    let alpha= req.user;
    let data
    data= await AgentsModel.findOne({_id:alpha._id})
       res.render('agents_form',{
         post:data
       })
     })

     router.post("/addForm",ensureAuthenticated,upload.single('photo'),async (req,res)=>{   
       let Alpha = req.user
       AgentsModel.findOneAndUpdate({
        _id:Alpha.id
      }, {
        $set: {
          name: req.body.name,
          tel: req.body.tel,
          description: req.body.description,
          address: req.body.address,
          photo1:req.file.path
        }
      }, { new: true }).then();
      req.flash(
        'error_msg',
        'Profile Created'
      );
      res.redirect('/api/agents/dashboard');
    
     });

     router.get('/search',Agents_form.searchAgent);
     router.get('/addproperty',ensureAuthenticated,async(req,res)=>{
      let alpha= req.user;
      let data
      data= await AgentsModel.findOne({_id:alpha._id})
         res.render('agentpropertyadd',{
           post:data
         })
     })
     router.get('/allagents',async (req,res)=>{
      let data =await AgentsModel.find({role:'agent'})
          res.render('agents',{
            data
          });
     })
     
  module.exports = router;