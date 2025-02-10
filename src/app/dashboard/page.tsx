"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Package, DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { fetchOrders, listenToOrders } from "@/sanity/lib/fetchData"

interface Order {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
  }
  total: number
  createdAt: string
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth")
        if (!response.ok) {
          throw new Error("Not authenticated")
        }
        setIsLoading(false)
        // Fetch orders only if authenticated
        const initialOrders = await fetchOrders()
        setOrders(initialOrders)
        updateStats(initialOrders)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isLoading) {
      const subscription = listenToOrders((update) => {
        if (update.type === "insert" || update.type === "update") {
          setOrders((prevOrders) => {
            const newOrders = [update.result, ...prevOrders.filter((order) => order._id !== update.result._id)]
            updateStats(newOrders)
            return newOrders
          })
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [isLoading])

  const updateStats = (orders: Order[]) => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0)
    setTotalRevenue(revenue)
    const uniqueCustomers = new Set(orders.map((order) => order.customer.email))
    setTotalCustomers(uniqueCustomers.size)
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
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Dashboard</h1>
            <UserNav />
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardContent className="flex items-center">
                    <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Revenue
                      </CardTitle>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        ${totalRevenue.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center">
                    <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Customers
                      </CardTitle>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{totalCustomers}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center">
                    <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Orders
                      </CardTitle>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{orders.length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center">
                    <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Active Now
                      </CardTitle>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">-</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Sales Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Overview />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Recent Sales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales orders={orders.slice(0, 5)} />
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

