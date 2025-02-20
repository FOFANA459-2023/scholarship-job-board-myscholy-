import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-yellow-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/scholarships"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/exam-prep"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Exam Prep
                </Link>
              </li>
              <li>
                <Link
                  to="/mentor-network"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Join Our WhatsApp Community
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Programs and Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Our Programs and Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/exam-prep"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Exam Prep (SAT, ACT, GRE, TOEFL, IELTS)
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarship-support"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Essay Proofreading & Editing
                </Link>
              </li>
              <li>
                <Link
                  to="/application-assistance"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  Application Assistance
                </Link>
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
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2">
                <FaEnvelope className="w-5 h-5" />
                <a
                  href="mailto:info@myscholy.com"
                  className="hover:text-yellow-500 transition-colors duration-300"
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
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors duration-300"
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