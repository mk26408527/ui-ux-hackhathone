/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package, Mail, Phone, MapPin, Calendar, User, UploadCloud } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useAuth } from "@/hooks/use-auth"
import {
  fetchProducts,
  fetchOrders,
  fetchCustomers,
  listenToProducts,
  listenToOrders,
  listenToCustomers,
} from "@/sanity/lib/fetchData"

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  joined: string
  role: string
  profilePic: string
}

interface PerformanceData {
  products: number
  orders: number
  revenue: number
  customers: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "Muhammad Huzaifa",
    email: "huzaifa@gmail.com",
    phone: "+92 314-2238289",
    location: "Karachi, Pakistan",
    joined: "Joined January 2024",
    role: "Administrator",
    profilePic: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pro.jpg-qEmDmaBucET3hVxLAnRlXdjx6IRbsQ.jpeg",
  })
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    products: 0,
    orders: 0,
    revenue: 0,
    customers: 0,
  })
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile)
  // const { isLoggedIn, isLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth")
        if (response.ok) {
          setIsLoading(false)
          // Fetch initial data
          fetchInitialData()

          // Set up real-time listeners
          const productsSubscription = listenToProducts(handleProductsUpdate)
          const ordersSubscription = listenToOrders(handleOrdersUpdate)
          const customersSubscription = listenToCustomers(handleCustomersUpdate)

          // Clean up subscriptions
          return () => {
            productsSubscription.unsubscribe()
            ordersSubscription.unsubscribe()
            customersSubscription.unsubscribe()
          }
        } else {
          throw new Error("Not authenticated")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        toast({
          title: "Unauthorized",
          description: "Please log in to view your profile.",
          variant: "destructive",
        })
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router, toast])

  const fetchInitialData = async () => {
    try {
      const [products, orders, customers] = await Promise.all([fetchProducts(), fetchOrders(), fetchCustomers()])
      setPerformanceData({
        products: products.length,
        orders: orders.length,
        revenue: orders.reduce((sum: number, order: { total?: number }) => sum + (order.total || 0), 0),
        customers: customers.length,
      })
    } catch (error) {
      console.error("Error fetching initial data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch initial data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleProductsUpdate = (update: { type: string }) => {
    if (update.type === "insert" || update.type === "update") {
      setPerformanceData((prev) => ({ ...prev, products: prev.products + 1 }))
    } else if (update.type === "delete") {
      setPerformanceData((prev) => ({ ...prev, products: prev.products - 1 }))
    }
  }

  const handleOrdersUpdate = (update: { type: string; result: { total: any } }) => {
    if (update.type === "insert" || update.type === "update") {
      setPerformanceData((prev) => ({
        ...prev,
        orders: prev.orders + 1,
        revenue: prev.revenue + (update.result.total || 0),
      }))
    } else if (update.type === "delete") {
      setPerformanceData((prev) => ({
        ...prev,
        orders: prev.orders - 1,
        revenue: prev.revenue - (update.result.total || 0),
      }))
    }
  }

  const handleCustomersUpdate = (update: { type: string }) => {
    if (update.type === "insert" || update.type === "update") {
      setPerformanceData((prev) => ({ ...prev, customers: prev.customers + 1 }))
    } else if (update.type === "delete") {
      setPerformanceData((prev) => ({ ...prev, customers: prev.customers - 1 }))
    }
  }

  const handleProfileSave = () => {
    setProfile(tempProfile)
    setIsEditOpen(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setProfile((prev) => ({ ...prev, profilePic: reader.result as string }))
        setTempProfile((prev) => ({ ...prev, profilePic: reader.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block">
        <div className="py-4 px-3">
          <Link href="/dashboard" className="flex items-center pl-2.5 mb-5">
            <Package className="h-6 w-6 mr-2 text-blue-600" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Furniture Store</span>
          </Link>
          <DashboardNav />
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Profile</h1>
            <UserNav />
          </div>
        </header>

        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <div className="grid gap-6 mb-8 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardContent className="flex flex-col items-center pt-6">
                    <div className="relative">
                      <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage src={profile.profilePic} alt="Profile Picture" />
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="profile-pic-input"
                        className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow cursor-pointer"
                      >
                        <UploadCloud className="h-4 w-4 text-gray-600" />
                      </label>
                      <input
                        id="profile-pic-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePicChange}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">{profile.name}</h2>
                    <Badge variant="secondary" className="mb-4">
                      {profile.role}
                    </Badge>
                    <div className="w-full space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{profile.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{profile.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{profile.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{profile.joined}</span>
                      </div>
                    </div>
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                      <DialogTrigger asChild>
                        <Button className="mt-6 w-full">Edit Profile</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={tempProfile.name}
                              onChange={(e) =>
                                setTempProfile({
                                  ...tempProfile,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              value={tempProfile.email}
                              onChange={(e) =>
                                setTempProfile({
                                  ...tempProfile,
                                  email: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              value={tempProfile.phone}
                              onChange={(e) =>
                                setTempProfile({
                                  ...tempProfile,
                                  phone: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <Input
                              id="location"
                              value={tempProfile.location}
                              onChange={(e) =>
                                setTempProfile({
                                  ...tempProfile,
                                  location: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleProfileSave}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="activity" className="w-full">
                      <TabsList>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                      </TabsList>
                      <TabsContent value="activity">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Products</h3>
                            <p className="text-3xl font-bold text-blue-600">{performanceData.products}</p>
                            <p className="text-gray-600 dark:text-gray-400">Total managed</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Orders</h3>
                            <p className="text-3xl font-bold text-blue-600">{performanceData.orders}</p>
                            <p className="text-gray-600 dark:text-gray-400">Total processed</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Revenue</h3>
                            <p className="text-3xl font-bold text-blue-600">${performanceData.revenue.toFixed(2)}</p>
                            <p className="text-gray-600 dark:text-gray-400">Total generated</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Customers</h3>
                            <p className="text-3xl font-bold text-blue-600">{performanceData.customers}</p>
                            <p className="text-gray-600 dark:text-gray-400">Total managed</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

