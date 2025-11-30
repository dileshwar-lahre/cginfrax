"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPopup() {
  const [open, setOpen] = useState(true);
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
      setOpen(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResendActive(false);
    alert("OTP resent!");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          {step === 1 && "Create Account"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set Password"}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
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
                <label className="block text-gray-700 text-sm mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={10}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Send OTP
              </button>

              {/* Continue with Google */}
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100 transition"
                >
                  <FcGoogle size={22} />
                  <span className="text-gray-700 font-medium">
                    Continue with Google
                  </span>
                </button>
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </a>
              </p>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Enter 6-Digit OTP
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
                        className="w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Verify OTP
              </button>

              <p className="text-center text-sm text-gray-600 mt-2">
                Didn’t get the code?{" "}
                {!resendActive ? (
                  <span className="text-gray-500">Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-600 hover:underline"
                  >
                    Resend
                  </button>
                )}
              </p>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="relative">
                <label className="block text-gray-700 text-sm mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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

              <div className="relative">
                <label className="block text-gray-700 text-sm mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
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
