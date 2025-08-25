"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/v1/products");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch favorites
  useEffect(() => {
    if (!token) return;
    const fetchFavorites = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setFavorites(data.favorites);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, [token]);

  // Toggle favorite
  const handleToggleFavorite = async (productId: string) => {
    if (!token) {
      toast.error("Please log in to like products");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setFavorites((prev) =>
          prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
        toast.success("Updated favorites!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      toast.error("Error toggling favorite");
    }
  };

  // Filtered products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-[#5d6f3e]">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Title + SearchBar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
        <h1 className="text-5xl font-bold text-[#5d6f3e] mb-4 sm:mb-0">
          Our Blooms
        </h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              imageUrl={`http://localhost:5000${product.images[0]}`}
              isFavorite={favorites.includes(product._id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No products match your search.
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
