import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeatureProduct"; 
import WhyUs from "@/components/WhyUs";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5000/api/v1/products", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return data.data;
}

export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (e: any) {
    error = e.message;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-[#966d7e] text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />
      <FeaturedProducts products={products} />
      <WhyUs/>
    </>
  );
}
