"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
import { useToast } from "@/hooks/use-toast"
import { fetchProducts, listenToProducts } from "@/sanity/lib/fetchData"

type Product = {
  _id: string
  title: string
  category: string
  price: number
  stockLevel: number
  slug: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      toast({
        title: "Unauthorized",
        description: "Please log in to view products.",
        variant: "destructive",
      })
      router.push("/admin")
    } else {
      fetchProducts().then(setProducts).catch(console.error)

      const subscription = listenToProducts((update) => {
        if (update.type === "mutation") {
          setProducts(update.result)
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [router, toast])

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = async (updatedProduct: Product) => {
    try {
   

      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)),
      )
      setEditingProduct(null)
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update the product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
   

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
        variant: "destructive",
      })
    }
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
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Products</h1>
            <UserNav />
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Product Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={`Product image for ${product.title}`}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.stockLevel > 10
                                  ? "secondary"
                                  : product.stockLevel > 5
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {product.stockLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="title" className="text-right">
                                        Name
                                      </Label>
                                      <Input
                                        id="title"
                                        value={editingProduct?.title}
                                        onChange={(e) =>
                                          setEditingProduct({ ...editingProduct!, title: e.target.value })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="category" className="text-right">
                                        Category
                                      </Label>
                                      <Input
                                        id="category"
                                        value={editingProduct?.category}
                                        onChange={(e) =>
                                          setEditingProduct({ ...editingProduct!, category: e.target.value })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="price" className="text-right">
                                        Price
                                      </Label>
                                      <Input
                                        id="price"
                                        type="number"
                                        value={editingProduct?.price}
                                        onChange={(e) =>
                                          setEditingProduct({ ...editingProduct!, price: Number(e.target.value) })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="stockLevel" className="text-right">
                                        Stock
                                      </Label>
                                      <Input
                                        id="stockLevel"
                                        type="number"
                                        value={editingProduct?.stockLevel}
                                        onChange={(e) =>
                                          setEditingProduct({
                                            ...editingProduct!,
                                            stockLevel: Number.parseInt(e.target.value),
                                          })
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <Button onClick={() => handleSaveEdit(editingProduct!)}>Save Changes</Button>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product._id)}>
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

