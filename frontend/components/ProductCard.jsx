'use client';

import Link from 'next/link';
import { memo } from 'react';

const ProductCard = ({ product }) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image_url.replace(/\\/g, '/')}`;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden group">
      <Link href={`/product/${product.slug}`} className="block relative">
        {/* Image with hover zoom */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          {/* Category badge (optional) */}
          {product.category && (
            <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded shadow">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition">
            {product.title || 'Sample Product'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{product.description?.slice(0, 60)}...</p>
          <p className="text-indigo-600 font-bold mt-2 text-sm">{product.price} /-</p>
        </div>
      </Link>
    </div>
  );
};

export default memo(ProductCard);