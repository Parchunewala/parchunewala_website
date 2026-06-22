import Link from "next/link";
import { MapPin, Star, Clock, ChevronRight, Zap, Store, ShieldCheck, ArrowRight, Package } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { stores, categories, banners } from "@/lib/data";

const CAT_STYLES = [
  { bg: "bg-green-100",  ring: "ring-green-300",  text: "text-green-700",  glow: "hover:shadow-green-200"  },
  { bg: "bg-pink-100",   ring: "ring-pink-300",   text: "text-pink-700",   glow: "hover:shadow-pink-200"   },
  { bg: "bg-blue-100",   ring: "ring-blue-300",   text: "text-blue-700",   glow: "hover:shadow-blue-200"   },
  { bg: "bg-yellow-100", ring: "ring-yellow-300", text: "text-yellow-700", glow: "hover:shadow-yellow-200" },
  { bg: "bg-purple-100", ring: "ring-purple-300", text: "text-purple-700", glow: "hover:shadow-purple-200" },
  { bg: "bg-red-100",    ring: "ring-red-300",    text: "text-red-700",    glow: "hover:shadow-red-200"    },
  { bg: "bg-orange-100", ring: "ring-orange-300", text: "text-orange-700", glow: "hover:shadow-orange-200" },
  { bg: "bg-amber-100",  ring: "ring-amber-300",  text: "text-amber-700",  glow: "hover:shadow-amber-200"  },
];

const HERO_TILES = [
  { emoji: "🛒", name: "Groceries",  grad: "from-green-500/20 to-emerald-600/20"  },
  { emoji: "💄", name: "Cosmetics",  grad: "from-pink-500/20 to-rose-600/20"      },
  { emoji: "📚", name: "Stationery", grad: "from-blue-500/20 to-indigo-600/20"    },
  { emoji: "🏠", name: "Household",  grad: "from-yellow-500/20 to-orange-600/20"  },
  { emoji: "🥛", name: "Dairy",      grad: "from-orange-500/20 to-amber-600/20"   },
  { emoji: "🍿", name: "Snacks",     grad: "from-amber-500/20 to-yellow-600/20"   },
  { emoji: "🧦", name: "Hosiery",    grad: "from-purple-500/20 to-violet-600/20"  },
  { emoji: "🎁", name: "Gifts",      grad: "from-red-500/20 to-rose-600/20"       },
  { emoji: "⚡", name: "Express",    grad: "from-cyan-500/20 to-teal-600/20"      },
];

