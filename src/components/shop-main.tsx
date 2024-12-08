
import Image, { StaticImageData } from "next/image"
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  id: string
  name: string
  price: number
  image: StaticImageData
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
    name: "Outdoor bar table and stool",
    price: 25000.00,
    image: mainchairs,
  },
  {
    id: "3",
    name: "Granite dining table with dining chair",
    price: 25000.00,
    image: maindyning,
  },
  {
    id: "4",
    name: "Plain console with teak mirror",
    price: 25000.00,
    image: maintable,
  },
  {
    id: "5",
    name: "Grain coffee table",
    price: 15000.00,
    image: maindex,
  },
  {
    id: "6",
    name: "Kent coffee table",
    price: 225000.00,
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
    price: 25200.00,
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
    price: 20000.00,
    image: maindexalmari,
  },
  {
    id: "11",
    name: "SJP_0825",
    price: 200000.00,
    image: maindexchairs,
  },
  {
    id: "12",
    name: "Bella chair and table",
    price: 100000.00,
    image: maindexchair,
  },
  {
    id: "13",
    name: "Granite square side table",
    price: 258800.00,
    image: maindexstool,
  },
  {
    id: "14",
    name: "Asgaard sofa",
    price: 25000.00,
    image: mainsofy,
  },
  {
    id: "15",
    name: "Maya sofa three seater",
    price: 115000.00,
    image: mainarea,
  },
  {
    id: "16",
    name: "Outdoor sofa set",
    price: 244000.00,
    image: mainguestroom,
  },
]

export default function ShopMain() {
  return (
    <>
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <Card key={product.id} className="border-none shadow-none group">
            <CardHeader className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="secondary" className="w-40">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
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
    </section>

  {/* Pagination */}
    <div className="w-full space-y-20">
      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
             className="h-8 w-8 bg-[#FBEBB5] p-0 text-black hover:bg-[#fdebb3]/90"
        >
          1
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 bg-[#fcf6e8] text-black hover:bg-[#FFF8E7]/90"
        >
          2
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 bg-[#fcf6e8] text-black hover:bg-[#FFF8E7]/90"
        >
          3
        </Button>
        <Button
          variant="ghost"
          className="px-4 bg-[#fcf6e8] text-black hover:bg-[#FFF8E7]/90"
        >
          Next
        </Button>
      </div>

      {/* Features */}
      <div className="bg-[#FDF7FC] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              For all orders over $50, consectetur adipim scing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, consectetur adipim scing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment, consectetur adipim scing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
