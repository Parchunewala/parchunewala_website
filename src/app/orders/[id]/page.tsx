"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, CheckCircle, Clock, Package, Truck } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

const orderSteps = [
  { id: "placed", label: "Order Placed", desc: "Your order has been received", icon: <Package size={16} />, done: true },
  { id: "confirmed", label: "Confirmed", desc: "Shop is preparing your order", icon: <CheckCircle size={16} />, done: true },
  { id: "preparing", label: "Preparing", desc: "Items are being packed", icon: <Clock size={16} />, done: true },
  { id: "pickup", label: "Out for Delivery", desc: "Delivery partner is on the way", icon: <Truck size={16} />, done: false, active: true },
  { id: "delivered", label: "Delivered", desc: "Enjoy your order!", icon: <CheckCircle size={16} />, done: false },
];

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6">
        <Link href="/orders" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm mb-5">
          <ArrowLeft size={16} /> My Orders
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white mb-5">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold">Order #{id}</h1>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Out for Delivery</span>
          </div>
          <p className="text-purple-100 text-sm mb-3">Sharma Kirana Store · Today, 4:15 PM</p>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <span className="text-xl">🛵</span>
            <div>
              <p className="font-semibold text-sm">Arriving in ~5 minutes</p>
              <p className="text-purple-200 text-xs">Delivery partner: Rajesh K.</p>
            </div>
            <button className="ml-auto bg-white text-purple-600 rounded-full p-1.5">
              <Phone size={14} />
            </button>
          </div>
        </div>

        {/* Tracking steps */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <h3 className="font-semibold text-gray-900 mb-5">Order Tracking</h3>
          <div className="space-y-0">
            {orderSteps.map((step, i) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? "bg-green-500 text-white" : step.active ? "bg-purple-500 text-white animate-pulse" : "bg-gray-100 text-gray-400"
                  }`}>
                    {step.icon}
                  </div>
                  {i < orderSteps.length - 1 && (
                    <div className={`w-0.5 h-10 mt-1 ${step.done ? "bg-green-300" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="pt-1 pb-10">
                  <p className={`text-sm font-semibold ${step.done || step.active ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                  <p className={`text-xs mt-0.5 ${step.done || step.active ? "text-gray-500" : "text-gray-300"}`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
          <div className="space-y-2.5 text-sm">
            {[
              { name: "Nivea Moisturizer 200ml", qty: 1, price: 245, emoji: "🧴" },
              { name: "Dove Soap (3 pack)", qty: 1, price: 120, emoji: "🧼" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <span className="flex-1 text-gray-700">{item.name}</span>
                <span className="text-gray-500">×{item.qty}</span>
                <span className="font-semibold text-gray-900">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 space-y-1 text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>₹365</span></div>
            <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">Free</span></div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-1"><span>Total Paid</span><span>₹365</span></div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-green-500" /> Delivery To
          </h3>
          <p className="text-sm text-gray-700 font-medium">Rahul Sharma</p>
          <p className="text-sm text-gray-500">12, Nehru Colony, Sector 15, Noida – 201301</p>
          <p className="text-sm text-gray-500">+91 98765 43210</p>
        </div>
      </main>
    </div>
  );
}
