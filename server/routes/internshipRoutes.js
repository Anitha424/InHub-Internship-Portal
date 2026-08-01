const express = require("express");

const {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
} = require("../controllers/internshipController");

const router = express.Router();

// =========================
// GET all internships
// =========================
router.get("/", getInternships);

// =========================
// GET internship by ID
// =========================
router.get("/:id", getInternshipById);

// =========================
// CREATE new internship
// =========================
router.post("/", createInternship);

// =========================
// UPDATE internship
// =========================
router.put("/:id", updateInternship);

// =========================
// DELETE internship
// =========================
router.delete("/:id", deleteInternship);

module.exports = router;