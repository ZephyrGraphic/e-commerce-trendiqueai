"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // Ensure this exists or use <div className="border-b" />
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/mockData";
import { useState } from "react";

// Mock Cart Data
const initialCartItems = [
  {
    id: "1",
    name: "NUFACE Cushion",
    price: 89000,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    quantity: 1,
    selected: true,
  },
  {
    id: "2",
    name: "Blush Dior",
    price: 300000,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    quantity: 2,
    selected: true,
  },
  {
    id: "3",
    name: "CHITATO Lite",
    price: 10000,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    quantity: 5,
    selected: false,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleSelection = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 20000; // Free shipping logic
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen font-noto">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-fredoka text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
               {/* Header Row */}
               <div className="p-4 border-b border-border flex items-center gap-4 bg-gray-50/50">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={cartItems.length > 0 && cartItems.every(i => i.selected)}
                    onChange={(e) => {
                        const checked = e.target.checked;
                        setCartItems(items => items.map(i => ({...i, selected: checked})));
                    }}
                  />
                  <span className="font-semibold text-sm">Select All ({cartItems.length})</span>
               </div>

               {cartItems.length === 0 ? (
                 <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">Looks like you havent added anything to your cart yet.</p>
                    <Button asChild>
                        <Link href="/">Start Shopping</Link>
                    </Button>
                 </div>
               ) : (
                 <div className="divide-y divide-border">
                   {cartItems.map((item) => (
                     <div key={item.id} className="p-4 flex gap-4 transition-colors hover:bg-gray-50/30">
                       <div className="flex items-center pt-2">
                         <input
                           type="checkbox"
                           checked={item.selected}
                           onChange={() => toggleSelection(item.id)}
                           className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                         />
                       </div>
                       
                       <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-border">
                         <Image
                           src={item.image}
                           alt={item.name}
                           fill
                           className="object-cover"
                         />
                       </div>

                       <div className="flex-1 flex flex-col justify-between">
                         <div className="flex justify-between gap-2">
                           <div>
                             <h3 className="font-bold text-lg font-fredoka line-clamp-1">{item.name}</h3>
                             <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                           </div>
                           <button 
                             onClick={() => removeItem(item.id)}
                             className="text-gray-400 hover:text-red-500 transition-colors p-1"
                           >
                             <Trash2 className="w-5 h-5" />
                           </button>
                         </div>

                         <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center border border-border rounded-lg bg-white">
                             <button
                               onClick={() => updateQuantity(item.id, -1)}
                               className="p-2 hover:bg-gray-50 disabled:opacity-50"
                               disabled={item.quantity <= 1}
                             >
                               <Minus className="w-4 h-4" />
                             </button>
                             <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                             <button
                               onClick={() => updateQuantity(item.id, 1)}
                               className="p-2 hover:bg-gray-50"
                             >
                               <Plus className="w-4 h-4" />
                             </button>
                           </div>
                           <p className="font-bold text-lg hidden sm:block">
                                {formatPrice(item.price * item.quantity)}
                           </p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 sticky top-24">
              <h2 className="font-fredoka text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({selectedItems.reduce((a,c) => a + c.quantity, 0)} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (0%)</span>
                  <span>Rp 0</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="w-full h-12 font-fredoka text-lg gap-2" size="lg" asChild disabled={selectedItems.length === 0}>
                <Link href="/checkout">
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <div className="mt-6">
                 <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">We Accept</span>
                    </div>
                 </div>
                 <div className="flex justify-center gap-2 mt-4 opacity-50 grayscale">
                    {/* Placeholders for payment icons */}
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
