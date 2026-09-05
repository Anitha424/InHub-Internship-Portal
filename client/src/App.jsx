import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Hero from "./components/home/Hero";
import TrustedCompanies from "./components/home/TrustedCompanies";
import SearchSection from "./components/home/SearchSection";

import SearchResults from "./pages/SearchResults";
import InternshipDetails from "./pages/InternshipDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
function Home() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <SearchSection />
    </>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#030712] min-h-screen">

      {/* Hide Navbar on Admin Dashboard */}
      {location.pathname !== "/admin/dashboard" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/internship/:id" element={<InternshipDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  );
}

export default App;