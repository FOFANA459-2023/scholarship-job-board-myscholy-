import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-red-800 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Subscription Form (On Top) */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            Subscribe to Our Newsletter
          </h3>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded-lg bg-white bg-opacity-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-lg bg-white bg-opacity-10 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Content (Below Subscription Form) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/scholarships"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Scholarships
                </a>
              </li>
              <li>
                <a
                  href="/exam-prep"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Exam Prep
                </a>
              </li>
              <li>
                <a
                  href="/mentor-network"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Mentor Network
                </a>
              </li>
              <li>
                <a
                  href="/job-board"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Job Board
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Our Programs and Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Programs and Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/exam-prep"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Exam Prep (SAT, ACT, GRE, TOEFL, IELTS)
                </a>
              </li>
              <li>
                <a
                  href="/scholarship-support"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Scholarship Support
                </a>
              </li>
              <li>
                <a
                  href="/application-assistance"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Application Assistance
                </a>
              </li>
              <li>
                <a
                  href="/university-matching"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  University Matching
                </a>
              </li>
              <li>
                <a
                  href="/credential-verification"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Credential Verification
                </a>
              </li>
              <li>
                <a
                  href="/college-recruiting"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  College Recruiting
                </a>
              </li>
              <li>
                <a
                  href="/mentor-network"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Mentor Network
                </a>
              </li>
              <li>
                <a
                  href="/job-board"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  Job Board
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-2">
                <FaPhone className="w-5 h-5" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <FaEnvelope className="w-5 h-5" />
                <a
                  href="mailto:info@myscholy.com"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  info@myscholy.com
                </a>
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-300"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} myScholy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;