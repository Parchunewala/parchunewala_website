import { Store, Star, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { stores } from "@/lib/data";

export default function AdminShopsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Shops</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{stores.length}</span> total ·
          <span className="text-green-600 font-semibold">{stores.filter(s => s.isOpen).length} open</span>
        </div>
      </div>

      {/* Pending approvals banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-amber-500">⚠️</span>
          <p className="text-sm font-semibold text-amber-800">3 shops pending approval</p>
        </div>
        <button className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Review Now</button>
      </div>

      <div className="space-y-3">
        {stores.map((store) => (
          <div key={store.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${store.coverColor} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
              {store.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-gray-900">{store.name}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${store.isOpen ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                  {store.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={11} /> {store.address}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" /> {store.rating} ({store.reviewCount})</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {store.deliveryTime}</span>
                <span>{store.categories.join(", ")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Approve / Active">
                <CheckCircle size={18} />
              </button>
              <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Suspend">
                <XCircle size={18} />
              </button>
              <button className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 text-gray-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
