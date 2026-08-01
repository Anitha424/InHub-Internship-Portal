import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import AnimatedBackground from "./AnimatedBackground";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 min-h-screen">

        {/* Tag */}
        <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
          Discover. Apply. Grow.
        </span>

        {/* Heading */}
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Find Your Dream <br />
          Internship Faster
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-lg text-gray-400 leading-8">
          Search internships from multiple trusted platforms,
          discover opportunities that match your skills,
          and kickstart your career with confidence.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-5">

          <button
            onClick={() => navigate("/search")}
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold text-white"
          >
            Explore Internships
          </button>

          <button
            onClick={() => navigate("/search")}
            className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition px-8 py-4 rounded-xl font-semibold"
          >
            AI Search
          </button>

        </div>

        {/* Search Bar */}
        <SearchBar />

      </div>
    </section>
  );
}

export default Hero;