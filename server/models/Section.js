const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Sectionschema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Book"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});
Sectionschema.index({ title: "text", content: "text" });
module.exports = Section = mongoose.model("Section", Sectionschema);
