const express = require('express');
const router = express.Router();
const Agents_form=require('../controllers/Agents_form')
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
// Load User model
const AgentsModel = require('../Model/user');

//agents route
router.get('/dashboard',ensureAuthenticated,async(req,res)=>{
 let alpha= req.user;
 let data

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

     router.post("/addForm",Agents_form.addForm);

     router.get('/search',Agents_form.searchAgent);

  module.exports = router;