const Form = require("../models/Form");

exports.createForm = async (req, res) => {
  const form = await Form.create({ ...req.body, user: req.user });
  res.json(form);
};

exports.getForms = async (req, res) => {
  const forms = await Form.find({ user: req.user });
  res.json(forms);
};

exports.getFormById = async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
};

exports.updateForm = async (req, res) => {
  const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(form);
};

exports.deleteForm = async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};