"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MapPin, CreditCard, Smartphone, Banknote, Clock } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-500 mb-1">Order <span className="font-semibold text-gray-900">#ORD-003</span></p>
            <div className="bg-green-50 rounded-xl px-4 py-3 my-4 flex items-center gap-2 justify-center">
              <Clock size={16} className="text-green-600" />
              <span className="text-green-700 font-medium text-sm">Estimated delivery in 12–15 minutes</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Your order from <strong>Sharma Kirana Store</strong> has been placed and is being prepared.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/orders/ORD-003" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors">
                Track Order
              </Link>
              <Link href="/" className="border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm mb-5">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-green-500" /> Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Full Name" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="Rahul Sharma" />
                <input placeholder="Phone Number" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="+91 98765 43210" />
                <input placeholder="Flat / House No." className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="12, Nehru Colony" />
                <input placeholder="Area / Locality" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="Sector 15" />
                <input placeholder="City" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="Noida" />
                <input placeholder="PIN Code" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" defaultValue="201301" />
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-green-500" /> Payment Method
              </h3>
              <div className="space-y-2.5">
                {[
                  { id: "upi", label: "UPI / Google Pay / PhonePe", icon: <Smartphone size={18} className="text-blue-500" /> },
                  { id: "cod", label: "Cash on Delivery", icon: <Banknote size={18} className="text-green-500" /> },
                  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} className="text-purple-500" /> },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === method.id ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-green-500"
                    />
                    {method.icon}
                    <span className="text-sm font-medium text-gray-900">{method.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "upi" && (
                <input
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400"
                />
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between"><span>Amul Butter 500g × 1</span><span>₹285</span></div>
                <div className="flex justify-between"><span>Mother Dairy Milk × 2</span><span>₹56</span></div>
                <div className="flex justify-between"><span>Tata Salt 1kg × 1</span><span>₹22</span></div>
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex justify-between"><span>Subtotal</span><span>₹363</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">Free</span></div>
                <div className="flex justify-between text-green-600"><span>Promo (FIRST50)</span><span>−₹22</span></div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 mb-5">
                <span>Total</span><span>₹341</span>
              </div>
              <button
                onClick={() => setOrdered(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                Place Order · ₹341
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
