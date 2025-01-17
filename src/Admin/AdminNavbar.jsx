import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../componets/supabaseClient.jsx";

function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login"); // Redirect to login page after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-red-800 text-white">
      {/* Admin Navigation Bar */}
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/">
            <div className="text-2xl font-bold text-white">Admin Dashboard</div>
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/admin-scholarship-view:id" className="text-white hover:text-blue-300">
              Manage Scholarships
            </Link>
            <Link to="./post-scholarship" className="text-white hover:text-blue-300">
              Upload Scholarship
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            
            <Link
              to="/admin-scholarship-view:id"
              className="block py-2 text-white hover:text-blue-300"
              onClick={toggleMenu}
            >
              Manage Scholarships
            </Link>
            <Link
              to="./post-scholarship"
              className="block py-2 text-white hover:text-blue-300"
              onClick={toggleMenu}
            >
              Upload Scholarship
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-white hover:text-blue-300"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default AdminNavbar;