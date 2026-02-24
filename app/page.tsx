'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Globe, Shield, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-zinc-950 text-gray-100 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-black to-zinc-900 overflow-hidden px-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10">
          {/* Left: Headline + CTA */}
          <div className="lg:w-1/2 text-left space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              The Future of <span className="text-blue-500">Technology</span> is Here.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
              Experience cutting-edge gadgets designed for ultimate comfort and performance. Built for the modern community.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/allproduct')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Shop Now
              </button>
              <button
                onClick={() => router.push('/allproduct')}
                className="border border-zinc-700 hover:border-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 cursor-pointer"
              >
                Best Sellers
              </button>
            </div>
          </div>

          {/* Right: Featured Image with Glow */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0 flex justify-center">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="relative bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 backdrop-blur-sm shadow-2xl">
              <Image
                src="/ZapShop/Fan002.jpg"
                alt="Featured Product"
                width={500}
                height={500}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="products" className="py-24 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Introducing our <span className="text-blue-500">Latest Collection</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 transition-all duration-300 group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/ZapShop/Power001.jpg"
                  alt="Power001"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 space-y-4">
                <p className="text-xl font-bold text-white line-clamp-2">Power Bitlocker more than normal PowerBank at your home</p>
                <button
                  onClick={() => {
                    localStorage.setItem('selectedCategory', 'power');
                    router.push('/allproduct');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Show more
                </button>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 transition-all duration-300 group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/ZapShop/Wire003.jpg"
                  alt="Wire003"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 space-y-4">
                <p className="text-xl font-bold text-white line-clamp-2">No capable Wire Charge type C</p>
                <button
                  onClick={() => {
                    localStorage.setItem('selectedCategory', 'wire');
                    router.push('/allproduct');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Show more
                </button>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500 transition-all duration-300 group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/ZapShop/Grip002.jpg"
                  alt="Grip002"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-white line-clamp-2">No more mobile phone just turn it into Joy game controller</h3>
                <button
                  onClick={() => {
                    localStorage.setItem('selectedCategory', 'grip');
                    router.push('/allproduct');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Show more
                </button>
              </div>
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
