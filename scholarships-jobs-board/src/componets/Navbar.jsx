import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.jsx";
import AdminNavbar from "../Admin/AdminNavbar.jsx"; // Import the AdminNavbar

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          <Link to="/">
            <div className="text-2xl font-bold text-white">MyScholy</div>
          </Link>
          <div className="space-x-6">
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;