import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import bgimg from "../assets/bgimg.png"; // Background image
import profileImg from "../assets/profile.png"; // Transparent Profile Image
import { Code, Terminal, Briefcase } from "lucide-react"; // Icons


function About() {
  const navigate = useNavigate(); // Navigation hook

  return (
    <section className="relative mb-16">
      {/* About Proxi Section */}
      <div
        className="relative bg-cover bg-center py-16 px-6 md:px-12 lg:px-20 text-white"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={bgimg}
              alt="About Proxi"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-main">
              About Proxi
            </h2>
            <p className="mt-4 text-lg text-gray-200 leading-relaxed">
              Proxi is not just another service marketplace – it is designed to bridge the gap
              between clients and skilled professionals. Our mission is to provide a seamless, secure, and efficient
              way for people to connect with verified experts in their locality.
            </p>
            <p className="mt-4 text-gray-300">
              Whether you need home repairs, business consultation, creative services, or technical assistance, 
              Proxi makes it easy to post service requests, find nearby professionals, and establish trust-based connections.
              With real-time matching, secure communication, and expert verification, we help you find the right person effortlessly.
            </p>

            {/* Contact Us Button */}
            <button
              onClick={() => navigate("/contact")}
              className="mt-5 btn-main py-2 hover:bg-secondary transition-all duration-500"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Meet the Creator Section */}
      <div className="py-16 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Meet the Creator</h2>
        <p className="text-md text-gray-600 mt-2">
          The mind behind Proxi — a passionate developer building impactful digital solutions.
        </p>
        <hr className="text-gray-300 mt-5" />

        {/* Creator Section */}
        <div className="mt-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left - Profile Image */}
          <div className="relative w-72 h-72 flex-shrink-0">
            <img
              src={profileImg}
              alt="Rohit Joshi"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right - Bio */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-4xl font-bold">Rohit Joshi</h3>
            <p className="text-lg text-main italic mt-2">Software Developer | MCA Student</p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              I am a passionate software developer and an MCA student, deeply interested in 
              web development, AI, and scalable systems. My goal is to build solutions that 
              solve real-world problems, making technology more accessible and efficient.
            </p>
            <p className="mt-4 text-gray-600">
              My expertise includes React, Node.js, Firebase, and modern web technologies, 
              where I focus on creating clean, scalable, and user-friendly applications.
            </p>

            {/* Tech Stack Icons */}
            <div className="flex justify-center md:justify-start gap-6 mt-6">
              <div className="p-3 rounded-lg border border-gray-300">
                <Code className="h-8 w-8 text-gray-700" />
              </div>
              <div className="p-3 rounded-lg border border-gray-300">
                <Terminal className="h-8 w-8 text-gray-700" />
              </div>
              <div className="p-3 rounded-lg border border-gray-300">
                <Briefcase className="h-8 w-8 text-gray-700" />
              </div>
            </div>

            {/* Contact & Portfolio Buttons */}
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <button
                onClick={() => navigate("/contact")}
                className="btn-main"
              >
                Contact Me
              </button>
              <a
                href="https://github.com/yourgithub" // Replace with your actual GitHub link
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bordered"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
