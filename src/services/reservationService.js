const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createReservation = async ({ userId, scheduleId }) => {
  return prisma.$transaction(async (tx) => {
    const schedule = await tx.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }
    if (!schedule.available) {
      throw new Error("SCHEDULE_NOT_AVAILABLE");
    }
    await tx.schedule.update({
      where: { id: scheduleId },
      data: { available: false },
    });
    return tx.appointment.create({
      data: {
        userId,
        scheduleId,
      },
    });
  });
};
exports.getReservation = async (userId) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId },
    select: {
      id: true,
      schedule: {
        select: {
          date: true,
          timeBlock: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  return appointments.map((a) => ({
    id: a.id,
    date: a.schedule.date,
    startTime: a.schedule.timeBlock.startTime,
    endTime: a.schedule.timeBlock.endTime,
  }));
};

exports.updateReservation = async (appointmentId, scheduleId, userId) => {
  return prisma.$transaction(async (tx) => {
    const appointment = await tx.appointment.findUnique({
      where: { id: appointmentId },
      include: { schedule: true }, //esto se puede borrar
    });
    if (!appointment) {
      throw new Error("APPOINTMENT_NOT_FOUND");
    }
    if (appointment.userId != userId) {
      throw new Error("FORBIDDEN");
    }

    const schedule = await tx.schedule.findUnique({
      where: { id: scheduleId },
    });
    if (!schedule) {
      throw new Error("SCHEDULE_NOT_FOUND");
    }
    if (!schedule.available) {
      throw new Error("SCHEDULE_NOT_AVAILABLE");
    }
    //liberar cita
    await tx.schedule.update({
      where: { id: appointment.scheduleId },
      data: { available: true },
    });
    //ocupar nueva cita
    await tx.schedule.update({
      where: { id: scheduleId },
      data: { available: false },
    });
    //devolvemos la cita
    return tx.appointment.update({
      where: { id: appointmentId },
      data: { scheduleId: scheduleId },
    });
  });
};
exports.deleteReservation = (userId, appointmentId) => {
  return prisma.$transaction(async (tx) => {
    appointments = await tx.appointment.findUnique({
      where: { id: appointmentId },
    });
    if (!appointments) {
      throw new Error("APPOINMENT_NOT_FOUND");
    }
    if (appointments.userId !== userId) {
      throw new Error("FORBIDDEN");
    }

    await tx.schedule.update({
      where: { id: appointments.scheduleId },
      data: { available: true },
    });

    return await tx.appointment.delete({
      where: { id: parseInt(appointmentId, 10) },
    });
  });
};
exports.getSchedule = async (date) => {
  schedules = await prisma.schedule.findMany({
    where: {
      available: true,
      ...(date && {
        date: new Date(date),
      }),
    },
    select: {
      id: true,
      date: true,
      timeBlock: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
    },
  });
  return schedules.map((item) => ({
    id: item.id,
    date: item.date,
    startTime: item.timeBlock.startTime,
    endTime: item.timeBlock.endTime,
  }));
};
