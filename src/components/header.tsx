import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import headersofa from "/public/headersofa.png"
import headertable from "/public/headertable.png"
import headersofas from "/public/headersofas.png"

export default function Header() {
  const products = [
    {
      id: 1,
      name: "Side table",
      image: headertable,
      href: "#",
    },
    {
      id: 2,
      name: "Side table",
      image: headersofas,
      href: "#",
    },
  ]

  return (
    <>
      {/* Header Section */}
      <div className="w-full bg-[#FBEBB5]">
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex items-center">
          <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2 max-w-lg">
                <h1 className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                  Rocket single seater
                </h1>
                <Link
                  className="inline-block border-b-2 border-black pb-1 text-base sm:text-lg font-medium transition-colors hover:border-gray-600 hover:text-gray-600"
                  href="/shop"
                >
                  Shop Now
                </Link>
              </div>
              <div className="relative w-full md:w-1/2 max-w-lg md:max-w-full">
                <Image
                  alt="White upholstered single seater chair"
                  className="h-auto w-full"
                  src={headersofa}
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </div>
          </main>
        </div>
      </div>

{/* Products Section */}
<div className="w-full bg-[#FAF4F4]"> 
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6"> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto">
      {products.map((product) => (
        <Card
          key={product.id}
          className="border-none shadow-none bg-[#FAF4F4] w-full"
        >
          <CardContent className="p-0">
            <div className="relative aspect-square w-72 ml-52"> 
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 px-4 sm:px-5  sm:pt-6">
            <h2 className="text-lg ml-52 sm:text-xl md:text-2xl font-medium text-black">
              {product.name}
            </h2>
            <Link
              href={product.href}
              className="text-sm ml-44 sm:text-base text-black underline underline-offset-8 hover:text-gray-600 transition-colors"
            >
              View More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
</div>

    </>
  )
}

