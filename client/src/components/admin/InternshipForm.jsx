import { useEffect, useState } from "react";

const emptyForm = {
  company: "",
  role: "",
  location: "",
  stipend: "",
  duration: "",
  mode: "Remote",
  skills: "",
  applyLink: "",
};

const getFormData = (internship) => {
  if (!internship) {
    return emptyForm;
  }

  return {
    company: internship.company || "",
    role: internship.role || "",
    location: internship.location || "",
    stipend: internship.stipend || "",
    duration: internship.duration || "",
    mode: internship.mode || "Remote",
    skills: Array.isArray(internship.skills)
      ? internship.skills.join(", ")
      : internship.skills || "",
    applyLink: internship.applyLink || "",
  };
};

function InternshipForm({ onSubmit, editingInternship }) {
  const [formData, setFormData] = useState(
    getFormData(editingInternship)
  );

  // IMPORTANT:
  // Load existing internship whenever Edit is clicked
  useEffect(() => {
    setFormData(getFormData(editingInternship));
  }, [editingInternship]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    await onSubmit(data);

    // Clear form only when adding a NEW internship
    if (!editingInternship) {
      setFormData(emptyForm);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingInternship
          ? "Edit Internship"
          : "Add Internship"}
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
          {editingInternship
            ? "Update Internship"
            : "Save Internship"}
        </button>
      </form>
    </div>
  );
}

export default InternshipForm;