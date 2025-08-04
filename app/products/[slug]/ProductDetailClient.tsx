// app/products/[slug]/ProductDetailClient.tsx
'use client';

import { useState } from 'react';
import { useCart } from "@/components/CartContext";
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  usage?: string;
  benefits?: string[];
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });

    setTimeout(() => setIsAddingToCart(false), 2000);
  };

  // const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  // const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Home</Link> &gt; 
        <Link href="/products" className="hover:text-blue-600"> Products</Link> &gt; 
        <span className="text-gray-800"> {product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 mb-4 bg-white rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative h-24 rounded border-2 ${selectedImage === i ? 'border-blue-500' : 'border-transparent'}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">Ksh {product.price.toLocaleString()}</p>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-full md:w-auto px-6 py-3 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white`}
          >
            {isAddingToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>

          <div className="mb-6">
            <h2 className="font-medium text-black-900 mb-2">More Infomation about the product</h2>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.usage && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Usage</h3>
              <p className="text-gray-700">{product.usage}</p>
            </div>
          )}

          {product.benefits && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Benefits</h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 border rounded-md hover:bg-blue-50">
              Thanks for choosing us
            </button>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex flex-col sm:flex-row gap-2">
        <Link href="/" className="hover:text-blue-600">Home</Link> 
        <Link href="/products" className="hover:text-blue-600"> Products</Link> 
      </nav>
    </div>
  );
}
