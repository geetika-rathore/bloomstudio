"use client";
import { usePathname } from "next/navigation";
export default function Footer() {
  
    const pathname = usePathname();
  
    // Hide footer on login and signup pages
    if (pathname === "/login" || pathname === "/signup") {
      return null;
    }
  return (
    <footer className="bg-[#f9f5f0] text-gray-700 pt-10 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#5d6f3e] mb-4">A Bloom Studio</h2>
            <p className="text-sm">
              Blossoming your special moments with nature’s finest. From fresh blooms to heartfelt gifts, we bring joy to every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[#5d6f3e] transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-[#5d6f3e] transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-[#5d6f3e] transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-[#5d6f3e] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Flower Street, Floral City</li>
              <li>📞 +1 (234) 567-890</li>
              <li>✉️ connect@bloom.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#5d6f3e] transition-colors">🌸</a>
              <a href="#" className="hover:text-[#5d6f3e] transition-colors">📷</a>
              <a href="#" className="hover:text-[#5d6f3e] transition-colors">🐦</a>
              <a href="#" className="hover:text-[#5d6f3e] transition-colors">📌</a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bloom Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
