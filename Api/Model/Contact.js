const mongoose = require("mongoose");
const ContactUs = mongoose.Schema({
 email: {
      type:String
 },
message: {
type: String,
require: true
},
  name: {
    type: String,
    require: true
  },subject : {
      type: String
  },
  date:{
    type: Date,
    default: Date.now
  },
  status: {
      type:String
  }
});

const Contact = module.exports = mongoose.model('ContactUs', ContactUs);
module.exports=Contact