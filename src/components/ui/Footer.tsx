import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
              <span className="font-bold text-xl text-white">Parchunewala</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your Area. Your Stores. Your App. Connecting neighborhoods with local businesses.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-green-400" /> Noida, Uttar Pradesh</span>
              <span className="flex items-center gap-2"><Phone size={14} className="text-green-400" /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><Mail size={14} className="text-green-400" /> hello@parchunewala.in</span>
            </div>
          </div>

          {/* Customer */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Customers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Browse Stores</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop/dashboard" className="hover:text-white transition-colors">Shop Dashboard</Link></li>
              <li><Link href="/auth/signup?role=shop" className="hover:text-white transition-colors">Register Your Store</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery Partner</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Partner Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 Parchunewala. All rights reserved.</p>
          <p>Made with ❤️ for neighborhood commerce</p>
        </div>
      </div>
    </footer>
  );
}
