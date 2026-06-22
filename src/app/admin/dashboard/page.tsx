import { ShoppingBag, Store, Users, Bike, TrendingUp, IndianRupee, Clock, Star } from "lucide-react";
import { adminStats, shopOrders, stores } from "@/lib/data";
import { orderStatusMap } from "@/lib/utils";

const statCards = [
  { label: "Total Revenue", value: `₹${(adminStats.totalRevenue / 1000).toFixed(0)}K`, sub: "This month", icon: <IndianRupee size={20} />, color: "text-green-600", bg: "bg-green-50" },
  { label: "Total Orders", value: adminStats.totalOrders.toLocaleString(), sub: `${adminStats.activeOrders} active`, icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Stores", value: adminStats.activeStores, sub: `of ${adminStats.totalStores} total`, icon: <Store size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Customers", value: adminStats.totalCustomers.toLocaleString(), sub: "Registered", icon: <Users size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Deliveries", value: adminStats.totalDeliveries.toLocaleString(), sub: "Completed", icon: <Bike size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Avg Delivery", value: adminStats.avgDeliveryTime, sub: "All time avg", icon: <Clock size={20} />, color: "text-teal-600", bg: "bg-teal-50" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Platform overview · 22 June 2026</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-purple-700">Live</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs text-purple-600 hover:underline">View all →</a>
          </div>
          <div className="space-y-2">
            {shopOrders.map((order) => {
              const status = orderStatusMap[order.status];
              return (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.customer} · {order.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.label}</span>
                    <span className="text-sm font-bold text-gray-900">₹{order.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top stores */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Top Stores</h2>
            <a href="/admin/shops" className="text-xs text-purple-600 hover:underline">Manage →</a>
          </div>
          <div className="space-y-3">
            {stores.slice(0, 5).map((store, i) => (
              <div key={store.id} className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-300 w-5 text-center">{i + 1}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gray-50">{store.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{store.name}</p>
                  <p className="text-xs text-gray-400">{store.area}</p>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-700">{store.rating}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${store.isOpen ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                  {store.isOpen ? "Open" : "Closed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
