"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, Clock, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { stores, categories } from "@/lib/data";

export default function StoresPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = stores.filter((s) =>
    activeCategory === "all" ? true : s.categories.includes(activeCategory)
  ).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === "delivery") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={2} />

      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Stores
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span> stores found
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-green-400"
            >
              <option value="rating">Top Rated</option>
              <option value="distance">Nearest</option>
              <option value="delivery">Fastest Delivery</option>
            </select>
          </div>
        </div>

        {/* Store grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((store) => (
            <Link key={store.id} href={`/stores/${store.id}`}>
              <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group ${!store.isOpen ? "opacity-70" : ""}`}>
                <div className={`bg-gradient-to-br ${store.coverColor} h-32 flex items-center justify-center relative`}>
                  <span className="text-5xl">{store.image}</span>
                  {!store.isOpen && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">Closed</span>
                    </div>
                  )}
                  {store.deliveryFee === 0 && store.isOpen && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">FREE Delivery</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg">{store.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{store.address}</p>
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {store.categories.map((c) => (
                      <span key={c} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full capitalize border border-gray-100">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-2 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{store.rating}</span>
                      <span className="text-gray-400">({store.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-green-500" />
                      {store.deliveryTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-blue-400" />
                      {store.distance}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Min order: ₹{store.minOrder}</span>
                    {store.deliveryFee === 0
                      ? <span className="text-xs text-green-600 font-medium">Free delivery</span>
                      : <span className="text-xs text-gray-500">Delivery: ₹{store.deliveryFee}</span>
                    }
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No stores found</h3>
            <p className="text-gray-500 text-sm">Try a different category or check back later.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
