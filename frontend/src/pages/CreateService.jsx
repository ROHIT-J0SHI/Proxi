import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateService = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !user.token) {
      setError("User not authenticated.");
      toast.error("⚠️ User not authenticated!");
      return;
    }
  
    console.log("🛠 Sending Service Request...");
    console.log("📍 Location Data from User:", user.location);
  
    try {
      const res = await fetch("http://localhost:5000/api/service/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          location: user.location,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ Backend Error:", errorData);
        throw new Error(errorData.error || "Failed to create service.");
      }
  
      // ✅ Show success toast
      toast.success("🎉 Service created successfully!");
  
      // Redirect to Dashboard after success
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      // ❗️ Show error toast
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="pt-[70px] min-h-screen bg-bg px-4 sm:px-0">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
        <h2 className="text-3xl font-bold text-main text-center mb-6">
          Create New Service
        </h2>

        {/* Show Error */}
        {error && (
          <p className="text-red-500 bg-red-100 border-l-4 border-red-500 px-4 py-2 mb-4 rounded-lg">
            ⚠️ {error}
          </p>
        )}

        {/* Service Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Service Title
            </label>
            <input
              type="text"
              placeholder="Enter Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Service Description
            </label>
            <textarea
              placeholder="Enter Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              placeholder="Enter Service Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-main w-full text-lg font-semibold"
          >
            Submit Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
