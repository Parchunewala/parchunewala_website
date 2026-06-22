"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, animate,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin, Star, Clock, ArrowRight, ShieldCheck, Zap,
  Package, Store, Users, TrendingUp, ChevronDown,
  Calendar, CheckCircle2, Sparkles,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { stores, categories } from "@/lib/data";

/* ─── Types ──────────────────────────────────────────────────── */

type ProductWithStore = (typeof stores)[0]["products"][0] & {
  storeId: string;
  storeName: string;
};

/* ─── Static data ────────────────────────────────────────────── */

const POPULAR_PRODUCTS: ProductWithStore[] = stores
  .flatMap((s) =>
    s.products.filter((p) => p.inStock).slice(0, 3).map((p) => ({ ...p, storeId: s.id, storeName: s.name }))
  )
  .slice(0, 12);

const SLOT_BG: Record<string, string> = {
  grocery:    "bg-green-900/40",
  dairy:      "bg-orange-900/40",
  cosmetics:  "bg-pink-900/40",
  snacks:     "bg-yellow-900/40",
  household:  "bg-blue-900/40",
  stationery: "bg-indigo-900/40",
  hosiery:    "bg-purple-900/40",
  gifts:      "bg-red-900/40",
};

const CAT_COLORS = [
  "from-green-500/20 to-green-600/10 border-green-500/20",
  "from-pink-500/20 to-pink-600/10 border-pink-500/20",
  "from-blue-500/20 to-blue-600/10 border-blue-500/20",
  "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20",
  "from-purple-500/20 to-purple-600/10 border-purple-500/20",
  "from-red-500/20 to-red-600/10 border-red-500/20",
  "from-orange-500/20 to-orange-600/10 border-orange-500/20",
  "from-amber-500/20 to-amber-600/10 border-amber-500/20",
];

const DELIVERY_SLOTS = [
  { id: "morning",   icon: "🌅", time: "7 AM – 11 AM",  label: "Morning",   avail: "8 slots left"  },
  { id: "afternoon", icon: "☀️",  time: "12 PM – 4 PM",  label: "Afternoon",  avail: "12 slots left" },
  { id: "evening",   icon: "🌆", time: "5 PM – 9 PM",   label: "Evening",    avail: "5 slots left"  },
];

const FEATURES = [
  {
    icon: <Calendar size={24} />,
    title: "Slot-Based Delivery",
    desc: "Pick a morning, afternoon, or evening window that fits your schedule. No more waiting around.",
    gradient: "from-green-500/15 to-cyan-500/10",
    border: "border-green-500/20",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
  },
  {
    icon: <Store size={24} />,
    title: "38+ Local Stores",
    desc: "Every shop listed is a real neighbourhood kirana within 2km of you. Genuine. Trusted. Local.",
    gradient: "from-purple-500/15 to-pink-500/10",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Smart Inventory",
    desc: "Stores update stock in real-time so you always see what's actually available. No surprises.",
    gradient: "from-cyan-500/15 to-blue-500/10",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    icon: <Package size={24} />,
    title: "Live Order Tracking",
    desc: "From shop to your door — follow every step. Know exactly when to expect your delivery.",
    gradient: "from-amber-500/15 to-orange-500/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
  },
  {
    icon: <Users size={24} />,
    title: "Support Local Business",
    desc: "Every rupee you spend goes directly to your neighbourhood shopkeeper's pocket.",
    gradient: "from-rose-500/15 to-pink-500/10",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Quality Guaranteed",
    desc: "All stores are verified, rated, and reviewed by real customers in your neighbourhood.",
    gradient: "from-emerald-500/15 to-teal-500/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
];

const TESTIMONIALS = [
  { name: "Priya Sharma",    area: "Sector 15",  rating: 5, text: "Finally an app that actually supports local shops! The slot system is so convenient — I plan my deliveries around my schedule, not theirs." },
  { name: "Rahul Gupta",     area: "Sector 18",  rating: 5, text: "Ordered groceries from Sharma Kirana through Parchunewala. Everything was fresh and the evening slot delivery was perfectly on time." },
  { name: "Sneha Verma",     area: "Block C",    rating: 5, text: "Love that I can support local businesses while getting proper delivery service. Much better quality than the big apps." },
  { name: "Arjun Singh",     area: "Phase 2",    rating: 5, text: "The morning slot is perfect for me. Order the night before, get fresh groceries by 10 AM. Changed my entire routine." },
  { name: "Kavitha Nair",    area: "Sector 15",  rating: 5, text: "Parchunewala is what quick commerce should have been from the start — real shops, real products, actual community." },
  { name: "Deepak Joshi",    area: "Sector 18",  rating: 4, text: "Really impressed with the inventory accuracy. What I order is actually in stock. The big apps could learn from this." },
];

const STATS_DATA = [
  { value: 38,    suffix: "+",  label: "Local Stores",    icon: "🏪" },
  { value: 2840,  suffix: "+",  label: "Orders Placed",   icon: "📦" },
  { value: 4.8,   suffix: "★",  label: "Avg. Rating",     icon: "⭐", decimal: 1 },
  { value: 100,   suffix: "%",  label: "Local Businesses", icon: "🤝" },
];

/* ─── Animation variants ─────────────────────────────────────── */

type Ease4 = [number, number, number, number];
const SPRING: Ease4 = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: SPRING } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: SPRING } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: SPRING } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerFast = {
  visible: { transition: { staggerChildren: 0.06 } },
};
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.55, ease: SPRING } },
};

