/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { fetchInventoryData, listenToInventoryData } from "@/sanity/lib/fetchData"

type InventoryItem = {
  name: string
  stock: number
  total: number
}

export function InventoryStatus() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Fetch initial data
    fetchInventoryData().then(processData).then(setInventoryItems).catch(console.error)

    // Set up real-time listener
    const subscription = listenToInventoryData((update) => {
      if (update.type === "update") {
        processData(update.result).then(setInventoryItems)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  type RawInventoryItem = {
    title: string
    stockLevel: number
  }

  const processData = async (rawData: RawInventoryItem[]): Promise<InventoryItem[]> => {
    return rawData
      .map((item) => ({
        name: item.title,
        stock: item.stockLevel,
        total: 100, // Assuming a default total of 100 for each item
      }))
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 4) // Get top 4 items
  }

  return (
    <div className="space-y-8">
      {inventoryItems.map((item) => (
        <div key={item.name} className="flex items-center">
          <div className="w-48">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.stock} in stock</p>
          </div>
          <div className="flex-1">
            <Progress value={(item.stock / item.total) * 100} className="h-2" />
          </div>
          <div className="w-12 text-right">
            <p className="text-sm font-medium">{Math.round((item.stock / item.total) * 100)}%</p>
          </div>
        </div>
      ))}
    </div>
  )
}

