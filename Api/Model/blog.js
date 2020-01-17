const mongoose = require("mongoose");
const BlogData = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserId"
    },
  author: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  title:{
    type: String
  },
file:{
type:String
}
});

module.exports = mongoose.model('Blogs', BlogData);