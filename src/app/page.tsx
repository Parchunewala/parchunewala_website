import Link from "next/link";
import {
  MapPin, Star, Clock, ChevronRight, Zap, ArrowRight,
  ShieldCheck, Flame, Search, ChevronDown,
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

const PRODUCT_BG: Record<string, string> = {
  grocery:   "bg-green-50",
  dairy:     "bg-orange-50",
  cosmetics: "bg-pink-50",
  hosiery:   "bg-purple-50",
  snacks:    "bg-yellow-50",
  household: "bg-blue-50",
  stationery:"bg-indigo-50",
  gifts:     "bg-red-50",
};

const CAT_STYLES = [
  { bg: "bg-green-100",  ring: "ring-green-200",  text: "text-green-700"  },
  { bg: "bg-pink-100",   ring: "ring-pink-200",   text: "text-pink-700"   },
  { bg: "bg-blue-100",   ring: "ring-blue-200",   text: "text-blue-700"   },
  { bg: "bg-yellow-100", ring: "ring-yellow-200", text: "text-yellow-700" },
  { bg: "bg-purple-100", ring: "ring-purple-200", text: "text-purple-700" },
  { bg: "bg-red-100",    ring: "ring-red-200",    text: "text-red-700"    },
  { bg: "bg-orange-100", ring: "ring-orange-200", text: "text-orange-700" },
  { bg: "bg-amber-100",  ring: "ring-amber-200",  text: "text-amber-700"  },
];

const QUICK_CATS = [
  { emoji: "🛒", label: "Grocery"  },
  { emoji: "🥛", label: "Dairy"    },
  { emoji: "💄", label: "Beauty"   },
  { emoji: "📚", label: "Study"    },
  { emoji: "🍿", label: "Snacks"   },
];

const MARQUEE_ITEMS = [
  "⚡ 10 MIN DELIVERY",
  "🏪 38+ LOCAL STORES",
  "⭐ 4.8 RATED",
  "🎉 FREE DELIVERY AVAILABLE",
  "📍 SECTOR 15, NOIDA",
  "✅ TRUSTED NEIGHBOURHOOD SHOPS",
];

export default function HomePage() {
  const featuredStores = stores.filter((s) => s.isFeatured && s.isOpen);
  const openStores = stores.filter((s) => s.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-white pb-safe md:pb-0">
      <Navbar cartCount={2} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  HERO                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col rounded-b-[2.5rem]"
        style={{ background: "linear-gradient(150deg, #064e2a 0%, #0c7038 40%, #14954a 75%, #16a34a 100%)" }}
      >
        {/* Dot texture */}
        <div className="absolute inset-0 dot-grid pointer-events-none" />

        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-300/10 blur-[130px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-200/8 blur-[100px] -translate-x-1/4 translate-y-1/3 pointer-events-none" />

        <div className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-10 pb-8 md:pt-16 md:pb-12">

          {/* Location pill */}
          <button
            className="animate-fadeInUp flex items-center gap-2 bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-8 transition-all"
          >
            <MapPin size={14} className="text-green-300" />
            <span>Sector 15, Noida 201301</span>
            <ChevronDown size={13} className="text-white/40 ml-0.5" />
          </button>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">

            {/* Left — Big typography + search */}
            <div>
              {/* Eyebrow */}
              <div
                className="animate-fadeInUp flex items-center gap-2 text-green-300/80 text-xs font-bold tracking-[0.18em] uppercase mb-4"
                style={{ animationDelay: "0.08s" }}
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full live-glow" />
                Delivering right now
              </div>

              {/* HUGE delivery time */}
              <h1
                className="animate-fadeInUp font-black text-white leading-none tracking-tighter mb-2"
                style={{ fontSize: "clamp(72px, 14vw, 128px)", animationDelay: "0.12s" }}
              >
                10 MIN
              </h1>
              <div
                className="animate-fadeInUp text-2xl sm:text-3xl md:text-4xl font-black text-green-300 tracking-tight leading-none mb-5"
                style={{ animationDelay: "0.18s" }}
              >
                DELIVERY
              </div>

              <p
                className="animate-fadeInUp text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                style={{ animationDelay: "0.25s" }}
              >
                Order from trusted neighbourhood kirana shops near you — groceries, cosmetics, stationery & more.
              </p>

              {/* Search bar */}
              <div
                className="animate-fadeInUp relative mb-7 max-w-[540px]"
                style={{ animationDelay: "0.32s" }}
              >
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder='Try "amul butter", "maggi noodles"...'
                  className="w-full pl-11 pr-28 py-4 rounded-2xl bg-white text-sm focus:outline-none focus:ring-4 focus:ring-green-700/30 shadow-2xl shadow-black/30 text-gray-900 font-medium placeholder-gray-400"
                />
                <Link
                  href="/stores"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                  Search
                </Link>
              </div>

              {/* Quick category pills */}
              <div
                className="animate-fadeInUp flex gap-2.5 overflow-x-auto scrollbar-hide pb-1"
                style={{ animationDelay: "0.4s" }}
              >
                {QUICK_CATS.map((cat) => (
                  <Link
                    key={cat.label}
                    href="/stores"
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-all whitespace-nowrap shrink-0"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
                <Link
                  href="/stores"
                  className="flex items-center gap-2 bg-white text-green-700 text-sm font-bold px-4 py-2.5 rounded-xl border border-transparent transition-all whitespace-nowrap shrink-0 hover:bg-green-50 shadow-lg shadow-black/20"
                >
                  All Stores <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right — Social proof + stores count (desktop only) */}
            <div
              className="hidden md:flex flex-col gap-3 shrink-0 w-52 animate-scaleIn"
              style={{ animationDelay: "0.35s" }}
            >
              {[
                { value: "38+",    label: "Local Stores",  icon: "🏪" },
                { value: "10 min", label: "Avg. Delivery", icon: "⚡" },
                { value: "4.8★",   label: "Avg. Rating",   icon: "⭐" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3"
                >
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="text-white font-black text-lg leading-none">{s.value}</div>
                    <div className="text-green-300/60 text-xs mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="relative border-t border-white/10 bg-black/20 py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="text-white/70 text-xs font-bold tracking-widest mx-6 shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1">

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  CATEGORIES                                             */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up">
          <section className="bg-white pt-8 pb-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-black text-gray-900 tracking-tight">Shop by Category</h2>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  See all <ChevronRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-4">
                {categories.map((cat, i) => {
                  const s = CAT_STYLES[i % CAT_STYLES.length];
                  return (
                    <Link
                      key={cat.id}
                      href={`/stores?category=${cat.id}`}
                      className="flex flex-col items-center gap-2 group"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto ${s.bg} ring-1 ${s.ring} rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md group-hover:ring-2 transition-all duration-300 ease-out`}
                      >
                        <span className="text-2xl sm:text-[28px]">{cat.emoji}</span>
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

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  PROMO BANNERS                                          */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="bg-gray-50 py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                {banners.map((banner, i) => (
                  <div
                    key={banner.id}
                    className={`shrink-0 w-[280px] sm:w-auto bg-gradient-to-br ${banner.gradient} rounded-2xl p-6 text-white cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group overflow-hidden relative`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* Big bg emoji */}
                    <div className="absolute right-3 bottom-3 text-[80px] leading-none opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all pointer-events-none select-none">
                      {banner.emoji}
                    </div>
                    <div className="relative z-10">
                      <div className="text-3xl mb-3">{banner.emoji}</div>
                      <h3 className="font-black text-lg leading-tight">{banner.title}</h3>
                      <p className="text-white/70 text-sm mt-1.5">{banner.subtitle}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
                        Shop now <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  POPULAR PRODUCTS                                       */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="bg-white py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Flame size={16} className="text-orange-500 fill-orange-400" />
                    <h2 className="text-base font-black text-gray-900 tracking-tight">Popular Near You</h2>
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

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  FEATURED STORES                                        */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="bg-gray-50 py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-black text-gray-900 tracking-tight">Featured Stores</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Top rated by your neighbours</p>
                </div>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredStores.map((store, i) => (
                  <div key={store.id} style={{ animationDelay: `${i * 80}ms` }}>
                    <StoreCard store={store} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  OPEN NOW                                               */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="bg-white py-10 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-black text-gray-900 tracking-tight">Open Now</h2>
                  <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-black px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {openStores.length} open
                  </span>
                </div>
                <Link href="/stores" className="text-xs text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                  See all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {openStores.map((store, i) => (
                  <div key={store.id} style={{ animationDelay: `${i * 80}ms` }}>
                    <StoreCard store={store} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  WHY US                                                 */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="py-14 bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-2">Why Parchunewala</p>
              <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">The smarter way to shop local</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { icon: "⚡", title: "10-Min Commerce",   desc: "From local shops within 2km — faster than any big platform.", bg: "bg-amber-50",  border: "border-amber-100" },
                  { icon: "📍", title: "Hyperlocal First",  desc: "Every store is real, nearby, and trusted by your neighbours.", bg: "bg-blue-50",   border: "border-blue-100"  },
                  { icon: "🤝", title: "Support Local",     desc: "Your order directly helps a kirana owner grow digitally.",     bg: "bg-green-50",  border: "border-green-100" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`${item.bg} ${item.border} border rounded-2xl p-7 card-lift group text-left`}
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* ═══════════════════════════════════════════════════════ */}
        {/*  BUSINESS CTA                                           */}
        {/* ═══════════════════════════════════════════════════════ */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="relative overflow-hidden bg-[#09090b] py-16">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-500/12 blur-[120px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[80px] -translate-x-1/4 translate-y-1/3" />
            </div>
            <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                <div className="max-w-lg">
                  <span className="inline-flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-black px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                    🏪 For Shop Owners
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                    Own a shop?<br />
                    <span className="gradient-text-green">Sell online.</span>
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    Join 38+ neighbourhood businesses. Manage orders, track earnings, grow your store — all in one dashboard. Completely free to start.
                  </p>
                  <div className="flex gap-10">
                    {[["38+", "Stores live"], ["₹28K+", "Avg/week"], ["0", "Setup fee"]].map(([val, lbl]) => (
                      <div key={lbl}>
                        <div className="text-white font-black text-2xl leading-none">{val}</div>
                        <div className="text-zinc-500 text-xs mt-1">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <Link
                    href="/auth/signup?role=shop"
                    className="btn-glow bg-green-500 hover:bg-green-400 text-white font-black px-9 py-4 rounded-2xl flex items-center justify-center gap-2.5 text-base shadow-lg shadow-green-950/50 transition-all"
                  >
                    <ShieldCheck size={18} />
                    Register Your Store
                  </Link>
                  <Link
                    href="/shop/dashboard"
                    className="glass hover:bg-white/10 text-white font-semibold px-9 py-4 rounded-2xl transition-all text-center"
                  >
                    View Shop Demo →
                  </Link>
                  <Link
                    href="/delivery"
                    className="text-center text-zinc-500 hover:text-zinc-300 transition-colors text-sm py-1"
                  >
                    Become a Delivery Partner →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Product Card                                                     */
/* ──────────────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: ProductWithStore }) {
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;
  const imgBg = PRODUCT_BG[product.category] ?? "bg-gray-50";

  return (
    <Link href={`/stores/${product.storeId}`} className="shrink-0 block">
      <div className="w-36 sm:w-40 bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift group cursor-pointer">
        {/* Image area */}
        <div className={`${imgBg} h-[104px] flex items-center justify-center relative overflow-hidden`}>
          <span className="text-[48px] leading-none group-hover:scale-110 transition-transform duration-300">
            {product.emoji}
          </span>
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="text-[11px] text-gray-900 font-bold line-clamp-2 leading-snug mb-1">
            {product.name}
          </p>
          <p className="text-[10px] text-gray-400 mb-2.5">{product.unit}</p>
          <div className="flex items-center justify-between gap-1">
            <div className="leading-none">
              <span className="text-sm font-black text-gray-900">₹{product.price}</span>
              {discount > 0 && (
                <span className="text-[10px] text-gray-400 line-through ml-1">₹{product.mrp}</span>
              )}
            </div>
            <button className="btn-add bg-green-500 hover:bg-green-600 active:scale-90 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all shadow-sm shadow-green-200/60">
              ADD
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Store Card                                                       */
/* ──────────────────────────────────────────────────────────────── */
function StoreCard({ store }: { store: (typeof stores)[0] }) {
  return (
    <Link href={`/stores/${store.id}`} className="block h-full">
      <div
        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift-green cursor-pointer group h-full ${
          !store.isOpen ? "opacity-60" : ""
        }`}
      >
        {/* Cover */}
        <div
          className={`bg-gradient-to-br ${store.coverColor} h-36 flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-[64px] leading-none group-hover:scale-110 transition-transform duration-300 relative z-10">
            {store.image}
          </span>

          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-20">
              <span className="bg-white text-gray-900 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Closed
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
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
