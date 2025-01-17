import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
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
import SubscribeForm from "./pages/SubscribeForm.jsx";
import Signup from "./student/Signup.jsx";
import Login from "./student/Login.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/scholarship-list" element={<ScholarshipList />} />
        <Route path="/scholarship-detail/:id" element={<ScholarshipDetail />} />
        <Route path="/post-scholarship" element={<PostScholarship />} />
        <Route
          path="/admin-scholarship-view:id"
          element={<AdminScholarshipList />}
        />
        <Route path="/update-scholarship/:id" element={<UpdateScholarship />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<SubscribeForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;