import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Logo from "../assets/Logo.jpg";

const baseURL = import.meta.env.BASE_URL || "/";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Track user role
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Fetch user role from the `users` table
  const fetchUserRole = async (userId) => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user role:", error.message);
      return null;
    }

    return userData?.role; // Return the user's role
  };

  // Handle authentication state changes
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch the user's role as soon as they are authenticated
        const role = await fetchUserRole(user.id);
        setUserRole(role); // Set the user's role
      }

      setIsLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null;
      setUser(user);

      if (user) {
        // Fetch the user's role immediately after login
        const role = await fetchUserRole(user.id);
        setUserRole(role); // Set the user's role
      } else {
        setUserRole(null); // Reset role on logout
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserRole(null); // Reset role on logout
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
          {/* Logo and MyScholy Text */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="MyScholy Logo"
                className="h-16 w-auto rounded-2xl"
              />
            </Link>
            <Link to="/" className="text-2xl font-bold text-white">
              MyScholy
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex space-x-6 flex-grow justify-center">
            <Link
              to="/"
              className="border border-blue-200 text-white px-4 py-2 rounded-lg hover:bg-blue-200 hover:bg-opacity-10 transition-all"
            >
              Home
            </Link>
            <Link
              to="/scholarship-list"
              className="border border-blue-200 text-white px-4 py-2 rounded-lg hover:bg-blue-200 hover:bg-opacity-10 transition-all"
            >
              Scholarships
            </Link>
            {/* Show "Manage Scholarships" and "Upload Scholarship" for admins */}
            {(userRole === "admin" || userRole === "superadmin") && (
              <>
                <Link
                  to="/admin-scholarship-list"
                  className="flex items-center space-x-2 border border-blue-300 bg-blue-50 bg-opacity-10 text-white px-4 py-2 rounded-lg hover:bg-blue-100 hover:bg-opacity-20 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Manage Scholarships</span>
                </Link>
                <Link
                  to="/post-scholarship"
                  className="flex items-center space-x-2 border border-blue-300 bg-blue-50 bg-opacity-10 text-white px-4 py-2 rounded-lg hover:bg-blue-100 hover:bg-opacity-20 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span>Upload Scholarship</span>
                </Link>
              </>
            )}
            {/* Show "User Management" for superadmins only */}
            {userRole === "superadmin" && (
              <Link
                to="/super-admin-panel"
                className="flex items-center space-x-2 border border-yellow-300 bg-yellow-50 bg-opacity-10 text-white px-4 py-2 rounded-lg hover:bg-yellow-100 hover:bg-opacity-20 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>User Management</span>
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoading ? (
              // Show loading state while checking auth
              <div className="text-white">Loading...</div>
            ) : user ? (
              // Show Logout if user is authenticated
              <button
                onClick={handleLogout}
                className="border border-white text-white py-1 px-3 rounded-lg hover:text-blue-300 hover:border-blue-300 transition-all"
              >
                Logout
              </button>
            ) : (
              // Show Login/Signup if user is not authenticated
              <>
                <Link
                  to="/login"
                  className="border border-white text-white py-1 px-3 rounded-lg hover:text-blue-300 hover:border-blue-300 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-white text-white py-1 px-3 rounded-lg hover:text-blue-300 hover:border-blue-300 transition-all"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
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
            {/* Navigation Links */}
            <Link
              to="/"
              className="block py-2 px-4 text-white hover:bg-blue-600"
            >
              Home
            </Link>
            <Link
              to="/scholarship-list"
              className="block py-2 px-4 text-white hover:bg-blue-600"
            >
              Scholarships
            </Link>
            {/* Show "Manage Scholarships" and "Upload Scholarship" for admins */}
            {(userRole === "admin" || userRole === "superadmin") && (
              <>
                <Link
                  to="/admin-scholarship-list"
                  className="block py-2 px-4 text-white bg-blue-50 bg-opacity-10 hover:bg-blue-600"
                >
                  Manage Scholarships
                </Link>
                <Link
                  to="/post-scholarship"
                  className="block py-2 px-4 text-white bg-blue-50 bg-opacity-10 hover:bg-blue-600"
                >
                  Upload Scholarship
                </Link>
              </>
            )}
            {/* Show "User Management" for superadmins only */}
            {userRole === "superadmin" && (
              <Link
                to="/super-admin-panel"
                className="block py-2 px-4 text-white bg-yellow-50 bg-opacity-10 hover:bg-blue-600"
              >
                User Management
              </Link>
            )}
            <div className="border-t border-blue-800 my-2"></div>

            {/* Auth Buttons */}
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