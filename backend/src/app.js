const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middleware/errorhandler");
const app = express();

app.use(express.json());

app.use("/api", routes);
app.use("/", (req, res) => {
  res.send("Hello word");
});
app.use(errorHandler);
module.exports = app;
