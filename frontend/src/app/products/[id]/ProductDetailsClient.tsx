"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    `http://localhost:5000${product.images?.[0] || ""}`
  );

  const { addToCart, setIsOpen } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // Ensure images you store in cart are absolute URLs for checkout
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: (product.images || []).map(
        (img: string) => `http://localhost:5000${img}`
      ),
    };
    addToCart(cartProduct, quantity);
    setIsOpen(true);
  };

  const handleBuyNow = () => {
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: (product.images || []).map(
        (img: string) => `http://localhost:5000${img}`
      ),
    };
    addToCart(cartProduct, quantity);
    setIsOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="max-w-dvw mx-0 p-8 grid grid-cols-1 md:grid-cols-2 gap-12 bg-gradient-to-r from-[#8d9c57] via-[#f5c3e4] to-[#e4fdfa]">
      {/* Images Section */}
      <div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={selectedImage}
            alt={product.name}
            width={800}
            height={900}
            className="object-cover w-full h-[520px]"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 mt-4">
          {(product.images || []).map((img: string, idx: number) => {
            const full = `http://localhost:5000${img}`;
            const isActive = selectedImage === full;
            return (
              <button
                key={idx}
                onClick={() => setSelectedImage(full)}
                className={`w-20 h-20 rounded-lg overflow-hidden border transition
                  ${
                    isActive
                      ? "border-[#c83f8d] ring-2 ring-[#c83f8d]"
                      : "border-gray-300"
                  }`}
              >
                <Image
                  src={full}
                  alt={`${product.name} ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-[#c83f8d] mb-4 tracking-wide">
          {product.name}
        </h1>

        <p className=" text-gray-700 leading-relaxed mb-3">
          <span className="text-[#c83f8d] font-semibold  mr-2">
            ✨ Description:
          </span>
          {product.description}
        </p>

        <p className=" text-gray-700 leading-relaxed mb-3">
          <span className="text-[#c83f8d] font-semibold  mr-2">
            🌸 Meaning:
          </span>
          {product.botanicalInfo.meaning}
        </p>

        <p className=" text-gray-700 leading-relaxed mb-3">
          <span className="text-[#c83f8d] font-semibold  mr-2">
            🔬 Scientific Name:
          </span>
          <span className="italic">{product.botanicalInfo.scientificName}</span>
        </p>

        <p className=" text-gray-700 leading-relaxed mb-3">
          <span className="text-[#c83f8d] font-semibold  mr-2">
            🌍 Origin:
          </span>
          {product.botanicalInfo.origin}
        </p>

        <p className=" text-gray-700 leading-relaxed mb-3">
          <span className="text-[#c83f8d] font-semibold  mr-2">
            🪴 Care Instructions:
          </span>
          {product.botanicalInfo.careInstructions}
        </p>
        <p className="text-3xl font-semibold text-[#c83f8d]">
          ${Number(product.price).toFixed(2)}
        </p>

        <p
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => (q < product.stock ? q + 1 : q))}
            className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-1 px-6 py-3 border-2 border-[#c83f8d] text-[#c83f8d] rounded-xl hover:bg-[#fdd6ec] disabled:bg-gray-300 disabled:text-gray-600 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="flex-1 px-6 py-3 bg-[#c83f8d] text-white rounded-xl shadow hover:bg-[#ca1079] disabled:bg-gray-400 transition"
          >
            {product.stock > 0 ? "Buy Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}
