"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { createOrderTransaction } from '@/app/actions/order';
import { ChevronRight, CreditCard, Truck, ClipboardCheck, Shield, RotateCcw } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

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

  const handlePlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const orderData = {
      customerName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string, // Added phone
      address: formData.get('address') as string,
    };

    const result = await createOrderTransaction(orderData, cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    })));

    if (result.success) {
      clearCart();
      router.push(`/confirm-order?orderId=${result.orderId}`);
    } else {
      alert(`Order failed: ${result.error}`);
      setIsSubmitting(false);
    }
  };

  const subtotal = getCartTotal();
  const shippingCost = 0;
  const discount = 0;
  const grandTotal = subtotal + shippingCost - discount;

  const steps = [
    { id: 1, label: 'Shipping', icon: Truck },
    { id: 2, label: 'Payment', icon: CreditCard },
    { id: 3, label: 'Review', icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 pb-24 lg:pb-12 font-sans">
      <div className="container mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-zinc-900 text-zinc-600 border border-zinc-800'}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`absolute -bottom-7 text-[10px] uppercase tracking-[0.2em] font-black whitespace-nowrap transition-colors duration-500 ${currentStep >= step.id ? 'text-blue-400' : 'text-zinc-600'}`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-4 h-[2px] bg-zinc-900 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-blue-600 transition-transform duration-700 ease-in-out origin-left ${currentStep > step.id ? 'scale-x-100' : 'scale-x-0'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Cart & Forms */}
          <div className="lg:w-[60%] space-y-12">
            {/* Cart Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center">
                <span className="w-1.5 h-6 bg-blue-600 mr-4 rounded-full" />
                Your Cart
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-5 hover:border-zinc-700 transition-colors group">
                    <div className="flex items-center space-x-6">
                      <div className="bg-white rounded-2xl p-2 w-20 h-20 flex items-center justify-center shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</h3>
                        <p className="text-blue-500 font-mono font-bold">฿{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="px-3 py-1.5 hover:bg-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={clearCart}
                className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 px-2 cursor-pointer"
              >
                <div className="w-4 h-[1px] bg-current opacity-30" />
                Clear Shopping Cart
              </button>
            </div>

            {/* Shipping Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white flex items-center">
                  <span className="w-1.5 h-6 bg-blue-600 mr-4 rounded-full" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 px-1">Full Name</label>
                    <input type="text" name="fullName" placeholder="John Doe" required className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all shadow-lg" onFocus={() => setCurrentStep(1)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 px-1">Email Address</label>
                    <input type="email" name="email" placeholder="john@example.com" required className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all shadow-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 px-1">Phone Number</label>
                    <input type="tel" name="phone" placeholder="081-234-5678" required className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all shadow-lg" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 px-1">Shipping Address</label>
                    <input type="text" name="address" placeholder="123 Smart St, Gadget City" required className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-white flex items-center">
                  <span className="w-1.5 h-6 bg-blue-600 mr-4 rounded-full" />
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'qr', label: 'QR Payment' },
                    { id: 'bank', label: 'Bank Transfer' },
                    { id: 'credit', label: 'Credit Card' },
                    { id: 'cod', label: 'Cash on Delivery' }
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${selectedPaymentMethod === method.id ? 'bg-blue-600/10 border-blue-600 shadow-lg shadow-blue-600/10' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
                      onClick={() => {
                        setSelectedPaymentMethod(method.id);
                        setCurrentStep(2);
                      }}
                    >
                      <input type="radio" name="paymentMethod" value={method.id} checked={selectedPaymentMethod === method.id} onChange={() => { }} className="hidden" required />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPaymentMethod === method.id ? 'border-blue-500' : 'border-zinc-700'}`}>
                        {selectedPaymentMethod === method.id && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                      </div>
                      <span className={`font-bold transition-colors ${selectedPaymentMethod === method.id ? 'text-white' : 'text-zinc-500'}`}>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:w-[40%]">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full" />

                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-zinc-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-500 font-bold uppercase text-xs tracking-widest mt-1">Free</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-medium">
                    <span>Tax Estimate</span>
                    <span className="text-white">฿0.00</span>
                  </div>
                  <div className="h-[1px] bg-zinc-800 my-2" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">Total Amount</span>
                      <span className="text-4xl font-black text-white tracking-tighter">฿{grandTotal.toLocaleString()}</span>
                    </div>
                    <span className="text-blue-500 text-xs font-bold mb-1">VAT Included</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isSubmitting || !selectedPaymentMethod}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-black py-6 rounded-3xl transition-all duration-300 shadow-xl shadow-blue-600/20 text-lg active:scale-[0.98] cursor-pointer"
                    onMouseEnter={() => setCurrentStep(3)}
                  >
                    {isSubmitting ? 'Finalizing Order...' : 'Confirm & Place Order'}
                  </button>
                  <p className="text-[10px] text-center text-zinc-600 font-bold uppercase tracking-widest">
                    By confirming, you agree to our Terms & Conditions
                  </p>
                </div>
              </div>

              {/* Trust Badges in Summary */}
              <div className="flex items-center justify-center gap-8 px-4 opacity-40">
                <Shield className="w-6 h-6" />
                <Truck className="w-6 h-6" />
                <RotateCcw className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-50">
        <button
          form="checkout-form"
          type="submit"
          disabled={isSubmitting || !selectedPaymentMethod}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 text-lg active:scale-95 disabled:bg-zinc-800"
        >
          {isSubmitting ? 'Processing...' : `Pay ฿${grandTotal.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
