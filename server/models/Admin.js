const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Adminschema = new Schema({
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("Admin", Adminschema);
