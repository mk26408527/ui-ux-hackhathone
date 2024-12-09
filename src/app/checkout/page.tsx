import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import shopheader from '/public/shopheader.png'

const Checkout = () => {
  return (
    <div>
       {/* Hero Section with Background */}
       <div className="relative h-[300px] w-full">
        <Image
          src={shopheader}
          alt="Shop Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="mb-4">
            <svg
              className="h-8 w-8 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3L2 12h3v8h14v-8h3L12 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-black">Checkout</h1>
          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/cart" className="hover:underline">
             Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* 2nd Section: Billing Details and Product Information */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Column: Billing Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold ">Billing Details</h1>
              <form className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Company Name */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="companyName">Company Name (optional)</label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Country/Region */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="country">Country/Region</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter your country"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Street Address */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    id="streetAddress"
                    placeholder="Enter your street address"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Town/City */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="townCity">Town/City</label>
                  <input
                    type="text"
                    id="townCity"
                    placeholder="Enter your town or city"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Province */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="province">Province</label>
                  <input
                    type="text"
                    id="province"
                    placeholder="Enter your province"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* ZIP Code */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    placeholder="Enter your ZIP code"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Additional Information */}
                <div>
                  <label className="block text-lg font-semibold" htmlFor="additionalInfo">Additional Information</label>
                  <textarea
                    id="additionalInfo"
                    placeholder="Any additional information"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>

            {/* Second Column: Product Information */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Product <span className='text-end'>Sub Total</span> </h1>
              <div className="space-y-4">
                {/* Row 1: Product */}
                <div className="flex justify-between">
                  <span>Asgaard Sofa *1</span>
                  <span>Rs 250,000.00</span>
                </div>
                {/* Row 2: Subtotal */}
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>Rs 250,000.00</span>
                </div>
                {/* Row 3: Total */}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs 250,000.00</span>
                </div>
              </div>
              <hr className="my-4" />
              <h3 className="font-bold text-xl flex items-center space-x-2">
                <span className="w-3 h-3 bg-black rounded-full"></span>
                <span>Direct Bank Transfer</span>
              </h3>
              <p className="text-sm mt-2">
                Make our payment directly into our bank account. Please use your order ID as the payment reference. Your order will not be shipped until your funds shift onto our account.
              </p>
              <h3 className="font-bold text-xl flex items-center space-x-2 mt-4">
                <span className="w-3 h-3 border-2 border-black rounded-full"></span>
                
                <span>Direct Bank Transfer</span>
              </h3>
              <h3 className="font-bold text-xl flex items-center space-x-2 mt-4">
                <span className="w-3 h-3 border-2 border-black rounded-full"></span>
                
                <span>Cash on Delivery</span>
              </h3>
              <p className="text-sm mt-2">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
              </p>
              {/* Place Order Button */}
              <button className="w-full py-2 bg-transparent border border-black rounded-md text-black text-lg hover:bg-black hover:text-white transition">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>

    {/* Features */}
    <div className="bg-[#FDF7FC] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              For all orders over $50, consectetur adipim scing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, consectetur adipim scing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment, consectetur adipim scing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout