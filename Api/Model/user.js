const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
const userSchema = mongoose.Schema({    
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
    },
    role:{
        type:String,
        require:true
    },resetPasswordToken:String,
    resetPasswordExpires:String
});

userSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model('NewUserModel',userSchema);