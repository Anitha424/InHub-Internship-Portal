const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const internshipRoutes = require("./routes/internshipRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/internships", internshipRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to InHub API 🚀",
  });
});

// Test Route
app.get("/test", (req, res) => {
  res.json({
    message: "Backend is reachable ✅",
  });
});

// Start Server only after MongoDB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();