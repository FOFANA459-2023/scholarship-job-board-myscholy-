import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../componets/supabaseClient.jsx";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Add state to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session?.user) {
          setIsAuthenticated(true);
          setIsLoggedIn(true);
          await fetchUserFullName(session.user.id);
        } else {
          setIsAuthenticated(false);
          setIsLoggedIn(false);
          setUserFullName("");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
        setIsLoggedIn(false);
        setUserFullName("");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN' && session?.user) {
          setIsAuthenticated(true);
          setIsLoggedIn(true);
          await fetchUserFullName(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setIsLoggedIn(false);
          setUserFullName("");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setIsAuthenticated(false);
        setIsLoggedIn(false);
        setUserFullName("");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchUserFullName = async (userId) => {
    try {
      // First check if we have a valid userId
      if (!userId) {
        console.warn("No user ID provided");
        setUserFullName("");
        return;
      }

      const { data, error } = await supabase
        .from("student-profile")
        .select("full_name")
        .eq("id", userId)
        .single(); // Use single() instead of maybeSingle() since we expect one row

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          console.warn("No profile found for user");
          setUserFullName("");
        } else {
          console.error("Error fetching full name:", error);
          setUserFullName("");
        }
      } else if (data) {
        setUserFullName(data.full_name);
      }
    } catch (error) {
      console.error("Error in fetchUserFullName:", error);
      setUserFullName("");
    }
  };

  const handleLogout = async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Clear local state and storage
      localStorage.clear();
      setIsAuthenticated(false);
      setIsLoggedIn(false);
      setUserFullName("");

      // Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error("Logout failed:", error);
      // Reset states even if there's an error
      setIsAuthenticated(false);
      setIsLoggedIn(false);
      setUserFullName("");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the render logic to handle loading state better
  const renderAuthButton = () => {
    if (isLoading) {
      return (
        <button
          disabled
          className="bg-gray-500 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
        >
          Logging out...
        </button>
      );
    }

    if (isAuthenticated && isLoggedIn) {
      return (
        <>
          <span className="text-white">Welcome, {userFullName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Login
      </Link>
    );
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="bg-gradient-to-b from-blue-900 to-red-800 text-white">
      <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/">
            <div className="text-2xl font-bold text-white">MyScholy</div>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white hover:text-blue-300">
              Home
            </Link>
            <Link to="/scholarship-list" className="text-white hover:text-blue-300">
              Scholarships
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-300">
              Contact
            </Link>

            {renderAuthButton()}
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
            <Link
              to="/contact"
              className="block py-2 px-4 text-white hover:bg-blue-600"
            >
              Contact
            </Link>

            {renderAuthButton()}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;