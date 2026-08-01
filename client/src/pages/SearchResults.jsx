import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/api";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await api.get("/internships");
        setInternships(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchInternships();
  }, []);

  // Search by company, role, location, mode and skills
  const filteredInternships = internships.filter((internship) => {
    if (!query) return true;

    const search = query.toLowerCase();

    return (
      internship.company.toLowerCase().includes(search) ||
      internship.role.toLowerCase().includes(search) ||
      internship.location.toLowerCase().includes(search) ||
      internship.mode.toLowerCase().includes(search) ||
      internship.skills?.some((skill) =>
        skill.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white px-8 py-24">
      <h1 className="text-4xl font-bold">Search Results</h1>

      <p className="text-gray-400 mt-2">
        Showing internships for:
      </p>

      <div className="inline-block bg-blue-600 px-5 py-2 rounded-lg mt-4">
        {query || "All Internships"}
      </div>

      <div className="mt-10 space-y-6">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <Link
              key={internship._id}
              to={`/internship/${internship._id}`}
              className="block"
            >
              <div className="bg-[#111827] rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-lg transition duration-300 cursor-pointer">

                <h2 className="text-2xl font-bold text-blue-400">
                  {internship.company}
                </h2>

                <p className="text-xl mt-2">
                  {internship.role}
                </p>

                <div className="mt-4 text-gray-300 space-y-2">
                  <p>📍 {internship.location}</p>
                  <p>💰 {internship.stipend}</p>
                  <p>⏳ {internship.duration}</p>
                  <p>🌍 {internship.mode}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {internship.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
                  onClick={(e) => e.preventDefault()}
                >
                  Apply Now
                </button>

              </div>
            </Link>
          ))
        ) : (
          <h2 className="text-gray-400 text-xl">
            No internships found.
          </h2>
        )}
      </div>
    </div>
  );
}

export default SearchResults;