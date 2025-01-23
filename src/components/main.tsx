"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import mainsofy from "/public/mainsofy.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchProductData } from "@/sanity/lib/fetchData";

interface Product {
  _id: string;
  title: string;
  slug: string; 
  price: number;
  image: string;
  category: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProductData();
        setProducts(data.slice(8, 12)); // Take products 8-12
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Top Picks For You</h2>
          <p className="text-muted-foreground">
            Find a bright ideal to suit your taste with our great selection of suspension, floor, and table lights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="border-none shadow-none group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              <CardHeader className="p-0">
                <Link href={`/shop/${product.slug}`}>
                  <div className="aspect-square relative overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-base font-medium line-clamp-2 group-hover:text-primary group-hover:underline transition-colors duration-300">
                  <Link href={`/shop/${product.slug}`}>{product.title}</Link>
                </CardTitle>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-semibold">$ {product.price.toLocaleString()}</p>
              </CardFooter>
              <div className="w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="gap-2">
            <Link href="/shop">View More</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Second Section */}
      <div className="min-h-screen bg-[#FFF9E5] flex items-center justify-center px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-12">
          <div className="w-full lg:w-3/5">
            <Image
              src={mainsofy || "/placeholder.svg"}
              alt="Asgaard sofa set showing multiple angles"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="w-full lg:w-2/5 space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-black/80">New Arrivals</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">Asgaard sofa</h1>
            </div>
            <Link href="/shop/asgaard-sofa">
              <Button
                variant="outline"
                className="rounded-none border-black text-black hover:bg-black hover:text-white transition-colors px-8 py-6 mt-5 text-lg"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
