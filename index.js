const express = require("express");
const path = require("path");
const app = express();

const globalHelpers = require("./src/utils/globalHelpers");

// FOR DEVELOPMENT
require("dotenv").config({ path: path.join(__dirname, "dev.env") });

// FOR PRODUCTION
// require("dotenv").config();

require("./src/config/db");
const keys = require("./src/config/keys.js");

// MIDDLEWARES
app.use(express.json({ limit: "50mb" }));

// TEST route
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Routes
require("./src/routes")(app);

// Global error handler
app.use((err, req, res, next) => {
  const error = globalHelpers.handleMongooseError(err.message);

  if (
    process.env.NODE_ENV === "production" &&
    error.message.startsWith("request to http")
  ) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }

  res.status(err.status || 400).json({ ...error, status: "failed" });
});

app.listen(keys.PORT, () => {
  console.log(`Server running on PORT ${keys.PORT}`);
});
