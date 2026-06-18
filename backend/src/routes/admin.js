const { Router } = require("express");
const {
  createSchedule,
  listReservations,
} = require("../controllers/adminController");
const router = Router();
const authenticateToken = require("../middleware/auth");
router.post("/schedule", authenticateToken, createSchedule);
router.get("/reservations", authenticateToken, listReservations);

module.exports = router;
