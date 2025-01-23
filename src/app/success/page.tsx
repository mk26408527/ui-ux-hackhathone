"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

export default function SuccessPage() {
  const router = useRouter()
  const { dispatch } = useCart()

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been confirmed.</p>
        <Button onClick={() => router.push("/shop")} className="w-full">
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}

