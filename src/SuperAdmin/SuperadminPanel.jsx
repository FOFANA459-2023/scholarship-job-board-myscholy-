import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../componets/supabaseClient.jsx";
import { Link, useNavigate } from "react-router-dom";

const SuperadminPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    fullname: "",
    phone: "",
    role: "admin",
    password: "",
  });
  const navigate = useNavigate();

  // Check if the user is authenticated and has the superadmin role
  const checkAuth = useCallback(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      if (!session) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      // Fetch user role from the users table
      const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (roleError) throw roleError;

      if (userData?.role !== "superadmin") {
        navigate("/access-denied"); // Redirect to access denied if not superadmin
        return;
      }

      setIsAuthenticated(true);
      setUserRole(userData.role);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setError("You must be logged in to access this page.");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch scholarships from Supabase
  const fetchScholarships = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const { data, error } = await supabase
        .from("scholarships")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setScholarships(data);
      setFilteredScholarships(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch all users from Supabase
  const fetchUsers = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchScholarships();
      fetchUsers();
    }
  }, [fetchScholarships, fetchUsers, isAuthenticated]);

  // Filter scholarships based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = scholarships.filter((scholarship) =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredScholarships(filtered);
    } else {
      setFilteredScholarships(scholarships);
    }
  }, [searchTerm, scholarships]);

  // Handle scholarship deletion
  const handleDeleteScholarship = async (id) => {
    try {
      const { error } = await supabase
        .from("scholarships")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setScholarships((prev) =>
        prev.filter((scholarship) => scholarship.id !== id)
      );
      setFilteredScholarships((prev) =>
        prev.filter((scholarship) => scholarship.id !== id)
      );
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      alert("Failed to delete scholarship. Please try again.");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) throw error;

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Handle adding a new admin user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (authError) throw authError;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            id: authData.user.id,
            email: newUser.email,
            fullname: newUser.fullname,
            phone: newUser.phone,
            role: newUser.role,
          },
        ])
        .select();

      if (userError) throw userError;

      setUsers((prev) => [...prev, userData[0]]);
      setNewUser({ email: "", fullname: "", phone: "", role: "admin", password: "" });
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return <p className="text-center text-gray-600">Redirecting to login...</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Add New Admin User and User Management Sections Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add New Admin User Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Admin User
            </h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.fullname}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullname: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add User
              </button>
            </form>
          </div>

          {/* User Management Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User Management
            </h2>
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.fullname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Scholarship Management Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Scholarship Management
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search by scholarship name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Link
              to="/post-scholarship"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
            >
              Post Another Scholarship
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Degree Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredScholarships.map((scholarship) => (
                  <tr
                    key={scholarship.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {scholarship.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(scholarship.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scholarship.host_country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scholarship.degree_level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <Link
                        to={`/update-scholarship/${scholarship.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDeleteScholarship(scholarship.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminPanel;