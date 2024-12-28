'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CartSidebar from '@/components/CartSidebar';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-[#FBEBB5] px-4 py-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="text-lg font-bold text-black">
            M.Huzaifa
          </div>

          {/* Center Section (Navigation Links) */}
          <div className="hidden md:flex space-x-8 items-center justify-center flex-grow">
            <NavLinks />
          </div>

          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            <NavIcons />
            {/* Hamburger Menu - Visible only on mobile */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-2 space-y-2 text-center">
            <NavLinks mobile />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-sm font-medium text-black hover:text-gray-700 transition-colors"
    : "text-sm font-medium text-black hover:text-gray-700 transition-colors"

  return (
    <>
      <Link className={linkClass} href="/">
        Home
      </Link>
      <Link className={linkClass} href="/shop">
        Shop
      </Link>
      <Link className={linkClass} href="/about">
        About
      </Link>
      <Link className={linkClass} href="/contact">
        Contact
      </Link>
    </>
  )
}

function NavIcons() {
  return (
    <>
      <Link href='/account'>
        <button className="p-1 sm:p-2">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </button>
      </Link>
      <Link href='/search'>
        <button className="p-1 sm:p-2">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </Link>
      <Link href='/wishlist'>
        <button className="p-1 sm:p-2">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-1 sm:p-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </button>
        </SheetTrigger>
        <SheetContent>
          <CartSidebar />
        </SheetContent>
      </Sheet>
    </>
  )
}

