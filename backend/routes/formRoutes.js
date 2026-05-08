const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/formController");

router.post("/", auth, ctrl.createForm);
router.get("/", auth, ctrl.getForms);
router.get("/:id", ctrl.getFormById);
router.put("/:id", auth, ctrl.updateForm);
router.delete("/:id", auth, ctrl.deleteForm);

module.exports = router;