const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createScheduleService = async (date, timeBlockId) => {
  const newSchedule = await prisma.schedule.create({
    data: {
      date: new Date(date),
      timeBlockId: timeBlockId,
      available: true,
    },
  });
  return newSchedule;
};

const listReservationsService = async () => {
  const reservations = await prisma.appointment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      schedule: {
        include: {
          timeBlock: true,
        },
      },
    },
  });
  return reservations;
};
module.exports = { createScheduleService, listReservationsService };
