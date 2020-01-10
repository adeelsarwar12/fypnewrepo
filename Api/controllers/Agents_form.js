
const agents = require('../Model/agentsForm');


exports.addForm = async(req, res,next) => {
  
  
  
          
        // var pt = req.body.As;
        // var loc = req.body.location;
        // var cit = req.body.city;


        //   var address = pt+" "+loc+" "+cit
        //   address.toLowerCase()
        //   console.log(address)
              const Agent = new agents({
               // userId: req.userData.userId,
                Name: req.body.Name,
                Location: req.body.Location,
                Age:req.body.Age,
                Description: req.body.Description,
               
                File:req.body.File,
               
               

              });
              Agent
                .save()
                .then(result => {
                  console.log(result);
                 
                  res.redirect('/api/agents/dashboard')
                })
                .catch(err => {
                  console.log(err);
                });
            }
         
      
  

  
  
  //Search
  exports.searchAgent=('/search',function(req,res,next){
    var q = req.query.q
    //Partial Text Search
    agents.find({
       Location:{
           $regex:new RegExp(q)
       }
   },{
       _id:0,
       __v:0
   },
   function(err,data){
       console.log(data)
       res.json(data);
   }).limit(10);
   
   
   })
