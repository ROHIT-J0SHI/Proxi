import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-secondary z-50">
      <div className="flex flex-col md:flex-row px-8 md:px-24 lg:px-40 pb-10 pt-16 gap-8 justify-between">
        
        {/* Brand & About */}
        <div className="flex flex-col gap-6 md:w-[30%]">
          <Link to="/">
            <span className="text-3xl md:text-4xl font-bold text-main">Proxi</span>
          </Link>
          <span className=" text-xs md:text-base">
            Proxi helps you seamlessly connect with trusted professionals nearby. 
            Whether you're a client looking for services or an expert offering them, 
            we make the process easy, secure, and efficient.
          </span>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-5">Follow Us</h2>
          <div className="flex flex-col gap-2 ">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main transition-all"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main transition-all"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main transition-all"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs md:text-sm hover:text-main transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl md:text-2xl mb-5">Get in Touch</h2>
          <p className=" text-xs md:text-sm">📩 support@proxi.com</p>
          <p className=" text-xs md:text-sm">☎️ +1 800-123-4567</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="p-5 text-center text-xs md:text-sm text-main border-t border-gray-600">
        <p>&copy; {new Date().getFullYear()} Proxi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
