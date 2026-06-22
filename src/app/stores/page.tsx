"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, Clock, MapPin, Zap, SlidersHorizontal, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { stores, categories } from "@/lib/data";

const SORT_OPTIONS = [
  { value: "rating",   label: "⭐ Top Rated"    },
  { value: "distance", label: "📍 Nearest"       },
  { value: "delivery", label: "⚡ Fastest"        },
];

export default function StoresPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = stores
    .filter((s) => activeCategory === "all" ? true : s.categories.includes(activeCategory))
    .sort((a, b) => {
      if (sortBy === "rating")   return b.rating - a.rating;
      if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
      if (sortBy === "delivery") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={2} />

      {/* Category filter bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[94px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-green-500 text-white shadow-sm shadow-green-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              🏪 All Stores
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-green-500 text-white shadow-sm shadow-green-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
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
        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-black text-gray-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "store" : "stores"}
            {activeCategory !== "all" && (
              <span className="text-green-600 font-semibold">
                {" "}in {categories.find((c) => c.id === activeCategory)?.name}
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={13} className="text-gray-400" />
            <div className="flex gap-1.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    sortBy === opt.value
                      ? "bg-gray-900 text-white scale-105 shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((store, i) => (
              <Link key={store.id} href={`/stores/${store.id}`} style={{ animationDelay: `${i * 60}ms` }}>
                <div
                  className={`bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift-green cursor-pointer group ${
                    !store.isOpen ? "opacity-60" : ""
                  }`}
                >
                  {/* Cover */}
                  <div className={`bg-gradient-to-br ${store.coverColor} h-36 flex items-center justify-center relative overflow-hidden shimmer-wrap`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">{store.image}</span>
                    {!store.isOpen && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-20">
                        <span className="bg-white text-gray-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                          Closed
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                      {store.deliveryFee === 0 && store.isOpen && (
                        <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow">
                          Free Delivery
                        </span>
                      )}
                      {store.tags.includes("Express Delivery") && store.isOpen && (
                        <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ml-auto shadow">
                          <Zap size={9} className="fill-gray-900" /> Express
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-black text-gray-900 group-hover:text-green-600 transition-colors text-base leading-tight">
                        {store.name}
                      </h3>
                      <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 border border-amber-200 rounded-lg px-1.5 py-0.5">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-xs font-black text-amber-700">{store.rating}</span>
                        <span className="text-[9px] text-amber-600">({store.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mb-3 line-clamp-1">{store.address}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {store.categories.map((c) => (
                        <span key={c} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100 capitalize font-medium">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-1 text-green-600 font-bold">
                        <Clock size={11} />{store.deliveryTime}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={11} />{store.distance}
                      </div>
                      <div className="ml-auto text-[11px] text-gray-400">Min ₹{store.minOrder}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28">
            <div className="text-7xl mb-4 animate-float">🔍</div>
            <h3 className="text-xl font-black text-gray-900 mb-1">No stores found</h3>
            <p className="text-gray-400 text-sm mb-5">Try a different category or check back later.</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="btn-glow bg-green-500 text-white text-sm font-black px-6 py-3 rounded-2xl hover:bg-green-600 transition-all"
            >
              Show all stores
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
