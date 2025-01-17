import React from "react";
import { Link } from "react-router-dom";
import SubscribeForm from "../pages/SubscribeForm.jsx";
import ProgramsNservices from "../pages/ProgramsNservices.jsx";
import FAQ from "../pages/FAQ.jsx";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-red-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
          Empowering Students Worldwide Through Education
        </h1>
        <p className="text-xl mb-8 animate-fade-in delay-100">
          Discover scholarships, grants, and opportunities to achieve your
          academic and career goals.
        </p>
        <div className="space-x-4 animate-fade-in delay-200">
          <Link to="/scholarship-list">
            <a
              href="#scholarships"
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore Scholarships
            </a>
          </Link>
          <Link to="/support">
            <a
              href="#apply"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Support Us
            </a>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-white text-blue-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            About MyScholy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-lg animate-fade-in delay-100">
              <p className="mb-4">
                MyScholy is dedicated to providing students around the world with
                access to quality education through scholarships, grants, and
                mentorship programs.
              </p>
              <p>
                Our mission is to empower the next generation of global leaders,
                innovators, and change-makers by connecting them with the
                resources they need to succeed.
              </p>
            </div>
            <div className="flex justify-center animate-fade-in delay-200">
              <img
                src="https://via.placeholder.com/400"
                alt="About MyScholy"
                className="rounded-lg shadow-lg w-full max-w-md hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs and Services Section */}
      <ProgramsNservices />

      {/* Frequently Asked Questions Section */}
      <FAQ />

    </div>
  );
};

export default LandingPage;