// components/Card.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  description: string;
};

export default function Card({
  name,
  slug,
  price,
  category,
  images,
  description,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="relative w-full h-80">
        <Image
          src={images[0]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-800">{name}</h3>
        <p className="text-sm text-gray-500 mb-1 capitalize">{category}</p>
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        <p className="mt-2 font-semibold text-green-600">KES {price}</p>
        <Link
          href={`/products/${slug}`}
          className="inline-block mt-3 text-blue-600 hover:underline text-sm"
        >
          View Product →
        </Link>
      </div>
    </div>
  );
}
