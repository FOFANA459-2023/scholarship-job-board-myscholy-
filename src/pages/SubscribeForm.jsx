import React, { useState } from "react";
import { supabase } from "../componets/supabaseClient.jsx"; // Adjust the import path as needed
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS SDK

const SubscribeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email) {
      setError("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if the email already exists
      const { data: existingSubscribers, error: fetchError } = await supabase
        .from("subscribe")
        .select("email")
        .eq("email", email);

      if (fetchError) throw fetchError;

      if (existingSubscribers && existingSubscribers.length > 0) {
        setError("This email is already subscribed.");
        return;
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from("subscribe")
        .insert([{ name, email }]);

      if (insertError) {
        if (insertError.code === "23505") {
          setError("This email is already subscribed.");
        } else {
          setError("An error occurred. Please try again.");
        }
        throw insertError;
      }

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      // Success
      setSubscribed(true);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      if (!error.message.includes("already subscribed")) {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Success message
  if (subscribed) {
    return (
      <section className="bg-gradient-to-br from-blue-900 to-red-800 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Thank you for subscribing!
            </h2>
            <p className="text-gray-700 mb-6">
              You will now receive regular updates on scholarship openings and
              our new programs and services.
            </p>
            <Link to="/scholarship-list">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                Go to Scholarship List
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Subscription form
  return (
    <section className="bg-gradient-to-br from-blue-900 to-red-800 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Coming Soon...
          </h2>
          <p className="text-gray-700 mb-6">
            Subscribe now to receive regular updates on scholarship openings and
            be the first to know about our new programs and services.
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeForm;