import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const handleSkillClick = (skill) => {
    navigate(`/search?q=${encodeURIComponent(skill)}`);
  };

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl p-2 shadow-lg">

        <Search className="text-gray-400 ml-4" size={22} />

        <input
          type="text"
          placeholder="Search internships, companies, skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 bg-transparent outline-none px-4 py-3 text-white placeholder:text-gray-500"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white font-semibold transition"
        >
          Search
        </button>

      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {["React", "MERN", "AI", "Python", "Java", "UI/UX"].map((skill) => (
          <button
            key={skill}
            onClick={() => handleSkillClick(skill)}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500 hover:text-blue-400 transition cursor-pointer"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;