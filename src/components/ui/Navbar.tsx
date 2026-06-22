"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, MapPin, Search, Menu, X, User, Package, ChevronDown, Zap } from "lucide-react";

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[62px] gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 mr-1">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-base">P</span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-black text-[17px] text-gray-900">Parchu</span>
              <span className="font-black text-[17px] text-green-500">newala</span>
            </div>
          </Link>

          {/* Location */}
          <button className="hidden md:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 transition-colors min-w-[160px]">
            <MapPin size={14} className="text-green-500 shrink-0" />
            <div className="text-left">
              <div className="text-[9px] text-gray-400 font-semibold uppercase leading-none mb-0.5">Delivering to</div>
              <div className="text-xs font-bold text-gray-900 leading-none">Sector 15, Noida</div>
            </div>
            <ChevronDown size={12} className="text-gray-400 ml-auto" />
          </button>

          {/* Search */}
          <div className="flex-1 hidden md:flex max-w-sm">
            <div className="relative w-full">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores, groceries, cosmetics..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 10 min badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-2 rounded-xl shrink-0">
            <Zap size={12} className="fill-green-500 text-green-500" />
            10 min delivery
          </div>

          <div className="flex-1 hidden md:block" />

          {/* Orders */}
          <Link href="/orders" className="hidden md:flex flex-col items-center gap-0.5 p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <Package size={19} className="text-gray-600" />
            <span className="text-[9px] text-gray-400 font-medium">Orders</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-semibold text-sm ${
              cartCount > 0
                ? "bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-200"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
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
            className="hidden md:flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <User size={13} />
            Sign In
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-50 rounded-xl transition-colors"
          >
            {menuOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden py-2.5">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores, groceries..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-3">
            <MapPin size={15} className="text-green-500 shrink-0" />
            <div>
              <div className="text-[9px] text-green-700 font-bold uppercase tracking-wide">Delivering to</div>
              <div className="text-sm font-bold text-gray-900">Sector 15, Noida 201301</div>
            </div>
          </div>
          <Link href="/orders" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold" onClick={() => setMenuOpen(false)}>
            <Package size={17} className="text-gray-500" /> My Orders
          </Link>
          <Link href="/auth/login" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-semibold" onClick={() => setMenuOpen(false)}>
            <User size={17} className="text-gray-500" /> Sign In / Register
          </Link>
          <div className="border-t border-gray-100 pt-3 mt-1">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider px-3 mb-2">For Business</p>
            <Link href="/shop/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-green-600 font-bold hover:bg-green-50 rounded-xl text-sm" onClick={() => setMenuOpen(false)}>
              🏪 Shop Owner Dashboard
            </Link>
            <Link href="/delivery" className="flex items-center gap-3 px-3 py-2.5 text-blue-600 font-bold hover:bg-blue-50 rounded-xl text-sm" onClick={() => setMenuOpen(false)}>
              🛵 Delivery Partner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
