"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { stores } from "@/lib/data";
import { getDiscount } from "@/lib/utils";

const products = stores[0].products;

export default function ShopProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 bg-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <p className="text-xl font-bold text-gray-900">{products.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <p className="text-xl font-bold text-green-600">{products.filter((p) => p.inStock).length}</p>
          <p className="text-xs text-gray-500">In Stock</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <p className="text-xl font-bold text-red-500">{products.filter((p) => !p.inStock).length}</p>
          <p className="text-xs text-gray-500">Out of Stock</p>
        </div>
      </div>

      {/* Product list */}
      <div className="space-y-2">
        {filtered.map((product) => {
          const discount = getDiscount(product.price, product.mrp);
          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {product.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                <p className="text-xs text-gray-400">{product.unit} · {product.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-gray-900 text-sm">₹{product.price}</span>
                  {discount > 0 && <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>}
                  {discount > 0 && <span className="text-xs text-green-600 font-medium">{discount}% off</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {product.inStock ? "In Stock" : "Out"}
                </span>
                <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit2 size={15} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
