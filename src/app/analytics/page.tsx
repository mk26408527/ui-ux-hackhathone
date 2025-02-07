"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Package } from "lucide-react"
import { SalesChart } from "@/components/sales-chart"
import { InventoryStatus } from "@/components/inventory-status"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      toast({
        title: "Unauthorized",
        description: "Please log in to view analytics.",
        variant: "destructive",
      })
      router.push("/admin")
    }
  }, [router, toast])

  if (!isLoggedIn) {
    return null // or a loading spinner
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
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Analytics</h1>
            <UserNav />
          </div>
        </header>
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <div className="py-6">
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Sales Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      Inventory Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InventoryStatus />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

