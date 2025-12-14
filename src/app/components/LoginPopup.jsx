"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"; // NextAuth Import
import { useRouter } from "next/navigation"; // Page refresh ke liye

export default function LoginPopup({ isOpen, onClose, onSwitchToSignup }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "", // Changed Mobile to Email
    password: "",
  });

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ email: "", password: "" });
        setError("");
        setLoading(false);
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- API CALL HERE ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // 1. NextAuth Credentials Login Call
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Page reload na ho isliye false
      });

      if (res?.error) {
        setError("Invalid email or password!");
        setLoading(false);
      } else {
        // 2. Success
        router.refresh(); // Session update karne ke liye
        onClose(); // Popup band karein
        // alert("Logged in successfully!"); // Optional
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  // --- GOOGLE LOGIN ---
  const handleGoogleLogin = () => {
    signIn("google");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60] px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn scale-100 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please enter your details to sign in
        </p>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm py-2 px-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email" // Changed type to email
              name="email" // Changed name to email
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline font-semibold">
                Forgot Password?
              </a>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Continue with Google */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin} // API Call for Google
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all"
          >
            <FcGoogle size={22} />
            <span className="text-gray-700 font-medium">Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:underline font-bold"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}