const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserAppoinments = async (userID) => {
  try {
    const appoinments = await prisma.appointment.findMany({
      where: { userId: parseInt(userID, 10) },
      include: { timeBlock: true },
    });
    return appoinments;
  } catch (error) {
    throw new Error("Error to get the appoinments history");
  }
};
