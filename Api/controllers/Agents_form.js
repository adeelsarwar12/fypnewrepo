
const agents = require('../Model/agentsForm');
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
