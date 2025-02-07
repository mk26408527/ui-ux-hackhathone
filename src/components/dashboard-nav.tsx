'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart2, User, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Products", href: "/products", icon: Package },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <nav className="grid items-start gap-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button variant={pathname === link.href ? "secondary" : "ghost"} className="w-full justify-start">
            <link.icon className="mr-2 h-4 w-4" />
            {link.name}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

