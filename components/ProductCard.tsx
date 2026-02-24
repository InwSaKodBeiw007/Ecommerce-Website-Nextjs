"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext'; 
import { Star, Zap } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAddingToCartMode, setIsAddingToCartMode] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(1);

  // Mock data for premium look
  const rating = 4.5 + (product.id % 5) * 0.1;
  const reviews = 10 + (product.id * 7);
  const isLowStock = product.id % 3 === 0;

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCartMode(true);
  };

  const handleConfirmAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, tempQuantity);
    setIsAddingToCartMode(false);
    setTempQuantity(1);
  };

  const handleAdjustQuantity = (e: React.MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    setTempQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="group border border-zinc-800 rounded-3xl p-5 bg-zinc-900/50 backdrop-blur-sm text-white flex flex-col h-[500px] hover:border-blue-500/50 hover:bg-zinc-900 transition-all duration-500 shadow-xl relative overflow-hidden">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-0 group-hover:opacity-10 transition duration-500" />

      {isLowStock && (
        <div className="absolute top-4 left-4 z-10 bg-red-500/10 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1 backdrop-blur-md">
          <Zap className="w-3 h-3 fill-current" />
          LOW STOCK
        </div>
      )}

      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="bg-white rounded-2xl p-6 mb-5 relative overflow-hidden h-56 flex items-center justify-center shadow-inner">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        
        <div className="flex items-center gap-1.5 text-yellow-400 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-current' : 'text-zinc-700'}`} />
            ))}
          </div>
          <span className="text-xs font-bold ml-1">{rating.toFixed(1)}</span>
          <span className="text-zinc-500 text-[10px]">({reviews})</span>
        </div>

        <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mt-1.5">
          <p className="text-2xl font-black text-white">฿{product.price.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 line-through">฿{(product.price * 1.2).toLocaleString()}</p>
        </div>

        <p className="text-xs text-zinc-400 mt-3 line-clamp-2 overflow-hidden leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {product.description}
        </p>
      </Link>

      <div className="mt-6 relative z-20">
        {!isAddingToCartMode ? (
          <div className="flex gap-3">
            <button
              onClick={handleAddToCartClick}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-sm border border-zinc-700 hover:border-zinc-600"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-[1.5] bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shadow-blue-600/20 text-sm active:scale-95"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-zinc-800 rounded-2xl overflow-hidden border border-blue-500/50 shadow-lg shadow-blue-500/10">
            <button
              onClick={(e) => handleAdjustQuantity(e, -1)}
              className="p-4 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              -
            </button>
            <div
              onClick={handleConfirmAddToCart}
              className="flex-1 text-center text-white font-bold py-4 cursor-pointer hover:bg-blue-600 transition-all group/confirm flex flex-col items-center justify-center gap-0.5"
            >
              <span className="text-xl leading-none">{tempQuantity}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-blue-400 group-hover/confirm:text-white transition-colors">Confirm</span>
            </div>
            <button
              onClick={(e) => handleAdjustQuantity(e, 1)}
              className="p-4 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
