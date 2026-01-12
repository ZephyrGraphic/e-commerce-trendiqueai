"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface CartItemType {
  id: string;
  productId: string;
  quantity: number;
  selected: boolean;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch cart from API
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setIsLoading(false);
      return;
    }

    fetchCart();
  }, [user, authLoading]);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Gagal memuat keranjang");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      setCartItems((items) =>
        items.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      toast.error("Gagal mengubah jumlah");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleSelection = async (productId: string) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    setUpdatingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, selected: !item.selected }),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      setCartItems((items) =>
        items.map((i) =>
          i.productId === productId ? { ...i, selected: !i.selected } : i
        )
      );
    } catch (error) {
      toast.error("Gagal mengubah pilihan");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (productId: string) => {
    setUpdatingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) throw new Error("Failed to remove");
      
      setCartItems((items) => items.filter((item) => item.productId !== productId));
      toast.success("Produk dihapus dari keranjang");
    } catch (error) {
      toast.error("Gagal menghapus produk");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleSelectAll = async (checked: boolean) => {
    // Update all items locally first for responsiveness
    setCartItems((items) => items.map((i) => ({ ...i, selected: checked })));
    
    // Then update each one via API (could be a batch endpoint later)
    for (const item of cartItems) {
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.productId, selected: checked }),
        });
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 20000;
  const total = subtotal + shipping;

  // Not logged in state
  if (!authLoading && !user) {
    return (
      <div className="bg-gray-50 min-h-screen font-noto">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="font-fredoka text-2xl font-bold mb-2">Masuk untuk Melihat Keranjang</h2>
            <p className="text-muted-foreground mb-6">Silakan login terlebih dahulu untuk melihat keranjang belanja Anda.</p>
            <Button asChild>
              <Link href="/login">Masuk</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    disabled={isLoading || cartItems.length === 0}
                  />
                  <span className="font-semibold text-sm">Select All ({cartItems.length})</span>
               </div>

               {isLoading ? (
                 <div className="p-12 text-center">
                   <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                   <p className="text-muted-foreground">Memuat keranjang...</p>
                 </div>
               ) : cartItems.length === 0 ? (
                 <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
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
                           onChange={() => toggleSelection(item.productId)}
                           disabled={updatingId === item.productId}
                           className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                         />
                       </div>
                       
                       <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-border">
                         <Image
                           src={item.product.image}
                           alt={item.product.name}
                           fill
                           className="object-cover"
                         />
                       </div>

                       <div className="flex-1 flex flex-col justify-between">
                         <div className="flex justify-between gap-2">
                           <div>
                             <h3 className="font-bold text-lg font-fredoka line-clamp-1">{item.product.name}</h3>
                             <p className="text-primary font-bold">{formatPrice(item.product.price)}</p>
                           </div>
                           <button 
                             onClick={() => removeItem(item.productId)}
                             disabled={updatingId === item.productId}
                             className="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                           >
                             {updatingId === item.productId ? (
                               <Loader2 className="w-5 h-5 animate-spin" />
                             ) : (
                               <Trash2 className="w-5 h-5" />
                             )}
                           </button>
                         </div>

                         <div className="flex items-center justify-between mt-2">
                           <div className="flex items-center border border-border rounded-lg bg-white">
                             <button
                               onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                               className="p-2 hover:bg-gray-50 disabled:opacity-50"
                               disabled={item.quantity <= 1 || updatingId === item.productId}
                             >
                               <Minus className="w-4 h-4" />
                             </button>
                             <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                             <button
                               onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                               className="p-2 hover:bg-gray-50 disabled:opacity-50"
                               disabled={updatingId === item.productId}
                             >
                               <Plus className="w-4 h-4" />
                             </button>
                           </div>
                           <p className="font-bold text-lg hidden sm:block">
                                {formatPrice(item.product.price * item.quantity)}
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

              <Button 
                className="w-full h-12 font-fredoka text-lg gap-2" 
                size="lg" 
                asChild 
                disabled={selectedItems.length === 0}
              >
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
