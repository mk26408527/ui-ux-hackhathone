import React from 'react';

import Link from 'next/link';
import Image from 'next/image';


function MyAccount() {
    return (
        <>
          {/* Hero Section with Background */}
      <div className="relative h-[300px] w-full">
        <Image
          src='/shopheader.png'
          alt="Shop Header"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Logo */}
            <Image src="/brand.png" alt="logo" width={77} height={77} />
          <h1 className="text-4xl font-bold text-black">My Account</h1>
          {/* Breadcrumb */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-black">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>›</span>
            <Link href="/checkout" className="hover:underline">
           My account
            </Link>
          </div>
        </div>
      </div>

           {/* Content Section */}
<div className="mt-8 grid gap-8 mx-4 lg:mx-32 lg:grid-cols-2">
    {/* Login Section */}
    <div className="p-4 rounded">
        <h2 className="text-3xl font-bold my-8">Log In</h2>
        <div className='flex flex-col'>
            <label className="my-2 font-semibold text-gray-800 mb-2" htmlFor="username">
                Username or email address
            </label>
            <input
                type="text"
                id="username"
                className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
            />
        </div>
        <div className='flex flex-col'>
            <label className="my-2 font-semibold text-gray-800  mb-2" htmlFor="password">
                Password
            </label>
            <input
                type="password"
                id="password"
                className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
            />
        </div>
        <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-800  my-4">
                Remember me
            </label>
        </div>
        <div className="flex items-center">
            <button className="border border-black font-medium text-black px-10 py-3 rounded-xl hover:text-white hover:bg-gray-700">
                Log In
            </button>
            <p className="ml-6 text-gray-500 text-sm hover:underline cursor-pointer">
                Lost Your Password?
            </p>
        </div>
    </div>

    {/* Register Section */}
    <div className="p-4 rounded">
        <h2 className="text-3xl font-bold my-8">Register</h2>
        <label className="block my-2 font-semibold text-gray-800 mb-2" htmlFor="register-email">
            Email address
        </label>
        <input
            type="text"
            id="register-email"
            className="w-full sm:w-[300px] my-2 border border-gray-400 rounded p-2 mb-4"
        />
        <p className="text-gray-500 my-4">
            A link to set a new password will be sent to your email address.
        </p>
        <p className="text-gray-500 mb-4">
            Your personal data will be used to support your experience throughout this
            website, to manage access to your account, and for other purposes described
            in our <span className="font-bold text-gray-700">privacy policy</span>.
        </p>
        <button className="border my-10 border-black font-medium text-black px-10 py-3 rounded-xl hover:text-white hover:bg-gray-700">
            Register
        </button>
    </div>
</div>     
        {/* Features */}
        <div className="bg-[#FDF7FC] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              For all orders over $50, consectetur adipiscing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">90 Days Return</h3>
            <p className="text-sm text-muted-foreground">
              If goods have problems, consectetur adipiscing elit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure payment, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
        </>
    );
}

export default MyAccount;