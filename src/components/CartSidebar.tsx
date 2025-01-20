'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useCart } from '@/components/cart-context';

export default function CartSidebar() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <div className="flex flex-col h-full">
      <DialogTitle asChild>
        <VisuallyHidden>Shopping Cart</VisuallyHidden>
      </DialogTitle>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="flex-grow overflow-auto">
        {state.items.length > 0 ? (
          state.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 pb-4 border-b"
            >
              <div className="relative h-20 w-20 rounded-lg bg-[#FDF9F0] p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Rs. {item.price.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 text-center"
                  />
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    onClick={() => removeItem(item.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg font-medium">Your cart is empty.</p>
            <p className="mt-2 text-gray-500">Add some items to your cart.</p>
            <Link href="/shop" className="mt-4">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
      {state.items.length > 0 && (
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-medium">Subtotal</span>
            <span className="text-lg font-bold">
              Rs. {state.total.toLocaleString()}
            </span>
          </div>
          <Link href="/cart">
            <Button className="w-full bg-black hover:bg-gray-800 text-white">
              View Cart
            </Button>
          </Link>
          <Link href="/checkout">
            <Button className="w-full bg-[#B88E2F] hover:bg-[#A47E2F] text-white mt-2">
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

