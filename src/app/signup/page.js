"use client";
import { useState } from "react";
import { X } from "lucide-react"; // npm install lucide-react

export default function SignupPopup() {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup successful!");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
      <div className="relative bg-white w-full max-w-sm sm:max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
