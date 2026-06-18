const { Router } = require("express");
const reservationController = require("../controllers/reservationController");
const authenticateToken = require("../middleware/auth");
const router = Router();

router.post("/", authenticateToken, reservationController.createReservation);
router.get("/", authenticateToken, reservationController.getReservation);
router.put(
  "/:appointmentId",
  authenticateToken,
  reservationController.updateReservation,
);
router.delete(
  "/:id",
  authenticateToken,
  reservationController.deleteReservation,
);
router.get("/schedule", authenticateToken, reservationController.getSchedule);

module.exports = router;
