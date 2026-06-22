"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Store, Bike } from "lucide-react";

type Role = "customer" | "shop" | "delivery";

export default function SignupPage() {
  const [role, setRole] = useState<Role>("customer");

  const roles = [
    { id: "customer" as Role, label: "Customer", icon: <User size={20} />, desc: "Shop from local stores" },
    { id: "shop" as Role, label: "Shop Owner", icon: <Store size={20} />, desc: "List your store" },
    { id: "delivery" as Role, label: "Delivery Partner", icon: <Bike size={20} />, desc: "Deliver orders" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold">P</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Join Parchunewala</h1>
            <p className="text-sm text-gray-500">Create your free account today</p>
          </div>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                role === r.id ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {r.icon}
              <span className="text-xs font-semibold">{r.label}</span>
              <span className="text-xs text-gray-400 leading-tight">{r.desc}</span>
            </button>
          ))}
        </div>

        <form className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="First Name" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
            <input placeholder="Last Name" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
          </div>
          <input type="tel" placeholder="Phone Number (+91)" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
          <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
          <input type="password" placeholder="Create Password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />

          {role === "shop" && (
            <>
              <input placeholder="Shop Name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
              <input placeholder="Shop Address" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 text-gray-600">
                <option>Select Category</option>
                <option>Grocery / Kirana</option>
                <option>Cosmetics</option>
                <option>Stationery</option>
                <option>Household</option>
                <option>Hosiery</option>
                <option>Gifts</option>
                <option>Others</option>
              </select>
            </>
          )}

          <label className="flex items-start gap-2 text-xs text-gray-500">
            <input type="checkbox" className="mt-0.5 accent-green-500" />
            I agree to the <span className="text-green-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-green-600 hover:underline cursor-pointer">Privacy Policy</span>
          </label>

          <Link href={role === "shop" ? "/shop/dashboard" : role === "delivery" ? "/delivery" : "/"} className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold text-center py-3 rounded-xl transition-colors">
            Create Account
          </Link>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
