const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = async (email, password, name) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: "USER" },
    });
    return newUser;
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    throw error;
  }
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("invalid email or password");
  }
  //JWT.sign mete los datos dentro del token
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "4h" },
  );
  return token;
};
module.exports = { registerUser, loginUser };
