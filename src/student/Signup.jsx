import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../componets/supabaseClient";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullname) tempErrors.fullname = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);

        // 1. Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        // 2. Create record in users table with role as 'student'
        const { error: profileError } = await supabase
          .from("users")
          .insert([
            {
              id: authData.user.id,
              fullname: formData.fullname,
              phone: formData.phone,
              role: "student",
              created_at: new Date().toISOString(),
              email: formData.email,
            },
          ]);

        if (profileError) throw profileError;

        // Set success state to true
        setIsSuccess(true);

      } catch (error) {
        console.error("Error during signup:", error.message);
        if (error.message.includes("duplicate key")) {
          setErrors(prev => ({
            ...prev,
            submit: "This email is already registered."
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            submit: error.message
          }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Redirect to login after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  // Sign up with Google
  const signUpWithGoogle = async () => {
    try {
      // Set up the auth state change listener before initiating OAuth
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { user } = session;

          console.log("User signed in with Google:", user); // Debugging

          // Check if the user already exists in the users table
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          if (fetchError && fetchError.message !== "No rows found") {
            console.error("Error fetching user:", fetchError); // Debugging
            throw fetchError;
          }

          // If the user doesn't exist, insert them into the users table
          if (!existingUser) {
            const { error: insertError } = await supabase
              .from("users")
              .insert([
                {
                  id: user.id,
                  fullname: user.user_metadata?.full_name || "Google User",
                  email: user.email,
                  role: "student",
                  created_at: new Date().toISOString(),
                },
              ]);

            if (insertError) {
              console.error("Error inserting user:", insertError); // Debugging
              throw insertError;
            }

            console.log("User added to the users table:", user); // Debugging
          }
        }
      });

      // Initiate Google OAuth sign-in
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;

      // Unsubscribe from the listener when the component unmounts
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Error signing up with Google:", error.message);
      setErrors({ submit: "Failed to sign up with Google." });
    }
  };

  // Sign up with Facebook
  const signUpWithFacebook = async () => {
    try {
      // Set up the auth state change listener before initiating OAuth
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { user } = session;

          console.log("User signed in with Facebook:", user); // Debugging

          // Check if the user already exists in the users table
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          if (fetchError && fetchError.message !== "No rows found") {
            console.error("Error fetching user:", fetchError); // Debugging
            throw fetchError;
          }

          // If the user doesn't exist, insert them into the users table
          if (!existingUser) {
            const { error: insertError } = await supabase
              .from("users")
              .insert([
                {
                  id: user.id,
                  fullname: user.user_metadata?.full_name || "Facebook User",
                  email: user.email,
                  role: "student",
                  created_at: new Date().toISOString(),
                },
              ]);

            if (insertError) {
              console.error("Error inserting user:", insertError); // Debugging
              throw insertError;
            }

            console.log("User added to the users table:", user); // Debugging
          }
        }
      });

      // Initiate Facebook OAuth sign-in
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
      });

      if (error) throw error;

      // Unsubscribe from the listener when the component unmounts
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Error signing up with Facebook:", error.message);
      setErrors({ submit: "Failed to sign up with Facebook." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSuccess ? (
            <div className="text-center">
              <h3 className="text-2xl font-bolds text-sky-600">Thank you for signing up!</h3>
              <p className="mt-4 text-gray-600">
                You will be redirected to the login page in 5 seconds...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  {errors.fullname && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="text-red-600 text-sm text-center">
                  {errors.submit}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Sign up"}
                </button>
              </div>
            </form>
          )}

          {!isSuccess && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={signUpWithGoogle}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="h-5 w-5 mr-2"
                  />
                  Google
                </button>

                <button
                  type="button"
                  onClick={signUpWithFacebook}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img
                    src="https://www.facebook.com/favicon.ico"
                    alt="Facebook"
                    className="h-5 w-5 mr-2"
                  />
                  Facebook
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;