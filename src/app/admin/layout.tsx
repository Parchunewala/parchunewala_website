import Link from "next/link";
import { LayoutDashboard, Store, ShoppingBag, Users, BarChart2, Settings, LogOut, Shield } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { href: "/admin/shops", icon: <Store size={18} />, label: "Shops" },
  { href: "/admin/orders", icon: <ShoppingBag size={18} />, label: "Orders" },
  { href: "/admin/customers", icon: <Users size={18} />, label: "Customers" },
  { href: "/admin/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
  { href: "/admin/settings", icon: <Settings size={18} />, label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 text-gray-300 fixed h-full">
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Parchunewala</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm font-medium"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-300 text-sm">
            <LogOut size={18} /> Sign Out
          </Link>
        </div>
      </aside>

      <main className="flex-1 md:ml-56">{children}</main>
    </div>
  );
}
