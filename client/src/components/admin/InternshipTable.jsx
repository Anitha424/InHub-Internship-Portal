import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

function InternshipTable({ internships, onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filteredInternships = internships.filter(
    (item) =>
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeColor = (mode) => {
    switch (mode) {
      case "Remote":
        return "bg-green-500";
      case "Hybrid":
        return "bg-yellow-500";
      case "On-site":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Internship List</h2>

        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 px-4 py-2 rounded-lg w-72"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3">Company</th>
            <th className="text-left py-3">Role</th>
            <th className="text-left py-3">Location</th>
            <th className="text-left py-3">Mode</th>
            <th className="text-left py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredInternships.map((item) => (
            <tr
              key={item._id || item.id}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                    {item.company.charAt(0).toUpperCase()}
                  </div>

                  <span>{item.company}</span>
                </div>
              </td>

              <td>{item.role}</td>

              <td>{item.location}</td>

              <td>
                <span
                  className={`${getBadgeColor(
                    item.mode
                  )} px-3 py-1 rounded-full text-sm`}
                >
                  {item.mode}
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(item._id || item.id)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredInternships.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-400"
              >
                No internships found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InternshipTable;