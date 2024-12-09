'use client'

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import shopheader from "/public/shopheader.png";

export default function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative h-[300px] w-full">
        <Image
          src={shopheader}
          alt="Shop Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="mb-4">
            <svg
              className="h-8 w-8 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-black">Cart</h1>
          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/contact" className="hover:underline">
              Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 bg-[#FDF9F0] p-4">
                <div className="col-span-6 text-base font-medium">Product</div>
                <div className="col-span-2 text-base font-medium">Price</div>
                <div className="col-span-2 text-base font-medium">Quantity</div>
                <div className="col-span-2 text-base font-medium">Subtotal</div>
              </div>

              {/* Cart Item */}
              <div className="grid grid-cols-12 gap-4 p-4 items-center border-b">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-lg bg-[#FDF9F0] p-2">
                    <Image
                      src="/mainsofy.png"
                      alt="Asgaard sofa"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-600">Asgaard sofa</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Rs. 250,000.00</span>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 text-center"
                  />
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-gray-600">
                    Rs. {250000 * quantity}.00
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <div className="bg-[#FDF9F0] rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-28">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base">Subtotal</span>
                  <span className="text-gray-600">Rs. {250000 * quantity}.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-[#B88E2F] text-xl">
                    Rs. {250000 * quantity}.00
                  </span>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-lg py-3 mt-4">
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#FDF7FC] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              For all orders over $50, consectetur adipiscing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, consectetur adipiscing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
