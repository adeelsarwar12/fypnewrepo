const mongoose = require("mongoose");
const BlogData = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserId"
    },
  post: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  update:{
    type: Date
  },
img:{
type:String
}
});

module.exports = mongoose.model('Blogs', BlogData);