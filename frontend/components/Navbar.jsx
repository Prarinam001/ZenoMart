'use client'
import Link from 'next/link';
import { memo } from 'react';

const Navbar = () => {
  return (
    <nav className='bg-white shadow sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <Link href="/" className='text-xl font-bold'><img src='/ZenoMart1.png' className='w-[13%] -mb-[4%] -mt-[4%]'/></Link>
            <div className='space-x-4 flex items-center'>
                <Link href="/" className='hover:underline'>Home</Link>
                <Link href="/product" className='hover:underline'>Product</Link>
                <Link href="/cart" className='hover:underline'>Cart</Link>
                <Link href="/user/order" className='hover:underline'>My Orders</Link>
                <Link href="/login" className='hover:underline'>Login</Link>
                <Link href="/register" className='hover:underline'>Register</Link>
                <button className='hover:underline text-red-600'>Logout</button>
            </div>
        </div>

    </nav>
  );
};

export default memo(Navbar);