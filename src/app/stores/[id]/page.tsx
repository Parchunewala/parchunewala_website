"use client";
import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, ChevronRight, Zap, Package } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { stores } from "@/lib/data";
import { formatPrice, getDiscount } from "@/lib/utils";

export default function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const store = stores.find((s) => s.id === id);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState("all");

  if (!store) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="text-7xl animate-float">🏪</div>
        <h2 className="text-xl font-black text-gray-900">Store not found</h2>
        <Link href="/stores" className="btn-glow bg-green-500 text-white font-bold px-6 py-3 rounded-2xl">
          ← Back to stores
        </Link>
      </div>
    );
  }

  const productCategories = ["all", ...new Set(store.products.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "all"
      ? store.products
      : store.products.filter((p) => p.category === activeCategory);

  const cartTotal = Object.entries(cart).reduce((sum, [pid, qty]) => {
    const product = store.products.find((p) => p.id === pid);
    return sum + (product ? product.price * qty : 0);
  }, 0);
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (productId: string) =>
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));

  const removeFromCart = (productId: string) =>
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) updated[productId]--;
      else delete updated[productId];
      return updated;
    });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-28 md:pb-0">
      <Navbar cartCount={cartItemCount} />

      {/* Store header */}
      <div className={`bg-gradient-to-br ${store.coverColor} relative overflow-hidden`}>
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-wrap pointer-events-none" />
        {/* Blur blob decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
          <Link href="/stores" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to stores
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 glass rounded-2xl flex items-center justify-center text-4xl md:text-5xl shrink-0 shadow-xl group hover:scale-105 transition-transform duration-300">
              {store.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-black text-white">{store.name}</h1>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${store.isOpen ? "bg-green-400/30 text-white border-green-300/40" : "bg-red-400/30 text-white border-red-300/40"}`}>
                  {store.isOpen ? "● Open" : "● Closed"}
                </span>
              </div>
              <p className="text-white/65 text-sm flex items-center gap-1 mb-3">
                <MapPin size={12} /> {store.address}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1">
                  <Star size={12} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-bold text-sm">{store.rating}</span>
                  <span className="text-white/55 text-xs">({store.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1">
                  <Clock size={12} className="text-white" />
                  <span className="text-white font-semibold text-sm">{store.deliveryTime}</span>
                </div>
                <div className="glass rounded-full px-3 py-1">
                  <span className="text-white/60 text-xs">Min </span>
                  <span className="text-white font-bold text-xs">₹{store.minOrder}</span>
                </div>
                {store.deliveryFee === 0 ? (
                  <div className="bg-green-400/25 border border-green-300/35 rounded-full px-3 py-1 animate-border-glow">
                    <span className="text-green-200 font-black text-xs tracking-wide">FREE DELIVERY</span>
                  </div>
                ) : (
                  <div className="glass rounded-full px-3 py-1">
                    <span className="text-white/65 text-xs">Delivery ₹{store.deliveryFee}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[94px] z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {productCategories.map((cat) => {
              const count = cat === "all" ? store.products.length : store.products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 capitalize ${
                    activeCategory === cat
                      ? "bg-green-500 text-white shadow-sm shadow-green-200 scale-105"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:scale-105"
                  }`}
                >
                  {cat === "all" ? "✨ All" : cat}
                  <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? "text-green-100" : "text-gray-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex gap-6">

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-black text-gray-900">{filteredProducts.length}</span> products
                {activeCategory !== "all" && (
                  <span className="text-green-600 font-semibold capitalize"> in {activeCategory}</span>
                )}
              </p>
            </div>

            {/* Blinkit-style product grid */}
            <div className={`grid gap-3.5 ${cartItemCount > 0 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
              {filteredProducts.map((product, i) => {
                const qty = cart[product.id] || 0;
                const discount = getDiscount(product.price, product.mrp);
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 group ${
                      !product.inStock
                        ? "opacity-60 border-gray-100"
                        : qty > 0
                        ? "border-green-300 shadow-lg shadow-green-50 scale-[1.01]"
                        : "border-gray-100 card-lift hover:border-gray-200"
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Image area */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-28 sm:h-32 flex items-center justify-center overflow-hidden">
                      <span className="text-5xl group-hover:scale-115 transition-transform duration-300 ease-out">
                        {product.emoji}
                      </span>

                      {/* Discount badge */}
                      {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                          {discount}% OFF
                        </div>
                      )}

                      {/* Out of stock overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
                          <span className="text-xs font-black text-gray-400 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* In cart glow */}
                      {qty > 0 && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-300">
                          <span className="text-white text-[9px] font-black">{qty}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">{product.unit}</p>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 mb-2.5">
                        {product.name}
                      </h4>

                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span className="text-base font-black text-gray-900">{formatPrice(product.price)}</span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                        )}
                      </div>

                      {/* Add to cart */}
                      {product.inStock && (
                        qty === 0 ? (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="w-full py-2 bg-white border-2 border-green-500 text-green-600 text-sm font-black rounded-xl hover:bg-green-500 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-green-200"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-green-500 rounded-xl overflow-hidden shadow-sm shadow-green-200">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="px-3.5 py-2 text-white font-black text-xl hover:bg-green-600 transition-colors active:scale-90"
                            >
                              −
                            </button>
                            <span className="font-black text-white text-base">{qty}</span>
                            <button
                              onClick={() => addToCart(product.id)}
                              className="px-3.5 py-2 text-white font-black text-xl hover:bg-green-600 transition-colors active:scale-90"
                            >
                              +
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <div className="text-6xl mb-3 animate-float">🛒</div>
                <p className="font-black text-gray-900">No products in this category</p>
              </div>
            )}
          </div>

          {/* Cart sidebar — desktop */}
          {cartItemCount > 0 && (
            <div className="hidden md:block w-72 shrink-0">
              <div className="sticky top-[180px] bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden animate-scaleIn">
                {/* Cart header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3.5 flex items-center gap-2">
                  <ShoppingCart size={16} className="text-white" />
                  <span className="text-white font-black">Your Cart</span>
                  <span className="ml-auto glass rounded-full text-white text-xs font-black px-2 py-0.5">
                    {cartItemCount} items
                  </span>
                </div>

                {/* Items */}
                <div className="p-3 space-y-2.5 max-h-64 overflow-y-auto scrollbar-hide">
                  {Object.entries(cart).map(([pid, qty]) => {
                    const product = store.products.find((p) => p.id === pid);
                    if (!product) return null;
                    return (
                      <div key={pid} className="flex items-center gap-2 group">
                        <span className="text-xl shrink-0">{product.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{product.name}</p>
                          <p className="text-[10px] text-gray-400">{product.unit}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => removeFromCart(pid)}
                            className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                          >
                            <Minus size={10} className="text-gray-600" />
                          </button>
                          <span className="w-5 text-center text-xs font-black text-gray-900">{qty}</span>
                          <button
                            onClick={() => addToCart(pid)}
                            className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                          >
                            <Plus size={10} className="text-white" />
                          </button>
                        </div>
                        <span className="text-xs font-black text-gray-900 w-12 text-right shrink-0">
                          ₹{product.price * qty}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 p-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Delivery</span>
                    <span className={store.deliveryFee === 0 ? "text-green-600 font-black" : "text-gray-500"}>
                      {store.deliveryFee === 0 ? "FREE 🎉" : `₹${store.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-gray-900 text-sm pt-1.5 border-t border-gray-100">
                    <span>Total</span>
                    <span>₹{cartTotal + store.deliveryFee}</span>
                  </div>
                </div>

                {/* Min order progress */}
                {cartTotal < store.minOrder && (
                  <div className="mx-3 mb-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-bold text-amber-700">Min order ₹{store.minOrder}</span>
                      <span className="text-amber-600">₹{store.minOrder - cartTotal} more</span>
                    </div>
                    <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((cartTotal / store.minOrder) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 pt-0">
                  <Link
                    href="/cart"
                    className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-black text-sm transition-all ${
                      cartTotal >= store.minOrder
                        ? "btn-glow bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile floating cart */}
      {cartItemCount > 0 && (
        <div className="md:hidden fixed bottom-5 left-4 right-4 z-50">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-4 rounded-2xl shadow-2xl shadow-green-900/40 hover:from-green-400 hover:to-emerald-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="glass rounded-xl px-2.5 py-1">
                <span className="text-white font-black text-sm">{cartItemCount}</span>
              </div>
              <div>
                <p className="font-black text-sm leading-none">View Cart</p>
                <p className="text-green-100/75 text-xs mt-0.5">
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-lg leading-none">₹{cartTotal + store.deliveryFee}</p>
              {store.deliveryFee === 0 && (
                <p className="text-green-200 text-[10px] font-bold">Free delivery 🎉</p>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
