"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { fetchCustomers, listenToCustomers } from "@/sanity/lib/fetchData"

type Customer = {
  _id: string // This will be the email
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      toast({
        title: "Unauthorized",
        description: "Please log in to view customers.",
        variant: "destructive",
      })
      router.push("/admin")
    } else {
      fetchCustomers().then((data) => setCustomers(data as Customer[])).catch(console.error)

      const subscription = listenToCustomers((update) => {
        if (update.type === "insert" || update.type === "update") {
          setCustomers((prevCustomers) => {
            const updatedCustomer = update.result
            const index = prevCustomers.findIndex((customer) => customer._id === updatedCustomer._id)
            if (index !== -1) {
              const newCustomers = [...prevCustomers]
              newCustomers[index] = updatedCustomer
              return newCustomers
            } else {
              return [updatedCustomer, ...prevCustomers]
            }
          })
        } else if (update.type === "delete") {
          setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== update.documentId))
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [router, toast])

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
  }

  const handleSaveEdit = (updatedCustomer: Customer) => {
    // Here you would typically update the customer in Sanity
    // For now, we'll just update the local state
    setCustomers(customers.map((customer) => (customer._id === updatedCustomer._id ? updatedCustomer : customer)))
    setEditingCustomer(null)
    toast({
      title: "Customer updated",
      description: "The customer information has been successfully updated.",
    })
  }

  const handleDeleteCustomer = (customerId: string) => {
    // Here you would typically delete the customer from Sanity
    // For now, we'll just update the local state
    setCustomers(customers.filter((customer) => customer._id !== customerId))
    toast({
      title: "Customer deleted",
      description: "The customer has been successfully removed.",
    })
  }

  if (!isLoggedIn) {
    return null
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
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Customers</h1>
            <UserNav />
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Customer List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
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
                              {`${customer.firstName} ${customer.lastName}`}
                            </div>
                          </TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.totalOrders}</TableCell>
                          <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
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
                                        onChange={(e) =>
                                          setEditingCustomer({ ...editingCustomer!, email: e.target.value })
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
                                        value={editingCustomer?.phone}
                                        onChange={(e) =>
                                          setEditingCustomer({ ...editingCustomer!, phone: e.target.value })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <Button onClick={() => handleSaveEdit(editingCustomer!)}>Save Changes</Button>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCustomer(customer._id)}
                              >
                                <Trash2 className="w-4 h-4" />
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