export default function HomePage() {
  const featuredStores = stores.filter((s) => s.isFeatured);
  const openStores = stores.filter((s) => s.isOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={2} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #030d06 0%, #0a2010 40%, #063320 70%, #041a0e 100%)" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 hero-grid pointer-events-none" />

        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] animate-blob"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] animate-blob"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] animate-float-alt"
            style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)", animationDuration: "10s" }}
          />
        </div>

        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(74,222,128,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left: Content */}
            <div>
              {/* Badge */}
              <div
                className="animate-fadeInUp inline-flex items-center gap-2.5 bg-green-400/12 border border-green-400/30 rounded-full px-4 py-2 mb-7"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <Zap size={13} className="text-green-400 fill-green-400" />
                <span className="text-green-300 text-sm font-bold tracking-wide">Delivering in 10 minutes</span>
              </div>

              {/* Heading */}
              <h1
                className="animate-fadeInUp text-5xl sm:text-6xl md:text-[68px] font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ animationDelay: "0.15s" }}
              >
                Your Area.<br />
                <span className="gradient-text-green">Your Stores.</span><br />
                <span className="text-white/90">Delivered</span>{" "}
                <span className="gradient-text-green">Fast.</span>
              </h1>

              <p
                className="animate-fadeInUp text-green-100/55 text-base md:text-[17px] mb-9 max-w-md leading-relaxed"
                style={{ animationDelay: "0.3s" }}
              >
                Order from trusted neighborhood kirana shops — groceries, cosmetics, stationery & more. Right to your door.
              </p>

              {/* CTAs */}
              <div
                className="animate-fadeInUp flex flex-col sm:flex-row gap-3 mb-10"
                style={{ animationDelay: "0.45s" }}
              >
                <Link
                  href="/stores"
                  className="btn-glow inline-flex items-center justify-center gap-2.5 bg-green-400 hover:bg-green-300 text-gray-900 font-black px-8 py-4 rounded-2xl text-base transition-all"
                >
                  <Store size={18} />
                  Browse Stores Near You
                </Link>
                <Link
                  href="/auth/signup?role=shop"
                  className="glass inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:bg-white/15 text-base"
                >
                  List Your Shop
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Social proof */}
              <div
                className="animate-fadeInUp flex items-center gap-3"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex -space-x-2">
                  {["🧑", "👩", "👨", "🧑‍💼", "👩‍💼"].map((e, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 glass rounded-full border-2 border-white/30 flex items-center justify-center text-base shadow-lg"
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-white text-sm font-bold">2,840+ orders placed</div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-white/50 text-xs ml-1">4.8 avg rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating category tiles */}
            <div
              className="hidden lg:grid grid-cols-3 gap-3 relative animate-fadeInRight"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="absolute inset-0 rounded-3xl blur-3xl bg-green-400/5 pointer-events-none" />
              {HERO_TILES.map((tile, i) => (
                <Link
                  key={i}
                  href="/stores"
                  className={`glass bg-gradient-to-br ${tile.grad} rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/15 hover:scale-105 transition-all cursor-pointer`}
                  style={{
                    animation: `float ${3.2 + (i % 3) * 0.9}s ease-in-out infinite`,
                    animationDelay: `${(i * 0.28) % 2.1}s`,
                  }}
                >
                  <span className="text-[30px] leading-none">{tile.emoji}</span>
                  <span className="text-[10px] text-white/65 font-bold text-center leading-tight tracking-wide">{tile.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative glass-dark border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-around sm:justify-start sm:gap-12">
              {[
                { value: "38+",    label: "Local Stores",   icon: "🏪" },
                { value: "14 min", label: "Avg. Delivery",  icon: "⚡" },
                { value: "2,840+", label: "Happy Orders",   icon: "🎉" },
                { value: "4.8★",   label: "Avg. Rating",    icon: "⭐" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="animate-fadeInUp text-center sm:text-left"
                  style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                >
                  <div className="text-white font-black text-xl leading-none">{s.value}</div>
                  <div className="text-green-300/50 text-xs mt-0.5">{s.icon} {s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-green-500 shrink-0" />
          <span className="text-gray-400">Showing stores in</span>
          <button className="font-bold text-gray-900 underline decoration-dotted underline-offset-2 hover:text-green-600 transition-colors">
            Sector 15, Noida 201301
          </button>
          <button className="text-green-500 text-xs font-semibold hover:underline">(change)</button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 space-y-16">

        {/* ── Categories ─────────────────────────────────────── */}
        <AnimateOnScroll direction="up">
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Shop by Category</h2>
                <p className="text-xs text-gray-400 mt-0.5">Tap to explore what's near you</p>
              </div>
              <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                All stores <ChevronRight size={14} />
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible sm:pb-0">
              {categories.map((cat, i) => {
                const s = CAT_STYLES[i % CAT_STYLES.length];
                return (
                  <Link
                    key={cat.id}
                    href={`/stores?category=${cat.id}`}
                    className={`flex flex-col items-center gap-2.5 shrink-0 sm:shrink cursor-pointer group`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className={`w-[70px] h-[70px] sm:w-full sm:aspect-square ${s.bg} rounded-2xl flex items-center justify-center
                        group-hover:scale-110 group-hover:shadow-lg ${s.glow}
                        ring-1 ${s.ring} transition-all duration-300 ease-out`}
                    >
                      <span className="text-3xl group-hover:animate-float transition-all">{cat.emoji}</span>
                    </div>
                    <span className={`text-xs font-bold text-center leading-tight ${s.text} group-hover:opacity-80 transition-opacity`}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Promo banners ──────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {banners.map((banner, i) => (
                <div
                  key={banner.id}
                  className={`bg-gradient-to-br ${banner.gradient} rounded-2xl p-6 text-white cursor-pointer
                    hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group
                    shimmer-wrap relative overflow-hidden`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[80px] opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all leading-none pointer-events-none">
                    {banner.emoji}
                  </div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{banner.emoji}</div>
                    <h3 className="font-black text-lg leading-tight">{banner.title}</h3>
                    <p className="text-white/70 text-sm mt-1.5">{banner.subtitle}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-white/90 text-xs font-bold">
                      Shop now <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Featured stores ────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Featured Stores</h2>
                <p className="text-xs text-gray-400 mt-0.5">Top rated by your neighbours</p>
              </div>
              <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredStores.map((store, i) => (
                <div
                  key={store.id}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Open now ───────────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-gray-900">Open Now</h2>
                <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  {openStores.length} stores
                </span>
              </div>
              <Link href="/stores" className="text-sm text-green-600 font-bold flex items-center gap-0.5 hover:gap-1.5 transition-all">
                See all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {openStores.map((store, i) => (
                <div key={store.id} style={{ animationDelay: `${i * 80}ms` }}>
                  <StoreCard store={store} />
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Why Parchunewala ───────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm p-8 md:p-12">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-green-50 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-emerald-50 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative text-center mb-10">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full mb-3 tracking-wide uppercase">
                Why us
              </span>
              <h2 className="text-3xl font-black text-gray-900">Why Parchunewala?</h2>
              <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
                The neighborhood commerce platform that puts local first
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "⚡",
                  title: "10-Min Commerce",
                  desc: "Get deliveries from local shops in 10–15 minutes. Faster than any big platform.",
                  bg: "bg-amber-50 border-amber-200",
                  iconBg: "bg-amber-100",
                  gradient: "from-amber-500 to-orange-500",
                },
                {
                  emoji: "📍",
                  title: "Hyperlocal First",
                  desc: "Every store on Parchunewala is within 2km of you. Real neighborhood shopping.",
                  bg: "bg-blue-50 border-blue-200",
                  iconBg: "bg-blue-100",
                  gradient: "from-blue-500 to-indigo-500",
                },
                {
                  emoji: "🤝",
                  title: "Support Local",
                  desc: "Your order directly helps a local kirana owner grow their business digitally.",
                  bg: "bg-green-50 border-green-200",
                  iconBg: "bg-green-100",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`${item.bg} border rounded-2xl p-6 text-center group card-lift`}
                >
                  <div className={`${item.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.emoji}
                  </div>
                  <h3 className="font-black text-gray-900 mb-2 text-base">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── How it works ───────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-900">How it works</h2>
              <p className="text-gray-400 text-sm mt-1">Order in 3 simple steps</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
              {/* Connector line */}
              <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200" />
              {[
                { step: "01", emoji: "📍", title: "Set Your Location", desc: "We find neighborhood shops within 2km of you." },
                { step: "02", emoji: "🛒", title: "Pick & Add to Cart", desc: "Browse products, add items from multiple shops." },
                { step: "03", emoji: "⚡", title: "Delivered in Minutes", desc: "Your order reaches your door in 10–15 minutes." },
              ].map((item, i) => (
                <div key={item.step} className="relative text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm card-lift group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full">
                    {item.step}
                  </div>
                  <div className="text-5xl mb-3 mt-2 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                  <h3 className="font-black text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* ── Business CTA ───────────────────────────────────── */}
        <AnimateOnScroll direction="up" delay={50}>
          <section
            className="relative rounded-3xl p-8 md:p-12 text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d1a10 100%)" }}
          >
            {/* Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] bg-green-500/10 translate-x-1/3 -translate-y-1/3 animate-float-alt" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[60px] bg-emerald-500/8 -translate-x-1/4 translate-y-1/4 animate-float" />
            </div>
            <div className="absolute inset-0 hero-grid opacity-50 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-black px-3 py-1.5 rounded-full mb-4 tracking-wide">
                  🏪 FOR SHOP OWNERS
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                  Own a local shop?<br />
                  <span className="gradient-text-green">Start earning online.</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Join 38+ neighborhood businesses on Parchunewala. Get orders, manage inventory, track earnings — all from one dashboard. Completely free to start.
                </p>

                <div className="flex gap-6 mt-5">
                  {[["38+", "Stores on platform"], ["₹28K+", "Avg weekly earnings"], ["Free", "To list your store"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-white font-black text-xl">{val}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/auth/signup?role=shop"
                  className="btn-glow bg-green-500 hover:bg-green-400 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2.5 text-base shadow-lg shadow-green-950/50"
                >
                  <ShieldCheck size={18} />
                  Register Your Store
                </Link>
                <Link
                  href="/shop/dashboard"
                  className="glass hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base text-center"
                >
                  View Shop Demo →
                </Link>
                <Link
                  href="/delivery"
                  className="text-center text-gray-500 hover:text-gray-300 transition-colors text-sm font-medium py-1"
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

function StoreCard({ store }: { store: (typeof stores)[0] }) {
  return (
    <Link href={`/stores/${store.id}`}>
      <div
        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 card-lift-green cursor-pointer group ${
          !store.isOpen ? "opacity-60" : ""
        }`}
      >
        {/* Cover */}
        <div className={`bg-gradient-to-br ${store.coverColor} h-36 flex items-center justify-center relative overflow-hidden shimmer-wrap`}>
          <span className="text-6xl group-hover:scale-110 transition-transform duration-400 relative z-10">{store.image}</span>

          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-20">
              <span className="bg-white text-gray-900 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Closed
              </span>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
            {store.deliveryFee === 0 && store.isOpen && (
              <span className="bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                Free Delivery
              </span>
            )}
            {store.tags.includes("Express Delivery") && store.isOpen && (
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ml-auto shadow">
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

          <p className="text-xs text-gray-400 mb-3 line-clamp-1">{store.area} · {store.categories.slice(0, 2).join(", ")}</p>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <Clock size={11} />{store.deliveryTime}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={11} />{store.distance}
            </div>
            <div className="ml-auto text-[11px] text-gray-400">Min ₹{store.minOrder}</div>
          </div>

          {store.tags.length > 0 && (
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {store.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-bold">
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
