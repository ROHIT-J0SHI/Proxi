import React from "react";
import {
    FaCheckCircle, FaBookOpen
  } from "react-icons/fa";

function HowtoUse() {
  return (
    <div className="mt-12 p-8 bg-bg shadow-md rounded-lg">
      <h3 className="text-2xl font-bold text-main flex items-center">
        <FaBookOpen className="mr-2 text-accent" /> How to Use Proxi
      </h3>
      <ul className="mt-4 space-y-3 text-gray-700">
        <li className="flex items-center">
          <FaCheckCircle className="text-accent mr-2" /> Click "Create Service"
          to post a request
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-accent mr-2" /> Experts express
          interest in your service
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-accent mr-2" /> Click "View Interested
          Experts" to see experts
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-accent mr-2" /> Select the expert that
          fits your needs
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-accent mr-2" /> Contact the selected
          expert and proceed
        </li>
      </ul>
    </div>
  );
}

export default HowtoUse;
