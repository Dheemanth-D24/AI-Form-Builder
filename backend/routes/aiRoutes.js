const router = require("express").Router();
const { generateForm } = require("../controllers/aiController");

router.post("/generate", generateForm);

module.exports = router;