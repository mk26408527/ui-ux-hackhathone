"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import shopheader from "/public/shopheader.png";
import { useCart } from "@/components/cart-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

// Define the structure of the form data
interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    townCity: "",
    province: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  // Initialize form errors state
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Handle input change and update form data state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data and set errors if any
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.streetAddress)
      newErrors.streetAddress = "Street address is required";
    if (!formData.townCity) newErrors.townCity = "Town/City is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle place order button click
  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Clear the cart
      dispatch({ type: "CLEAR_CART" });
      // Show the success dialog
      setDialogOpen(true);
    }
  };

  // Handle dialog close and redirect to shop page
  const handleCloseDialog = () => {
    setDialogOpen(false);
    router.push("/shop");
  };

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
          <Image src="/brand.png" alt="logo" width={77} height={77} />
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
              <h1 className="text-3xl font-bold">Billing Details</h1>
              <form className="space-y-4">
                {/* First Name */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={`w-full p-3 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                {/* Last Name */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className={`w-full p-3 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                {/* Company Name */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="companyName"
                  >
                    Company Name (optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {/* Country/Region */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="country"
                  >
                    Country/Region
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                    className={`w-full p-3 border ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
                {/* Street Address */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                    className={`w-full p-3 border ${
                      errors.streetAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>
                {/* Town/City */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="townCity"
                  >
                    Town/City
                  </label>
                  <input
                    type="text"
                    id="townCity"
                    name="townCity"
                    value={formData.townCity}
                    onChange={handleInputChange}
                    placeholder="Enter your town or city"
                    className={`w-full p-3 border ${
                      errors.townCity ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.townCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.townCity}
                    </p>
                  )}
                </div>
                {/* Province */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="province"
                  >
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="Enter your province"
                    className={`w-full p-3 border ${
                      errors.province ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.province && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.province}
                    </p>
                  )}
                </div>
                {/* ZIP Code */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="zipCode"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter your ZIP code"
                    className={`w-full p-3 border ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full p-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                {/* Additional Information */}
                <div>
                  <label
                    className="block text-lg font-semibold"
                    htmlFor="additionalInfo"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any additional information"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>

            {/* Second Column: Product Information */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">
                Product <span className="text-end">Subtotal</span>
              </h1>
              <div className="space-y-4">
                {/* Dynamic Products List */}
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                {/* Subtotal */}
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>Rs. {state.total.toLocaleString()}</span>
                </div>
                {/* Total */}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rs. {state.total.toLocaleString()}</span>
                </div>
              </div>
              <hr className="my-4" />
              {/* Payment Method Selection */}
              <h3
                className="font-bold text-xl flex items-center space-x-2"
                onClick={() => setPaymentMethod("bank")}
              >
                <span
                  className={`w-3 h-3 ${
                    paymentMethod === "bank"
                      ? "bg-black"
                      : "border-2 border-black"
                  } rounded-full`}
                ></span>
                <span>Direct Bank Transfer</span>
              </h3>
              <p className="text-sm mt-2">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until your funds shift onto our account.
              </p>
              <h3
                className="font-bold text-xl flex items-center space-x-2 mt-4"
                onClick={() => setPaymentMethod("direct")}
              >
                <span
                  className={`w-3 h-3 ${
                    paymentMethod === "direct"
                      ? "bg-black"
                      : "border-2 border-black"
                  } rounded-full`}
                ></span>
                <span>Direct Bank Transfer</span>
              </h3>
              <h3
                className="font-bold text-xl flex items-center space-x-2 mt-4"
                onClick={() => setPaymentMethod("cod")}
              >
                <span
                  className={`w-3 h-3 ${
                    paymentMethod === "cod"
                      ? "bg-black"
                      : "border-2 border-black"
                  } rounded-full`}
                ></span>
                <span>Cash on Delivery</span>
              </h3>
              <p className="text-sm mt-2">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our privacy policy.
              </p>
              {/* Place Order Button */}
              <Button
                className="w-full py-2 bg-transparent border border-black rounded-md text-black text-lg hover:bg-black hover:text-white transition"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
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
              For all orders over $50, enjoy free delivery.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, you can return them within 90 days.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment guaranteed.
            </p>
          </div>
        </div>
      </div>

      {/* Order Success Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Order Placed Successfully
            </DialogTitle>
            <DialogDescription>
              Your order has been placed successfully. Thank you for shopping
              with us!
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={handleCloseDialog} className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
