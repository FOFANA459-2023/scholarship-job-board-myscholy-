import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../componets/supabaseClient.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PostScholarship = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    host_country: "",
    benefits: "",
    eligibility: "",
    degree_level: "",
    link: "",
    author: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const isInitialRender = useRef(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Scholarship name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (!formData.host_country.trim())
      newErrors.host_country = "Host country is required.";
    if (!formData.benefits.trim())
      newErrors.benefits = "Benefits are required.";
    if (!formData.eligibility.trim())
      newErrors.eligibility = "Eligibility criteria are required.";
    if (!formData.degree_level.trim())
      newErrors.degree_level = "Degree level is required.";
    if (!formData.link.trim()) newErrors.link = "Link is required.";
    if (!formData.author.trim()) newErrors.author = "Author is required.";

    if (formData.deadline) {
      const today = new Date().toISOString().split("T")[0];
      if (formData.deadline < today) {
        newErrors.deadline = "Deadline must be a future date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { data, error } = await supabase
        .from("scholarships")
        .insert([{ ...formData, created_at: new Date().toISOString() }]);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
        setSuccessMessage("Scholarship posted successfully!");
        setFormData({
          name: "",
          description: "",
          deadline: "",
          host_country: "",
          benefits: "",
          eligibility: "",
          degree_level: "",
          link: "",
          author: "",
        });
        setErrors({});
        setTimeout(() => {
          navigate("/admin/scholarships"); // Redirect to admin list
        }, 2000); // Redirect after 2 seconds
      }
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    setIsFormValid(validateForm());
  }, [formData]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Post a Scholarship
      </h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Scholarship Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Scholarship Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter scholarship name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Enter scholarship description"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.deadline ? "border-red-500" : ""
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
          )}
        </div>

        {/* Host Country */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="host_country"
          >
            Host Country
          </label>
          <input
            type="text"
            id="host_country"
            name="host_country"
            value={formData.host_country}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.host_country ? "border-red-500" : ""
            }`}
            placeholder="Enter host country"
          />
          {errors.host_country && (
            <p className="text-red-500 text-xs mt-1">{errors.host_country}</p>
          )}
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="benefits"
          >
            Benefits
          </label>
          <textarea
            id="benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.benefits ? "border-red-500" : ""
            }`}
            placeholder="Enter scholarship benefits"
            rows="4"
          />
          {errors.benefits && (
            <p className="text-red-500 text-xs mt-1">{errors.benefits}</p>
          )}
        </div>

        {/* Eligibility */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eligibility"
          >
            Eligibility
          </label>
          <textarea
            id="eligibility"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.eligibility ? "border-red-500" : ""
            }`}
            placeholder="Enter eligibility criteria"
            rows="4"
          />
          {errors.eligibility && (
            <p className="text-red-500 text-xs mt-1">{errors.eligibility}</p>
          )}
        </div>

        {/* Degree Level */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="degree_level"
          >
            Degree Level
          </label>
          <input
            type="text"
            id="degree_level"
            name="degree_level"
            value={formData.degree_level}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.degree_level ? "border-red-500" : ""
            }`}
            placeholder="Enter degree level"
          />
          {errors.degree_level && (
            <p className="text-red-500 text-xs mt-1">{errors.degree_level}</p>
          )}
        </div>

        {/* Link */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          ></label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.link ? "border-red-500" : ""
            }`}
            placeholder="Enter scholarship link"
          />
          {errors.link && (
            <p className="text-red-500 text-xs mt-1">{errors.link}</p>
          )}
        </div>

        {/* Author */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.author ? "border-red-500" : ""
            }`}
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <Link to="/admin-scholarship-view:id">
            <button
              type="submit"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !isFormValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
              disabled={!isFormValid}
            >
              Post Scholarship
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PostScholarship;
