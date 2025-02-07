import { Bell, Package, ShoppingCart, Users } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    description: "Order #12345 has been placed",
    icon: ShoppingCart,
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    description: "Product XYZ is running low on stock",
    icon: Package,
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "New Customer Registration",
    description: "John Doe has created an account",
    icon: Users,
    time: "2 hours ago",
  },
  {
    id: 4,
    title: "System Update",
    description: "New features have been added to the dashboard",
    icon: Bell,
    time: "1 day ago",
  },
]

export function NotificationsList() {
  return (
    <div className="space-y-8">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <notification.icon className="h-4 w-4" />
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            <p className="text-xs text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

