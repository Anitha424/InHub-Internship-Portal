import { useState, useEffect } from "react";

function InternshipForm({ onSubmit, editingInternship }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    stipend: "",
    duration: "",
    mode: "Remote",
    skills: "",
    applyLink: "",
  });

  useEffect(() => {
    if (editingInternship) {
      setFormData({
        company: editingInternship.company || "",
        role: editingInternship.role || "",
        location: editingInternship.location || "",
        stipend: editingInternship.stipend || "",
        duration: editingInternship.duration || "",
        mode: editingInternship.mode || "Remote",
        skills: editingInternship.skills
          ? editingInternship.skills.join(", ")
          : "",
        applyLink: editingInternship.applyLink || "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        location: "",
        stipend: "",
        duration: "",
        mode: "Remote",
        skills: "",
        applyLink: "",
      });
    }
  }, [editingInternship]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    });

    if (!editingInternship) {
      setFormData({
        company: "",
        role: "",
        location: "",
        stipend: "",
        duration: "",
        mode: "Remote",
        skills: "",
        applyLink: "",
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingInternship ? "Edit Internship" : "Add Internship"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
          required
        />

        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
          required
        />

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white"
        >
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white md:col-span-2"
        />

        <input
          type="url"
          name="applyLink"
          placeholder="Apply Link"
          value={formData.applyLink}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded text-white md:col-span-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold md:col-span-2 transition"
        >
          {editingInternship ? "Update Internship" : "Save Internship"}
        </button>
      </form>
    </div>
  );
}

export default InternshipForm;