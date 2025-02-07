import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "1",
    customer: "John Doe",
    product: "Ergonomic Chair",
    image: "https://source.unsplash.com/random/100x100?chair",
    price: 199.99,
    status: "Delivered",
  },
  {
    id: "2",
    customer: "Jane Smith",
    product: "Standing Desk",
    image: "https://source.unsplash.com/random/100x100?desk",
    price: 299.99,
    status: "Processing",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    product: "Laptop Stand",
    image: "https://source.unsplash.com/random/100x100?laptop",
    price: 49.99,
    status: "Shipped",
  },
]

export function OrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Image
                  src={order.image || "/placeholder.svg"}
                  alt={order.product}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span>{order.product}</span>
              </div>
            </TableCell>
            <TableCell>${order.price.toFixed(2)}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

