import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

export function RecentSales({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {order.customer.firstName[0]}
              {order.customer.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
          </div>
          <div className="ml-auto font-medium">+${order.total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

