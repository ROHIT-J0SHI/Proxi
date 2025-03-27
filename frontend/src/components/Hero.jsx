import React from "react";
import bgimg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react"; // Import icons

function Hero() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userToken");

  const handleNavigation = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center text-center bg-cover bg-center relative px-4 sm:px-8 py-24 sm:py-32"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Intro Text */}
      <p className="text-gray-500 px-2 sm:px-4 md:px-6 text-sm sm:text-base md:text-base max-w-4xl md:max-w-5xl absolute top-10 sm:top-14 md:top-16">
        🔍 The world's first platform that helps you find and connect with trusted professionals in your locality—quickly and effortlessly.
      </p>

      {/* Title Section */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-main drop-shadow-md mt-16">
        We Connect People
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-2 font-semibold flex items-center gap-2">
        Easily discover and connect with trusted local professionals
      </p>

      {/* Call-to-Action Cards */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {/* Start Now Card */}
        <div
          className="relative p-4 bg-white shadow-lg rounded-lg w-60 overflow-hidden cursor-pointer transition-all duration-300 transform group flex flex-col items-center"
          onClick={handleNavigation}
        >
          {/* Hover Gradient Effect */}
          <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-secondary to-transparent transition-all duration-300 opacity-0 group-hover:h-full group-hover:opacity-80"></div>

          <Search className="w-8 h-8 text-main mb-1" /> {/* Smaller Icon */}
          <h2 className="relative text-lg font-semibold text-main">Start Now</h2>
          <p className="relative text-gray-600 mt-1 text-xs sm:text-sm text-center">
            Find reliable experts near you instantly.
          </p>
        </div>

        {/* Explore More Card */}
        <div
          className="relative p-4 bg-white shadow-lg rounded-lg w-60 overflow-hidden cursor-pointer transition-all duration-300 transform group flex flex-col items-center"
          onClick={handleNavigation}
        >
          {/* Hover Gradient Effect */}
          <div className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-secondary to-transparent transition-all duration-300 opacity-0 group-hover:h-full group-hover:opacity-80"></div>

          <ArrowRight className="w-8 h-8 text-main mb-1" /> {/* Smaller Icon */}
          <h2 className="relative text-lg font-semibold text-main">Explore More</h2>
          <p className="relative text-gray-600 mt-1 text-xs sm:text-sm text-center">
            Learn how Proxi builds trust and convenience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
