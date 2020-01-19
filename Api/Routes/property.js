const express = require("express");
const router = express.Router();
const Property = require("../controllers/property");
const multer = require('multer');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
const propertyData = require('../Model/properties');
mongoose = require('mongoose')
  contactModel = mongoose.model('ContactUs')
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
  

//To Add Property
router.post("/addProperty",ensureAuthenticated,upload.array('photo', 20),Property.addProperty);
router.get('/search',Property.searchProperty);
//for search property
router.get('/showProperty/:id',async (req,res)=>{
    let alpha;
    alpha=req.params.id
    let beta = await propertyData.findOne({userId:alpha})
    res.render('showProperty',{
        data:beta
    })
})

//INDEX - show all campgrounds
router.get("/newsearch", function(req, res){
  var noMatch = null;
  if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      propertyData.find({address: regex}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
            if(allCampgrounds.length < 1) {
                noMatch = "No campgrounds match that query, please try again.";
            }
           // res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch});
           res.send(allCampgrounds)
         }
      });
  } else {
      // Get all campgrounds from DB
      propertyData.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
            res.send(allCampgrounds)
         }
      });
  }
});
//Escaping / makes the function suitable for escaping characters to be used in a JS regex literal for later eval.
function escapeRegex(text) {
  console.log(text)
  text.replace("/[-[\]{}()*+?.,\\^$|#\s]/g", "\\$&")
  return text;
  
};

router.get('/list',ensureAuthenticated,async (req,res)=>{
  let user= req.user
  var MongoClient = require('mongodb').MongoClient;
//   var url = "mongodb://localhost:27017/FYP";
   var Alpha
// MongoClient.connect(url, function(err, db) {
 
//   if (err) throw err;
//   Alpha = db.collection("ContactUs").find({status: 'unread'}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });
  let data = await propertyData.find({isActive:'pending'})
  let chek= await contactModel.find({status: 'unread'})
  console.log(chek)
  beta = chek.length
    res.render('approve', {
      data:data,
      user,
      unread:beta})
  })

  


  router.put('/status/:id',(req,res)=>{
    var id = req.params.id;
    propertyData.findOne({_id:id},function(err,foundObject){
      if(err){
        res.status(500).send();
      }else {
        if(!foundObject){
          res.status(404).send();
        }
        else{
          // console.log(foundObject)
          foundObject.isActive="done"
        }
        foundObject.save().then(res=>console.log(res))
      }
      res.redirect('/property/list')
    })

  })
module.exports = router;
