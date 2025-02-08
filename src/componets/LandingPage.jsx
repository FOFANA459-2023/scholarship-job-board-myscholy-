import React from "react";
import { Link } from "react-router-dom";
import SubscribeForm from "../pages/SubscribeForm.jsx";
import ProgramsNservices from "../pages/ProgramsNservices.jsx";
import FAQ from "../pages/FAQ.jsx";
import APUCoverPhoto from "../assets/apu_cover.jpg";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20 text-center" style={{ backgroundImage: `url(${APUCoverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Empowering Students Worldwide Through Education
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover scholarships, grants, and opportunities to achieve your
          academic and career goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/scholarship-list">
            <button className="bg-sky-900 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
              Explore Scholarships
            </button>
          </Link>
          <Link to="/support">
            <button className="bg-white text-navy-900 px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-navy-900 hover:text-white transition-all duration-300 transform hover:scale-105">
              Support Us
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-white text-navy-900 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            About MyScholy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-base sm:text-lg">
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
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/400"
                alt="About MyScholy"
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