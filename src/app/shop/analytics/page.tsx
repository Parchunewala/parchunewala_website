import { TrendingUp, IndianRupee, ShoppingBag, Star } from "lucide-react";

const weeklyData = [
  { day: "Mon", orders: 18, revenue: 4200 },
  { day: "Tue", orders: 22, revenue: 5100 },
  { day: "Wed", orders: 15, revenue: 3800 },
  { day: "Thu", orders: 28, revenue: 6400 },
  { day: "Fri", orders: 35, revenue: 8200 },
  { day: "Sat", orders: 42, revenue: 9800 },
  { day: "Sun", orders: 38, revenue: 8900 },
];

const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

export default function ShopAnalyticsPage() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "This Month", value: "₹1,28,450", change: "+18%", icon: <IndianRupee size={18} />, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total Orders", value: "512", change: "+24%", icon: <ShoppingBag size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Avg Order Value", value: "₹251", change: "+6%", icon: <TrendingUp size={18} />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg Rating", value: "4.8 ★", change: "312 reviews", icon: <Star size={18} />, color: "text-yellow-600", bg: "bg-yellow-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center ${card.color} mb-2`}>
              {card.icon}
            </div>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className={`text-xs font-medium mt-0.5 ${card.color}`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
        <h3 className="font-bold text-gray-900 mb-4">Weekly Revenue</h3>
        <div className="flex items-end gap-2 h-32">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">₹{(d.revenue / 1000).toFixed(1)}k</span>
              <div
                className="w-full bg-green-500 rounded-t-lg"
                style={{ height: `${(d.revenue / maxRevenue) * 80}px` }}
              />
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {[
            { name: "Amul Butter 500g", emoji: "🧈", sold: 48, revenue: 13680 },
            { name: "Mother Dairy Milk 500ml", emoji: "🥛", sold: 95, revenue: 2660 },
            { name: "Eggs (12 pcs)", emoji: "🥚", sold: 62, revenue: 5580 },
            { name: "Aashirvaad Atta 5kg", emoji: "🌾", sold: 37, revenue: 9176 },
          ].map((product, i) => (
            <div key={product.name} className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-300 w-4">{i + 1}</span>
              <span className="text-xl">{product.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(product.sold / 95) * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{product.sold} sold</span>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900">₹{product.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
