import { ArrowRight } from 'lucide-react'
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import mainsofa from "/public/mainsofa.png"
import mainchairs from "/public/mainchairs.png"
import maindyning from "/public/maindyning.png"
import maintable from "/public/maintable.png"
import mainsofy from "/public/mainsofy.png"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Product {
  id: string
  name: string
  price: number
  image: string | StaticImageData
}

const products: Product[] = [
  {
    id: "1",
    name: "Trenton modular sofa_3",
    price: 25000.00,
    image: mainsofa,
  },
  {
    id: "2",
    name: "Granite dining table with dining chair",
    price: 25000.00,
    image: maindyning,
  },
  {
    id: "3",
    name: "Outdoor bar table and stool",
    price: 25000.00,
    image: mainchairs,
  },
  {
    id: "4",
    name: "Plain console with teak mirror",
    price: 25000.00,
    image: maintable,
  },
]

export default function ProductShowcase() {
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
          <Card key={product.id} className="border-none shadow-none">
            <CardHeader className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={product.image} // This can now accept both string or StaticImageData
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-base font-medium line-clamp-2">
                {product.name}
              </CardTitle>
            </CardContent>
            <CardFooter>
              <p className="text-lg font-semibold">
                Rs. {product.price.toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="outline" className="gap-2">
         <Link href='/shop'>View More</Link>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
    {/* main second part */}
    <div className="min-h-screen bg-[#FFF9E5] flex items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-12">
        <div className="w-full lg:w-3/5">
          <Image
            src={mainsofy}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              Asgaard sofa
            </h1>
          </div>
          <Button 
            variant="outline" 
            className="rounded-none border-black text-black hover:bg-black hover:text-white transition-colors px-8 py-6 text-lg"
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
