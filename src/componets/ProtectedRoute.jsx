import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProtectedRoute = ({ requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      // Check if the user is authenticated
      const { data: { user }, error } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      // Fetch the user's role from the `users` table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id) // Use `id` instead of `user_id` based on your schema
        .single();

      if (userError || !userData || !requiredRole.includes(userData.role)) {
        navigate("/access-denied"); // Redirect if the user doesn't have the required role
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [navigate, requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return <Outlet />; // Render the child routes if authenticated and authorized
};

export default ProtectedRoute;