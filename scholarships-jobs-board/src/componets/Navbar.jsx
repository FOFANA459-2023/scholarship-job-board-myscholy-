import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.jsx";
import AdminNavbar from "../Admin/AdminNavbar.jsx"; // Import the AdminNavbar

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  // Check authentication state on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login"); // Redirect to login page after logout
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // If the user is authenticated, render the AdminNavbar
  if (isLoggedIn) {
    return <AdminNavbar />;
  }

  // If the user is not authenticated, render the public Navbar
  return (
    <div className="bg-gradient-to-b from-blue-900 to-red-800 text-white">
      {/* Navigation Bar */}
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="text-2xl font-bold text-white">MyScholy</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-blue-300">
              Home
            </Link>
            <Link to="/scholarship-list" className="text-white hover:text-blue-300">
              Scholarships
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-300">
              Contact
            </Link>
            <Link
              to="/admin-login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <Link
              to="/"
              className="block py-2 px-4 text-white hover:bg-blue-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/scholarship-list"
              className="block py-2 px-4 text-white hover:bg-blue-600"
              onClick={toggleMobileMenu}
            >
              Scholarships
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-white hover:bg-blue-600"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/admin-login"
              className="block py-2 px-4 text-white hover:bg-blue-600"
              onClick={toggleMobileMenu}
            >
              Admin
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;