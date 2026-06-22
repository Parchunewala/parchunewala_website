import Link from "next/link";
import { MapPin, Star, Clock, ChevronRight, Zap, Store, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { stores, categories, banners } from "@/lib/data";

export default function HomePage() {
  const featuredStores = stores.filter((s) => s.isFeatured);
  const openStores = stores.filter((s) => s.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={2} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium mb-5">
              <Zap size={14} className="text-yellow-300" />
              Delivery in 10–15 minutes
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Your Area.<br />Your Stores.<br />Your App.
            </h1>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              Order from trusted neighborhood shops — groceries, cosmetics, stationery & more — delivered fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/stores"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-colors shadow-sm"
              >
                <Store size={18} />
                Browse Stores
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
              >
                Join as Business
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm">
          <MapPin size={15} className="text-green-500 shrink-0" />
          <span className="text-gray-600">Delivering to</span>
          <button className="font-semibold text-gray-900 underline decoration-dashed underline-offset-2">
            Sector 15, Noida 201301
          </button>
          <span className="text-gray-400 text-xs ml-1">(change)</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-10">
        {/* Promo banners */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`bg-gradient-to-r ${banner.gradient} rounded-2xl p-5 text-white cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="text-3xl mb-2">{banner.emoji}</div>
                <h3 className="font-bold text-lg leading-tight">{banner.title}</h3>
                <p className="text-white/80 text-sm mt-1">{banner.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/stores" className="text-sm text-green-600 font-medium flex items-center gap-0.5 hover:gap-1 transition-all">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/stores?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-green-200 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured stores */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Featured Stores</h2>
            <Link href="/stores" className="text-sm text-green-600 font-medium flex items-center gap-0.5 hover:gap-1 transition-all">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* All open stores */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Open Now
              <span className="ml-2 text-sm font-normal text-gray-500">({openStores.length} stores)</span>
            </h2>
            <Link href="/stores" className="text-sm text-green-600 font-medium flex items-center gap-0.5 hover:gap-1 transition-all">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {openStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* Why Parchunewala */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Parchunewala?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Quick Commerce", desc: "Get deliveries in 10–15 minutes from local shops you already trust." },
              { icon: "📍", title: "Hyperlocal Discovery", desc: "Find stores and products right in your neighborhood, not miles away." },
              { icon: "🤝", title: "Support Local", desc: "Every order helps neighborhood businesses grow digitally." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA for shop owners */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Own a local shop?</h2>
              <p className="text-gray-300">
                List your store on Parchunewala and reach customers in your neighborhood. Free to start.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/auth/signup?role=shop"
                className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-full transition-colors flex items-center gap-2"
              >
                <ShieldCheck size={18} />
                Register Store
              </Link>
              <Link
                href="/shop/dashboard"
                className="border border-gray-600 hover:border-gray-400 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                View Demo
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
      <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer group ${!store.isOpen ? "opacity-70" : ""}`}>
        <div className={`bg-gradient-to-br ${store.coverColor} h-28 flex items-center justify-center relative`}>
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
          <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{store.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-3">{store.area} · {store.categories.slice(0, 2).join(", ")}</p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{store.rating}</span>
              <span className="text-gray-400">({store.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-green-500" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-blue-400" />
              <span>{store.distance}</span>
            </div>
          </div>
          {store.tags.length > 0 && (
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {store.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
