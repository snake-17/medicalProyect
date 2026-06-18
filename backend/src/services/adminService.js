const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createScheduleService = async (date, timeBlockId) => {
  return prisma.$transaction(async (tx) => {
    const newSchedule = await tx.schedule.findFirst({
      where: {
        date: new Date(date),
        timeBlockId,
      },
    });
    if (newSchedule) {
      throw new Error("SCHEDULE_NOT_AVAILABLE");
    }
    return tx.schedule.create({
      data: {
        date: new Date(date),
        timeBlockId: timeBlockId,
        available: true,
      },
    });
  });
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
