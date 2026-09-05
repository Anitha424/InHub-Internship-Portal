import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-500">
          InHub
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Internships
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Companies
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className="hover:text-blue-400 cursor-pointer transition"
            >
              AI Search
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="hover:text-blue-400 cursor-pointer transition"
            >
              Resources
            </Link>
          </li>
        </ul>

        {/* Login / Signup Buttons */}
        <div className="hidden md:flex gap-3">

          {/* Login */}
          <Link
            to="/login"
            className="border border-blue-500 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>

          {/* Sign Up */}
          <Link
            to="/signup"
            className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;