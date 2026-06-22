"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, MapPin, Search, Menu, X, User, Package, ChevronDown } from "lucide-react";

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <span className="font-bold text-xl text-gray-900">Parchunewala</span>
          </Link>

          {/* Location pill — desktop */}
          <button className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors border border-gray-200">
            <MapPin size={14} className="text-green-500" />
            <span className="font-medium">Sector 15, Noida</span>
            <ChevronDown size={14} />
          </button>

          {/* Search — desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores, products..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-green-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/orders" className="hidden md:flex p-2 hover:bg-gray-50 rounded-full transition-colors">
              <Package size={22} className="text-gray-700" />
            </Link>
            <Link href="/auth/login" className="hidden md:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
              <User size={15} />
              Sign In
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores, products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-green-400"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          <Link href="/orders" className="flex items-center gap-2 py-2 text-gray-700" onClick={() => setMenuOpen(false)}>
            <Package size={18} /> My Orders
          </Link>
          <Link href="/auth/login" className="flex items-center gap-2 py-2 text-gray-700" onClick={() => setMenuOpen(false)}>
            <User size={18} /> Sign In
          </Link>
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs text-gray-500 mb-1">For Business</p>
            <Link href="/shop/dashboard" className="block py-1.5 text-sm text-green-600 font-medium" onClick={() => setMenuOpen(false)}>Shop Owner Dashboard →</Link>
            <Link href="/delivery" className="block py-1.5 text-sm text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Delivery Partner →</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
