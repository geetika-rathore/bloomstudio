"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const { isOpen, setIsOpen, cart, total, removeFromCart, updateQuantity } =
    useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold text-[#5d6f3e]">Your Cart</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
                {/* Quantity controls */}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={handleCheckout}
          className="w-full mt-2 text-white py-2 rounded hover:bg-[#ee0883] bg-[#f048a1] transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
