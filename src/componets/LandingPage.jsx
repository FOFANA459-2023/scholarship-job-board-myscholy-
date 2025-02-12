import React from "react";
import { Link } from "react-router-dom";
import SubscribeForm from "../pages/SubscribeForm.jsx";
import ProgramsNservices from "../pages/ProgramsNservices.jsx";
import FAQ from "../pages/FAQ.jsx";
import APUCoverPhoto from "../assets/apu_cover.jpg";
import admissionPhoto from "../assets/admission.jpg";

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
        style={{ backgroundImage: `url(${APUCoverPhoto})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Empowering Students Worldwide Through Education
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover scholarships, grants, and opportunities to achieve your
            academic and career goals.
          </p>
          <CTAButton text="Explore Scholarships" to="/scholarship-list" />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-white text-sky-900 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">About MyScholy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-base sm:text-lg text-left">
              <p className="mb-6">
                MyScholy is dedicated to providing students around the world with
                access to quality education through scholarships, grants, and
                mentorship programs.
              </p>
              <p className="mb-6">
                Our mission is to empower the next generation of global leaders,
                innovators, and change-makers by connecting them with the
                resources they need to succeed.
              </p>
              <CTAButton text="Learn More" to="/about" />
            </div>
            <div className="flex justify-center">
              <img
                src={admissionPhoto}
                alt="Illustration representing MyScholy"
                className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-md hover:scale-105 transition-all duration-300"
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
