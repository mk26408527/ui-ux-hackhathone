'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

export default function CartSidebar() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="flex-grow overflow-auto">
        {/* Cart Item */}
        <div className="flex items-center gap-4 pb-4 border-b">
          <div className="relative h-20 w-20 rounded-lg bg-[#FDF9F0] p-2">
            <Image
              src="/mainsofy.png"
              alt="Asgaard sofa"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-medium">Asgaard sofa</h3>
            <p className="text-sm text-gray-500">Rs. 250,000.00</p>
            <div className="flex items-center mt-2">
              <Input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center"
              />
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium">Subtotal</span>
          <span className="text-lg font-bold">Rs. {250000 * quantity}.00</span>
        </div>
        <Link href="/cart">
          <Button className="w-full bg-black hover:bg-gray-800 text-white">
            View Cart
          </Button>
        </Link>
        <Link href="/checkout">
          <Button className="w-full bg-[#B88E2F] hover:bg-[#A47E2F] text-white mt-2">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  )
}

