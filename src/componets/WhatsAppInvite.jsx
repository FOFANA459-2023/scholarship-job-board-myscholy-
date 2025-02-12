import React, { useEffect, useState } from "react";
import { supabase } from "../componets/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

const WhatsAppInvite = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const whatsappLink = 
    "https://chat.whatsapp.com/BTZ8P8BZFzuByy9MKD40r7?fbclid=IwY2xjawIViTlleHRuA2FlbQIxMAABHXlEHnwbqsZh9OhXKg-MtXAw-ik8KyiZm8zRBC3eW1W3HQ4vea9iCeNhhQ_aem_tivM3jqo0dOCv0-HC6WcSA";

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      const { data: studentUser, error } = await supabase
        .from("users") 
        .select("role") // Select only the role column
        .eq("user_id", user.id)
        .single();

      if (error || !studentUser || !["admin", "student"].includes(studentUser.role)) {
        navigate("/access-denied"); // Redirect unauthorized users
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-100 p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community!</h1>
        <p className="text-gray-600 mb-6">
          We’d love to have you in our WhatsApp group. Click the button below to join and stay connected!
        </p>
        <Link
          to={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#25D366] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1DA851] transition duration-300 shadow-md"
        >
          Join WhatsApp Group
        </Link>
      </div>
    </div>
  );
};

export default WhatsAppInvite;
