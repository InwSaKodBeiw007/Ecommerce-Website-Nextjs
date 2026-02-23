'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Globe, Shield, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-black text-gray-100 font-sans">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center "
        style={{
          backgroundImage: "url('/ZapShop/Fan002.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            In the time that our world is moving by Social & Community.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Experience the future technology that now build for more comfortable.
          </p>
          {/*  */}
          <button
            onClick={() => {
              router.push('/allproduct');
            }}
            className="mt-8 inline-block bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Show more
          </button>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
          Introducing our latest collection
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          {/* This one go to Power categories */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/ZapShop/Power001.jpg"
              alt="Power001"
              width={500}
              height={500}
              className="w-full h-90 object-cover"
            />
            <div className="p-8">
              <p className="text-xl font-semibold mb-2">Power Bitlocker more than normal PowerBank at your home</p>
              <button
                onClick={() => {
                  localStorage.setItem('selectedCategory', 'power');
                  router.push('/allproduct');
                }}
                className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                Show more
              </button>
            </div>
          </div>
          {/* Product Card 2 */}
          {/* This one go to Wire categories */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/ZapShop/Wire003.jpg"
              alt="Wire003"
              width={500}
              height={500}
              className="w-full h-90 object-cover"
            />
            <div className="p-8">
              <p className="text-xl font-semibold mb-2">No capable Wire Charge type C</p>
              <button
                onClick={() => {
                  localStorage.setItem('selectedCategory', 'wire');
                  router.push('/allproduct');
                }}
                className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                Show more
              </button>
            </div>
          </div>
          {/* Product Card 3 */}
          {/* This one go to Joy categories */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/ZapShop/Grip002.jpg"
              alt="Grip002"
              width={500}
              height={500}
              className="w-full h-90 object-cover"
            />
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2">No more mobile phone just turn it into Joy game controller</h3>
              <button
                onClick={() => {
                  localStorage.setItem('selectedCategory', 'grip');
                  router.push('/allproduct');
                }}
                className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                Show more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Assurance */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Globe className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold">Global Shipping</h3>
            <p className="text-gray-400">Delivered to your doorstep, anywhere.</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold">2-Year Warranty</h3>
            <p className="text-gray-400">Peace of mind, guaranteed.</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold">24/7 VIP Support</h3>
            <p className="text-gray-400">Always here to help you.</p>
          </div>
        </div>
      </section>

      {/* QuickBuyPopup removed */}
    </div>
  )
}
