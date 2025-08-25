'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please login first to place an order!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 && isLoggedIn ? (
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="bg-[#c83f8d] text-white px-6 py-2 rounded-full hover:bg-[#a82f70] transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Product Image */}
                <Link href={`/products/${item.productId}`}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  width={100}
                  height={60}
                  className="rounded"
                />
                </Link>
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="p-1 border rounded hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Total for this item */}
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart total */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-bold">${total.toFixed(2)}</p>
          </div>

          {/* Checkout button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleCheckout}
              className="bg-[#c83f8d] text-white px-6 py-2 rounded-full hover:bg-[#a82f70] transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
