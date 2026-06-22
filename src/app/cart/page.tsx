"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Tag, MapPin, Clock, Truck } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

const mockCartItems = [
  { id: "p1", name: "Amul Butter 500g", emoji: "🧈", price: 285, qty: 1, storeName: "Sharma Kirana Store" },
  { id: "p4", name: "Mother Dairy Milk 500ml", emoji: "🥛", price: 28, qty: 2, storeName: "Sharma Kirana Store" },
  { id: "p2", name: "Tata Salt 1kg", emoji: "🧂", price: 22, qty: 1, storeName: "Sharma Kirana Store" },
];

export default function CartPage() {
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 0;
  const discount = 22;
  const total = subtotal - discount + delivery;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={mockCartItems.length} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <Link href="/stores" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm mb-5">
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingCart size={22} /> Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {/* Store group */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 bg-green-50 border-b border-green-100 flex items-center gap-2">
                <span className="text-lg">🏪</span>
                <span className="font-semibold text-gray-900 text-sm">Sharma Kirana Store</span>
                <span className="ml-auto text-xs text-green-600 font-medium flex items-center gap-1">
                  <Clock size={12} /> 10–15 min
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-green-600 font-semibold text-sm mt-0.5">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 rounded-lg px-2 py-1">
                      <button className="w-6 h-6 bg-white rounded text-green-600 font-bold text-sm flex items-center justify-center shadow-sm">−</button>
                      <span className="font-bold text-green-700 w-4 text-center text-sm">{item.qty}</span>
                      <button className="w-6 h-6 bg-green-500 rounded text-white font-bold text-sm flex items-center justify-center">+</button>
                    </div>
                    <span className="font-bold text-gray-900 text-sm w-12 text-right">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-green-500" /> Delivery Address
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">Home</p>
                  <p className="text-gray-600 text-xs mt-0.5">12, Nehru Colony, Sector 15, Noida – 201301</p>
                </div>
                <button className="text-green-600 text-xs font-medium hover:underline">Change</button>
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag size={16} className="text-green-500" /> Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  defaultValue="FIRST50"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400"
                />
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  Apply
                </button>
              </div>
              <p className="text-xs text-green-600 mt-2">✓ Code FIRST50 applied — ₹22 saved!</p>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({mockCartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery charge</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Promo discount</span>
                  <span>−₹{discount}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base mb-5">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3 mb-4 text-xs text-green-700">
                <Truck size={15} className="shrink-0" />
                Estimated delivery in <strong>10–15 min</strong>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3.5 rounded-xl transition-colors"
              >
                Place Order · ₹{total}
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                By placing order you agree to our Terms & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
