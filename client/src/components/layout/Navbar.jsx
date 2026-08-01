function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-500">
          InHub
        </h1>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 cursor-pointer">Internships</li>
          <li className="hover:text-blue-400 cursor-pointer">Companies</li>
          <li className="hover:text-blue-400 cursor-pointer">AI Search</li>
          <li className="hover:text-blue-400 cursor-pointer">Resources</li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="border border-blue-500 px-4 py-2 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition">
            Login
          </button>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;