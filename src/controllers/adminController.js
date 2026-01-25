const {
  createScheduleService,
  listReservationsService,
} = require("../services/adminService");

const createSchedule = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }

  const { date, timeBlockId } = req.body;
  try {
    const newSchedule = await createScheduleService(date, timeBlockId);
    res.status(201).json(newSchedule);
  } catch (error) {
    if (error.message === "SCHEDULE_NOT_AVAILABLE") {
      return res.status(409).json({ error: "Schedule not available" });
    }
    res.status(500).json({ error: "Error creating schedule" });
  }
};

const listReservations = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const reservations = await listReservationsService();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reservations" });
  }
};
module.exports = { createSchedule, listReservations };
