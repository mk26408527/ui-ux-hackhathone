/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import Image from "next/image"
import wishlistsofy from "/public/wishlistsofy.png"
import wishlistsit from "/public/wishlistsit.png"

export default function FavMain() {
  const [activeTab, setActiveTab] = useState('description')
  
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b justify-center border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('description')}
          className={cn(
            "pb-4 text-lg font-medium transition-colors relative",
            activeTab === 'description' 
              ? "text-black" 
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          Description
          {activeTab === 'description' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('additional')}
          className={cn(
            "pb-4 text-lg font-medium transition-colors relative",
            activeTab === 'additional' 
              ? "text-black" 
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          Additional Information
          {activeTab === 'additional' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={cn(
            "pb-4 text-lg font-medium transition-colors relative",
            activeTab === 'reviews' 
              ? "text-black" 
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          Reviews [5]
          {activeTab === 'reviews' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'description' && (
          <>
            <p className="text-gray-600 leading-relaxed">
              Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-lg">
                <Image 
                  src={wishlistsofy}
                  alt="Straight sofa configuration"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-8 rounded-lg">
                <Image 
                  src={wishlistsit}
                  alt="L-shaped sofa configuration"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'additional' && (
          <div className="text-gray-600">
            Additional product information content goes here...
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="text-gray-600">
            Product reviews content goes here...
          </div>
        )}
      </div>
    </div>
  )
}

