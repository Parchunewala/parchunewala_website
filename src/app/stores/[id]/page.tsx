"use client";
import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, ChevronRight, Zap } from "lucide-react";
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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏪</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">Store not found</h2>
            <Link href="/stores" className="text-green-600 font-bold hover:underline">
              ← Back to stores
            </Link>
          </div>
        </div>
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

  const addToCart = (productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };
  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId] > 1) updated[productId]--;
      else delete updated[productId];
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-24 md:pb-0">
      <Navbar cartCount={cartItemCount} />

      {/* Store header */}
      <div className={`bg-gradient-to-br ${store.coverColor}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          <Link
            href="/stores"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold mb-5 transition-colors"
          >
            <ArrowLeft size={15} /> Back to stores
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shrink-0 border border-white/30 shadow-lg">
              {store.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h1 className="text-2xl font-black text-white">{store.name}</h1>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${store.isOpen ? "bg-green-400/30 text-white border border-green-300/40" : "bg-red-400/30 text-white border border-red-300/40"}`}>
                  {store.isOpen ? "● Open" : "● Closed"}
                </span>
              </div>
              <p className="text-white/70 text-sm flex items-center gap-1 mb-3">
                <MapPin size={12} /> {store.address}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 border border-white/20">
                  <Star size={13} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-bold">{store.rating}</span>
                  <span className="text-white/60 text-xs">({store.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 border border-white/20">
                  <Clock size={13} className="text-white" />
                  <span className="text-white font-semibold">{store.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 border border-white/20">
                  <span className="text-white/70 text-xs">Min order</span>
                  <span className="text-white font-bold text-xs">₹{store.minOrder}</span>
                </div>
                {store.deliveryFee === 0 ? (
                  <div className="flex items-center gap-1 bg-green-400/20 border border-green-300/30 rounded-full px-3 py-1">
                    <span className="text-green-200 font-black text-xs">FREE DELIVERY</span>
                  </div>
                ) : (
                  <div className="bg-white/10 border border-white/20 rounded-full px-3 py-1">
                    <span className="text-white/80 text-xs">Delivery ₹{store.deliveryFee}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[94px] z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-3">
            {productCategories.map((cat) => {
              const count = cat === "all" ? store.products.length : store.products.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all capitalize ${
                    activeCategory === cat
                      ? "bg-green-500 text-white shadow-sm shadow-green-200"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
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
          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-black text-gray-900">{filteredProducts.length}</span> products
                {activeCategory !== "all" && (
                  <span className="text-green-600 font-semibold capitalize"> in {activeCategory}</span>
                )}
              </p>
            </div>

            {/* Product grid — Blinkit-style */}
            <div className={`grid gap-3 ${cartItemCount > 0 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
              {filteredProducts.map((product) => {
                const qty = cart[product.id] || 0;
                const discount = getDiscount(product.price, product.mrp);
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all group ${
                      !product.inStock
                        ? "opacity-60 border-gray-100"
                        : qty > 0
                        ? "border-green-200 shadow-md shadow-green-50"
                        : "border-gray-100 hover:shadow-md hover:border-gray-200"
                    }`}
                  >
                    {/* Image area */}
                    <div className="relative bg-gray-50 h-28 sm:h-32 flex items-center justify-center overflow-hidden">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                        {product.emoji}
                      </span>
                      {/* Discount badge */}
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none">
                          {discount}% OFF
                        </span>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="text-xs font-black text-gray-400 bg-white border border-gray-200 px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-[10px] text-gray-400 font-medium mb-0.5">{product.unit}</p>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 mb-2">
                        {product.name}
                      </h4>

                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span className="text-base font-black text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>

                      {product.inStock && (
                        qty === 0 ? (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="w-full py-2 bg-white border-2 border-green-500 text-green-600 text-sm font-black rounded-xl hover:bg-green-500 hover:text-white transition-all"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-green-500 rounded-xl overflow-hidden">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="px-3 py-2 text-white font-black text-lg hover:bg-green-600 transition-colors"
                            >
                              −
                            </button>
                            <span className="font-black text-white text-sm">{qty}</span>
                            <button
                              onClick={() => addToCart(product.id)}
                              className="px-3 py-2 text-white font-black text-lg hover:bg-green-600 transition-colors"
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
              <div className="text-center py-20">
                <div className="text-5xl mb-3">🛒</div>
                <p className="font-bold text-gray-900">No products in this category</p>
              </div>
            )}
          </div>

          {/* Cart sidebar — desktop */}
          {cartItemCount > 0 && (
            <div className="hidden md:block w-72 shrink-0">
              <div className="sticky top-[180px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Cart header */}
                <div className="bg-green-500 px-4 py-3 flex items-center gap-2">
                  <ShoppingCart size={16} className="text-white" />
                  <span className="text-white font-black text-sm">Your Cart</span>
                  <span className="ml-auto bg-white/20 text-white text-xs font-black px-2 py-0.5 rounded-full">
                    {cartItemCount} items
                  </span>
                </div>

                {/* Cart items */}
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(cart).map(([pid, qty]) => {
                    const product = store.products.find((p) => p.id === pid);
                    if (!product) return null;
                    return (
                      <div key={pid} className="flex items-center gap-2">
                        <span className="text-xl shrink-0">{product.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{product.name}</p>
                          <p className="text-[10px] text-gray-400">{product.unit}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => removeFromCart(pid)}
                            className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                          >
                            <Minus size={10} className="text-gray-600" />
                          </button>
                          <span className="w-5 text-center text-xs font-black text-gray-900">{qty}</span>
                          <button
                            onClick={() => addToCart(pid)}
                            className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
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
                <div className="border-t border-gray-100 p-3 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Delivery</span>
                    <span className={store.deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
                      {store.deliveryFee === 0 ? "FREE" : `₹${store.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-gray-900 text-sm pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span>₹{cartTotal + store.deliveryFee}</span>
                  </div>
                </div>

                {cartTotal < store.minOrder && (
                  <div className="mx-3 mb-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-center">
                    <p className="text-xs font-bold text-amber-700">
                      Add ₹{store.minOrder - cartTotal} more to place order
                    </p>
                    <div className="mt-1.5 bg-amber-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all"
                        style={{ width: `${Math.min((cartTotal / store.minOrder) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 pt-0">
                  <Link
                    href="/cart"
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-black text-sm transition-all ${
                      cartTotal >= store.minOrder
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-200"
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
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-2xl shadow-xl shadow-green-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl px-2.5 py-1">
                <span className="text-white font-black text-sm">{cartItemCount}</span>
              </div>
              <div>
                <p className="font-black text-sm">View Cart</p>
                <p className="text-green-100/80 text-xs">{cartItemCount} {cartItemCount === 1 ? "item" : "items"}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-lg leading-none">₹{cartTotal + store.deliveryFee}</p>
              {store.deliveryFee === 0 && (
                <p className="text-green-200 text-[10px] font-bold">Free delivery</p>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
