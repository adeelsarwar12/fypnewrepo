const multer = require('multer');

const property = require('../Model/properties');

exports.addProperty = async(req, res,next) => {
  let alpha = req.user
  var Files = req.files;
  console.log(Files)
  if (Files.length < 3 || Files.length > 3) {
    req.flash(
      'error_msg',
      "Please Select Only 3 Pictures"
    );
    res.redirect('/user/property');
  }
  
   await property
      .find({
        propertyTitle: req.body.propertyTitle
     
      })
      .exec()
      .then(Model => {
        if (Model.length >= 1) {
          return res.status(409).json({
            message: "Property Already Exists"
          });
        } else {
          
        var pt = req.body.As;
        var loc = req.body.location;
        var cit = req.body.city;


          var address = pt+" "+loc+" "+cit
          address.toLowerCase()
          console.log(address)
              const Property = new property({
                userId: alpha._id,
                purpose: req.body.select,
                name: alpha.name,
                propertyType:req.body.As,
                numberfBeds: req.body.numberfBeds,
                numberOfBath: req.body.numberOfBath,
                city:req.body.city,
                location:req.body.location,
                description:req.body.desc,
                propertyTitle:req.body.title,
                price:req.body.price,
                landArea:req.body.area,
                file:req.body.file,
                address:address,
                photo1: req.files[0].path,
                photo2: req.files[1].path,
                photo3: req.files[2].path,
                isActive: 'pending'

              });
              Property
                .save()
                .then(result => {
                  console.log(result);
                 
                  res.redirect('/user/')
                })
                .catch(err => {
                  console.log(err);
                });
            }
         
      }).catch(e=>{
        console.log(e)
      })
  };
  
  
  
  //Search
  exports.searchProperty=('/search',function(req,res,next){
    var q = req.query.q
    //Partial Text Search
    property.find({
       address:{
           $regex:new RegExp(q)
       }
   },{
       _id:0,
       __v:0
   },
   function(err,data){
       //console.log(data)
       res.json(data);
   }).limit(10);
   
   
   })
