import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ProgramsNservices() {
  const navigate = useNavigate();
  const cardColors = ["bg-navy-900", "bg-yellow-500", "bg-navy-900"];

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
    <div>
      <section
        id="services"
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy-900">
            Our Programs and Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exam Prep */}
            <div
              className="bg-yellow-300 text-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4">Expert Exam Preparation</h3>
              <p className="mb-4">
                Boost your test scores with our comprehensive prep programs. Our expert tutors provide personalized coaching for SAT, ACT, GRE, TOEFL, and IELTS. Get access to proven strategies, practice tests, and real-time feedback to achieve your target score.
              </p>
              <div className="flex justify-between items-center">
                <Link to="https://tutorants.com/">
                  <button className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-300">
                    Start Prep Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Essay Proofreading and Editing */}
            <div
              className="bg-yellow-300 text-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4">Essay Proofreading & Editing</h3>
              <p className="mb-4">
                Transform your essays with our professional editing service. Our expert editors help perfect your writing, ensuring clarity, coherence, and impact. Get detailed feedback, grammar enhancement, and strategic recommendations to make your essays stand out to admissions committees. Don't let writing hold you back from your dream school!
              </p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleBookingClick}
                  className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-300"
                >
                  Perfect Your Essay
                </button>
              </div>
            </div>

            {/* Application Assistance */}
            <div
              className="bg-yellow-300 text-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4">
                Premium Application Assistance
              </h3>
              <p className="mb-4">
                Stand out from thousands of applicants with our comprehensive application support. Get expert guidance on personal statements, resume building, and application strategy. Our advisors provide insider knowledge on what top universities look for, helping you craft compelling applications that showcase your unique strengths and achievements.
              </p>
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleBookingClick}
                  className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-300"
                >
                  Get Expert Help
                </button>
              </div>
            </div>

            {/* Mentor Network */}
            <div
              className="bg-yellow-300 text-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4">Elite Mentor Network</h3>
              <p className="mb-4">
                Connect with successful professionals and alumni from top universities worldwide. Our mentors provide invaluable insights, career guidance, and personalized advice to help you navigate your academic journey. Benefit from their experience and build lasting relationships that can open doors to incredible opportunities.
              </p>
              <div className="flex justify-between items-center">
                <Link to="/subscribe">
                  <button className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-navy-900 transition-colors duration-300">
                    Meet Your Mentor
                  </button>
                </Link>
              </div>
            </div>

            {/* Programs and services not yet ready, to be added when avalible */}


            

            {/* University Matching */}
            {/* <div
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
            </div> */}

            {/* Credential Verification */}
            {/* <div
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
            </div> */}

            {/* College Recruiting */}
            {/* <div
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
            </div> */}

            {/* Job Board */}
            {/* <div
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
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramsNservices;
