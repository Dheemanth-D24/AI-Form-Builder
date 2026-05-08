const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  fields: Array,
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);