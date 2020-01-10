const mongoose = require("mongoose");
const propertyDataField = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserId"
    },
  purpose: {
    type: String,
    require: true
  },
  name: {
    type:String
  },
  propertyType: {
    type: String,
    require: true
  },
  numberOfBeds:{
    type:String
  },
  numberOfBath:{
    type:String
  },
  city: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  propertyTitle: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  landArea: {
    type: String,
    require: true
  },
 photo1:{

  type:String
  }
  ,
  photo2:{

    type:String
    }
    ,
    photo3:{

      type:String
      }
  ,address:{
    type:String,
    require:true
  },
  isActive: {
    type:String
  }
});

module.exports = mongoose.model('PropertyDataModel', propertyDataField);