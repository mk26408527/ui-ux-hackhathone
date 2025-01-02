"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/components/cart-context";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const { state } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`bg-[#FBEBB5] px-4 py-4 w-full transition-all duration-300 ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image src="/brand.png" alt="logo" width={37} height={37} />
          </Link>

          {/* Center Section (Navigation Links) */}
          <ul className="hidden md:flex items-center gap-8">
            <NavLinks />
          </ul>

          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            <NavIcons
              cartItemCount={state.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            />
            {/* Hamburger Menu - Visible only on mobile */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const linkClass = mobile
    ? "block py-2 text-sm font-medium text-black hover:text-primary transition-colors"
    : "relative text-sm font-medium text-black hover:text-primary transition-colors";

  return (
    <>
      <li className="group">
        <Link href="/" className={linkClass}>
          Home
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group">
        <Link href="/shop" className={linkClass}>
          Shop
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group">
        <Link href="/about" className={linkClass}>
          About
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group">
        <Link href="/contact" className={linkClass}>
          Contact
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
    </>
  );
}

function NavIcons({ cartItemCount }: { cartItemCount: number }) {
  return (
    <>
      <Link href="/account">
        <button className="p-1 sm:p-2">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </button>
      </Link>
      <Link href="/search">
        <button className="p-1 sm:p-2">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </button>
      </Link>
      <Link href="/wishlist">
        <button className="p-1 sm:p-2">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-1 sm:p-2 relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </button>
        </SheetTrigger>
        <SheetContent>
          <CartSidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}
