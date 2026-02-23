"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { FormEvent, useState } from 'react';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => router.push('/allproduct')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (event: FormEvent) => {
    event.preventDefault();
    // Simulate order placement
    console.log('Order placed!');
    console.log('Payment Method:', selectedPaymentMethod);
    clearCart(); // Clear cart after successful order
    router.push('/confirm-order'); // Navigate to confirm order page
  };

  const subtotal = getCartTotal();
  const shippingCost = 0; // Placeholder
  const discount = 0; // Placeholder
  const grandTotal = subtotal + shippingCost - discount;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 pb-20 lg:pb-8"> {/* Added pb-20 for mobile sticky button */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side: Cart Items */}
        <div className="lg:w-1/2 p-0 lg:p-8 border-r border-zinc-800"> {/* Removed p-8 to align with new structure */}
          <h1 className="text-3xl font-bold mb-6 text-white lg:p-0 p-4">Your Cart</h1> {/* Added p-4 for mobile */}
          <div className="space-y-4 p-4 lg:p-0"> {/* Added p-4 for mobile */}
            {cart.map((item) => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-zinc-400">฿{product.price}</p> {/* Individual price */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white p-1 rounded-md disabled:opacity-50 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white p-1 rounded-md cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-md cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={clearCart}
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 rounded-xl transition duration-200 border border-zinc-700 cursor-pointer mt-4 lg:p-0 p-4" 
          >
            Clear Cart
          </button>
        </div>

        {/* Right Side / Mobile Order */}
        <div className="lg:w-1/2 lg:p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-white p-4 lg:p-0">Order Details</h1>
          <form onSubmit={handlePlaceOrder} className="space-y-6 p-4 lg:p-0">
            {/* Shipping Information Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-zinc-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-400">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-zinc-400">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-zinc-400">
                      Zip/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-zinc-400">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="mt-1 block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="United States"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-3">
              <h2 className="text-xl font-bold text-white">Payment Method</h2>
              <div className="space-y-3">
                {/* QR Payment */}
                <label className={`flex items-center space-x-3 bg-zinc-800 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPaymentMethod === 'qr' ? 'border-blue-500' : 'border-zinc-700 hover:border-blue-500'}`}>
                  <input type="radio" name="paymentMethod" value="qr" checked={selectedPaymentMethod === 'qr'} onChange={() => setSelectedPaymentMethod('qr')} className="form-radio text-blue-600" required />
                  <span className="text-white font-medium">QR Payment</span>
                </label>
                {/* Bank Transfer */}
                <label className={`flex items-center space-x-3 bg-zinc-800 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPaymentMethod === 'bank' ? 'border-blue-500' : 'border-zinc-700 hover:border-blue-500'}`}>
                  <input type="radio" name="paymentMethod" value="bank" checked={selectedPaymentMethod === 'bank'} onChange={() => setSelectedPaymentMethod('bank')} className="form-radio text-blue-600" required />
                  <span className="text-white font-medium">Bank Transfer</span>
                </label>
                {/* Credit Card */}
                <label className={`flex items-center space-x-3 bg-zinc-800 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPaymentMethod === 'credit' ? 'border-blue-500' : 'border-zinc-700 hover:border-blue-500'}`}>
                  <input type="radio" name="paymentMethod" value="credit" checked={selectedPaymentMethod === 'credit'} onChange={() => setSelectedPaymentMethod('credit')} className="form-radio text-blue-600" required />
                  <span className="text-white font-medium">Credit Card</span>
                </label>
                {/* Cash on Delivery */}
                <label className={`flex items-center space-x-3 bg-zinc-800 border rounded-lg p-4 cursor-pointer transition-colors ${selectedPaymentMethod === 'cod' ? 'border-blue-500' : 'border-zinc-700 hover:border-blue-500'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={selectedPaymentMethod === 'cod'} onChange={() => setSelectedPaymentMethod('cod')} className="form-radio text-blue-600" required />
                  <span className="text-white font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Order Summary (inside right panel for desktop) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-3 mt-6">
              <h2 className="text-xl font-bold text-white">Order Summary</h2>
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span>฿{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping:</span>
                <span>฿{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Discount:</span>
                <span>-฿{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-white font-bold text-lg border-t border-zinc-700 pt-3">
                <span>Grand Total:</span>
                <span className="text-blue-400 text-2xl">฿{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order button for desktop */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition duration-200 shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer hidden lg:block"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* Sticky Mobile Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-950 border-t border-zinc-800 lg:hidden">
        <button
          onClick={handlePlaceOrder}
          type="submit" /* This type is only effective if wrapped in a form and that form's submit is handled */
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition duration-200 shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Place Order ฿{grandTotal.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
