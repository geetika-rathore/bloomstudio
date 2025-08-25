"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart(); // cart from context

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName");
      if (token && name) {
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    setMenuOpen(false);
    toast.success(`Logged out Successfully!`);
    router.push("/login");
  };

  const getLinkClass = (path: string) => {
    const baseClasses =
      "font-medium px-4 py-2 transition duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#c83f8d] after:transition-all after:duration-300 hover:after:w-full";
    const activeClasses = "text-[#c83f8d] after:w-full";
    const inactiveClasses = "text-[#5d6f3e] hover:text-[#c83f8d]";
    return `${baseClasses} ${
      pathname === path ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Bloom Studio Logo"
            width={50}
            height={20}
            priority
          />
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
          <Link href="/products" className={getLinkClass("/products")}>
            Shop
          </Link>
        </div>

        {/* Right: Cart & Auth */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart */}
          {isLoggedIn && (
            <Link href="/checkout" className="relative">
              <ShoppingCart
                size={24}
                className="text-[#5d6f3e] hover:text-[#c83f8d] transition"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c83f8d] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          )}

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <>
              <span className="text-[#5d6f3e] font-medium">
                Hi, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#c83f8d] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#a82f70] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={getLinkClass("/login")}>
                Login
              </Link>
              <Link href="/signup" className={getLinkClass("/signup")}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Cart */}
          {isLoggedIn && (
            <Link href="/checkout" className="relative">
              <ShoppingCart size={24} className="text-[#5d6f3e]" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c83f8d] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
{/* Mobile Dropdown */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
    >
      <div className="p-4 flex flex-col space-y-4 text-center">
        {/* Navigation Links */}
        <Link
          href="/"
          className="block text-[#5d6f3e] font-medium hover:text-[#c83f8d] transition"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block text-[#5d6f3e] font-medium hover:text-[#c83f8d] transition"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block text-[#5d6f3e] font-medium hover:text-[#c83f8d] transition"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/products"
          className="block text-[#5d6f3e] font-medium hover:text-[#c83f8d] transition"
          onClick={() => setMenuOpen(false)}
        >
          Shop
        </Link>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <>
            <span className="block text-[#5d6f3e] font-medium">
              Hi, {userName}
            </span>
            <button
              onClick={handleLogout}
              className="w-full bg-[#c83f8d] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#a82f70] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block text-[#5d6f3e] font-medium hover:text-[#c83f8d] transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block bg-[#c83f8d] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#a82f70] transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
