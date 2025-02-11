"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { fetchCustomers, listenToCustomers } from "@/sanity/lib/fetchData"

type Customer = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/check-auth")
        if (!response.ok) {
          throw new Error("Not authenticated")
        }
        setIsLoading(false)
        // Fetch customers only if authenticated
        const initialCustomers = (await fetchCustomers()) as Customer[]
        setCustomers(initialCustomers)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isLoading) {
      const subscription = listenToCustomers((update) => {
        if (update.type === "insert" || update.type === "update") {
          setCustomers((prevCustomers) => {
            const newCustomers = [
              update.result,
              ...prevCustomers.filter((customer) => customer._id !== update.result._id),
            ]
            return newCustomers
          })
        } else if (update.type === "delete") {
          setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== update.documentId))
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [isLoading])

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
  }

  const handleSaveEdit = async (updatedCustomer: Customer) => {
    try {
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) => (customer._id === updatedCustomer._id ? updatedCustomer : customer)),
      )
      setEditingCustomer(null)
      toast({
        title: "Customer updated",
        description: "The customer information has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating customer:", error)
      toast({
        title: "Error",
        description: "Failed to update the customer. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== customerId))
      toast({
        title: "Customer deleted",
        description: "The customer has been successfully removed.",
      })
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast({
        title: "Error",
        description: "Failed to delete the customer. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center mr-6">
              <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Customers</h1>
            </Link>
          </div>
          <UserNav />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Total Orders</TableHead>
                    <TableHead className="hidden sm:table-cell">Total Spent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${customer.firstName} ${customer.lastName}`}
                            />
                            <AvatarFallback>
                              {customer.firstName[0]}
                              {customer.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{`${customer.firstName} ${customer.lastName}`}</div>
                            <div className="text-sm text-gray-500 sm:hidden">{customer.email}</div>
                            <div className="text-sm text-gray-500 sm:hidden">${customer.totalSpent.toFixed(2)}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{customer.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{customer.totalOrders}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Customer</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="firstName" className="text-right">
                                    First Name
                                  </Label>
                                  <Input
                                    id="firstName"
                                    value={editingCustomer?.firstName}
                                    onChange={(e) =>
                                      setEditingCustomer({ ...editingCustomer!, firstName: e.target.value })
                                    }
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="lastName" className="text-right">
                                    Last Name
                                  </Label>
                                  <Input
                                    id="lastName"
                                    value={editingCustomer?.lastName}
                                    onChange={(e) =>
                                      setEditingCustomer({ ...editingCustomer!, lastName: e.target.value })
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
                                    value={editingCustomer?.email}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer!, email: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="phone" className="text-right">
                                    Phone
                                  </Label>
                                  <Input
                                    id="phone"
                                    value={editingCustomer?.phone}
                                    onChange={(e) => setEditingCustomer({ ...editingCustomer!, phone: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <Button onClick={() => handleSaveEdit(editingCustomer!)}>Save Changes</Button>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteCustomer(customer._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

