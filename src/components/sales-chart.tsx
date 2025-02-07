"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { fetchSalesData, listenToSalesData } from "@/sanity/lib/fetchData"

type SalesDataPoint = {
  name: string
  total: number
}

export function SalesChart() {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([])

  useEffect(() => {
    // Fetch initial data
    fetchSalesData().then(processData).then(setSalesData).catch(console.error)

    // Set up real-time listener
    const subscription = listenToSalesData((update) => {
      if (update.type === "update") {
        processData(update.result).then(setSalesData)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const processData = async (rawData: { createdAt: string; total: number }[]): Promise<SalesDataPoint[]> => {
    const monthlyData: Record<string, number> = {}
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    rawData.forEach((order) => {
      const date = new Date(order.createdAt)
      const monthName = months[date.getMonth()]
      if (!monthlyData[monthName]) {
        monthlyData[monthName] = 0
      }
      monthlyData[monthName] += order.total
    })

    return months.map((month) => ({
      name: month,
      total: monthlyData[month] || 0,
    }))
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={salesData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                      <span className="font-bold">${payload[0].value ? payload[0].value.toLocaleString() : 0}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="total" stroke="#adfa1d" strokeWidth={2} dot={{ strokeWidth: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

