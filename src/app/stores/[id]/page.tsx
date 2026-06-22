"use client";
import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, Phone } from "lucide-react";
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
            <div className="text-5xl mb-4">🏪</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Store not found</h2>
            <Link href="/stores" className="text-green-600 hover:underline">Back to stores</Link>
          </div>
        </div>
      </div>
    );
  }

  const productCategories = [...new Set(store.products.map((p) => p.category))];
  const filteredProducts = activeCategory === "all"
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartCount={cartItemCount} />

      {/* Store header */}
      <div className={`bg-gradient-to-br ${store.coverColor} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <Link href="/stores" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4">
            <ArrowLeft size={16} /> Back to stores
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">
              {store.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{store.name}</h1>
                {store.isOpen
                  ? <span className="bg-green-400/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">Open</span>
                  : <span className="bg-red-400/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">Closed</span>
                }
              </div>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <MapPin size={13} /> {store.address}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-300 fill-yellow-300" />
                  <span className="font-semibold">{store.rating}</span>
                  <span className="text-white/70">({store.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {store.deliveryTime}
                </span>
                <span className="text-white/80">Min ₹{store.minOrder}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Product list */}
          <div className="flex-1 min-w-0">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === "all" ? "bg-green-500 text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}`}
              >
                All
              </button>
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${activeCategory === cat ? "bg-green-500 text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredProducts.map((product) => {
                const qty = cart[product.id] || 0;
                const discount = getDiscount(product.price, product.mrp);
                return (
                  <div key={product.id} className={`bg-white rounded-xl p-3 border border-gray-100 ${!product.inStock ? "opacity-60" : ""}`}>
                    <div className="bg-gray-50 rounded-lg h-24 flex items-center justify-center text-4xl mb-3">
                      {product.emoji}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 mb-2">{product.unit}</p>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="font-bold text-gray-900 text-sm">{formatPrice(product.price)}</span>
                      {discount > 0 && (
                        <>
                          <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
                          <span className="text-xs text-green-600 font-medium">{discount}% off</span>
                        </>
                      )}
                    </div>
                    {!product.inStock ? (
                      <span className="text-xs text-gray-400 font-medium">Out of Stock</span>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus size={14} /> Add
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 rounded-lg px-1">
                        <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-green-600 hover:text-green-800">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-green-700 text-sm">{qty}</span>
                        <button onClick={() => addToCart(product.id)} className="p-1.5 text-green-600 hover:text-green-800">
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart sidebar — desktop */}
          {cartItemCount > 0 && (
            <div className="hidden md:block w-72 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingCart size={18} className="text-green-500" /> Your Cart
                </h3>
                <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
                  {Object.entries(cart).map(([pid, qty]) => {
                    const product = store.products.find((p) => p.id === pid);
                    if (!product) return null;
                    return (
                      <div key={pid} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 flex-1 min-w-0 truncate">{product.emoji} {product.name}</span>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <button onClick={() => removeFromCart(pid)} className="w-5 h-5 bg-gray-100 rounded text-gray-600 flex items-center justify-center hover:bg-gray-200"><Minus size={10} /></button>
                          <span className="font-semibold w-4 text-center">{qty}</span>
                          <button onClick={() => addToCart(pid)} className="w-5 h-5 bg-green-500 rounded text-white flex items-center justify-center hover:bg-green-600"><Plus size={10} /></button>
                        </div>
                        <span className="text-gray-900 font-medium ml-2 shrink-0">₹{product.price * qty}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 pt-3 mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Subtotal</span><span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Delivery</span>
                    <span className={store.deliveryFee === 0 ? "text-green-600" : ""}>{store.deliveryFee === 0 ? "Free" : `₹${store.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 mt-2 text-base">
                    <span>Total</span><span>₹{cartTotal + store.deliveryFee}</span>
                  </div>
                </div>
                {cartTotal < store.minOrder && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">
                    Add ₹{store.minOrder - cartTotal} more for minimum order
                  </p>
                )}
                <Link
                  href="/cart"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                    cartTotal >= store.minOrder
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile floating cart button */}
      {cartItemCount > 0 && (
        <div className="md:hidden fixed bottom-4 left-4 right-4">
          <Link href="/cart" className="flex items-center justify-between bg-green-500 text-white px-5 py-3.5 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="bg-white text-green-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartItemCount}</span>
              <span className="font-semibold">View Cart</span>
            </div>
            <span className="font-bold">₹{cartTotal + store.deliveryFee}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
