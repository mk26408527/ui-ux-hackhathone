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
      <div className="min-h-screen bg-[#FBEBB5]">
        <main className="container mx-auto px-6 py-12 max-w-full">
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-lg">
              <h1 className="mb-8 text-5xl font-semibold">
                Rocket single seater
              </h1>
              <Link
                className="inline-block border-b-2 border-black pb-1 text-lg font-medium"
                href="/shop"
              >
                Shop Now
              </Link>
            </div>
            <div className="relative w-1/2">
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

      <div className="container mx-auto px-4 py-16 bg-[#FAF4F4] max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="border-none shadow-none bg-[#FAF4F4]">
              <CardContent className="p-0">
                <div className="relative aspect-square w-full -mb-32">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 px-5">
                <h2 className="text-2xl font-medium text-black">{product.name}</h2>
                <Link
                  href={product.href}
                  className="text-sm text-black underline underline-offset-8 hover:text-gray-600 transition-colors"
                >
                  View More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

