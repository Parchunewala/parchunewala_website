import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, BarChart2, Settings, LogOut, Store } from "lucide-react";

const navItems = [
  { href: "/shop/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { href: "/shop/orders", icon: <ShoppingBag size={18} />, label: "Orders" },
  { href: "/shop/products", icon: <Package size={18} />, label: "Products" },
  { href: "/shop/analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
  { href: "/shop/settings", icon: <Settings size={18} />, label: "Settings" },
];

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Parchunewala</p>
              <p className="text-xs text-gray-400">Shop Dashboard</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🏪</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Sharma Kirana</p>
              <span className="text-xs text-green-600 font-medium">● Open</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
            <LogOut size={18} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">P</div>
          <span className="font-bold text-gray-900 text-sm">Shop Dashboard</span>
        </div>
        <Store size={20} className="text-gray-600" />
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-56 mt-14 md:mt-0 pb-16 md:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex">
        {navItems.slice(0, 4).map((item) => (
          <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center gap-0.5 py-2 text-gray-500 hover:text-green-600 text-xs">
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
