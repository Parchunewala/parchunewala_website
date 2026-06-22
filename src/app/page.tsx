import Link from "next/link";
import {
  MapPin, Star, Clock, ChevronRight, Zap, ArrowRight,
  ShieldCheck, Flame, Search,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { stores, categories, banners } from "@/lib/data";

type ProductWithStore = (typeof stores)[0]["products"][0] & {
  storeId: string;
  storeName: string;
};

const popularProducts: ProductWithStore[] = stores
  .flatMap((store) =>
    store.products
      .filter((p) => p.inStock)
      .slice(0, 3)
      .map((p) => ({ ...p, storeId: store.id, storeName: store.name }))
  )
  .slice(0, 12);

const CAT_STYLES = [
  { bg: "bg-green-100",  text: "text-green-700",  hover: "group-hover:bg-green-200"  },
  { bg: "bg-pink-100",   text: "text-pink-700",   hover: "group-hover:bg-pink-200"   },
  { bg: "bg-blue-100",   text: "text-blue-700",   hover: "group-hover:bg-blue-200"   },
  { bg: "bg-yellow-100", text: "text-yellow-700", hover: "group-hover:bg-yellow-200" },
  { bg: "bg-purple-100", text: "text-purple-700", hover: "group-hover:bg-purple-200" },
  { bg: "bg-red-100",    text: "text-red-700",    hover: "group-hover:bg-red-200"    },
  { bg: "bg-orange-100", text: "text-orange-700", hover: "group-hover:bg-orange-200" },
  { bg: "bg-amber-100",  text: "text-amber-700",  hover: "group-hover:bg-amber-200"  },
];

const QUICK_CATS = [
  { emoji: "🛒", label: "Grocery" },
  { emoji: "🥛", label: "Dairy"   },
  { emoji: "💄", label: "Beauty"  },
  { emoji: "📚", label: "Study"   },
  { emoji: "🍿", label: "Snacks"  },
];

export default function HomePage() {
  const featuredStores = stores.filter((s) => s.isFeatured && s.isOpen);
  const openStores = stores.filter((s) => s.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-white pb-safe md:pb-0">
      <Navbar cartCount={2} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #f0fdf4 0%, #dcfce7 35%, #f7fee7 65%, #ffffff 100%)" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-40 right-0 w-[650px] h-[650px] rounded-full bg-green-100/70 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-100/50 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-teal-50/60 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8 md:pt-16 md:pb-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: text + search */}
            <div>
              {/* Delivery badge */}
              <div
                className="animate-fadeInUp inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-md shadow-green-300/50"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <Zap size={11} className="fill-white" />
                10 minute delivery · Sector 15, Noida
              </div>

              <h1
                className="animate-fadeInUp text-4xl sm:text-5xl md:text-[58px] font-black text-gray-900 leading-[1.08] tracking-tight mb-5"
                style={{ animationDelay: "0.1s" }}
              >
                Groceries &<br />
                Essentials,<br />
                <span className="text-green-500">Delivered Fast.</span>
              </h1>

              <p
                className="animate-fadeInUp text-gray-500 text-base leading-relaxed mb-8 max-w-md"
                style={{ animationDelay: "0.2s" }}
              >
                Order from trusted neighbourhood kirana shops. Fresh groceries,
                cosmetics, stationery & more — right to your door.
              </p>

              {/* Search bar */}
              <div
                className="animate-fadeInUp relative mb-6 max-w-[520px]"
                style={{ animationDelay: "0.3s" }}
              >
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder='Search "amul butter", "dove soap", "maggi"...'
                  className="w-full pl-11 pr-28 py-4 text-sm bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 shadow-lg shadow-gray-100/80 text-gray-900 font-medium placeholder-gray-400 transition-all"
                />
                <Link
                  href="/stores"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Search
                </Link>
              </div>

              {/* Quick category pills */}
              <div
                className="animate-fadeInUp flex flex-wrap gap-2"
                style={{ animationDelay: "0.4s" }}
              >
                {QUICK_CATS.map((cat) => (
                  <Link
                    key={cat.label}
                    href="/stores"
                    className="flex items-center gap-1.5 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-200 hover:border-green-300 transition-all shadow-sm"
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </Link>
                ))}
                <Link
                  href="/stores"
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-green-500 transition-all shadow-sm"
                >
                  View All Stores →
                </Link>
              </div>
            </div>

            {/* Right: Stats grid */}
            <div
              className="hidden md:flex flex-col gap-4 animate-fadeInRight"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10 min",  label: "Delivery time",   icon: "⚡", delay: "0.35s" },
                  { value: "4.8 ★",   label: "Avg. rating",     icon: "⭐", delay: "0.42s" },
                  { value: "38+",     label: "Local stores",    icon: "🏪", delay: "0.48s" },
                  { value: "2,840+",  label: "Orders placed",   icon: "📦", delay: "0.54s" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="animate-scaleIn bg-white rounded-2xl p-5 shadow-sm border border-gray-100/80 card-lift"
                    style={{ animationDelay: stat.delay }}
                  >
                    <div className="text-2xl mb-3">{stat.icon}</div>
                    <div className="text-2xl font-black text-gray-900 leading-none">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1.5 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="animate-scaleIn bg-white rounded-2xl p-4 shadow-sm border border-gray-100/80 flex items-center gap-4" style={{ animationDelay: "0.6s" }}>
                <div className="flex -space-x-2.5 shrink-0">
                  {["🧑", "👩", "👨", "🧑‍💼", "👩‍💼"].map((e, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-lg shadow-sm"
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-black text-gray-900 text-sm">2,840+ happy customers</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1.5">Trusted by neighbours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location bar */}
        <div className="relative border-t border-green-100 bg-white/75 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 text-xs">
            <MapPin size={12} className="text-green-500 shrink-0" />
            <span className="text-gray-400">Showing stores in</span>
            <button className="font-bold text-gray-800 hover:text-green-600 transition-colors">
              Sector 15, Noida 201301
            </button>
            <button className="text-green-500 font-semibold hover:underline ml-0.5">(change)</button>
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ── Categories ──────────────────────────────────────── */}
        <AnimateOnScroll direction="up">
          <section className="bg-white py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-gray-900">Shop by Category</h2>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  See all <ChevronRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {categories.map((cat, i) => {
                  const s = CAT_STYLES[i % CAT_STYLES.length];
                  return (
                    <Link
                      key={cat.id}
                      href={`/stores?category=${cat.id}`}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div
                        className={`w-full aspect-square max-w-[70px] mx-auto ${s.bg} ${s.hover} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm`}
                      >
                        <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                      </div>
                      <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight ${s.text}`}>
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Promo banners ───────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="py-8 bg-gray-50/60 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                {banners.map((banner, i) => (
                  <div
                    key={banner.id}
                    className={`shrink-0 w-72 sm:w-auto bg-gradient-to-br ${banner.gradient} rounded-2xl p-6 text-white cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group shimmer-wrap relative overflow-hidden`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="absolute right-4 bottom-4 text-[72px] opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all leading-none pointer-events-none">
                      {banner.emoji}
                    </div>
                    <div className="relative z-10">
                      <div className="text-3xl mb-3">{banner.emoji}</div>
                      <h3 className="font-black text-lg leading-tight">{banner.title}</h3>
                      <p className="text-white/70 text-sm mt-1.5">{banner.subtitle}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 bg-white/25 hover:bg-white/35 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                        Shop now <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Popular Products ────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="bg-white py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Flame size={17} className="text-orange-500 fill-orange-500" />
                    <h2 className="text-lg font-black text-gray-900">Popular Near You</h2>
                  </div>
                  <p className="text-xs text-gray-400">Best-sellers from neighbourhood stores</p>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3">
                {popularProducts.map((product) => (
                  <ProductCard key={`${product.storeId}-${product.id}`} product={product} />
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Featured Stores ─────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="bg-gray-50 py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black text-gray-900">Featured Stores</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Top rated by your neighbours</p>
                </div>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  View all <ChevronRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredStores.map((store, i) => (
                  <div key={store.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
                    <StoreCard store={store} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Open Now ────────────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="bg-white py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-black text-gray-900">Open Now</h2>
                  <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-black px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {openStores.length} stores
                  </span>
                </div>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  See all <ChevronRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {openStores.map((store, i) => (
                  <div key={store.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
                    <StoreCard store={store} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Why us ──────────────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="bg-green-50 py-12 border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Why Parchunewala?</h2>
                <p className="text-gray-500 text-sm">Neighbourhood commerce that puts local first</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    icon: "⚡",
                    title: "10-Min Commerce",
                    desc: "Faster than any big platform — from local shops within 2km of your door.",
                    bg: "bg-amber-100", border: "border-amber-200",
                  },
                  {
                    icon: "📍",
                    title: "Hyperlocal First",
                    desc: "Every store is real, nearby, and already trusted by your neighbours.",
                    bg: "bg-blue-100", border: "border-blue-200",
                  },
                  {
                    icon: "🤝",
                    title: "Support Local",
                    desc: "Your order directly helps a kirana owner grow their business digitally.",
                    bg: "bg-green-100", border: "border-green-200",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`${item.bg} ${item.border} border rounded-2xl p-6 text-center card-lift group`}
                  >
                    <div className="text-5xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-gray-900 mb-2 text-base">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Business CTA ────────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={60}>
          <section className="relative bg-gray-900 py-14 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/15 blur-[100px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[80px] -translate-x-1/4 translate-y-1/3" />
            </div>
            <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-black px-3 py-1.5 rounded-full mb-4 tracking-wide">
                  🏪 FOR SHOP OWNERS
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  Own a local shop?<br />
                  <span className="gradient-text-green">Start earning online.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Join 38+ neighbourhood businesses on Parchunewala. Get orders, manage inventory,
                  track earnings — all from one dashboard. Completely free to start.
                </p>
                <div className="flex gap-8 mt-6">
                  {[["38+", "Stores on platform"], ["₹28K+", "Avg weekly earnings"], ["Free", "To list your store"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-white font-black text-xl leading-none">{val}</div>
                      <div className="text-gray-500 text-xs mt-1">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/auth/signup?role=shop"
                  className="btn-glow bg-green-500 hover:bg-green-400 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-green-950/50 transition-all"
                >
                  <ShieldCheck size={18} />
                  Register Your Store
                </Link>
                <Link
                  href="/shop/dashboard"
                  className="glass hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-center"
                >
                  View Shop Demo →
                </Link>
                <Link
                  href="/delivery"
                  className="text-center text-gray-500 hover:text-gray-300 transition-colors text-sm py-1"
                >
                  Become a Delivery Partner →
                </Link>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  );
}

/* ── Product Card ─────────────────────────────────────────────── */

function ProductCard({ product }: { product: ProductWithStore }) {
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <Link href={`/stores/${product.storeId}`} className="shrink-0">
      <div className="w-40 sm:w-44 bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift group cursor-pointer">
        {/* Image */}
        <div className="bg-gray-50 h-28 flex items-center justify-center relative overflow-hidden">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
              {discount}% OFF
            </span>
          )}
          <span className="absolute bottom-2 right-2 bg-white/90 text-gray-500 text-[9px] font-medium px-1.5 py-0.5 rounded-md border border-gray-100">
            {product.storeName.split(" ")[0]}
          </span>
        </div>
        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-900 font-bold line-clamp-2 leading-snug mb-1.5">
            {product.name}
          </p>
          <p className="text-[10px] text-gray-400 mb-3">{product.unit}</p>
          <div className="flex items-center justify-between gap-1">
            <div>
              <span className="text-sm font-black text-gray-900">₹{product.price}</span>
              {discount > 0 && (
                <span className="text-[10px] text-gray-400 line-through ml-1">₹{product.mrp}</span>
              )}
            </div>
            <button className="btn-add bg-green-500 hover:bg-green-600 active:scale-90 text-white text-xs font-black px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-green-200">
              ADD
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Store Card ───────────────────────────────────────────────── */

function StoreCard({ store }: { store: (typeof stores)[0] }) {
  return (
    <Link href={`/stores/${store.id}`}>
      <div
        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift-green cursor-pointer group h-full ${
          !store.isOpen ? "opacity-60" : ""
        }`}
      >
        {/* Cover */}
        <div
          className={`bg-gradient-to-br ${store.coverColor} h-36 flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">
            {store.image}
          </span>

          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-20">
              <span className="bg-white text-gray-900 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Closed
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
            {store.deliveryFee === 0 && store.isOpen && (
              <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-sm">
                Free Delivery
              </span>
            )}
            {store.tags.includes("Express Delivery") && store.isOpen && (
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ml-auto shadow-sm">
                <Zap size={8} className="fill-gray-900" /> Express
              </span>
            )}
          </div>
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

          <p className="text-xs text-gray-400 mb-3 line-clamp-1">
            {store.area} · {store.categories.slice(0, 2).join(", ")}
          </p>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <Clock size={11} />
              {store.deliveryTime}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={11} />
              {store.distance}
            </div>
            <div className="ml-auto text-[11px] text-gray-400">Min ₹{store.minOrder}</div>
          </div>

          {store.tags.length > 0 && (
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {store.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-bold"
                >
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