/* ─── Hooks ──────────────────────────────────────────────────── */

function useAnimatedCounter(target: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return controls.stop;
  }, [inView, target, decimals]);

  return ref;
}

/* ─── MagneticButton ─────────────────────────────────────────── */

function MagneticButton({
  children, href, variant = "primary", className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  const base =
    "relative inline-flex items-center justify-center gap-2 font-bold text-sm rounded-2xl px-7 py-3.5 transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-900/50",
    outline: "border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    ghost:   "text-green-400 hover:text-green-300 hover:bg-green-500/10",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}

/* ─── Counter ────────────────────────────────────────────────── */

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useAnimatedCounter(value, decimals);
  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */

function Section({
  children, className = "", id,
}: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Main Component                                                  */
/* ═══════════════════════════════════════════════════════════════ */

export default function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [selectedSlot, setSelectedSlot] = useState("morning");
  const openStores = stores.filter((s) => s.isOpen);
  const featuredStores = stores.filter((s) => s.isFeatured && s.isOpen);

  return (
    <div className="min-h-screen bg-[#030308] text-white pb-safe md:pb-0 overflow-x-hidden">
      <Navbar cartCount={0} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  HERO                                                   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-green-500/[0.07] blur-[160px] animate-orb" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.05] blur-[140px] animate-orb" style={{ animationDelay: "4s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[120px]" />
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative flex-1 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-20 md:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left column */}
              <motion.div variants={stagger} initial="hidden" animate="visible">
                {/* Badge */}
                <motion.div variants={fadeUp}>
                  <button className="inline-flex items-center gap-2 glass-white rounded-full px-4 py-2 text-xs font-semibold text-white/80 mb-8 hover:bg-white/12 transition-colors">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full live-glow" />
                    <Sparkles size={11} className="text-green-400" />
                    Now live in Sector 15, Noida
                    <ChevronDown size={11} className="text-white/40" />
                  </button>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  variants={fadeUp}
                  className="font-black leading-none tracking-tighter text-white mb-6"
                  style={{ fontSize: "clamp(44px, 7.5vw, 88px)" }}
                >
                  Your{" "}
                  <span className="gradient-text">Neighbourhood</span>
                  <br />
                  <span className="gradient-text-white">Connected.</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-md"
                >
                  Order from trusted local kirana stores near you.
                  Choose your delivery slot. Support neighbourhood businesses.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
                  <MagneticButton href="/stores" variant="primary">
                    <Store size={15} />
                    Browse Stores
                  </MagneticButton>
                  <MagneticButton href="/auth/signup?role=shop" variant="outline">
                    List Your Shop
                    <ArrowRight size={14} />
                  </MagneticButton>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  variants={staggerFast}
                  className="flex items-center gap-6 sm:gap-8"
                >
                  {[
                    { v: "38+",   l: "Local Stores" },
                    { v: "4.8★",  l: "Avg Rating"   },
                    { v: "2.8K+", l: "Orders"       },
                  ].map((s) => (
                    <motion.div key={s.l} variants={scaleIn} className="text-center sm:text-left">
                      <div className="text-xl font-black text-white leading-none">{s.v}</div>
                      <div className="text-white/40 text-xs mt-0.5 font-medium">{s.l}</div>
                    </motion.div>
                  ))}
                  <div className="w-px h-8 bg-white/10 hidden sm:block" />
                  <motion.div variants={scaleIn} className="flex -space-x-2">
                    {["🧑", "👩", "👨", "🧑‍💼"].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-sm">
                        {e}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right column — floating store cards */}
              <div className="hidden lg:block relative h-[500px]">
                {/* Floating card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-10 left-10"
                >
                  <motion.div
                    animate={{ y: [0, -16, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="glass-white rounded-2xl p-5 w-52 shadow-2xl shadow-black/40"
                  >
                    <div className="text-3xl mb-2">🏪</div>
                    <div className="font-black text-white text-sm mb-0.5">Sharma Kirana</div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">Open Now</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 flex items-center gap-1"><Clock size={10} />10–15 min</span>
                      <span className="flex items-center gap-0.5"><Star size={9} className="fill-amber-400 text-amber-400" /><span className="text-amber-400 font-bold">4.8</span></span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-40 right-4"
                >
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.2 }}
                    className="glass-white rounded-2xl p-5 w-56 shadow-2xl shadow-black/40"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-xl">🏬</div>
                      <div>
                        <div className="font-black text-white text-xs">Singh Super Store</div>
                        <div className="text-green-400 text-[10px] font-medium">Express Delivery</div>
                      </div>
                    </div>
                    <div className="bg-green-500/15 border border-green-500/20 rounded-xl px-3 py-2 text-center">
                      <div className="text-green-400 text-xs font-black">Evening Slot</div>
                      <div className="text-white/60 text-[10px]">5 PM – 9 PM · 5 slots left</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating card 3 — slot booking */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-8 left-20"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.8 }}
                    className="glass-white rounded-2xl p-4 w-48 shadow-2xl shadow-black/40"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 size={14} className="text-green-400" />
                      <span className="text-xs font-black text-white">Slot Booked!</span>
                    </div>
                    <div className="space-y-1.5">
                      {["🌅 Morning · 7–11 AM", "💄 Priya Cosmetics", "📦 3 items · ₹534"].map((line, i) => (
                        <div key={i} className="text-[10px] text-white/55 font-medium">{line}</div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative pb-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-1.5 text-white/25 text-xs font-medium"
          >
            <span>Scroll</span>
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  MARQUEE                                                */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="border-y border-white/[0.06] bg-white/[0.02] py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {Array(2).fill([
            "🏪 38+ LOCAL STORES",
            "🗓️ SLOT-BASED DELIVERY",
            "⭐ 4.8 AVG RATING",
            "🤝 SUPPORT NEIGHBOURHOOD",
            "📦 REAL-TIME TRACKING",
            "✅ VERIFIED SHOPS",
            "🎉 FREE DELIVERY AVAILABLE",
            "📍 HYPERLOCAL FIRST",
          ]).flat().map((item, i) => (
            <span key={i} className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mx-8 shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  CATEGORIES                                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              What would you like today?
            </h2>
          </motion.div>

          <motion.div variants={staggerFast} className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} variants={scaleIn}>
                <Link
                  href={`/stores?category=${cat.id}`}
                  className="flex flex-col items-center gap-2.5 group"
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br ${CAT_COLORS[i % CAT_COLORS.length]} border rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-sm`}
                  >
                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-white/50 group-hover:text-white/80 text-center leading-tight transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  FEATURES                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-28 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="max-w-2xl mb-14">
            <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">Why Parchunewala</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
              Built for the
              <br />
              <span className="gradient-text">neighbourhood.</span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed">
              We didn't build another quick-delivery app. We built a platform that connects you
              with real local shops, real people, and real community.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`gradient-border p-6 rounded-2xl cursor-default bg-gradient-to-br ${f.gradient} border ${f.border}`}
              >
                <div className={`w-11 h-11 ${f.iconBg} rounded-xl flex items-center justify-center ${f.iconColor} mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-black text-white mb-2 text-base">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  DELIVERY SLOTS                                         */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-28 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div variants={stagger}>
              <motion.p variants={fadeUp} className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">
                How it works
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
                Choose your
                <br />
                <span className="gradient-text">delivery slot.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/45 text-base leading-relaxed mb-8">
                Unlike rushed 10-minute delivery, we believe in scheduled, reliable service.
                Pick a window that works for you — we'll be there.
              </motion.p>

              <motion.div variants={stagger} className="space-y-3">
                {[
                  { n: "01", title: "Browse & Add to Cart",   desc: "Explore products from verified neighbourhood stores."    },
                  { n: "02", title: "Pick a Delivery Slot",   desc: "Morning, afternoon, or evening — you choose the time."   },
                  { n: "03", title: "Relax. It Arrives.",      desc: "Track your order live. Get it delivered on schedule."    },
                ].map((step) => (
                  <motion.div
                    key={step.n}
                    variants={fadeLeft}
                    className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-default"
                  >
                    <span className="text-green-500 font-black text-sm mt-0.5 w-6 shrink-0">{step.n}</span>
                    <div>
                      <div className="font-bold text-white text-sm mb-0.5">{step.title}</div>
                      <div className="text-white/40 text-xs leading-relaxed">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Slot picker */}
            <motion.div variants={fadeRight} className="space-y-3">
              <div className="text-xs text-white/40 font-semibold mb-4 uppercase tracking-widest">
                Available today
              </div>
              {DELIVERY_SLOTS.map((slot) => (
                <motion.button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    selectedSlot === slot.id
                      ? "bg-green-500/10 border-green-500/40 shadow-lg shadow-green-500/10"
                      : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{slot.icon}</span>
                      <div>
                        <div className="font-black text-white text-sm">{slot.label}</div>
                        <div className="text-white/40 text-xs">{slot.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold ${selectedSlot === slot.id ? "text-green-400" : "text-white/30"}`}>
                        {selectedSlot === slot.id ? "✓ Selected" : slot.avail}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {selectedSlot === slot.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-green-500/20 text-xs text-green-400/70 font-medium">
                          Orders close at midnight for same-day delivery
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 flex items-center justify-between"
              >
                <div className="text-sm font-bold text-white">Start your first order</div>
                <Link href="/stores" className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-black px-4 py-2 rounded-xl transition-colors">
                  Browse Stores <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  POPULAR PRODUCTS                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
            <div>
              <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">Popular</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Best-sellers near you</h2>
            </div>
            <Link href="/stores" className="hidden sm:flex items-center gap-1 text-sm text-white/40 hover:text-green-400 font-semibold transition-colors">
              See all <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div variants={fadeLeft} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {POPULAR_PRODUCTS.map((product, i) => (
              <ProductCard key={`${product.storeId}-${product.id}`} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  STATS                                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS_DATA.map((s) => (
              <motion.div
                key={s.label}
                variants={scaleIn}
                className="card-dark rounded-2xl p-6 text-center cursor-default"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-black gradient-text leading-none mb-2">
                  <Counter value={s.value} suffix={s.suffix} decimals={s.decimal} />
                </div>
                <div className="text-white/40 text-sm font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  FEATURED STORES                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-8">
            <div>
              <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">Stores</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Featured near you</h2>
            </div>
            <Link href="/stores" className="hidden sm:flex items-center gap-1 text-sm text-white/40 hover:text-green-400 font-semibold transition-colors">
              All stores <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {openStores.slice(0, 3).map((store, i) => (
              <motion.div key={store.id} variants={scaleIn}>
                <StoreCard store={store} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-green-500/30 hover:bg-green-500/5 text-white/60 hover:text-white text-sm font-semibold px-6 py-3 rounded-2xl transition-all"
            >
              View all {stores.length} stores <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  TESTIMONIALS                                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-24 border-t border-white/[0.05] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">Love</p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Neighbours love it</h2>
          </motion.div>
        </div>

        <div className="relative">
          {/* Marquee row 1 */}
          <div className="flex gap-4 overflow-hidden mb-4">
            <div className="flex gap-4 animate-marquee shrink-0">
              {[...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)].map((r, i) => (
                <TestimonialCard key={i} review={r} />
              ))}
            </div>
            <div className="flex gap-4 animate-marquee shrink-0" aria-hidden>
              {[...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(0, 3)].map((r, i) => (
                <TestimonialCard key={i + 100} review={r} />
              ))}
            </div>
          </div>
          {/* Marquee row 2 — reverse */}
          <div className="flex gap-4 overflow-hidden">
            <div className="flex gap-4 shrink-0" style={{ animation: "marquee 22s linear infinite reverse" }}>
              {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)].map((r, i) => (
                <TestimonialCard key={i} review={r} />
              ))}
            </div>
            <div className="flex gap-4 shrink-0" aria-hidden style={{ animation: "marquee 22s linear infinite reverse" }}>
              {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)].map((r, i) => (
                <TestimonialCard key={i + 100} review={r} />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030308] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030308] to-transparent pointer-events-none" />
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  BUSINESS CTA                                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <Section className="py-20 md:py-28 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14"
            style={{ background: "linear-gradient(135deg, #0d1a0f 0%, #0f2318 50%, #0a1a12 100%)" }}
          >
            {/* BG decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[130px] translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px] -translate-x-1/4 translate-y-1/3" />
              <div className="absolute inset-0 dot-grid-green opacity-50" />
            </div>

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <motion.div variants={fadeLeft} className="max-w-lg">
                <span className="inline-flex items-center gap-1.5 glass-green text-green-400 text-xs font-black px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
                  🏪 For Shop Owners
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                  Own a shop?
                  <br />
                  <span className="gradient-text">Sell online.</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  Join 38+ neighbourhood businesses on Parchunewala. Manage orders, track
                  earnings, grow your store — completely free to start.
                </p>
                <div className="flex gap-10">
                  {[["38+", "Stores live"], ["₹28K+", "Avg/week"], ["₹0", "Setup fee"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-white font-black text-2xl leading-none">{val}</div>
                      <div className="text-white/30 text-xs mt-1">{lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeRight} className="flex flex-col gap-3 w-full lg:w-auto shrink-0">
                <MagneticButton href="/auth/signup?role=shop" variant="primary" className="w-full lg:w-auto justify-center px-10 py-4 text-base">
                  <ShieldCheck size={18} />
                  Register Your Store
                </MagneticButton>
                <Link
                  href="/shop/dashboard"
                  className="w-full lg:w-auto justify-center flex items-center gap-2 border border-white/10 hover:border-white/25 text-white/60 hover:text-white font-semibold px-10 py-4 rounded-2xl transition-all text-sm"
                >
                  View Shop Demo →
                </Link>
                <Link href="/delivery" className="text-center text-white/25 hover:text-white/50 transition-colors text-sm py-1">
                  Become a Delivery Partner →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  ProductCard                                                      */
/* ──────────────────────────────────────────────────────────────── */

function ProductCard({ product, index }: { product: ProductWithStore; index: number }) {
  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  const bg = SLOT_BG[product.category] ?? "bg-white/5";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="shrink-0"
    >
      <Link href={`/stores/${product.storeId}`} className="block w-36 sm:w-40">
        <div className="card-dark rounded-2xl overflow-hidden cursor-pointer group">
          <div className={`${bg} h-[100px] flex items-center justify-center relative`}>
            <span className="text-[44px] leading-none group-hover:scale-110 transition-transform duration-300">
              {product.emoji}
            </span>
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>
          <div className="p-3">
            <p className="text-[11px] text-white/80 font-semibold line-clamp-2 leading-snug mb-1">{product.name}</p>
            <p className="text-[10px] text-white/30 mb-2.5">{product.unit}</p>
            <div className="flex items-center justify-between gap-1">
              <div>
                <span className="text-sm font-black text-white">₹{product.price}</span>
                {discount > 0 && <span className="text-[10px] text-white/30 line-through ml-1">₹{product.mrp}</span>}
              </div>
              <button className="btn-add bg-green-500 hover:bg-green-400 active:scale-90 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all">
                ADD
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  StoreCard                                                        */
/* ──────────────────────────────────────────────────────────────── */

function StoreCard({ store }: { store: (typeof stores)[0] }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <Link href={`/stores/${store.id}`} className="block">
        <div className={`card-dark rounded-2xl overflow-hidden cursor-pointer group ${!store.isOpen ? "opacity-50" : ""}`}>
          <div className={`bg-gradient-to-br ${store.coverColor} h-36 flex items-center justify-center relative overflow-hidden`}>
            <span className="text-[60px] leading-none group-hover:scale-110 transition-transform duration-300 relative z-10">
              {store.image}
            </span>
            {!store.isOpen && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-20">
                <span className="bg-white/90 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
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
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="font-black text-white/90 group-hover:text-green-400 transition-colors leading-tight text-[15px]">
                {store.name}
              </h3>
              <div className="flex items-center gap-0.5 shrink-0 bg-amber-500/10 border border-amber-500/20 rounded-lg px-1.5 py-0.5">
                <Star size={9} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-amber-400">{store.rating}</span>
              </div>
            </div>
            <p className="text-xs text-white/30 mb-3 line-clamp-1">
              {store.area} · {store.categories.slice(0, 2).join(", ")}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-green-400 font-bold">
                <Clock size={10} />{store.deliveryTime}
              </div>
              <div className="flex items-center gap-1 text-white/30">
                <MapPin size={10} />{store.distance}
              </div>
              <div className="ml-auto text-[11px] text-white/25">Min ₹{store.minOrder}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  TestimonialCard                                                  */
/* ──────────────────────────────────────────────────────────────── */

function TestimonialCard({ review }: { review: typeof TESTIMONIALS[0] }) {
  return (
    <div className="shrink-0 w-72 sm:w-80 card-dark rounded-2xl p-5 cursor-default">
      <div className="flex gap-0.5 mb-3">
        {Array(review.rating).fill(0).map((_, i) => (
          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">{review.text}</p>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-sm font-black text-green-400">
          {review.name[0]}
        </div>
        <div>
          <div className="text-white/80 text-xs font-bold">{review.name}</div>
          <div className="flex items-center gap-1 text-white/30 text-[10px]">
            <MapPin size={8} />{review.area}
          </div>
        </div>
      </div>
    </div>
  );
}
