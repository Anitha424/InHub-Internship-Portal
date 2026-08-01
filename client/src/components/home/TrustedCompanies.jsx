import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Apple",
  "Meta",
  "Netflix",
  "Adobe",
  "NVIDIA",
  "OpenAI",
  "Zoho",
  "Freshworks",
  "Razorpay",
  "PhonePe",
  "Postman",
  "Flipkart",
  "Swiggy",
  "CRED",
  "Meesho",
];

function TrustedCompanies() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="text-blue-400 font-semibold uppercase tracking-widest">
            Explore Companies
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Find Internships from Top Companies
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Browse opportunities from leading tech companies and startups.
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12">
          {companies.map((company) => (
            <motion.div
              key={company}
              onClick={() =>
                navigate(`/search?q=${encodeURIComponent(company)}`)
              }
              whileHover={{
                scale: 1.06,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="
                cursor-pointer
                rounded-xl
                border
                border-gray-800
                bg-white/5
                backdrop-blur-md
                px-4
                py-3
                flex
                items-center
                justify-center
                text-sm
                font-medium
                text-gray-300
                hover:text-white
                hover:border-blue-500
                hover:bg-blue-500/10
                hover:shadow-[0_0_18px_rgba(59,130,246,0.35)]
                transition-all
                duration-300
              "
            >
              {company}
            </motion.div>
          ))}
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/search")}
            className="
              px-6
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-medium
              transition-all
              duration-300
              shadow-lg
            "
          >
            Search Any Company →
          </button>
        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;