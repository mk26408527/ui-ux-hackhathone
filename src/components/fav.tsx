import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Twitter, Heart, Minus, Plus, Star } from 'lucide-react'
import mainsofy from "/public/mainsofy.png"
export default function ProductPage() {
  const images = [
    '/wishlistone.png',
    '/mainsofy.png',
    '/wishlisttow.png',
    '/wishlistthree.png',
  
  ]

  const sizes = ['L', 'XL', 'XS']
  const colors = ['purple', 'black', 'gold']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {images.map((img, index) => (
              <button
                key={index}
                className={`border-2 ${index === 0 ? 'border-[#B88E2F]' : 'border-transparent'} hover:border-[#B88E2F] transition-colors duration-200`}
              >
                <Image
                  src={mainsofy}
                  alt={`Product view ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 bg-[#FFF9E5] mb-28 order-1 md:order-2">
            <Image
              src={images[1]}
              alt="Product main view"
              width={600}
              height={600}
              className="w-full h-auto object-cover mt-40"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl  text-[#3A3A3A]">Asgaard sofa</h1>
          <div className="text-2xl text-[#3A3A3A]">Rs. 250,000.00</div>
          
          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-[#3A3A3A] text-sm">5 Customer Review</span>
          </div>

          <p className="text-[#3A3A3A] text-base">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced
            audio which boasts a clear midrange and extended highs for a
            sound.
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="text-sm text-[#3A3A3A]">Size</div>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 rounded-full border text-sm font-bold ${
                    size === 'L'
                      ? 'border-[#B88E2F] bg-[#B88E2F] text-white'
                      : 'border-[#D9D9D9] text-[#3A3A3A]'
                  } hover:border-[#B88E2F] transition-colors duration-200`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <div className="text-sm text-[#3A3A3A]">Color</div>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${
                    color === 'purple' ? 'bg-purple-500' :
                    color === 'black' ? 'bg-black' :
                    'bg-yellow-700'
                  } ${color === 'purple' ? 'ring-2 ring-offset-2 ring-[#B88E2F]' : ''} hover:ring-2 hover:ring-offset-2 hover:ring-[#B88E2F] transition-all duration-200`}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border border-[#D9D9D9] rounded-md">
              <button className="p-2 hover:bg-gray-100 transition-colors duration-200">
                <Minus className="w-4 h-4 text-[#3A3A3A]" />
              </button>
              <span className="px-4 py-2 text-[#3A3A3A]">1</span>
              <button className="p-2 hover:bg-gray-100 transition-colors duration-200">
                <Plus className="w-4 h-4 text-[#3A3A3A]" />
              </button>
            </div>
            <Button className="flex-1 bg-[#B88E2F] hover:bg-[#A67B1F] text-white">Add To Cart</Button>
          </div>

          {/* Product Meta */}
          <div className="space-y-4 pt-6 border-t border-[#D9D9D9]">
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">SKU</span>
              <span className="text-[#9F9F9F]">: SS001</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">Category</span>
              <span className="text-[#9F9F9F]">: Sofas</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#3A3A3A]">Tags</span>
              <span className="text-[#9F9F9F]">: Sofa, Chair, Home, Shop</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <span className="text-[#3A3A3A]">Share</span>
                <div className="flex gap-2">
                  <button className="hover:text-[#B88E2F] transition-colors duration-200">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="hover:text-[#B88E2F] transition-colors duration-200">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="hover:text-[#B88E2F] transition-colors duration-200">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button className="hover:text-[#B88E2F] transition-colors duration-200">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

