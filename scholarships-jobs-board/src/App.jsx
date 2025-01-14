import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar.jsx";
import Footer from "./componets/Footer.jsx";
import ScholarshipList from "./pages/ScholarshipList.jsx";
import ScholarshipDetail from "./pages/ScholarshipDetail.jsx";
import PostScholarship from "./pages/PostScholarship.jsx";
import AdminScholarshipList from "./pages/AdminScholarshipList.jsx";
import UpdateScholarship from "./pages/UpdateScholarship.jsx";
import LandingPage from "./componets/LandingPage.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import Contact from "./pages/Contact.jsx";
import SubscribeForm from "./pages/SubscribeForm.jsx";

function App() {
  return (
    <Router>
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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
