"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function validateCredentials(emailInput, passwordInput) {
  const e = typeof emailInput === "string" ? emailInput.trim() : String(emailInput ?? "");
  const p = typeof passwordInput === "string" ? passwordInput : String(passwordInput ?? "");

  if (!e) return "Please enter email or username.";
  if (!p) return "Please enter password.";
  if ((p.length ?? 0) < 6) return "Password must be at least 6 characters.";
  return "";
}

export default function ModernLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validateCredentials(email, password);
    if (v) return setError(v);

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setError("Demo only. Add real authentication here.");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 rounded-3xl p-10 text-white shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Welcome Back 👋</h1>
          <p className="text-white/90 max-w-sm text-center leading-relaxed">
            Log in to stay connected and share your moments with friends.
          </p>
          <div className="relative w-64 h-64 mt-8">
            <Image
              src="/images/phone-mock.png"
              alt="App preview"
              fill
              style={{ objectFit: "contain" }}
              className="drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-12">
                <Image src="/images/logo.png" alt="logo" fill style={{ objectFit: "contain" }} />
              </div>

              <form onSubmit={handleSubmit} className="w-full mt-2 space-y-4">
                <div>
                  <input
                    name="username"
                    value={email ?? ""}
                    onChange={(ev) => setEmail(ev?.target?.value ?? "")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                    placeholder="Phone number, username or email"
                    autoComplete="username"
                  />
                </div>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password ?? ""}
                    onChange={(ev) => setPassword(ev?.target?.value ?? "")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 pr-10 transition-all"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-fuchsia-600"
                    aria-label="toggle password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" /> Logging In...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>

              <div className="w-full flex items-center gap-4 mt-6">
                <div className="h-px bg-gray-200 flex-1" />
                <div className="text-xs text-gray-400 uppercase">or</div>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              <button className="w-full mt-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8.9v-2.88h1.6V9.6c0-1.6.95-2.5 2.4-2.5.7 0 1.43.13 1.43.13v1.57h-.8c-.79 0-1.03.48-1.03.98v1.17h1.76l-.28 2.88h-1.48V21.9A10 10 0 0022 12z" />
                </svg>
                Continue with Facebook
              </button>

              <Link href="/accounts/password/reset" className="text-sm text-fuchsia-600 mt-3 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="w-full max-w-sm mt-4 bg-white/70 backdrop-blur-md p-4 border border-gray-100 text-center rounded-2xl shadow">
            <p className="text-sm text-gray-700">
              Don't have an account? {" "}
              <Link href="/signup" className="font-semibold text-fuchsia-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 text-xs text-gray-400 text-center max-w-sm">
            <p>Get the app.</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-10 w-28 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-medium shadow-sm">
                App Store
              </div>
              <div className="h-10 w-28 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-medium shadow-sm">
                Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
