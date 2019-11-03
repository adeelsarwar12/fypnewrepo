const mongoose = require('mongoose');
const HostelDataSchema = mongoose.Schema({    
    
    adminId:{
        type:mongoose.Schema.Types.ObjectId
     },
    f_num:{type:String,require:true},
    num_of_room:{type:String,require:true},
    available_seats:{type:String,require:true}    
});
module.exports=mongoose.model('Hostel-Data',HostelDataSchema);