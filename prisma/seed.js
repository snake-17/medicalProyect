// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Crear bloques de tiempo
  const catalogo = [
    { startTime: "08:00", endTime: "08:30" },
    { startTime: "08:30", endTime: "09:00" },
    { startTime: "09:00", endTime: "09:30" },
    { startTime: "09:30", endTime: "10:00" },
    { startTime: "10:00", endTime: "10:30" },
    { startTime: "10:30", endTime: "11:00" },
  ];
  const timeBlocks = await prisma.timeBlock.createMany({
    data: catalogo,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
