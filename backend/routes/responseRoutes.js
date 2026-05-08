const router = require("express").Router();
const ctrl = require("../controllers/responseController");

router.post("/:formId", ctrl.submitResponse);
router.get("/:formId", ctrl.getResponses);

module.exports = router;