const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const internshipRoutes = require("./routes/internshipRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

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

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});