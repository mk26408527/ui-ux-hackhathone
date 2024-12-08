'use client'

import shopheader from "/public/shopheader.png";
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] w-full">
        <Image
          src={shopheader}
          alt="Shop Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="mb-4">
            <svg
              className="h-8 w-8 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-black">Shop</h1>
          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <span>Shop</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 py-8 bg-[#FAF4F4]">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <div className="flex items-center space-x-2 border-l pl-4">
              <Button variant="ghost" size="sm" className="px-2">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <List className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
             Showing 1-16 of 32 results
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="16">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16">Show 16</SelectItem>
                <SelectItem value="32">Show 32</SelectItem>
                <SelectItem value="48">Show 48</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="default">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

