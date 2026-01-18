const JWT = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  //JWT.verify saca los datos del token y los valida
  JWT.verify(token, process.env.JWT_SECRET, (error, user) => {
    //en esta linea se valida la firma del token y se de-codifica el payload
    if (error) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    //y se entrega el payload como user
    next();
  });
}

module.exports = authenticateToken;
