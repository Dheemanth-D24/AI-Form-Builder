const Response = require("../models/Response");

exports.submitResponse = async (req, res) => {
  const response = await Response.create({
    form: req.params.formId,
    answers: req.body
  });
  res.json(response);
};

exports.getResponses = async (req, res) => {
  const responses = await Response.find({ form: req.params.formId });
  res.json(responses);
};