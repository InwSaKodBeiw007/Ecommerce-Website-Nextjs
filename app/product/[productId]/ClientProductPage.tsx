"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Star, Truck, Shield, RotateCcw, CreditCard, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface ClientProductPageProps {
  productProp: any;
}

const ClientProductPage = ({ productProp }: ClientProductPageProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = productProp;

  const [quantity, setQuantity] = useState(1);

  // Mock data for premium look
  const rating = 4.8;
  const reviews = 128;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    router.push('/allproduct'); // Navigate back to allproduct page
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    router.push('/checkout'); // Navigate directly to checkout
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 font-sans">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link 
          href="/allproduct" 
          className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shop</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Side: Product Image Section */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="bg-white rounded-2xl p-10 relative z-10 shadow-inner flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="object-contain max-h-full w-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Thumbnails (Mock) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`min-w-[80px] h-20 rounded-xl border ${i === 0 ? 'border-blue-500' : 'border-zinc-800'} p-2 bg-zinc-900 cursor-pointer hover:border-blue-500 transition-colors`}>
                  <div className="bg-white rounded-lg h-full w-full flex items-center justify-center p-1">
                    <Image src={product.image} alt="thumb" width={50} height={50} className="object-contain opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Product Details & Actions */}
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-zinc-700'}`} />
                  ))}
                </div>
                <span className="text-sm text-zinc-400 font-medium">{rating} ({reviews} reviews)</span>
                <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                <span className="text-sm text-green-500 font-bold tracking-wide uppercase">In Stock</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4">
                <p className="text-5xl font-black text-blue-500 tracking-tighter">฿{product.price.toLocaleString()}</p>
                <p className="text-xl text-zinc-600 line-through font-bold">฿{(product.price * 1.2).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="w-1.5 h-5 bg-blue-600 mr-3 rounded-full" />
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Premium Build Quality', 'Future-proof Technology', 'Ergonomic Design', '2-Year Warranty'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 space-y-8 backdrop-blur-sm shadow-xl">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-300">Choose Quantity</span>
                <div className="flex items-center bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 hover:bg-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-white text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 hover:bg-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-zinc-700 hover:border-blue-500 text-white font-bold py-5 rounded-2xl transition-all duration-300 cursor-pointer active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-[1.5] bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 cursor-pointer active:scale-95 text-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {[
                { icon: Truck, label: 'Fast Delivery' },
                { icon: Shield, label: 'Secure Payment' },
                { icon: RotateCcw, label: '7-Day Return' },
                { icon: CreditCard, label: 'Installments' }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <badge.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-24 space-y-8 max-w-4xl">
          <h2 className="text-3xl font-black text-white">Full Description</h2>
          <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-4">
            <p className="text-lg">{product.description}</p>
            <p>
              This premium tech gadget represents the pinnacle of modern engineering. Every detail has been meticulously crafted to provide users with an unparalleled experience. Whether you're a professional looking for performance or a casual user seeking comfort, this device delivers on all fronts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProductPage;
