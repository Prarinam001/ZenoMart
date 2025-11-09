'use client';

import { memo, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const images = [
  '/hero_back_img1.png',
  '/hero_back_img2.png',
  '/hero_back_img3.png',
  '/shopping_img4.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000); // 5s interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image with fade transition */}
      {images.map((img, index) => (
      <div
        key={index}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}

        style={{ backgroundImage: `url(${img})` }}
      />
        ))}

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-6">
        <div className="max-w-xl text-white animate-fadeIn">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Welcome to <span className="text-rose-400">ZenoMart</span>
          </h1>
          {/* <p className="text-lg text-gray-200 mb-6"></p> */}
          <p className="text-lg text-gray-200 mb-6">
            Shop Smarter, Live Better — <span className="text-rose-400 font-extrabold">ZenoMart</span> Brings Vendors to Your Doorstep.
            <br/>
            Discover the best Clothing & Electronics Products at unbeatable prices
          </p>
          <a
            href="/product"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform"
          >
            Shop Now <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);