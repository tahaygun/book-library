const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Bookschema = new Schema({
  name: {
    type: String,
    require: true
  },
  publishDate: {
    type: String
  },
  details:{
    type: String,
    require: true
  },
  imgUrl:{
    type:String,
    require:true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("Book", Bookschema);
