const { Router } = require("express");
const appointmentController = require("../controllers/appoinmentController");
const authenticateToken = require("../middleware/auth");
const router = Router();

router.get(
  "/appoinments",
  authenticateToken,
  appointmentController.getUserAppoinments
);

module.exports = router;
