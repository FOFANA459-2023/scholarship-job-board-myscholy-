import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const baseURL = import.meta.env.BASE_URL || "/scholarship-job-board-myscholy-/";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      setIsLoading(true); // Start loading
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false); // Stop loading
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsLoading(false); // Stop loading after auth state change
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-yellow-600 text-white">
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-12">
              <div className="text-2xl font-bold text-white">MyScholy</div>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-blue-300">
                Home
              </Link>
              <Link to="/scholarship-list" className="text-white hover:text-blue-300">
                Scholarships
              </Link>
            </div>
          </div>

          {/* Auth Buttons and Contact */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/contact" className="text-white hover:text-blue-300">
              Contact
            </Link>
            {isLoading ? (
              // Show loading state while checking auth
              <div className="text-white">Loading...</div>
            ) : user ? (
              // Show Logout if user is authenticated
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-300"
              >
                Logout
              </button>
            ) : (
              // Show Login/Signup if user is not authenticated
              <>
                <Link to="/login" className="text-white hover:text-blue-300">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-blue-300">
                  Signup
                </Link>
                
              </>
            )}
          </div>

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
            <Link to="/" className="block py-2 px-4 text-white hover:bg-blue-600">
              Home
            </Link>
            <Link
              to="/scholarship-list"
              className="block py-2 px-4 text-white hover:bg-blue-600"
            >
              Scholarships
            </Link>
            <div className="border-t border-blue-800 my-2"></div>
            <Link to="/contact" className="block py-2 px-4 text-white hover:bg-blue-600">
              Contact
            </Link>
            {isLoading ? (
              // Show loading state while checking auth
              <div className="block py-2 px-4 text-white">Loading...</div>
            ) : user ? (
              // Show Logout if user is authenticated
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 text-white hover:bg-blue-600"
              >
                Logout
              </button>
            ) : (
              // Show Login/Signup if user is not authenticated
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-white hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 text-white hover:bg-blue-600"
                >
                  Signup
                </Link>
                
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;