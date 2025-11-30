"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPopup() {
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 px-2 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative animate-fadeIn flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* LEFT SIDE IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/media/7eddbf5bd8a25cf5701d2bc4b0fcadd1.gif"
            alt="Login Illustration"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
            Login
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Access your account securely
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Username or Email
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
