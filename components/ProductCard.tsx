"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Assuming useCart is available

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string; // Added description
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAddingToCartMode, setIsAddingToCartMode] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(1);

  const handleBuyNow = () => {
    addToCart(product.id, 1); // Add 1 by default for Buy Now from card
    router.push('/checkout');
  };

  const handleAddToCartClick = () => {
    setIsAddingToCartMode(true);
  };

  const handleConfirmAddToCart = () => {
    addToCart(product.id, tempQuantity);
    setIsAddingToCartMode(false); // Exit quantity selection mode
    setTempQuantity(1); // Reset quantity for next time
  };

  return (
    <div className="border rounded-lg p-4 bg-zinc-900 text-white border-zinc-800 flex flex-col h-[400px]">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col cursor-pointer">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover rounded-lg h-48 w-full"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-blue-400">฿{product.price}</p>
        <p className="text-sm text-zinc-400 mt-1 line-clamp-2 overflow-hidden text-ellipsis">
          {product.description}
        </p>
      </Link>

      <div className="mt-4">
        {!isAddingToCartMode ? (
          <div className="flex gap-2">
            <button
              onClick={handleAddToCartClick}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-black font-bold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-zinc-800 rounded-md">
            <button
              onClick={() => setTempQuantity(prev => Math.max(1, prev - 1))}
              className="p-2 text-white bg-zinc-700 hover:bg-zinc-600 rounded-l-md cursor-pointer"
            >
              -
            </button>
            <span
              onClick={handleConfirmAddToCart}
              className="flex-1 text-center text-white font-semibold py-2 cursor-pointer"
            >
              {tempQuantity}
            </span>
            <button
              onClick={() => setTempQuantity(prev => prev + 1)}
              className="p-2 text-white bg-zinc-700 hover:bg-zinc-600 rounded-r-md cursor-pointer"
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

