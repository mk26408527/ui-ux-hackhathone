'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'

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
    <nav className="bg-[#FBEBB5] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="text-lg font-bold text-black">
          M.Huzaifa
        </div>

        {/* Center Section (Navigation Links) */}
        <div className="hidden md:flex space-x-14 ml-20 items-center justify-center w-full">
          <NavLinks />
        </div>

        {/* Right Section (Icons) */}
        <div className="flex mr-3 items-center space-x-5">
          <NavIcons />
          {/* Hamburger Menu - Visible only on mobile */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pt-4 pb-2 space-y-2 text-center">
          <NavLinks mobile />
        </div>
      </div>
    </nav>
  )
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-sm font-medium"
    : "text-sm font-medium text-center"

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
      <button className="p-2">
        <User className="h-5 w-5" />
        <span className="sr-only">Account</span>
      </button>
      </Link>
     <Link href='/cart'>
      <button className="p-2">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </button>
      </Link>
      <Link href='/heart'>
      <button className="p-2">
        <Heart className="h-5 w-5" />
        <span className="sr-only">Wishlist</span>
      </button>
      </Link>
     <Link href='/checkout'>
      <button className="p-2">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
      </button>
      </Link>
    </>
  )
}
