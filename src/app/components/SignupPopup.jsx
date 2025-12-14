"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"; // NextAuth Import

export default function SignupPopup({ isOpen, onClose, onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendActive, setResendActive] = useState(false);
  
  // New States for API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "", // Added Email
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setOtp("");
        setError("");
        setLoading(false);
        setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    let countdown;
    if (step === 2 && timer > 0) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setResendActive(true);
    }
    return () => clearInterval(countdown);
  }, [timer, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const cleaned = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setError("");

    // --- STEP 1 Validation ---
    if (step === 1) {
      if (!formData.name.trim()) return setError("Name is required");
      if (!formData.email.includes("@")) return setError("Invalid Email Address");
      if (!/^\d{10}$/.test(formData.mobile)) return setError("Invalid Mobile Number");
      
      console.log("OTP sent to:", formData.mobile);
      setStep(2);
      setTimer(30);
      setResendActive(false);
    } 
    // --- STEP 2 (Mock OTP) ---
    else if (step === 2) {
      if (otp.length !== 6) return setError("Enter 6-digit OTP");
      setStep(3);
    } 
    // --- STEP 3 (Final Signup API Call) ---
    else if (step === 3) {
      if (formData.password.length < 6) return setError("Password too short (min 6 chars)");
      if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");

      // API Call Shuru
      setLoading(true);
      
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (res.status === 201) {
          // Success
          alert("Account created! Logging you in...");
          // Automatically login user logic or switch to login
          onSwitchToLogin(); 
          onClose();
        } else {
          // Error from Server (e.g. Email already exists)
          const msg = await res.text();
          setError(msg);
        }
      } catch (err) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResendActive(false);
    alert("OTP resent!");
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    signIn("google");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60] px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn scale-100 transition-all">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {step === 1 && "Create Account"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set Password"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {step === 1 && "Start by entering your details"}
          {step === 2 && `OTP sent to +91 ${formData.mobile}`}
          {step === 3 && "Almost done! Set your password"}
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleNext} className="space-y-4">
          
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                 {/* Added Email Field */}
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Next
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all"
              >
                <FcGoogle size={22} />
                <span className="text-gray-700 font-medium">Google</span>
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex justify-center gap-2 mb-4">
                {Array(6).fill().map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = otp.substring(0, i) + val + otp.substring(i + 1);
                        setOtp(newOtp.slice(0, 6));
                        if (val && i < 5) e.target.nextSibling?.focus();
                      }}
                      className="w-12 h-12 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                    />
                  ))}
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold">Verify OTP</button>
              <p className="text-center text-sm text-gray-600 mt-2">
                 {!resendActive ? `Resend in ${timer}s` : <button type="button" onClick={handleResend} className="text-blue-600 font-bold">Resend Now</button>}
              </p>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400">
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg disabled:bg-gray-400 transition-all"
              >
                {loading ? "Creating Account..." : "Complete Signup"}
              </button>
            </>
          )}

          {step === 1 && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline font-bold">Login</button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}