import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../componets/supabaseClient.jsx";

function AdminNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const isAuthenticated = !!session?.user;
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        // Fetch user profile from the users table to check role
        const { data: userData, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        // Check if the user is an admin
        if (userData?.role === "admin") {
          setIsAdmin(true); // User is an admin
        } else {
          // Redirect non-admin users to the home page
          navigate("/");
        }
      } else {
        // Redirect unauthenticated users to the admin login page
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redirect to admin login page after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  // Do not render the navbar if the user is not an admin
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-blue-900 to-red-800 text-white">
      {/* Admin Navigation Bar */}
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/admin-dashboard">
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
            <Link to="/admin-scholarship-view" className="text-white hover:text-blue-300">
              Manage Scholarships
            </Link>
            <Link to="/post-scholarship" className="text-white hover:text-blue-300">
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
              to="/admin-scholarship-view"
              className="block py-2 text-white hover:text-blue-300"
              onClick={toggleMenu}
            >
              Manage Scholarships
            </Link>
            <Link
              to="/post-scholarship"
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