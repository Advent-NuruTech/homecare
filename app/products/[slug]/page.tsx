// app/products/[slug]/page.tsx
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
