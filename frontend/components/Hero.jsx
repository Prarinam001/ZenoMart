import { memo } from 'react';

// const Hero = () => {
//   return (
//     <section className="bg-gradient-to-r from-rose-100 to-rose-100" >
//       <div className='container mx-auto flex flex-col md:flex-row items-center px-6'>
//         <div className='w-full md:w-1/2 mb-8 md:mb-0'>
//         <h1 className='text-4xl font-bold mb-4'>
//             Welcome to <span className='text-rose-600'>ZenoMart</span>
//         </h1>
//         <p className='text-gray-700 mb-6'>
//             Discover the best Clothing & Electronics Products at unbeatable prices
//         </p>
//         <a href="/product" className='inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition'>Shop Now</a>
//         </div>
//         <div className='w-full md:w-1/2'>
//         <img src="/shopping_img5.jpg" alt="hero-banner" className='w-full h-auto rounded mt-4 mb-4' />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default memo(Hero);


import { useEffect, useState } from 'react';

const images = [
  '/hero_back_img1.png',
  '/hero_back_img2.png',
  '/hero_back_img3.png',
  // '/shopping_img1.jpg',
  // '/shopping_img2.jpg',
  // '/shopping_img3.jpg',
  '/shopping_img4.jpg',
  // '/shopping_img5.jpg',
  // '/shopping_img8.jpg'
];

const Hero = () => {
  const [bgImage, setBgImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage(prev => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 2000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
    {/* {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === bgImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))} */}

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center px-6 py-12 h-full">
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-rose-400">ZenoMart</span>
          </h1>
          <p className="text-gray-200 mb-6">
            Discover the best Clothing & Electronics Products at unbeatable prices
          </p>
          <a
            href="/product"
            className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition"
          >
            Shop Now
          </a>
        </div>
        {/* Optional: remove this if background image is enough */}
        <div className="w-full md:w-1/2"></div>
      </div>
    </section>
  );
};

export default memo(Hero);