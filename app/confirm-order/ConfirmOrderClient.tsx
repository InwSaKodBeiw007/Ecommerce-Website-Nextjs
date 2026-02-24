'use client'

import { CheckCircle, ArrowLeft, Package, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

interface ConfirmOrderClientProps {
  order: any;
}

export default function ConfirmOrderClient({ order }: ConfirmOrderClientProps) {
  const formattedDate = new Date(order.createdAt).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-zinc-950 min-h-screen text-white p-4 md:p-12 flex flex-col items-center font-sans">
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto border border-blue-500/20 shadow-lg shadow-blue-600/5">
            <CheckCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Order Confirmed!</h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto">
            Success! Your premium gadgets are being prepared for shipment.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 text-left space-y-10 shadow-2xl shadow-black/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" />
          
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <Package className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-black">Order ID</span>
              </div>
              <p className="text-xl font-mono font-bold text-blue-400">#{order.id}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-black">Transaction Date</span>
              </div>
              <p className="text-lg text-white font-bold">{formattedDate}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-6 relative z-10">
            <h2 className="text-xl font-black text-white flex items-center">
              <span className="w-1.5 h-5 bg-blue-600 mr-3 rounded-full" />
              Items Purchased
            </h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center overflow-hidden">
                      <img src={item.product.image} alt="item" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{item.product.name}</p>
                      <p className="text-xs text-zinc-500 font-medium">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-white">฿{(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-8 border-t border-zinc-800 relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Total Amount Paid</span>
                <span className="text-4xl font-black text-blue-500 tracking-tighter">฿{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-zinc-400">{order.customerName}</p>
                <p className="text-[10px] text-zinc-600 font-medium">{order.email}</p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="pt-8 border-t border-zinc-800 flex items-start gap-4 relative z-10 text-zinc-500 bg-zinc-950/30 -mx-8 -mb-12 p-8 rounded-b-[2.5rem]">
            <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-black">Shipping to</span>
              <p className="text-sm font-medium leading-relaxed">{order.address}</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-blue-400 hover:text-white hover:border-blue-500 font-bold transition-all group"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
