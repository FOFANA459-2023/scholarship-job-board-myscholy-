import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import Footer from "./componets/Footer.jsx";
import ScholarshipList from "./pages/ScholarshipList.jsx";
import ScholarshipDetail from "./pages/ScholarshipDetail.jsx";
import PostScholarship from "./Admin/PostScholarship.jsx";
import AdminScholarshipList from "./Admin/AdminScholarshipList.jsx";
import UpdateScholarship from "./Admin/UpdateScholarship.jsx";
import LandingPage from "./componets/LandingPage.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import Contact from "./pages/Contact.jsx";
import Signup from "./student/Signup.jsx";
import Login from "./student/Login.jsx";
import WhatsAppInvite from "./componets/WhatsAppInvite.jsx";
import AccessDenied from "./pages/AccessDenied.jsx";
import ProtectedRoute from "./componets/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes */}
        <Route path="/scholarship-list" element={<ScholarshipList />} />
        <Route path="/scholarship-detail/:id" element={<ScholarshipDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whatsapp-invite" element={<WhatsAppInvite />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Routes for Students */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute requiredRole={["student"]}>
              <Routes>
                <Route path="/whatsapp-invite" element={<WhatsAppInvite />} />
                {/* Add more student-specific routes here */}
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Admins */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole={["admin"]}>
              <Routes>
                <Route path="/post-scholarship" element={<PostScholarship />} />
                <Route path="/admin-scholarship-list" element={<AdminScholarshipList />} />
                <Route path="/update-scholarship/:id" element={<UpdateScholarship />} />
                {/* Add more admin-specific routes here */}
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;