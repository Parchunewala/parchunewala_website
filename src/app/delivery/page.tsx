"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, IndianRupee, CheckCircle, ArrowRight, Bike } from "lucide-react";
import { deliveryOrders } from "@/lib/data";

export default function DeliveryDashboard() {
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState<string[]>([]);

  const todayStats = { deliveries: 8, earnings: 280, distance: "14.2 km", rating: 4.9 };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 pt-safe">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bike size={20} />
            </div>
            <div>
              <p className="font-bold">Delivery Dashboard</p>
              <p className="text-blue-200 text-xs">Parchunewala Partner</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{online ? "Online" : "Offline"}</span>
            <button
              onClick={() => setOnline(!online)}
              className={`relative w-12 h-6 rounded-full transition-colors ${online ? "bg-green-400" : "bg-white/30"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${online ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Today stats */}
        <div className="grid grid-cols-4 gap-3 pb-5">
          {[
            { label: "Deliveries", value: todayStats.deliveries },
            { label: "Earnings", value: `₹${todayStats.earnings}` },
            { label: "Distance", value: todayStats.distance },
            { label: "Rating", value: `${todayStats.rating}★` },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-bold text-lg">{s.value}</p>
              <p className="text-blue-200 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {!online ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-3">😴</div>
            <h3 className="font-semibold text-gray-900 mb-1">You are offline</h3>
            <p className="text-gray-500 text-sm">Toggle online to start receiving delivery requests</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></span>
              <p className="text-sm text-green-700 font-medium">You are online and receiving requests</p>
            </div>

            <h2 className="font-bold text-gray-900 text-lg">Available Deliveries ({deliveryOrders.length})</h2>

            {deliveryOrders.map((order) => (
              <div key={order.id} className={`bg-white rounded-2xl border ${accepted.includes(order.id) ? "border-green-200" : "border-gray-100"} overflow-hidden`}>
                {accepted.includes(order.id) && (
                  <div className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 flex items-center gap-1.5">
                    <CheckCircle size={13} /> Accepted — Navigate to store
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{order.orderId}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.items} items · ₹{order.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">₹{order.earnings}</p>
                      <p className="text-xs text-gray-400">your earnings</p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={11} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.storeName}</p>
                        <p className="text-gray-500 text-xs">{order.storeAddress}</p>
                      </div>
                    </div>
                    <div className="ml-2.5 border-l-2 border-dashed border-gray-200 h-3"></div>
                    <div className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={11} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-gray-500 text-xs">{order.customerAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {order.distance}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> ~{Math.ceil(parseFloat(order.distance) * 4)} min</span>
                  </div>

                  {!accepted.includes(order.id) ? (
                    <button
                      onClick={() => setAccepted((prev) => [...prev, order.id])}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Accept Delivery <ArrowRight size={16} />
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                        <MapPin size={14} /> Navigate
                      </button>
                      <button className="border border-green-200 text-green-600 hover:bg-green-50 text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                        <CheckCircle size={14} /> Mark Delivered
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
