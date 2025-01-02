'use client'

import React from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/components/shop-main'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Heart, Minus, Plus, Share2, Facebook, Twitter } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { useCart } from '@/components/cart-context'
import { toast } from 'react-toastify'

export default function ProductDetails() {
  const params = useParams()
  const productId = params.productId as string
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()
  
  const product = products.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  const updateQuantity = (value: number) => {
    if (value < 1) return
    setQuantity(value)
  }

  const addToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity 
      } 
    })
    toast.success('Product added successfully')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/shop" className="text-sm text-gray-600 hover:underline">
          ← Back to Shop
        </Link>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="hidden md:grid grid-cols-5 gap-2">
            {[...Array(4)].map((_, index) => (
              <button key={index} className="relative aspect-square border hover:border-primary rounded-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(4)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 fill-primary"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 15.25L4 19L5.13 12.37L1 7.75L7 7L10 1Z" />
                </svg>
              ))}
              <svg
                className="w-5 h-5 fill-muted stroke-muted-foreground"
                viewBox="0 0 20 20"
              >
                <path d="M10 1L13 7L19 7.75L14.88 12.37L16 19L10 15.25L4 19L5.13 12.37L1 7.75L7 7L10 1Z" />
              </svg>
            </div>
            <span className="text-sm text-muted-foreground">(5 Customer Reviews)</span>
          </div>

          <p className="text-gray-600">
            Experience unparalleled comfort and style with our {product.name}. 
            Crafted with premium materials and designed for both aesthetics and functionality, 
            this piece is perfect for elevating any living space.
          </p>

          {/* Size Selector */}
          <div className="space-y-4">
            <Label className="text-base">Size</Label>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <Label
                  key={size}
                  className={cn(
                    "border rounded-md p-2 px-4 cursor-pointer hover:bg-primary/10",
                    size === 'M' && "bg-primary/10"
                  )}
                >
                  {size}
                </Label>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-4">
            <Label className="text-base">Color</Label>
            <RadioGroup defaultValue="beige" className="flex gap-2">
              {[
                { value: 'beige', class: 'bg-[#F5DEB3]' },
                { value: 'gray', class: 'bg-gray-400' },
                { value: 'brown', class: 'bg-amber-800' },
              ].map((color) => (
                <div key={color.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={color.value}
                    id={color.value}
                    className={cn("w-6 h-6", color.class)}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none"
                onClick={() => updateQuantity(quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none"
                onClick={() => updateQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="flex-1"
              onClick={addToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm">SKU: <span className="text-muted-foreground">{product.id.padStart(6, '0')}</span></p>
            <p className="text-sm">Category: <span className="text-muted-foreground">Furniture</span></p>
            <p className="text-sm">Tags: <span className="text-muted-foreground">Modern, Comfortable, Stylish</span></p>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <span className="text-sm">Share:</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

