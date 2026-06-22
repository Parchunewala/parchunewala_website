import Link from "next/link";
import { MapPin, Star, Clock, ChevronRight, Zap, Store, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { stores, categories, banners } from "@/lib/data";

const CAT_STYLES = [
  { bg: "bg-green-100", text: "text-green-700", ring: "ring-green-200" },
  { bg: "bg-pink-100", text: "text-pink-700", ring: "ring-pink-200" },
  { bg: "bg-blue-100", text: "text-blue-700", ring: "ring-blue-200" },
  { bg: "bg-yellow-100", text: "text-yellow-700", ring: "ring-yellow-200" },
  { bg: "bg-purple-100", text: "text-purple-700", ring: "ring-purple-200" },
  { bg: "bg-red-100", text: "text-red-700", ring: "ring-red-200" },
  { bg: "bg-orange-100", text: "text-orange-700", ring: "ring-orange-200" },
  { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-200" },
];

export default function HomePage() {
  const featuredStores = stores.filter((s) => s.isFeatured);
  const openStores = stores.filter((s) => s.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={2} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#052e16] via-[#14532d] to-[#065f46]">
        {/* Decoration blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-emerald-400/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-400/15 border border-green-400/30 rounded-full px-4 py-2 mb-6">
              <Zap size={13} className="fill-green-400 text-green-400" />
              <span className="text-green-300 text-sm font-bold">Delivering in 10 minutes</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[56px] font-black text-white leading-[1.08] tracking-tight mb-5">
              Your Area.<br />
              <span className="text-green-400">Your Stores.</span><br />
              Delivered Fast.
            </h1>

            <p className="text-green-100/70 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              Order from trusted neighborhood kirana shops — groceries, cosmetics, stationery & more — delivered to your door.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/stores"
                className="inline-flex items-center justify-center gap-2 bg-green-400 hover:bg-green-300 text-gray-900 font-black px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-green-950/40 text-sm"
              >
                <Store size={16} />
                Browse Stores Near You
              </Link>
              <Link
                href="/auth/signup?role=shop"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all text-sm"
              >
                List Your Shop
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Floating category grid — desktop only */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:grid grid-cols-3 gap-3">
            {categories.slice(0, 6).map((cat, i) => (
              <Link
                key={cat.id}
                href={`/stores?category=${cat.id}`}
                className="w-[78px] h-[78px] bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[9px] text-white/70 font-semibold text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-around sm:justify-start sm:gap-10">
              {[
                { value: "38+", label: "Local Stores" },
                { value: "14 min", label: "Avg. Delivery" },
                { value: "2,840+", label: "Happy Orders" },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="text-white font-black text-lg leading-none">{s.value}</div>
                  <div className="text-green-300/60 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-green-500 shrink-0" />
          <span className="text-gray-400">Showing stores in</span>
          <button className="font-bold text-gray-900 underline decoration-dotted underline-offset-2 hover:text-green-600 transition-colors">
            Sector 15, Noida 201301
          </button>
          <button className="text-green-500 text-xs font-semibold hover:underline">(change)</button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-12">

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black text-gray-900">Shop by Category</h2>
              <p className="text-xs text-gray-400 mt-0.5">Find exactly what you need</p>
            </div>
            <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
              All stores <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible sm:pb-0">
            {categories.map((cat, i) => {
              const s = CAT_STYLES[i % CAT_STYLES.length];
              return (
                <Link
                  key={cat.id}
                  href={`/stores?category=${cat.id}`}
                  className="flex flex-col items-center gap-2 shrink-0 sm:shrink cursor-pointer group"
                >
                  <div className={`w-[68px] h-[68px] sm:w-full sm:aspect-square ${s.bg} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm ring-1 ${s.ring}`}>
                    <span className="text-3xl">{cat.emoji}</span>
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight ${s.text}`}>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Promo banners */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`bg-gradient-to-br ${banner.gradient} rounded-2xl p-5 text-white cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all group relative overflow-hidden`}
              >
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[70px] opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all leading-none">
                  {banner.emoji}
                </div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2.5">{banner.emoji}</div>
                  <h3 className="font-black text-base leading-tight">{banner.title}</h3>
                  <p className="text-white/70 text-sm mt-1">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured stores */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black text-gray-900">Featured Stores</h2>
              <p className="text-xs text-gray-400 mt-0.5">Top rated in your area</p>
            </div>
            <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* Open now */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black text-gray-900">Open Now</h2>
              <span className="bg-green-100 text-green-700 text-xs font-black px-2.5 py-1 rounded-full">
                {openStores.length} stores
              </span>
            </div>
            <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
              See all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {openStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* Why Parchunewala */}
        <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Why Parchunewala?</h2>
            <p className="text-gray-400 mt-1.5 text-sm">The neighborhood commerce platform that puts local first</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                emoji: "⚡",
                title: "10-Min Commerce",
                desc: "Get deliveries from local shops in 10–15 minutes. Faster than any big platform.",
                bg: "bg-amber-50 border-amber-100",
              },
              {
                emoji: "📍",
                title: "Hyperlocal First",
                desc: "Every store on Parchunewala is within 2km of you. Real neighborhood shopping.",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                emoji: "🤝",
                title: "Support Local",
                desc: "Your order directly helps a local kirana owner grow their business digitally.",
                bg: "bg-green-50 border-green-100",
              },
            ].map((item) => (
              <div key={item.title} className={`${item.bg} border rounded-2xl p-6 text-center`}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-black text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Business CTA */}
        <section className="bg-gradient-to-r from-gray-950 to-gray-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-full bg-gradient-to-l from-green-900/25 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                🏪 For Shop Owners
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-2">Own a local shop?</h2>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                Join 38+ neighborhood businesses on Parchunewala. Get orders, manage inventory, and grow your customer base — free to start.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/auth/signup?role=shop"
                className="bg-green-500 hover:bg-green-400 text-white font-black px-6 py-3.5 rounded-2xl transition-colors flex items-center gap-2 text-sm shadow-lg shadow-green-950/40"
              >
                <ShieldCheck size={16} />
                Register Your Store
              </Link>
              <Link
                href="/shop/dashboard"
                className="border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all text-sm"
              >
                View Demo →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StoreCard({ store }: { store: (typeof stores)[0] }) {
  return (
    <Link href={`/stores/${store.id}`}>
      <div
        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all cursor-pointer group ${
          !store.isOpen ? "opacity-60" : ""
        }`}
      >
        {/* Cover */}
        <div className={`bg-gradient-to-br ${store.coverColor} h-32 flex items-center justify-center relative overflow-hidden`}>
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{store.image}</span>
          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Closed
              </span>
            </div>
          )}
          {store.deliveryFee === 0 && store.isOpen && (
            <span className="absolute top-2.5 left-2.5 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
              Free Delivery
            </span>
          )}
          {store.tags.includes("Express Delivery") && store.isOpen && (
            <span className="absolute top-2.5 right-2.5 bg-yellow-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap size={8} className="fill-gray-900" /> Express
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-black text-gray-900 group-hover:text-green-600 transition-colors leading-tight text-[15px]">
              {store.name}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 border border-amber-200 rounded-lg px-1.5 py-0.5">
              <Star size={10} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-black text-amber-700">{store.rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-3">{store.area} · {store.categories.slice(0, 2).join(", ")}</p>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <Clock size={11} />
              {store.deliveryTime}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={11} />
              {store.distance}
            </div>
            <div className="text-gray-400 ml-auto text-[11px]">Min ₹{store.minOrder}</div>
          </div>

          {store.tags.length > 0 && (
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {store.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
