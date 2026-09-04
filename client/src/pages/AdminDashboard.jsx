import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import localInternships from "../data/Internships";

import DashboardStats from "../components/admin/DashboardStats";
import InternshipForm from "../components/admin/InternshipForm";
import InternshipTable from "../components/admin/InternshipTable";

function AdminDashboard() {
  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem("inhubInternships");
    return saved ? JSON.parse(saved) : localInternships;
  });

  const [editingInternship, setEditingInternship] = useState(null);

  // ==========================================
  // LOAD INTERNSHIPS FROM DATABASE
  // ==========================================

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const res = await api.get("/internships");

        setInternships(res.data);

        localStorage.setItem(
          "inhubInternships",
          JSON.stringify(res.data)
        );

        console.log("Loaded from MongoDB:", res.data);
      } catch (error) {
        console.error("GET ERROR:", error);

        toast.error(
          "Database unavailable. Using local internships."
        );
      }
    };

    loadInternships();
  }, []);

  // ==========================================
  // ADD / UPDATE INTERNSHIP
  // ==========================================

  const handleSubmit = async (data) => {
  try {
    // ==========================================
    // UPDATE EXISTING INTERNSHIP
    // ==========================================

    if (editingInternship) {
      const internshipId = editingInternship._id;

      console.log("=================================");
      console.log("UPDATE INTERNSHIP");
      console.log("ID:", internshipId);
      console.log("DATA:", data);
      console.log("=================================");

      if (!internshipId) {
        toast.error("MongoDB internship ID is missing!");
        return;
      }

      // PUT request
      const res = await api.put(
        `/internships/${internshipId}`,
        data
      );

      console.log("UPDATE RESPONSE:", res.data);

      // Update React state
      setInternships((prev) =>
        prev.map((item) =>
          String(item._id) === String(internshipId)
            ? res.data
            : item
        )
      );

      // Update localStorage
      setInternships((prev) => {
        localStorage.setItem(
          "inhubInternships",
          JSON.stringify(prev)
        );

        return prev;
      });

      toast.success("Internship Updated Successfully!");

      // Exit edit mode
      setEditingInternship(null);

      return;
    }

    // ==========================================
    // CREATE NEW INTERNSHIP
    // ==========================================

    console.log("CREATING INTERNSHIP:", data);

    const res = await api.post(
      "/internships",
      data
    );

    console.log("CREATE RESPONSE:", res.data);

    setInternships((prev) => {
      const updated = [...prev, res.data];

      localStorage.setItem(
        "inhubInternships",
        JSON.stringify(updated)
      );

      return updated;
    });

    toast.success("Internship Added Successfully!");

  } catch (error) {
    console.error("=================================");
    console.error("INTERNSHIP ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("RESPONSE:", error.response?.data);
    console.error("=================================");

    toast.error(
      error.response?.data?.message ||
      `Request failed (${error.response?.status || "unknown"})`
    );
  }
};

  // ==========================================
  // DELETE INTERNSHIP
  // ==========================================

  const deleteInternship = async (id) => {
    if (!window.confirm("Delete this internship?")) {
      return;
    }

    try {
      console.log(
        "Deleting internship:",
        id
      );

      await api.delete(
        `/internships/${id}`
      );

      setInternships((prev) => {
        const updated = prev.filter(
          (item) => item._id !== id
        );

        localStorage.setItem(
          "inhubInternships",
          JSON.stringify(updated)
        );

        return updated;
      });

      toast.success(
        "Internship Deleted Successfully!"
      );
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete internship!"
      );
    }
  };

  // ==========================================
  // EDIT INTERNSHIP
  // ==========================================

  const editInternship = (internship) => {
  console.log("EDIT CLICKED - FULL INTERNSHIP:", internship);
  console.log("MongoDB _id:", internship._id);
  console.log("Local id:", internship.id);

  if (!internship._id) {
    toast.error("This internship does not have a MongoDB ID.");
    return;
  }

  setEditingInternship({
    ...internship,
    _id: String(internship._id),
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  // ==========================================
  // CANCEL EDIT
  // ==========================================

  const cancelEdit = () => {
    setEditingInternship(null);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-36 px-8 pb-8">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage internships, companies and
          applications from one place.
        </p>
      </div>

      {/* DASHBOARD STATS */}

      <DashboardStats
        internships={internships}
      />

      {/* INTERNSHIP FORM */}

      <InternshipForm
        key={
          editingInternship?._id ||
          "new"
        }
        onSubmit={handleSubmit}
        editingInternship={editingInternship}
      />

      {/* CANCEL EDIT */}

      {editingInternship && (
        <div className="mb-8">
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Cancel Edit
          </button>
        </div>
      )}

      {/* INTERNSHIP TABLE */}

      <InternshipTable
        internships={internships}
        onDelete={deleteInternship}
        onEdit={editInternship}
      />
    </div>
  );
}

export default AdminDashboard;