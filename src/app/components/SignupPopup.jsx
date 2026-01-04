"use client";

import { useState, useEffect } from "react";
import { X, Mail, Phone, User, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SignupPopup({ isOpen, onClose, onSwitchToLogin }) {
  // --- STATES ---
  const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Password
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  
  const [otp, setOtp] = useState(new Array(6).fill("")); // Array for 6 boxes
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
        setOtp(new Array(6).fill(""));
        setLoading(false);
      }, 300);
    }
  }, [isOpen]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      // Only numbers for mobile
      const cleaned = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle OTP Box Change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle Backspace in OTP
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
    }
  };

  // --- ACTIONS (BACKEND INTEGRATED) ---

  // STEP 1: SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    // ✅ VALIDATION: Required fields
    if (!formData.name || !formData.email || !formData.mobile) {
      return alert("Please fill all details correctly.");
    }
    
    // ✅ VALIDATION: Mobile number format (10 digits, starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      return alert("Invalid mobile number. Must be 10 digits starting with 6-9.");
    }
    
    // ✅ VALIDATION: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return alert("Please enter a valid email address.");
    }
    
    // ✅ VALIDATION: Name length
    if (formData.name.trim().length < 2) {
      return alert("Name must be at least 2 characters long.");
    }

    setLoading(true);
    
    try {
      // ✅ API CALL: SEND OTP
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok) {
        setStep(2); // Move to OTP Step
        setTimer(30);
        setCanResend(false);
        alert(`✅ OTP sent to ${formData.email}`);
      } else {
        const msg = await res.text();
        alert(`❌ Error: ${msg}`);
      }
    } catch (error) {
      console.error("OTP Error:", error);
      alert("Something went wrong. Check internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return alert("Please enter complete 6-digit OTP");

    setLoading(true);

    try {
      // ✅ API CALL: VERIFY OTP
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpValue }),
      });

      if (res.ok) {
        setStep(3); // Move to Password Step
        alert("✅ Email Verified Successfully!");
      } else {
        alert("❌ Invalid or Expired OTP");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Something went wrong verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: CREATE ACCOUNT
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) return alert("Password must be at least 6 chars");
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");

    setLoading(true);

    try {
      // ✅ API CALL: FINAL SIGNUP
      const finalPayload = {
        username: formData.name, // Mapping 'name' to 'username' for backend
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        alert("🎉 Account Created Successfully! Logging you in...");
        onClose(); // Close Popup
        onSwitchToLogin(); // Open Login Popup
      } else {
        const msg = await res.text();
        alert(`❌ Signup Failed: ${msg}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP HANDLER
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok) {
        setTimer(30);
        setCanResend(false);
        alert(`✅ OTP Resent to ${formData.email}`);
      } else {
        alert("Failed to resend OTP");
      }
    } catch (error) {
      alert("Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[60] px-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col">
        
        {/* Header / Progress Bar */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 && "Create Account"}
              {step === 2 && "Email Verification"}
              {step === 3 && "Secure Your Account"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {step === 1 && "Enter your details to get started"}
              {step === 2 && `OTP sent to ${formData.email}`}
              {step === 3 && "Set a strong password"}
            </p>
          </div>
          {/* Close Button */}
          <button onClick={onClose} className="bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={step === 1 ? handleSendOtp : step === 2 ? handleVerifyOtp : handleRegister} className="space-y-5">
            
            {/* --- STEP 1: DETAILS --- */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address (OTP will be sent here)"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                {/* Mobile */}
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* --- STEP 2: OTP --- */}
            {step === 2 && (
              <div className="animate-fadeIn">
                 <div className="flex justify-center gap-3 mb-6">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="w-12 h-12 md:w-14 md:h-14 border border-gray-300 rounded-xl text-center text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    ))}
                 </div>
                 
                 <div className="flex justify-between items-center text-sm">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-800">Change Email?</button>
                    {canResend ? (
                        <button type="button" onClick={handleResendOtp} className="text-blue-600 font-bold hover:underline">Resend OTP</button>
                    ) : (
                        <span className="text-gray-400">Resend in {timer}s</span>
                    )}
                 </div>
              </div>
            )}

            {/* --- STEP 3: PASSWORD --- */}
            {step === 3 && (
               <div className="space-y-4 animate-fadeIn">
                 {/* Password */}
                 <div className="relative">
                   <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                   <input
                     type={showPassword ? "text" : "password"}
                     name="password"
                     required
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Create Password"
                     className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
                   />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                     {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                   </button>
                 </div>

                 {/* Confirm Password */}
                 <div className="relative">
                   <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                   <input
                     type={showConfirmPassword ? "text" : "password"}
                     name="confirmPassword"
                     required
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder="Confirm Password"
                     className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-all"
                   />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                     {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                   </button>
                 </div>
               </div>
            )}

            {/* --- ACTION BUTTON --- */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {step === 1 && "Get OTP"}
                  {step === 2 && "Verify Email"}
                  {step === 3 && "Create Account"}
                  {!loading && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </form>

          {/* Social & Switch - Only show on Step 1 */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-500">Or sign up with</span></div>
              </div>

              <button 
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-all text-gray-700 font-medium"
              >
                <FcGoogle size={22} /> Google
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline font-bold">Log in</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}