const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  answers: Object,
}, { timestamps: true });

module.exports = mongoose.model("Response", responseSchema);