const express = require("express");
const LoggerMiddleware = require("./src/middleware/logger");
const errorhandler = require("./src/middleware/errorhandler");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersFilePath = path.join(__dirname, "users.json");
const {
  validateUser,
  isValidMail,
  isValidName,
} = require("./src/utils/validation");
const authenticateToken = require("./src/middleware/auth");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(LoggerMiddleware);

app.get("/", (req, res) => {
  res.send(`
    <h1>Curso Express.js</h1>
    <p>Esto es una aplicación node.js con express.js</p>
    <p>Corre con el puerto: ${PORT}</p>
    `);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrar informacion del usuario con ID: ${userId}`);
});
app.get("/search", (req, res) => {
  const terms = req.query.terms || "No especificada";
  const category = req.query.category || "Todas";
  res.send(`
    <h2>Resultados de Busqueda</h2>
    <p>Termino: ${terms}</p>
    <p>Categoria: ${category}</p>
  `);
});
app.post("/form", (req, res) => {
  const name = req.body.nombre || "ANONIMO";
  const email = req.body.email || "example";
  res.json({
    message: "Datos recibidos",
    data: {
      name,
      email,
    },
  });
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No se recibieron datos" });
  }
  res.status(201).json({
    message: "Datos JSON recibidos",
    data,
  });
});
app.get("/users", (req, res) => {
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con base de datos" });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});
app.post("/users", (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error de datos" });
    }
    const users = JSON.parse(data);
    const validation = validateUser(newUser, users);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar usuario" });
      }
      res.status(201).json(newUser);
    });
  });
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "USER",
    },
  });
  res.status(201).json({ message: "User Registered Successfully" });
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updateUser = req.body;
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con conexion de datos" });
    }
    let users = JSON.parse(data);

    if (!isValidName(updateUser.name)) {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    if (!isValidMail(updateUser.email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    users = users.map((user) =>
      user.id === userId ? { ...user, ...updateUser } : user
    );
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar usuario" });
      }
      res.json(updateUser);
    });
  });
});
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con conexion de datos" });
    }
    let users = JSON.parse(data);
    users = users.filter((user) => user.id !== userId);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar usuario" });
      }
      res.status(204).send();
    });
  });
});
app.get("/error", (req, res, next) => {
  next(new Error("Error Intencional"));
});
app.get("/db-users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al comunicarse con la base de datos" });
  }
});
app.get("/protected-route", authenticateToken, (req, res) => {
  res.send("Esta es una ruta protegida");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid email o password" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid email o password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );
  res.json({ token });
});
app.use(errorhandler);
app.listen(PORT, () => {
  console.log(`servidor corriendo ${PORT}`);
});
