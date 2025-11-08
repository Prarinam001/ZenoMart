"use client"

import ProductCard from '@/components/ProductCard';
import { useSearchProduct } from '@/hooks/useProductHook';
import { memo } from 'react';
import { useState } from 'react';



const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const { products, isLoading, isError, refetch } = useSearchProduct(page, searchTerm);

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    refetch()
  }
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'> All Product</h1>

      {/* search bar */}
        <form onSubmit={handleSearch} className='flex gap-2 mb-4'>
          <input type='text'
            placeholder='Search by Product title ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
          <button className='ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Search</button>
        </form>

      {isLoading ? (
        <p className='text-center text-gray-600'>Loading Product...</p>
      ):isError ? (
        <p className='text-center text-red-600'>Error loading products</p>
      ) : products.length === 0 ? (
        <p className='text-center text-gray-600'>No Product</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>)}

      {/* {% Pagination %} */}
      <div className='felx justify-center mt-6 space-x-4'>
        <button className='px-4 py-2 border rounded disabled:opacity-50'
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className='px-4 py-2 border rounded bg-gray-100'>Page {page} of {totalPages} </span>
        <button className='px-4 py-2 border rounded disabled:opacity-50'
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages}>Next</button>
      </div>

    </div>
  );
};

export default memo(Page);

