'use client';

import Image, { StaticImageData } from "next/image";
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from '@/components/cart-context';
import { toast } from 'react-toastify';

import mainsofa from "/public/mainsofa.png"
import mainchairs from "/public/mainchairs.png"
import maindyning from "/public/maindyning.png"
import maintable from "/public/maintable.png"
import maindex from "/public/maindex.png"
import maindexflower from "/public/maindexflower.png"
import maindexchai from "/public/maindexchai.png"
import maindexwork from "/public/maindexwork.png"
import maindexsit from "/public/maindexsit.png"
import maindexalmari from "/public/maindexalmari.png"
import maindexchairs from "/public/maindexchairs.png"
import maindexchair from "/public/maindexchair.png"
import maindexstool from "/public/maindexstool.png"
import mainsofy from "/public/mainsofy.png"
import mainarea from "/public/mainarea.png"
import mainguestroom from "/public/mainguestroom.png"

interface Product {
  id: string;
  name: string;
  price: number;
  image: StaticImageData;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Trenton modular sofa_3",
    price: 250000.00,
    image: mainsofa,
  },
  {
    id: "2",
    name: "Outdoor bar table and stool",
    price: 250000.00,
    image: mainchairs,
  },
  {
    id: "3",
    name: "Granite dining table with dining chair",
    price: 250000.00,
    image: maindyning,
  },
  {
    id: "4",
    name: "Plain console with teak mirror",
    price: 250000.00,
    image: maintable,
  },
  {
    id: "5",
    name: "Grain coffee table",
    price: 150000.00,
    image: maindex,
  },
  {
    id: "6",
    name: "Kent coffee table",
    price: 2250000.00,
    image: maindexflower,
  },
  {
    id: "7",
    name: "Round coffee table_color 2",
    price: 251000.00,
    image: maindexchai,
  },
  {
    id: "8",
    name: "Reclaimed teak coffee table",
    price: 252000.00,
    image: maindexwork,
  },
  {
    id: "9",
    name: "Plain console_",
    price: 258200.00,
    image: maindexsit,
  },
  {
    id: "10",
    name: "Reclaimed teak Sideboard",
    price: 200000.00,
    image: maindexalmari,
  },
  {
    id: "11",
    name: "SJP_0825",
    price: 2000000.00,
    image: maindexchairs,
  },
  {
    id: "12",
    name: "Bella chair and table",
    price: 1000000.00,
    image: maindexchair,
  },
  {
    id: "13",
    name: "Granite square side table",
    price: 2588000.00,
    image: maindexstool,
  },
  {
    id: "14",
    name: "Asgaard sofa",
    price: 250000.00,
    image: mainsofy,
  },
  {
    id: "15",
    name: "Maya sofa three seater",
    price: 1150000.00,
    image: mainarea,
  },
  {
    id: "16",
    name: "Outdoor sofa set",
    price: 2440000.00,
    image: mainguestroom,
  },
];

export default function ShopMain() {
  const { dispatch } = useCart();

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    toast.success("Product added successfully!");
  };

  return (
    <>
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-none shadow-none group relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:rotate-3 hover:-translate-y-2"
            >
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="secondary" className="w-40" onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <div className="flex gap-2">
                        <Link href={`/shop/${product.id}`}>
                          <Button variant="secondary" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="secondary" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Link href={`/shop/${product.id}`}>
                  <CardTitle className="text-base font-medium line-clamp-2 hover:underline">
                    {product.name}
                  </CardTitle>
                </Link>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-semibold">
                  Rs. {product.price.toLocaleString()}
                </p>
              </CardFooter>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}