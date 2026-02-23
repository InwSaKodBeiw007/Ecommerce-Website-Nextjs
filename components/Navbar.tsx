"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react'; // Assuming lucide-react is available, or use a simple div

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const router = useRouter();
  const itemCount = getCartItemCount();

  return (
    <nav className="fixed top-0 right-4 p-4 flex space-x-4 bg-zinc-950/80 backdrop-blur-sm z-40 rounded-bl-lg">
      <Link href="/" className="text-lg font-bold hover:text-blue-400 transition-colors">
        Home
      </Link>
      <Link href="/allproduct" className="text-lg font-bold hover:text-blue-400 transition-colors">
        All Products
      </Link>

      {/* Cart Icon */}
      <div
        onClick={() => router.push('/checkout')}
        className="relative flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
        aria-label="View Cart"
      >
        <ShoppingCart className="w-6 h-6 text-white" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
