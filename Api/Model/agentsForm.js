
const mongoose = require("mongoose");
const AgentsForm = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserId"
    },
  
  Name: {
    type: String,
    require: true
  },
  Location: {
    type: String,
    require: true
  },

  Age: {
    type: Number,
    require: true
  },

  file:{
    type:String,
  }


});

module.exports = mongoose.model('Agents_form', AgentsForm);
