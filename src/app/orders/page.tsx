"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { fetchOrdersWithProducts, listenToOrdersWithProducts } from "@/sanity/lib/fetchData"

type Order = {
  _id: string
  orderNumber: string
  customer: {
    firstName: string
    lastName: string
    email: string
  }
  items: {
    productId: string
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered"
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth")
        if (response.ok) {
          setIsLoading(false)
          // Fetch orders once authenticated
          fetchOrdersWithProducts().then(setOrders)

          const subscription = listenToOrdersWithProducts((update) => {
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

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)),
    )
    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${newStatus}.`,
    })
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
  }

  const handleSaveEdit = (updatedOrder: Order) => {
    setOrders((prevOrders) => prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)))
    setEditingOrder(null)
    toast({
      title: "Order updated",
      description: `Order #${updatedOrder.orderNumber} has been successfully updated.`,
    })
  }

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId))
    toast({
      title: "Order deleted",
      description: `Order #${orderId} has been successfully deleted.`,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
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
        {/* Header */}
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
          <div className="container flex items-center justify-between h-full px-6 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Orders</h1>
            <UserNav />
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order.orderNumber}</TableCell>
                          <TableCell>{`${order.customer.firstName} ${order.customer.lastName}`}</TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={`Product image for ${item.name}`}
                                    width={40}
                                    height={40}
                                    className="rounded-md"
                                  />
                                  <span>{`${item.name} (x${item.quantity})`}</span>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value: Order["status"]) => handleStatusChange(order._id, value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">
                                  <Badge variant="default">Pending</Badge>
                                </SelectItem>
                                <SelectItem value="Processing">
                                  <Badge variant="secondary">Processing</Badge>
                                </SelectItem>
                                <SelectItem value="Shipped">
                                  <Badge variant="outline">Shipped</Badge>
                                </SelectItem>
                                <SelectItem value="Delivered">
                                  <Badge variant="destructive">Delivered</Badge>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                                    <Edit className="w-4 h-4" />
                                    <span className="sr-only">Edit order {order.orderNumber}</span>
                                  </Button>
                                </DialogTrigger>
                                {editingOrder && editingOrder._id === order._id && (
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Order</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="customer" className="text-right">
                                          Customer
                                        </Label>
                                        <Input
                                          id="customer"
                                          value={
                                            `${editingOrder.customer.firstName} ${editingOrder.customer.lastName}` || ""
                                          }
                                          onChange={(e) => {
                                            const [firstName = "", lastName = ""] = e.target.value.split(" ")
                                            setEditingOrder({
                                              ...editingOrder,
                                              customer: { ...editingOrder.customer, firstName, lastName },
                                            })
                                          }}
                                          className="col-span-3"
                                        />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="total" className="text-right">
                                          Total
                                        </Label>
                                        <Input
                                          id="total"
                                          type="number"
                                          value={editingOrder.total || ""}
                                          onChange={(e) =>
                                            setEditingOrder({
                                              ...editingOrder,
                                              total: Number.parseFloat(e.target.value),
                                            })
                                          }
                                          className="col-span-3"
                                        />
                                      </div>
                                    </div>
                                    <Button onClick={() => handleSaveEdit(editingOrder)}>Save Changes</Button>
                                  </DialogContent>
                                )}
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteOrder(order._id)}>
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Delete order {order.orderNumber}</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

