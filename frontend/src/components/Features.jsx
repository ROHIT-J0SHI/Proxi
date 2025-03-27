import React, { useState } from "react";
import bgimg from "../assets/profile2.png"; // Placeholder image
import { ChevronDown, ShieldCheck, Zap, MapPin, Users } from "lucide-react";

function Features() {
  const [openFeature, setOpenFeature] = useState(null);

  const features = [
    {
      id: 1,
      title: "Secure & Verified Experts",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      description:
        "All professionals are background-checked and verified to ensure a safe and trustworthy experience.",
    },
    {
      id: 2,
      title: "Instant Smart Matching",
      icon: <Zap className="w-6 h-6 text-green-500" />,
      description:
        "AI-powered smart matching helps you quickly connect with the best professionals in your area.",
    },
    {
      id: 3,
      title: "Find Experts Nearby",
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      description:
        "Location-based search allows you to find reliable professionals near you with ease.",
    },
    {
      id: 4,
      title: "A Trusted Community",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description:
        "Our platform ensures trust with verified ratings, reviews, and secure payments for both clients and experts.",
    },
  ];

  const toggleFeature = (id) => {
    setOpenFeature(openFeature === id ? null : id);
  };

  return (
    <section className="w-full bg-bg py-8 mt-8 md:py-16 px-6">
      {/* Centered Heading */}
      <div className="text-center max-w-3xl mx-auto mb-0">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Why Choose <span className="text-secondary">Us?</span>
        </h2>
        <p className="text-gray-700 mt-3 text-lg">
          Proxi connects you with top-rated professionals, ensuring a seamless
          and secure experience. With smart matching, location-based discovery, and trusted expert verification, 
          we make finding the right help effortless.
        </p>
      </div>

      {/* Image & Features Side by Side */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={bgimg}
            alt="Features"
            className="w-[450px] h-auto max-w-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Side - Features List */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="border border-gray-300 bg-white shadow-md p-4 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFeature(feature.id)}
                >
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-secondary transition-all duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-300 hover:text-secondary ${
                      openFeature === feature.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFeature === feature.id
                      ? "max-h-40 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm pt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
