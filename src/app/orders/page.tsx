import Link from "next/link";
import { Package, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { recentOrders } from "@/lib/data";
import { orderStatusMap } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Package size={22} /> My Orders
        </h1>

        {recentOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders yet</h3>
            <p className="text-gray-500 text-sm mb-5">Start shopping from stores near you!</p>
            <Link href="/stores" className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
              Browse Stores
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const status = orderStatusMap[order.status];
              return (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{order.storeName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Order {order.id}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{order.items.join(", ")}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1"><Clock size={12} /> {order.date}</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-gray-900">
                        ₹{order.total} <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                    {order.status === "out_for_delivery" && (
                      <div className="mt-3 bg-purple-50 rounded-xl px-3 py-2 text-xs text-purple-700 font-medium flex items-center gap-1.5">
                        🛵 {order.deliveryTime}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
