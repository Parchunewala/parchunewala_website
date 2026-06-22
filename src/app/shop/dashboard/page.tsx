import { TrendingUp, ShoppingBag, IndianRupee, Star, Package, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { shopOrders } from "@/lib/data";
import { orderStatusMap } from "@/lib/utils";

const stats = [
  { label: "Today's Revenue", value: "₹4,280", change: "+12%", icon: <IndianRupee size={20} />, color: "text-green-600", bg: "bg-green-50" },
  { label: "Orders Today", value: "23", change: "+5", icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Orders", value: "5", change: "in progress", icon: <Clock size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Rating", value: "4.8 ★", change: "312 reviews", icon: <Star size={20} />, color: "text-yellow-600", bg: "bg-yellow-50" },
];

export default function ShopDashboardPage() {
  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Monday, 22 June 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Store Status</span>
          <button className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            Open
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            <p className={`text-xs font-medium mt-1 ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <a href="/shop/orders" className="text-xs text-green-600 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {shopOrders.slice(0, 4).map((order) => {
              const status = orderStatusMap[order.status];
              return (
                <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    order.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                    order.status === "preparing" ? "bg-orange-100 text-orange-600" :
                    order.status === "out_for_delivery" ? "bg-purple-100 text-purple-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    {order.status === "pending" ? <AlertCircle size={14} /> :
                     order.status === "delivered" ? <CheckCircle size={14} /> :
                     <Clock size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm">{order.id}</span>
                      <span className="font-bold text-gray-900 text-sm">₹{order.total}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-gray-500">{order.customer} · {order.items} items</span>
                      <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Product", href: "/shop/products", emoji: "➕", color: "bg-green-50 text-green-700" },
                { label: "View Orders", href: "/shop/orders", emoji: "📋", color: "bg-blue-50 text-blue-700" },
                { label: "Update Stock", href: "/shop/products", emoji: "📦", color: "bg-orange-50 text-orange-700" },
                { label: "Analytics", href: "/shop/analytics", emoji: "📊", color: "bg-purple-50 text-purple-700" },
              ].map((action) => (
                <a key={action.label} href={action.href} className={`${action.color} rounded-xl p-3 flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity`}>
                  <span className="text-xl">{action.emoji}</span> {action.label}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp size={22} />
              <h3 className="font-bold">This Week</h3>
            </div>
            <p className="text-3xl font-bold mb-1">₹28,450</p>
            <p className="text-green-100 text-sm">Total Revenue</p>
            <div className="mt-4 flex gap-4 text-sm">
              <div><p className="font-bold">142</p><p className="text-green-100">Orders</p></div>
              <div><p className="font-bold">98%</p><p className="text-green-100">Fulfilled</p></div>
              <div><p className="font-bold">4.8★</p><p className="text-green-100">Avg Rating</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
