'use client'

import { CheckCircle } from 'lucide-react'

export default function ConfirmOrderPage() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white flex flex-col items-center justify-center text-center p-8">
      <CheckCircle className="w-24 h-24 text-blue-500 mb-6" />
      <h1 className="text-4xl font-bold text-white mb-2">
        Order Received
      </h1>
      <p className="text-lg text-zinc-400">
        Thank you for your purchase. We've received your order and are processing it now.
      </p>
    </div>
  )
}
