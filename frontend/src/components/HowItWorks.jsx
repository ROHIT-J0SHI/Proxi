import React from "react";
import { UserPlus, Briefcase, CheckCircle, Star } from "lucide-react"; // Icons

function HowItWorks() {
  return (
    <section className="py-12 mt-3 md:mt-5 text-center px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
      {/* Heading */}
      <h2 className="font-bold text-4xl text-gray-900">How It Works</h2>
      <p className="text-md text-gray-600 mt-2">Connecting Clients & Experts in 4 Simple Steps</p>

      {/* Steps Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {/* Step 1 - Account Creation */}
        <div className="block rounded-xl border bg-blue-100 border-gray-200 p-4 md:p-5 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 max-w-sm mx-auto min-h-[200px]">
          <UserPlus className="h-12 w-12 text-blue-500 mx-auto" />
          <h3 className="mt-3 text-xl font-semibold text-gray-900">Create Your Account</h3>
          <p className="mt-1 text-gray-600 text-sm">
            Sign up and choose your role as a <strong>Client</strong> or <strong>Expert</strong> to get started.
          </p>
        </div>

        {/* Step 2 - Post & Search */}
        <div className="block rounded-xl border bg-red-100 border-gray-200 p-4 md:p-5 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 max-w-sm mx-auto min-h-[200px]">
          <Briefcase className="h-12 w-12 text-pink-500 mx-auto" />
          <h3 className="mt-3 text-xl font-semibold text-gray-900">Post or Search</h3>
          <p className="mt-1 text-gray-600 text-sm">
            Clients post their requirements, and Experts browse nearby opportunities.
          </p>
        </div>

        {/* Step 3 - Connect & Work */}
        <div className="block rounded-xl border bg-green-100 border-gray-200 p-4 md:p-5 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 max-w-sm mx-auto min-h-[200px]">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="mt-3 text-xl font-semibold text-gray-900">Connect & Work</h3>
          <p className="mt-1 text-gray-600 text-sm">
            Experts express interest, Clients select the best match, and they connect seamlessly.
          </p>
        </div>

        {/* Step 4 - Complete Work & Get Reviews */}
        <div className="block rounded-xl border bg-yellow-100 border-gray-200 p-4 md:p-5 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 max-w-sm mx-auto min-h-[200px]">
          <Star className="h-12 w-12 text-yellow-500 mx-auto" />
          <h3 className="mt-3 text-xl font-semibold text-gray-900">Get Reviews</h3>
          <p className="mt-1 text-gray-600 text-sm">
            Experts deliver services, Clients provide ratings, and both build a trusted reputation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
