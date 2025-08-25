import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

interface ProductPageProps {
  // In Next.js 15, params is a Promise – unwrap it with await
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // ✅ unwrap params
  const product = await getProduct(id);
  if (!product) return notFound();

  return <ProductDetailsClient product={product} />;
}
