import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ClientDashboard from "./pages/ClientDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import CreateService from "./pages/CreateService";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  const location = useLocation();
  const noFooterPages = ["/login", "/signup", "/dashboard", "/expert-dashboard"]; // ✅ Pages without footer

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Client Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Client"]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-service"
          element={
            <ProtectedRoute allowedRoles={["Client"]}>
              <CreateService />
            </ProtectedRoute>
          }
        />

        {/* ✅ Expert Routes */}
        <Route
          path="/expert-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Expert"]}>
              <ExpertDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Exclude Footer from specific pages */}
      {!noFooterPages.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
