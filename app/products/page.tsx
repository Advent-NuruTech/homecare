'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as allProducts } from '@/data/products';
import type { Product } from '@/data/products';
import ShareButton from '@/components/ShareButtons';

const categories = ['all', 'herbs', 'oils', 'books'] as const;
type Category = typeof categories[number];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setCategory] = useState<Category>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const results = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortOption) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        // Maintain original order or sort by another criteria if needed
        results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(results);
  }, [search, selectedCategory, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Natural Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of high-quality herbs, essential oils, and wellness books for your holistic health journey.
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search products by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Search products"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Filter by ${cat} category`}
              >
                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="w-full md:w-auto">
            <label htmlFor="sort-options" className="sr-only">Sort options</label>
            <select
              id="sort-options"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'default' | 'price-asc' | 'price-desc')}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Sort products"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse" aria-hidden="true">
              <div className="bg-gray-200 h-60 w-full"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const productUrl = `https://edenlifehomecare.com/products/${product.slug}`;
            const shareText = `Check out ${product.name} - ${product.benefits.join(', ').slice(0, 60)}...`;

            return (
              <article key={product.id} className="flex flex-col bg-white rounded-lg shadow-md overflow-visible hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.images?.[0] || '/images/product-placeholder.jpg'}
                    alt={`${product.name} product image`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 capitalize">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-green-700 font-bold text-lg whitespace-nowrap">
                      Ksh {product.price.toLocaleString('en-KE')}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mt-3 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Key Benefits:</h4>
  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
  {`${product.benefits?.join(', ').slice(0, 100)}...`}
</p></div>

                  {/* Actions */}
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100 relative">
  <Link
    href={`/products/${product.slug}`}
    className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline transition-colors"
    aria-label={`Read more about ${product.name}`}
  >
    View Details
  </Link>

  <ShareButton
    url={productUrl}
    text={shareText}
    ariaLabel={`Share ${product.name}`}
  />
</div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('all');
              setSortOption('default');
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            aria-label="Reset all filters"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}