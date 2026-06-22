"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold">P</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-sm text-gray-500">Sign in to your Parchunewala account</p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number or Email</label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-xs text-green-600 hover:underline">Forgot password?</button>
            </div>
          </div>

          <Link href="/" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold text-center py-3 rounded-xl transition-colors mt-2">
            Sign In
          </Link>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative text-center text-xs text-gray-400 bg-white px-2 w-fit mx-auto">OR</div>
          </div>

          <button type="button" className="w-full border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <span className="text-lg">📱</span> Continue with OTP
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          New here?{" "}
          <Link href="/auth/signup" className="text-green-600 font-semibold hover:underline">Create an account</Link>
        </p>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs text-gray-400 text-center mb-3">Sign in as</p>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/shop/dashboard" className="text-center text-xs border border-gray-200 rounded-lg py-2 px-1 hover:border-green-300 hover:bg-green-50 text-gray-600 transition-colors">
              🏪<br />Shop Owner
            </Link>
            <Link href="/delivery" className="text-center text-xs border border-gray-200 rounded-lg py-2 px-1 hover:border-blue-300 hover:bg-blue-50 text-gray-600 transition-colors">
              🛵<br />Delivery
            </Link>
            <Link href="/admin/dashboard" className="text-center text-xs border border-gray-200 rounded-lg py-2 px-1 hover:border-purple-300 hover:bg-purple-50 text-gray-600 transition-colors">
              ⚙️<br />Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
