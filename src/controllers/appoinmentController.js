const appoinmentService = require("../services/appoinmentService");

exports.getUserAppoinments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appoinmentService.getUserAppoinments(userId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "we have a troubles to get your dates" });
  }
};
