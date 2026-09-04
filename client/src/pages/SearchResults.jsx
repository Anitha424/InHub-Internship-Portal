import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/api";
import localInternships from "../data/Internships";

const getFallbackInternships = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("inhubInternships") || "null");
    return Array.isArray(saved) && saved.length > 0 ? saved : localInternships;
  } catch {
    return localInternships;
  }
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [internships, setInternships] = useState(getFallbackInternships);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [application, setApplication] = useState({
    name: "",
    email: "",
    resume: "",
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await api.get("/internships", { timeout: 1500 });
        setInternships(
          Array.isArray(response.data) && response.data.length > 0
            ? response.data
            : getFallbackInternships()
        );
      } catch (error) {
        console.error("API Error:", error);
        setInternships(getFallbackInternships());
      }
    };

    fetchInternships();
  }, []);

  // Search by company, role, location, mode and skills
  const filteredInternships = internships.filter((internship) => {
    if (!query) return true;

    const search = query.trim().toLowerCase();

    if (!search) return true;

    return (
      String(internship.company || "").toLowerCase().includes(search) ||
      String(internship.role || "").toLowerCase().includes(search) ||
      String(internship.location || "").toLowerCase().includes(search) ||
      String(internship.mode || "").toLowerCase().includes(search) ||
      internship.skills?.some((skill) =>
        String(skill).toLowerCase().includes(search)
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
            <div
              key={internship._id || internship.id}
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setApplicationSubmitted(false);
                    setApplication({ name: "", email: "", resume: "" });
                    setSelectedInternship(internship);
                  }}
                >
                  Apply Now
                </button>

                <Link
                  to={`/internship/${internship._id || internship.id}`}
                  className="ml-3 inline-block text-blue-300 hover:text-blue-200"
                >
                  View Details
                </Link>

              </div>
            </div>
          ))
        ) : (
          <h2 className="text-gray-400 text-xl">
            No internships found.
          </h2>
        )}
      </div>

      {selectedInternship && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelectedInternship(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-blue-500 bg-[#111827] p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-application-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="confirm-application-title" className="text-2xl font-bold">
              Confirm Application
            </h2>
            <p className="mt-4 text-gray-400">
              Apply directly through InHub for:
            </p>
            <h3 className="mt-2 text-xl font-bold text-blue-400">
              {selectedInternship.role}
            </h3>
            <p className="mt-1 text-gray-300">at {selectedInternship.company}</p>

            {applicationSubmitted ? (
              <div className="mt-8 rounded-lg bg-green-500/10 p-4 text-green-300">
                Application submitted successfully. The company will contact you
                using your email address.
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const savedApplications = JSON.parse(
                    localStorage.getItem("inhubApplications") || "[]"
                  );
                  savedApplications.push({
                    ...application,
                    internshipId: selectedInternship._id || selectedInternship.id,
                    role: selectedInternship.role,
                    company: selectedInternship.company,
                    submittedAt: new Date().toISOString(),
                  });
                  localStorage.setItem(
                    "inhubApplications",
                    JSON.stringify(savedApplications)
                  );
                  setApplicationSubmitted(true);
                }}
              >
                <input
                  required
                  placeholder="Your full name"
                  value={application.name}
                  onChange={(e) => setApplication({ ...application, name: e.target.value })}
                  className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={application.email}
                  onChange={(e) => setApplication({ ...application, email: e.target.value })}
                  className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  required
                  type="url"
                  placeholder="Resume link (Google Drive, LinkedIn, etc.)"
                  value={application.resume}
                  onChange={(e) => setApplication({ ...application, resume: e.target.value })}
                  className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInternship(null)}
                    className="rounded-lg bg-gray-700 px-5 py-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}

            {applicationSubmitted && (
              <button
                onClick={() => setSelectedInternship(null)}
                className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;