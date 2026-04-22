import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductDetail } from "./ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}
