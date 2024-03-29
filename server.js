require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const corsOptions = {
  origin: "http://localhost:8081",
};

db.sequelize.sync();

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route (default tutorial route)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/course.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3011;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;