'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, ShoppingCart, Filter, Grid, List, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart-context';
import { useWishlist } from '@/components/wishlist-context';
import { toast } from 'react-toastify';
import { fetchProductData } from '@/sanity/lib/fetchData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import shopheader from "/public/shopheader.png";

interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  inStock: boolean;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
}

export default function ShopPage() {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductData() as Product[];
        setProducts(data || []);
        const highestPrice = Math.max(...data.map(product => product.price));
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        toast.error('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filterAndSortProducts = useCallback(() => {
    return products.filter(product => {
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    }).sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.title.localeCompare(b.title);
        case 'name-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
  }, [products, searchQuery, priceRange, sort]);

  const filteredProducts = useMemo(() => filterAndSortProducts(), [filterAndSortProducts]);

  const handleViewChange = useCallback((newView: 'grid' | 'list') => {
    setView(newView);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
  }, []);

  const handlePriceRangeChange = useCallback((value: number[]) => {
    setPriceRange(value as [number, number]);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const addToCart = useCallback((product: Product) => {
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
    toast.success('Added to cart!');
  }, [cartDispatch]);

  const toggleWishlist = useCallback((product: Product) => {
    const isInWishlist = wishlistState.items.some(item => item.id === product._id);
  
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product._id });
      toast.info(`Removed from wishlist`);
    } else {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: {
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image,
        },
      });
      toast.dark("Added to wishlist");
    }
  }, [wishlistState.items, wishlistDispatch]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] w-full bg-fixed">
        <Image
          src={shopheader || "/placeholder.svg"}
          alt="Shop Header"
          fill
          className="object-cover"
          priority
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <Image src='/brand.png' alt="logo" width={77} height={77} />
          <h1 className="text-4xl font-bold text-black">Shop</h1>
          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href='/shop'><span>Shop</span></Link>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 bg-[#FAF4F4]">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 sm:flex-row sm:items-center sm:space-y-0">
          {/* Left Section */}
          <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Refine your product selection
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Price Range</h3>
                    <Slider
                      min={0}
                      max={maxPrice}
                      step={100}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                    />
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>Rs. {priceRange[0]}</span>
                      <span>Rs. {priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button
                variant={view === 'grid' ? "secondary" : "ghost"}
                size="sm"
                className="px-2 w-1/2 sm:w-auto"
                onClick={() => handleViewChange('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? "secondary" : "ghost"}
                size="sm"
                className="px-2 w-1/2 sm:w-auto"
                onClick={() => handleViewChange('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex flex-wrap items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Select defaultValue="default" onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-[140px] lg:w-[180px]">
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

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-10`}>
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className={`border-none shadow-none group relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:rotate-3 hover:-translate-y-2 ${
                view === 'list' ? 'flex flex-row items-center' : ''
              }`}
            >
              <CardHeader className={`p-0 ${view === 'list' ? 'w-1/3' : ''}`}>
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={500}
                    height={500}
                    priority
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                  {product.isFeaturedProduct && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="secondary" className="w-40" onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <div className="flex gap-2">
                        <Link href={`/shop/${product.slug}`}>
                          <Button variant="secondary" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => toggleWishlist(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              wishlistState.items.some((item) => item.id === product._id)
                                ? 'fill-red-500'
                                : ''
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={`pt-4 ${view === 'list' ? 'w-2/3' : ''}`}>
                <Link href={`/shop/${product.slug}`}>
                  <CardTitle className="text-base font-medium line-clamp-2 hover:underline">
                    {product.title}
                  </CardTitle>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-sm text-gray-500 mt-1">Stock: {product.stockLevel}</p>
              </CardContent>
              <CardFooter className={view === 'list' ? 'justify-end' : ''}>
                <div className="flex items-center gap-2">
                  {product.discountPercentage > 0 ? (
                    <>
                      <p className="text-lg font-semibold text-red-500">
                        $ {((product.price * (100 - product.discountPercentage)) / 100).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        $ {product.price.toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">$ {product.price.toLocaleString()}</p>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

