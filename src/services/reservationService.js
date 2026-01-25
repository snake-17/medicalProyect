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
  return prisma.schedule.findMany({
    where: { userId },
    include: { timeblock: true },
  });
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
// exports.deleteReservation = (userId, appointmentId) => {
//   return prisma.$transaction(async (tx) => {
//     availability = await tx.appointment.findUnique({
//       where: { id: appointmentId },
//     });
//     if (!appointment) throw new Error("APPOINMENT_NOT_FOUND");
//     if (appointment.userId !== userId) throw new Error("FORBIDDEN");

//     const schedule = await tx.schedule.findUnique({
//       where: { id: scheduleId },
//     });
//     if (!schedule) throw new Error("SCHEDULE_NOT_FOUND");
//     if (!schedule.available) throw new Error("SCHEDULE_NOT_AVAILABLE");

//     await tx.schedule.update({
//       where: { id: appointment.scheduleId },
//       data: { available: true },
//     });

//     return await tx.appointment.delete({
//       where: { id: parseInt(userId, 10) },
//     });
//   });
// };
exports.deleteReservation = (userId, appointmentId) => {
  return prisma.$transaction(async (tx) => {
    console.log("userId:", userId);
    console.log("appointmentId:", appointmentId);

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
