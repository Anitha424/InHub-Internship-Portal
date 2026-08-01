const Internship = require("../models/Internship");

// ==========================
// GET all internships
// ==========================
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// GET internship by ID
// ==========================
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// CREATE internship
// ==========================
const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create(req.body);

    res.status(201).json(internship);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================
// UPDATE internship
// ==========================
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ==========================
// DELETE internship
// ==========================
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    res.status(200).json({
      message: "Internship deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// EXPORTS
// ==========================
module.exports = {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
};