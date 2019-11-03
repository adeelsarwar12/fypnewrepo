const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({    
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tel:{
        type: String,
        require:true
    },
    address:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model('Admin',adminSchema);