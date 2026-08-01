import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

import DashboardStats from "../components/admin/DashboardStats";
import InternshipForm from "../components/admin/InternshipForm";
import InternshipTable from "../components/admin/InternshipTable";

function AdminDashboard() {
  const [internships, setInternships] = useState([]);
  const [editingInternship, setEditingInternship] = useState(null);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await api.get("/internships");
      setInternships(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch internships!");
    }
  };

  // Add or Update Internship
  const handleSubmit = async (data) => {
    try {
      if (editingInternship) {
        await api.put(
          `/internships/${editingInternship._id}`,
          data
        );

        toast.success("Internship Updated Successfully!");
        setEditingInternship(null);
      } else {
        await api.post("/internships", data);
        toast.success("Internship Added Successfully!");
      }

      fetchInternships();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // Delete Internship
  const deleteInternship = async (id) => {
    if (!window.confirm("Delete this internship?")) return;

    try {
      await api.delete(`/internships/${id}`);
      toast.success("Internship Deleted Successfully!");
      fetchInternships();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete internship!");
    }
  };

  // Edit Internship
  const editInternship = (internship) => {
    setEditingInternship(internship);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-36 px-8 pb-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage internships, companies and applications from one place.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats internships={internships} />

      {/* Internship Form */}
      <InternshipForm
        onSubmit={handleSubmit}
        editingInternship={editingInternship}
      />

      {/* Internship Table */}
      <InternshipTable
        internships={internships}
        onDelete={deleteInternship}
        onEdit={editInternship}
      />

    </div>
  );
}

export default AdminDashboard;