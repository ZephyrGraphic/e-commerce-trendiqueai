"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, CreditCard, ChevronRight, Truck, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/mockData";
import { useState } from "react";

// Mock Cart Item (Single item for checkout demo)
const checkoutItem = {
  id: "1",
  name: "NUFACE Cushion",
  price: 89000,
  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
  quantity: 1,
  variant: "Natural Beige",
};

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success("Order placed successfully!", {
      description: "You will be redirected to the home page.",
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  
  const subtotal = checkoutItem.price * checkoutItem.quantity;
  const shipping = 20000;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen font-noto">
       {/* Simplified Header for Checkout */}
       <header className="w-full bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
           <Link href="/" className="flex items-center gap-2">
             <h1 className="font-baloo font-bold text-primary text-2xl text-shadow-logo">Trendique</h1>
           </Link>
           <div className="h-6 w-px bg-gray-200"></div>
           <span className="font-fredoka text-lg font-medium text-foreground">Checkout</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            
            {/* 1. Delivery Address */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                 <MapPin className="w-5 h-5 text-primary" />
                 <h2 className="font-fredoka text-xl font-bold">Delivery Address</h2>
              </div>
              
              <div className="border border-primary/20 bg-primary/5 p-4 rounded-lg relative group cursor-pointer hover:bg-primary/10 transition-colors">
                 <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">John Doe</span>
                            <span className="text-sm text-muted-foreground">(+62) 812-3456-7890</span>
                            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOME</span>
                        </div>
                        <p className="text-sm text-muted-foreground w-3/4">
                            Jl. Mawar Melati Indah No. 123, Rt. 001 Rw. 002, Kec. Tebet, Jakarta Selatan, DKI Jakarta 12810
                        </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Change</Button>
                 </div>
              </div>
            </div>

            {/* 2. Items Ordered */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                 <Truck className="w-5 h-5 text-primary" />
                 <h2 className="font-fredoka text-xl font-bold">Items Ordered</h2>
              </div>
              
              <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                 <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-border">
                    <Image src={checkoutItem.image} alt={checkoutItem.name} fill className="object-cover" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">{checkoutItem.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">Variant: {checkoutItem.variant}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-sm">{formatPrice(checkoutItem.price)}</span>
                        <span className="text-xs text-muted-foreground font-medium">x{checkoutItem.quantity}</span>
                    </div>
                 </div>
              </div>
            </div>

             {/* 3. Payment Method */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                 <CreditCard className="w-5 h-5 text-primary" />
                 <h2 className="font-fredoka text-xl font-bold">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {[
                     { id: "qris", label: "QRIS", icon: "📱" },
                     { id: "bca", label: "Bank Transfer (BCA)", icon: "🏦" },
                     { id: "cod", label: "Cash on Delivery", icon: "💵" },
                 ].map((method) => (
                     <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`
                            cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition-all
                            ${paymentMethod === method.id 
                                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
                        `}
                     >
                        <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center text-xl shadow-sm">
                            {method.icon}
                        </div>
                        <span className="font-medium">{method.label}</span>
                        {paymentMethod === method.id && (
                             <div className="ml-auto w-4 h-4 bg-primary rounded-full border-2 border-white ring-1 ring-primary"></div>
                        )}
                     </div>
                 ))}
              </div>
            </div>

          </div>

          {/* Sidebar Summary */}
           <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 sticky top-24">
              <div className="flex flex-col gap-4">
                  <h2 className="font-fredoka text-xl font-bold">Payment Summary</h2>
                  
                   <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Merchandise Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping Subtotal</span>
                            <span>{formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                             <span>Protection Fee</span>
                             <span>Rp 1.000</span>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-end">
                        <span className="font-bold text-lg">Total Payment</span>
                        <span className="font-bold text-xl text-primary">{formatPrice(total + 1000)}</span>
                    </div>

                     <Button 
                        className="w-full h-12 font-fredoka text-lg mt-4" 
                        size="lg"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                     >
                        {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                    
                    <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mt-4">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Secure Payment Encrypted</span>
                    </div>
              </div>
            </div>
           </div>

        </div>
      </main>

       <footer className="w-full bg-white border-t border-border mt-auto py-6">
         <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground font-noto">
            &copy; {new Date().getFullYear()} Trendique. All rights reserved.
         </div>
       </footer>
    </div>
  );
}
