import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InternshipDetails = () => {
  const { id } = useParams();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/internships/${id}`
        );

        setInternship(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <h2 className="text-2xl">Internship Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white pt-28 pb-10 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">

          <h1 className="text-4xl font-bold">
            {internship.role}
          </h1>

          <p className="text-blue-400 text-2xl mt-2 font-semibold">
            {internship.company}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>
              <h3 className="font-semibold text-gray-400">
                📍 Location
              </h3>
              <p className="mt-1">
                {internship.location}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-400">
                💰 Stipend
              </h3>
              <p className="mt-1">
                {internship.stipend}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-400">
                ⏳ Duration
              </h3>
              <p className="mt-1">
                {internship.duration}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-400">
                🌍 Mode
              </h3>
              <p className="mt-1">
                {internship.mode}
              </p>
            </div>

          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Skills Required
            </h2>

            <div className="flex flex-wrap gap-3">
              {internship.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-600 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              About this Internship
            </h2>

            <p className="text-gray-300 leading-8">
              Join <strong>{internship.company}</strong> as a{" "}
              <strong>{internship.role}</strong>. This internship
              provides hands-on experience in real-world software
              development while working with experienced engineers.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            Apply Now
          </button>

        </div>
      </div>

      {/* Confirmation Popup */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70">

          <div className="bg-[#111827] border border-blue-500 rounded-2xl p-8 w-[420px] shadow-2xl">

            <div className="text-center">

              <div className="text-5xl mb-4">
                🚀
              </div>

              <h2 className="text-2xl font-bold text-white">
                Confirm Application
              </h2>

              <p className="text-gray-400 mt-4">
                You are about to apply for
              </p>

              <h3 className="text-blue-400 text-xl font-bold mt-3">
                {internship.role}
              </h3>

              <p className="text-gray-300 mt-1">
                at {internship.company}
              </p>

            </div>

            <div className="flex justify-center gap-4 mt-8">

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowModal(false);

                  if (
                    internship.applyLink &&
                    internship.applyLink.trim() !== ""
                  ) {
                    window.open(internship.applyLink, "_blank");
                  } else {
                    alert("Apply link is not available.");
                  }
                }}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
              >
                Apply
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default InternshipDetails;