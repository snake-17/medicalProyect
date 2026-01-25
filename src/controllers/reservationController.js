const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res) => {
  try {
    const { scheduleId } = req.body;
    const reservation = await reservationService.createReservation({
      userId: req.user.id,
      scheduleId,
    });
    res.status(201).json(reservation);
  } catch (error) {
    if (error.message === "SCHEDULE_NOT_AVAILABLE") {
      return res.status(409).json({ error: "Schedule not available" });
    }
    res.status(400).json({ error: error.message });
  }
};
exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservation(req.user.id);
    if (!reservation) {
      return res.status(404).json({
        error: "Reservation not found",
      });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateReservation = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { scheduleId } = req.body;
    if (!scheduleId || isNaN(Number(scheduleId))) {
      return res
        .status(400)
        .json({ error: "scheduleId must be a valid number" });
    }
    const reservation = await reservationService.updateReservation(
      Number(appointmentId),
      Number(scheduleId),
      req.user.id,
    );
    res.json(reservation);
  } catch (error) {
    if (error.message === "FORBIDDEN") {
      res.status(403).json({ error: "Access Denied" });
    }
    if (error.message === "SCHEDULE_NOT_AVAILABLE") {
      res.status(409).json({ error: "Shedule not available" });
    }
    res.status(400).json({ error: error.message });
  }
};
exports.deleteReservation = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const reservation = await reservationService.deleteReservation(
      req.user.id,
      Number(appointmentId),
    );

    res.status(204).send();
  } catch (error) {
    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ error: "Access denied" });
    }
    if (error.message === "APPOINTMENT_NOT_FOUND") {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
