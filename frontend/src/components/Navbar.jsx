import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import profilePlaceholder from "../assets/profile.png"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // Toggle menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle Profile Window
  const toggleProfile = () => setProfileOpen(!profileOpen);

  // Close Profile Window when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-window") && !event.target.closest(".profile-pic")) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileOpen]);

  // Scroll Effect: Change Navbar Background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full h-[70px] z-50 px-6 md:px-24 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "backdrop-blur-xl bg-white/60 shadow-md" : "bg-white shadow-md"
      }`}
    >
      {/* Left Side - Brand */}
      <Link to="/" className="text-3xl font-bold text-main">Proxi</Link>

      {/* Right Side - Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-10 ml-auto">
        <div className="flex space-x-10">
          <Link to="/" className={`navlinks-line ${isActive("/") ? "after:w-[calc(100%+4px)]" : ""}`}>Home</Link>
          {user?.role === "Client" && (
            <Link to="/dashboard" className={`navlinks-line ${isActive("/dashboard") ? "after:w-[calc(100%+4px)]" : ""}`}>Dashboard</Link>
          )}
          {user?.role === "Expert" && (
            <Link to="/expert-dashboard" className={`navlinks-line ${isActive("/expert-dashboard") ? "after:w-[calc(100%+4px)]" : ""}`}>Dashboard</Link>
          )}
          <Link to="/about" className={`navlinks-line ${isActive("/about") ? "after:w-[calc(100%+4px)]" : ""}`}>About</Link>
          <Link to="/contact" className={`navlinks-line ${isActive("/contact") ? "after:w-[calc(100%+4px)]" : ""}`}>Contact</Link>
        </div>

        {/* ✅ Profile Icon Instead of Logout Button */}
        <div className="ml-6 flex items-center space-x-4 relative">
          {user ? (
            <>
              <img
                src={profilePlaceholder}
                alt="Profile"
                className="profile-pic w-10 h-10 rounded-full border-2 border-main cursor-pointer"
                onClick={toggleProfile}
              />
              {profileOpen && (
                <div className="profile-window absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                  <div className="flex flex-col items-center">
                    <img src={profilePlaceholder} alt="Profile" className="w-16 h-16 rounded-full border-2 border-main mb-3" />
                    <p className="font-semibold text-lg">{user.name || "User"}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="mt-4 w-full text-left space-y-2">
                      <p className="text-sm"><strong>Role:</strong> {user.role}</p>
                      <p className="text-sm"><strong>City:</strong> {user.location?.city || "Not Available"}</p>
                    </div>
                    <button
                      onClick={() => toast.info("Edit feature is not available now.")}
                      className="mt-4 w-full cursor-pointer bg-main text-white py-1 rounded-lg hover:bg-main/90"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full cursor-pointer bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="btn-bordered">Get Started</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon and Small Screen Profile */}
      <div className="md:hidden flex items-center space-x-4">
        {/* Small Screen Profile Icon */}
        {user && (
          <img
            src={profilePlaceholder}
            alt="Profile"
            className="profile-pic w-10 h-10 rounded-full border-2 border-main cursor-pointer"
            onClick={toggleProfile}
          />
        )}
        {menuOpen ? (
          <FiX className="text-3xl text-main cursor-pointer" onClick={toggleMenu} />
        ) : (
          <FiMenu className="text-3xl text-main cursor-pointer" onClick={toggleMenu} />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-screen bg-secondary shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center py-20 space-y-8`}
      >
        <FiX className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={toggleMenu} />
        <Link to="/" className="text-xl hover:text-main" onClick={toggleMenu}>Home</Link>
        {user?.role === "Client" && <Link to="/dashboard" className="text-xl hover:text-main" onClick={toggleMenu}>Dashboard</Link>}
        {user?.role === "Expert" && <Link to="/expert-dashboard" className="text-xl hover:text-main" onClick={toggleMenu}>Dashboard</Link>}
        <Link to="/about" className="text-xl hover:text-main" onClick={toggleMenu}>About</Link>
        <Link to="/contact" className="text-xl hover:text-main" onClick={toggleMenu}>Contact</Link>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#E1306C] text-2xl hover:opacity-75 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-[#1DA1F2] text-2xl hover:opacity-75 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-[#0077B5] text-2xl hover:opacity-75 transition" />
          </a>
        </div>

        {/* Copyright at the Bottom */}
        <div className="absolute bottom-4 text-white text-sm">© 2025 Proxi. All rights reserved.</div>
      </div>
    </nav>
  );
};

export default Navbar;
