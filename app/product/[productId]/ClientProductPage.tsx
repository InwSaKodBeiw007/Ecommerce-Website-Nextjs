"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const ClientProductPage = ({ productIdProp }: { productIdProp: number }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = productIdProp; // Use the prop directly
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(productId, quantity);
    router.push('/allproduct'); // Navigate back to allproduct page
  };

  const handleBuyNow = () => {
    addToCart(productId, quantity);
    router.push('/checkout'); // Navigate directly to checkout
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side: Product Image */}
        <div className="lg:w-1/2 flex justify-center items-center p-8 border-r border-zinc-800">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-2xl shadow-black/40">
            <div className="bg-white rounded-xl p-6">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Actions */}
        <div className="lg:w-1/2 space-y-6 p-8">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <p className="text-5xl font-bold text-blue-500">฿{product.price}</p>
          <p className="text-zinc-400 text-lg">{product.description}</p>

          {/* Quantity Selector */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-zinc-400 mb-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-24 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-4 rounded-xl transition duration-200 border border-zinc-700 cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition duration-200 shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProductPage;
