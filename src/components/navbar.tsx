"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/components/wishlist-context";
import Image from "next/image";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

export default function NavBar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn = false, user } = useUser();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

  return (
    <nav
      className={`px-4 py-4 w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-lg bg-transparent shadow-md"
          : "bg-[#FBEBB5]"
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
              cartItemCount={cartState.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
              wishlistItemCount={wishlistState.items.length}
              isSignedIn={isSignedIn}
              user={user}
            />
            {/* Hamburger Menu - Visible only on mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle>
                  <VisuallyHidden>Mobile Menu</VisuallyHidden>
                </SheetTitle>

                <div className="pt-4 pb-2 space-y-2">
                  <NavLinks mobile />
                </div>
              </SheetContent>
            </Sheet>
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
      <li className="group list-none">
        <Link href="/" className={linkClass}>
          Home
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group list-none">
        <Link href="/shop" className={linkClass}>
          Shop
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group list-none">
        <Link href="/about" className={linkClass}>
          About
          {!mobile && (
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          )}
        </Link>
      </li>
      <li className="group list-none">
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

interface NavIconsProps {
  cartItemCount: number;
  wishlistItemCount: number;
  isSignedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

function NavIcons({
  cartItemCount,
  wishlistItemCount,
  isSignedIn,
}: NavIconsProps) {
  return (
    <>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="redirect">
          <button className="p-1 sm:p-2">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </button>
        </SignInButton>
      )}
      <Link href="/wishlist">
        <button className="p-1 sm:p-2 relative">
          <Heart className="h-5 w-5" />
          {wishlistItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {wishlistItemCount}
            </span>
          )}
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
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetTitle>
            <VisuallyHidden>Cart</VisuallyHidden>
          </SheetTitle>
          <CartSidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}

