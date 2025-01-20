import Image from "next/image"
import Link from "next/link"
import headersofa from "/public/headersofa.png"

export default function Header() {
 

  return (
    <>
  {/* Header Section */}
<div className="w-full bg-[#FBEBB5]">
  <div className="max-w-7xl mx-auto min-h-[10vh] flex items-center">
    <main className="container mx-auto px-4 sm:px-6 py-2 sm:py-4 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="w-full md:w-1/2 max-w-lg">
          <h1 className="mb-2 text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
            Rocket single seater
          </h1>
          <Link
            className="inline-block border-b-2 border-black pb-1 text-xs sm:text-sm font-medium transition-colors hover:border-gray-600 hover:text-gray-600"
            href="/shop"
          >
            Shop Now
          </Link>
        </div>
        <div className="relative w-full md:w-1/2 max-w-lg">
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



    </>
  )
}

