import { loadStripe, type Stripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = "pk_test_51QjjKIAu0zbsRBYI1hRCmI584GYXSdP5q9pplJY9Y8Nrrx1acKpGzQyRvT79uhsc68i2e7yjuWjZfwk50IAjJPXP002P8zqNEc"
    if (!publishableKey) {
      throw new Error("Stripe publishable key is not set. Please check your environment variables.")
    }
    console.log("Initializing Stripe with key:", publishableKey.substring(0, 8) + "...")
    stripePromise = loadStripe(publishableKey).catch((error) => {
      console.error("Error loading Stripe:", error)
      return null
    })
  }
  return stripePromise
}

