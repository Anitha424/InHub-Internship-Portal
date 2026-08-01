import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const popularSearches = [
  "Google",
  "Microsoft",
  "Amazon",
  "OpenAI",
  "React",
  "MERN",
  "Remote",
  "Bangalore",
];

function SearchSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <section className="bg-[#030712] py-14 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-blue-400 font-semibold uppercase tracking-widest">
            Search
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Find Your Dream Internship
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Search internships across top companies using company name, role, skills, or location.
          </p>
        </motion.div>

        {/* Search Box */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4"
        >
          <div className="flex items-center bg-[#111827] border border-gray-700 rounded-2xl px-5 py-4 focus-within:border-blue-500 focus-within:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all">

            <FiSearch className="text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, role, skill or location..."
              className="flex-1 bg-transparent outline-none text-white px-4 placeholder:text-gray-500"
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <FiX className="text-gray-400 hover:text-white text-xl transition" />
              </button>
            )}

          </div>
        </motion.div>

        {/* Popular Searches */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <p className="text-gray-400 mb-4 font-medium">
            Popular Searches
          </p>

          <div className="flex flex-wrap gap-3">

            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => setSearch(item)}
                className="
                  px-4
                  py-2
                  rounded-full
                  border
                  border-gray-700
                  bg-white/5
                  text-gray-300
                  hover:text-white
                  hover:border-blue-500
                  hover:bg-blue-500/10
                  transition-all
                  duration-300
                "
              >
                {item}
              </button>
            ))}

          </div>
        </motion.div>

        {/* Search Button */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() =>
    navigate(`/search?q=${encodeURIComponent(search)}`)
  }
  className="
    px-8
    py-4
    rounded-xl
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-semibold
    shadow-lg
    transition-all
  "
>
  Search Now →
</motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default SearchSection;