const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    stipend: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: true,
    },

    experience: {
      type: String,
      default: "Fresher",
    },

    category: {
      type: String,
      default: "Software Development",
    },

    skills: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      default: "",
    },

    responsibilities: [
      {
        type: String,
      },
    ],

    requirements: [
      {
        type: String,
      },
    ],

    benefits: [
      {
        type: String,
      },
    ],

    applyLink: {
      type: String,
      required: true,
    },

    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);