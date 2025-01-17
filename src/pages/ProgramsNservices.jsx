import React from "react";
import { Link } from "react-router-dom";

function ProgramsNservices() {
  // Array of colors for alternating card backgrounds
  const cardColors = ["bg-blue-900", "bg-black", "bg-red-900"];

  return (
    <div>
      <section id="services" className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            Our Programs and Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exam Prep */}
            <div
              className={`${cardColors[0]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Exam Prep</h3>
              <p className="mb-4 text-gray-200">
                We support students in SAT, ACT, GRE, TOEFL, and IELTS preparation with expert tutors and tailored study plans.
              </p>
              <div className="flex justify-between items-center">
                <Link to="https://tutorants.com/">
                  <button className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Scholarship Support */}
            <div
              className={`${cardColors[1]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Scholarship Support</h3>
              <p className="mb-4 text-gray-200">
                Access a vast database of scholarship opportunities from top global universities tailored to your profile.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/scholarship-list">
                  <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Application Assistance */}
            <div
              className={`${cardColors[2]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Application Assistance</h3>
              <p className="mb-4 text-gray-200">
                Get real-time support and feedback on your applications, ensuring they stand out to admissions committees.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-red-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* University Matching */}
            <div
              className={`${cardColors[0]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">University Matching</h3>
              <p className="mb-4 text-gray-200">
                Take our personality test to find the best-fit universities based on your goals, preferences, and academic profile.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Credential Verification */}
            <div
              className={`${cardColors[1]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Credential Verification</h3>
              <p className="mb-4 text-gray-200">
                Ensure your credits are transferable with our secure credential verification database.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* College Recruiting */}
            <div
              className={`${cardColors[2]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">College Recruiting</h3>
              <p className="mb-4 text-gray-200">
                Receive virtual brochures and interest letters from global universities based on your grades and preferences.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-red-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Mentor Network */}
            <div
              className={`${cardColors[0]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Mentor Network</h3>
              <p className="mb-4 text-gray-200">
                Connect with a network of mentors who provide lifelong guidance and support for your academic and career journey.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-blue-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Job Board */}
            <div
              className={`${cardColors[1]} text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-bold mb-4">Job Board</h3>
              <p className="mb-4 text-gray-200">
                Explore internships and job opportunities from top employers tailored to your skills and aspirations.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramsNservices;