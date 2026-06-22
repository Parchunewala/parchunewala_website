"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ShoppingCart, MapPin, Search, Menu, X, User, Package,
  ChevronDown, Zap, Home, Store,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { href: "/",           icon: Home,    label: "Home"    },
  { href: "/stores",     icon: Store,   label: "Stores"  },
  { href: "/orders",     icon: Package, label: "Orders"  },
  { href: "/auth/login", icon: User,    label: "Account" },
];

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = pathname.startsWith("/stores") || pathname.startsWith("/orders") || pathname.startsWith("/cart") || pathname.startsWith("/auth");

  return (
    <>
      {/* ── Top Navbar ─────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled || isLight
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-transparent border-b border-white/[0.06]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex items-center h-[62px] gap-3`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 mr-1">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-base">P</span>
              </div>
              <div className="hidden sm:block leading-none">
                <span className={`font-black text-[17px] ${scrolled || isLight ? "text-gray-900" : "text-white"}`}>
                  Parchu
                </span>
                <span className="font-black text-[17px] text-green-500">newala</span>
              </div>
            </Link>

            {/* Location */}
            <button className={`hidden md:flex items-center gap-2 rounded-xl px-3 py-2 transition-colors min-w-[160px] shrink-0 ${
              scrolled || isLight
                ? "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                : "bg-white/[0.06] hover:bg-white/10 border border-white/[0.1]"
            }`}>
              <MapPin size={14} className="text-green-500 shrink-0" />
              <div className="text-left">
                <div className={`text-[9px] font-semibold uppercase leading-none mb-0.5 ${scrolled || isLight ? "text-gray-400" : "text-white/40"}`}>
                  Delivering to
                </div>
                <div className={`text-xs font-bold leading-none ${scrolled || isLight ? "text-gray-900" : "text-white"}`}>
                  Sector 15, Noida
                </div>
              </div>
              <ChevronDown size={12} className={`ml-auto ${scrolled || isLight ? "text-gray-400" : "text-white/30"}`} />
            </button>

            {/* Search */}
            <div className="flex-1 hidden md:flex max-w-sm">
              <div className="relative w-full">
                <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${scrolled || isLight ? "text-gray-400" : "text-white/30"}`} />
                <input
                  type="text"
                  placeholder="Search stores, groceries..."
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all ${
                    scrolled || isLight
                      ? "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                      : "bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:bg-white/10 focus:border-green-500/50"
                  }`}
                />
              </div>
            </div>

            {/* Delivery badge */}
            <div className={`hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl shrink-0 ${
              scrolled || isLight
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-green-500/10 border border-green-500/20 text-green-400"
            }`}>
              <Zap size={12} className="fill-current" />
              Slot delivery
            </div>

            <div className="flex-1 hidden md:block" />

            {/* Orders */}
            <Link href="/orders" className={`hidden md:flex flex-col items-center gap-0.5 p-2 rounded-xl transition-colors ${
              scrolled || isLight ? "hover:bg-gray-50 text-gray-600" : "hover:bg-white/[0.06] text-white/60"
            }`}>
              <Package size={19} />
              <span className="text-[9px] font-medium">Orders</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-semibold text-sm ${
                cartCount > 0
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-900/30"
                  : scrolled || isLight
                    ? "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                    : "bg-white/[0.06] hover:bg-white/10 text-white border border-white/[0.1]"
              }`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 ? (
                <span className="text-white font-bold text-xs hidden sm:block">Cart ({cartCount})</span>
              ) : (
                <span className="hidden sm:block text-xs font-medium">Cart</span>
              )}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-black shadow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Sign In */}
            <Link
              href="/auth/login"
              className={`hidden md:flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors ${
                scrolled || isLight
                  ? "bg-gray-900 hover:bg-gray-700 text-white"
                  : "bg-white text-gray-900 hover:bg-white/90"
              }`}
            >
              <User size={13} />
              Sign In
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled || isLight ? "hover:bg-gray-50 text-gray-700" : "hover:bg-white/[0.06] text-white"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-2.5">
            <div className="relative">
              <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${scrolled || isLight ? "text-gray-400" : "text-white/30"}`} />
              <input
                type="text"
                placeholder="Search stores, groceries..."
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:outline-none ${
                  scrolled || isLight
                    ? "bg-gray-50 border border-gray-200 text-gray-900"
                    : "bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden border-t overflow-hidden ${
                scrolled || isLight
                  ? "bg-white border-gray-100"
                  : "bg-[#030308]/95 backdrop-blur-xl border-white/[0.06]"
              }`}
            >
              <div className="px-4 py-4 space-y-1">
                <div className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-3 ${
                  scrolled || isLight ? "bg-green-50 border border-green-100" : "bg-green-500/10 border border-green-500/15"
                }`}>
                  <MapPin size={15} className="text-green-500 shrink-0" />
                  <div>
                    <div className="text-[9px] text-green-500 font-bold uppercase tracking-wide">Delivering to</div>
                    <div className={`text-sm font-bold ${scrolled || isLight ? "text-gray-900" : "text-white"}`}>
                      Sector 15, Noida 201301
                    </div>
                  </div>
                </div>
                {[
                  { href: "/orders", label: "My Orders" },
                  { href: "/auth/login", label: "Sign In / Register" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      scrolled || isLight ? "text-gray-700 hover:bg-gray-50" : "text-white/70 hover:bg-white/[0.06]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-white/[0.06]">
                  <Link href="/shop/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-green-500 font-bold hover:bg-green-500/10 rounded-xl text-sm" onClick={() => setMenuOpen(false)}>
                    🏪 Shop Owner Dashboard
                  </Link>
                  <Link href="/delivery" className="flex items-center gap-3 px-3 py-2.5 text-blue-400 font-bold hover:bg-blue-500/10 rounded-xl text-sm" onClick={() => setMenuOpen(false)}>
                    🛵 Delivery Partner
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile Bottom Nav ──────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 slide-up"
        style={{
          background: "rgba(13,14,26,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
          paddingBottom: "env(safe-area-inset-bottom,0px)",
        }}
      >
        <div className="flex items-center justify-around py-2 px-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
                  isActive ? "text-green-400" : "text-white/30 hover:text-white/60"
                }`}
              >
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={isActive ? "stroke-green-400" : ""}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full" />
                  )}
                </div>
                <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
