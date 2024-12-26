const express = require("express");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const otpRoute = require("./routes/otpRoute");
const projectRoute = require("./routes/projectRoute");
const emailRoute = require("./routes/emailRoute");
const bidRoute = require("./routes/bidRoute");
const cors = require("cors");
const models = require('./models'); 
const { sequelize, syncDatabase } = require("./config/db"); 

const app = express();

// Load environment variables from .env file
dotenv.config();

// Define port and PostgreSQL connection URL from environment variables
const port = process.env.PORT || 8080;

// Define CORS options
const corsOptions = {
  origin: "*", // Allow all origins (you can specify a specific origin if needed)
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors(corsOptions)); // Use CORS options

// Define routes
app.use("/api", userRoute);
app.use("/api", otpRoute);
app.use("/api", projectRoute);
app.use("/api", emailRoute);
app.use("/api", bidRoute);

// Sync the database and then start the server
syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is active on port ${port}`);
  });
}).catch(err => {
  console.error('Database sync failed:', err);
});