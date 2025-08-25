"use client";

import { FC } from "react";
import Link from "next/link";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  isFavorite,
  onToggleFavorite,
}) => {
  const { addToCart, setIsOpen } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart({ _id: id, name, price, images: [imageUrl] }, 1);
    router.push("/checkout");
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Product Image & Favorite */}
      <div className="relative">
        <Link href={`/products/${id}`}>
          <img src={imageUrl} alt={name} className="w-full h-56 object-cover" />
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault(); // stop Link navigation
            onToggleFavorite(id);
          }}
          className="absolute top-3 right-3 text-pink-500 hover:scale-110 transition-transform"
        >
          {isFavorite ? (
            <SolidHeart className="w-6 h-6 fill-[#fd96db]" />
          ) : (
            <OutlineHeart className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-[#5d6f3e] hover:underline">
            {name}
          </h3>
        </Link>
        <p className="text-gray-600">${price}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              addToCart({ _id: id, name, price, images: [imageUrl] }, 1)
            }
            className="flex-1 border border-[#fd96db] text-[#640344] py-1 px-3 rounded hover:bg-[#f048a1] hover:text-white transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 border border-[#fd96db] text-[#640344] py-1 px-3 rounded hover:bg-[#f048a1] hover:text-white transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
