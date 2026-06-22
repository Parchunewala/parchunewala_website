"use client";
import { useState } from "react";
import { shopOrders } from "@/lib/data";
import { orderStatusMap } from "@/lib/utils";
import { CheckCircle, Clock, Truck, X } from "lucide-react";

const statusFilters = ["all", "pending", "preparing", "out_for_delivery", "delivered"];

export default function ShopOrdersPage() {
  const [filter, setFilter] = useState("all");

  const filtered = shopOrders.filter((o) => filter === "all" || o.status === filter);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Orders</h1>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === s ? "bg-green-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s === "all" ? "All" : orderStatusMap[s]?.label}
            {s !== "all" && <span className="ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{shopOrders.filter((o) => o.status === s).length}</span>}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const status = orderStatusMap[order.status];
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} · {order.items} items · {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-lg">₹{order.total}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.label}</span>
                </div>
              </div>

              {/* Action buttons based on status */}
              {order.status === "pending" && (
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                    <CheckCircle size={15} /> Accept Order
                  </button>
                  <button className="px-4 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold py-2 rounded-xl flex items-center gap-1.5 transition-colors">
                    <X size={15} /> Reject
                  </button>
                </div>
              )}
              {order.status === "preparing" && (
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                  <Truck size={15} /> Mark Ready for Pickup
                </button>
              )}
              {order.status === "out_for_delivery" && (
                <div className="flex items-center gap-2 bg-purple-50 rounded-xl px-3 py-2 text-sm text-purple-700">
                  <Truck size={15} className="shrink-0" /> Out for delivery with partner
                </div>
              )}
              {order.status === "delivered" && (
                <div className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2 text-sm text-green-700">
                  <CheckCircle size={15} className="shrink-0" /> Delivered successfully
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
