// File: src/app/components/SignupPopup.jsx
"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPopup({ isOpen, onClose, onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendActive, setResendActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Logic: Jab modal band ho, form reset karein
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setOtp("");
        setFormData({ name: "", mobile: "", password: "", confirmPassword: "" });
      }, 300);
    }
  }, [isOpen]);

  // OTP Timer Logic
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

  const handleNext = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.name.trim()) {
        alert("Please enter your name");
        return;
      }
      if (!/^\d{10}$/.test(formData.mobile)) {
        alert("Please enter a valid 10-digit mobile number");
        return;
      }
      console.log("OTP sent to:", formData.mobile);
      setStep(2);
      setTimer(30);
      setResendActive(false);
    } else if (step === 2) {
      if (otp.length !== 6) {
        alert("Enter valid 6-digit OTP");
        return;
      }
      console.log("OTP Verified");
      setStep(3);
    } else if (step === 3) {
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signup Completed:", formData);
      alert("Account created successfully!");
      onClose();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResendActive(false);
    alert("OTP resent!");
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
          {step === 1 && "Create Account"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set Password"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          {step === 1 && "Start by entering your details"}
          {step === 2 && `OTP sent to +91 ${formData.mobile}`}
          {step === 3 && "Almost done! Set your password"}
        </p>

        {/* Form Steps */}
        <form onSubmit={handleNext} className="space-y-5">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  // 👇 Focus Blue
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  // 👇 Focus Blue
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  maxLength={10}
                />
              </div>

              <button
                type="submit"
                // 👇 Button Blue
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                Send OTP
              </button>

              {/* Continue with Google */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all"
              >
                <FcGoogle size={22} />
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <p className="text-center text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  // 👇 Text Blue
                  className="text-blue-600 hover:underline font-bold"
                >
                  Login
                </button>
              </p>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-4 text-center">
                  Enter the code sent to your mobile
                </label>
                <div className="flex justify-center gap-2">
                  {Array(6)
                    .fill()
                    .map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          const newOtp =
                            otp.substring(0, i) + val + otp.substring(i + 1);
                          setOtp(newOtp.slice(0, 6));
                          if (val && i < 5) e.target.nextSibling?.focus();
                        }}
                        // 👇 Focus Blue
                        className="w-12 h-12 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-bold transition-all"
                      />
                    ))}
                </div>
              </div>

              <button
                type="submit"
                // 👇 Button Blue
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                Verify OTP
              </button>

              <p className="text-center text-sm text-gray-600 mt-2">
                Didn’t get the code?{" "}
                {!resendActive ? (
                  <span className="text-gray-400 font-medium">
                    Resend in {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    // 👇 Text Blue
                    className="text-blue-600 hover:underline font-bold"
                  >
                    Resend Now
                  </button>
                )}
              </p>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  // 👇 Focus Blue
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

              <div className="relative">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  // 👇 Focus Blue
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                // 👇 Button Changed to Blue (was Green) for Consistency
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
              >
                Complete Signup
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}