"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package, Edit, Trash2} from "lucide-react"
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
        // Fetch products only if authenticated
        const initialProducts = await fetchProducts()
        setProducts(initialProducts)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    if (!isLoading) {
      const subscription = listenToProducts((update) => {
        if (update.type === "insert" || update.type === "update") {
          setProducts((prevProducts) => {
            const newProducts = [update.result, ...prevProducts.filter((product) => product._id !== update.result._id)]
            return newProducts
          })
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [isLoading])

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
              <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 ml-2">Products</h1>
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
                  <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Product Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Image</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="hidden md:table-cell">Stock</TableHead>
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
                            <TableCell className="font-medium">{product.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">
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
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product._id)}
                                >
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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

