const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');


const HostelData = require('../Model/rooms');

//**********************************************/
//To render addRoom Page
router.get('/room',ensureAuthenticated,async (req,res)=>{ 
    let admin = req.user;
    let Data;
    Data = await HostelData.find({adminId:admin._id})
    res.render('addRoom',{
        data:Data
    })
});

//**************************************************/
// To Add Room Data
router.post('/addhosteldata',ensureAuthenticated, (req,res)=>{
    let errors = [];
    try{
    let admin
     admin = req.user;
     HostelData.find({
        f_num:req.body.f_num
    }).exec()
    .then(user=>{
        if(user.length>=1){
            req.flash(
                'success_msg',
                'Floor Already Exist'
              );
              res.redirect('/admin/room');
        }
            else{
    const Hostel = new HostelData({
        adminId:admin._id,
        f_num:req.body.f_num,
        num_of_room:req.body.num_of_room,
        available_seats:req.body.available_seats
    })
    Hostel.save(err => {
        if (err) {
          console.log(err);
          return res.status(402).json(err);
        } else {
          res.redirect('/admin/room')
        }
      });
    }
})
    }catch{
        res.send('Exception in rooms.js 41 line')
    }
    
})
//********************************************/
//To Delete Hostel Data
router.delete('/:id',ensureAuthenticated,async (req,res)=>{
    try {
        Rece = await HostelData.findById(req.params.id)
        await Rece.remove().then()
        req.flash(
        'success_msg',
        'Deleted'
      );
      res.redirect('/admin/room');
      } catch {
        
          res.send('Exception Here at 76 rooms.js');
      }
})
//To Update Info
router.get('/update/:id',ensureAuthenticated,async (req,res)=>{
    let data
    data= await HostelData.findById(req.params.id);
     res.render('updateInfo',{
         posts:data
     })
})
//To Update
router.put('/updateinfo',ensureAuthenticated,(req,res)=>{
    HostelData.findOneAndUpdate({
        _id:req.body.id
      },{
          $set:{
              num_of_room:req.body.num_of_room,
              available_seats:req.body.available_seats
    }},{new:true}).then();
    req.flash(
        'success_msg',
        'Updated'
      );
      res.redirect('/admin/room');

})

module.exports = router;