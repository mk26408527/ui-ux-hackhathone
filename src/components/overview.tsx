"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { listenToOrders, fetchOrders } from "@/sanity/lib/fetchData"

interface SalesData {
  name: string
  total: number
}

const defaultMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function Overview() {
  const [salesData, setSalesData] = useState<SalesData[]>(defaultMonths.map((month) => ({ name: month, total: 0 })))

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      const orders = await fetchOrders()
      const initialData = defaultMonths.map((month) => ({ name: month, total: 0 }))

      orders.forEach((order: { createdAt: string | number | Date; total: number }) => {
        const date = new Date(order.createdAt)
        const monthIndex = date.getMonth()
        initialData[monthIndex].total += order.total
      })

      setSalesData(initialData)
    }

    fetchInitialData()

    // Listen for real-time updates
    const subscription = listenToOrders((update: { type: string; result: { createdAt: string | number | Date; total: number } }) => {
      if (update.type === "insert" || update.type === "update") {
      const order = update.result
      const date = new Date(order.createdAt)
      const monthIndex = date.getMonth()

      setSalesData((prevData: SalesData[]) => {
        const newData = [...prevData]
        newData[monthIndex].total += order.total
        return newData
      })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

