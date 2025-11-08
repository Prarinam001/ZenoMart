"use client"
import { memo } from 'react';
import { useParams } from 'next/navigation';
import { useProductDetailBySlug } from '@/hooks/useProductHook';


const ProductDetailPage = () => {

    const params = useParams();
    const slug = params?.slug;
    const { product, isLoading, isError } = useProductDetailBySlug(slug);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {isLoading ? (
                <div className="text-center text-gray-500 text-lg">Loading product details...</div>
            ) : isError ? (
                <div className="text-center text-red-500 text-lg">Failed to load product.</div>
            ) : !product ? (
                <div className="text-center text-gray-500 text-lg">No product found.</div>
            ) : (
                <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image_url.replace(/\\/g, '/')}`}
                            alt={product.title}
                            className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <p className="text-gray-700 text-base mb-4">{product.description}</p>
                            <p className="text-2xl font-semibold text-blue-600 mb-2">₹{product.price}</p>
                            <p className="text-sm text-gray-500 mb-6">In Stock: {product.stock_quantity}</p>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {product.categories.map(cat => (
                                    <span
                                        key={cat.name}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium shadow-sm"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 active:scale-95 transition duration-300 ease-in-out shadow-md">
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(ProductDetailPage);

