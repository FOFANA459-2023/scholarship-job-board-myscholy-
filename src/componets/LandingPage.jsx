import React from "react";
import { Link } from "react-router-dom";
import ProgramsNservices from "../pages/ProgramsNservices.jsx";
import FAQ from "../pages/FAQ.jsx";
import UniversityCarousel from "../pages/UniversityCarousel.jsx";
import admissionPhoto from "../assets/admission.jpg";
import ALACampus from "../assets/ALACampus.jpg";

const CTAButton = ({ text, to }) => (
  <Link to={to}>
    <button className="bg-sky-900 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg text-lg sm:text-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
      {text}
    </button>
  </Link>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <header
        className="w-full h-[70vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${ALACampus})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Empowering students through scholarships
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover scholarships, grants, and opportunities to achieve your
            academic and career goals.
          </p>
          <CTAButton text="Explore Scholarships" to="/scholarship-list" />
        </div>
      </header>

      {/* About Section */}
      <section
        id="about"
        className="bg-gradient-to-b from-sky-100 to-white text-sky-900 py-12 md:py-16"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            About MyScholy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text on the left */}
            <div className="md:order-1 text-base sm:text-lg text-center md:text-left md:pr-8">
              <div className="border-l-4 border-sky-500 pl-4">
                <p className="mb-6">
                  MyScholy is dedicated to providing students around the world
                  with access to quality education through scholarships, grants,
                  and mentorship programs.
                </p>
                <p className="mb-6">
                  Our mission is to empower the next generation of global
                  leaders, innovators, and change-makers by connecting them with
                  the resources they need to succeed.
                </p>
              </div>
            </div>
            {/* Image on the right */}
            <div className="flex justify-center md:justify-end">
              <img
                src={admissionPhoto}
                alt="Illustration representing MyScholy"
                className="rounded-lg shadow-lg w-full max-w-sm sm:max-w-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* University Sliders Component */}
      <UniversityCarousel />

      {/* Programs and Services Section */}
      <ProgramsNservices />

      {/* Frequently Asked Questions Section */}
      <FAQ />
    </div>
  );
};

export default LandingPage;
