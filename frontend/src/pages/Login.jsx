import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, navigate);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen pt-[70px]">
      {/* Left Section with Gradient Background */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-secondary via-main to-secondary text-white p-10">
        <h1 className="text-4xl font-bold">Welcome Back! 👋</h1>
        <p className="mt-4 text-lg text-center max-w-md">
          Login to access your account and explore amazing features!
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Login to Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
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
          <div className="flex items-center border border-main  rounded p-3">
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

          <button
            type="submit"
            className="w-full btn-main py-3"
          >
            Login
          </button>
        </form>

        <p className="mt-4">
          Don't have an account? {" "}
          <span
            className="text-main hover:text-secondary cursor-pointer transition-all duration-500"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;