import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCity, FaUserTag } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Client");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, role, city, navigate);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen pt-[70px]">
      {/* Left Section with Gradient Background */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-secondary via-main to-secondary text-white p-10">
        <h1 className="text-4xl font-bold">Hello, Welcome! 👋</h1>
        <p className="mt-4 text-lg text-center max-w-md">
          Join us and start exploring amazing features today!
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Create an Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
          <div className="flex items-center border border-main rounded p-3">
            <FaUser className="text-main mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center border border-main rounded p-3">
            <FaEnvelope className="text-main mr-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center border border-main rounded p-3">
            <FaLock className="text-main mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center border border-main rounded p-3">
            <FaUserTag className="text-main mr-3" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none"
            >
              <option value="Client">Client</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="flex items-center border border-main rounded p-3">
            <FaCity className="text-main mr-3" />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-main py-3"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <span
            className="text-main cursor-pointer hover:text-secondary transition-all duration-500"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
