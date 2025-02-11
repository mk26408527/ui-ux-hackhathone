"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { fetchOrders, listenToOrders } from "@/sanity/lib/fetchData"
import { Badge } from "@/components/ui/badge"

type Order = {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
  }
  total: number
  status: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth")
        if (response.ok) {
          setIsLoading(false)
          fetchOrders()
            .then((data) => setOrders(data as Order[]))
            .catch(console.error)

          const subscription = listenToOrders((update) => {
            if (update.type === "insert" || update.type === "update") {
              setOrders((prevOrders) => {
                const updatedOrder = update.result
                const index = prevOrders.findIndex((order) => order._id === updatedOrder._id)
                if (index !== -1) {
                  const newOrders = [...prevOrders]
                  newOrders[index] = updatedOrder
                  return newOrders
                } else {
                  return [updatedOrder, ...prevOrders]
                }
              })
            } else if (update.type === "delete") {
              setOrders((prevOrders) => prevOrders.filter((order) => order._id !== update.documentId))
            }
          })

          return () => subscription.unsubscribe()
        } else {
          throw new Error("Not authenticated")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        toast({
          title: "Unauthorized",
          description: "Please log in to view orders.",
          variant: "destructive",
        })
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router, toast])

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="py-4 px-3">
          <Link href="/dashboard" className="flex items-center pl-2.5 mb-5">
            <Package className="h-6 w-6 mr-2 text-blue-600" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Furniture Store</span>
          </Link>
          <DashboardNav />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto">

            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 ml-2">Orders</h1>
            </div>
            <UserNav />
          </div>
        </header>

        {/* Main content */}
        <main className="h-full overflow-y-auto">
          <div className="container px-4 mx-auto">
            <div className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Order List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order Number</TableHead>
                          <TableHead className="hidden md:table-cell">Customer</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {`${order.customer.firstName} ${order.customer.lastName}`}
                            </TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant={order.status === "completed" ? "default" : "destructive"}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Order Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div>
                                      <strong>Order Number:</strong> {order.orderNumber}
                                    </div>
                                    <div>
                                      <strong>Customer:</strong>{" "}
                                      {`${order.customer.firstName} ${order.customer.lastName}`}
                                    </div>
                                    <div>
                                      <strong>Email:</strong> {order.customer.email}
                                    </div>
                                    <div>
                                      <strong>Total:</strong> ${order.total.toFixed(2)}
                                    </div>
                                    <div>
                                      <strong>Status:</strong> {order.status}
                                    </div>
                                    <div>
                                      <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

