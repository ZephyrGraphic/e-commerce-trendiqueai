"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, CreditCard, Truck, ShieldCheck, Loader2, Plus, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface CartItem {
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

interface Address {
  id: string;
  name: string;
  street: string;
  details: string;
  phone: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }

    fetchCheckoutData();
  }, [user, authLoading, router]);

  const fetchCheckoutData = async () => {
    try {
      // Fetch cart and addresses in parallel
      const [cartRes, addressRes] = await Promise.all([
        fetch("/api/cart"),
        fetch("/api/addresses"),
      ]);

      if (!cartRes.ok) throw new Error("Failed to fetch cart");
      
      const cartData = await cartRes.json();
      const selectedItems = (cartData.items || []).filter((item: CartItem) => item.selected);
      setCartItems(selectedItems);

      if (addressRes.ok) {
        const addressData = await addressRes.json();
        setAddresses(addressData);
        
        // Auto-select default address
        const defaultAddr = addressData.find((a: Address) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        } else if (addressData.length > 0) {
          setSelectedAddressId(addressData[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching checkout data:", error);
      toast.error("Gagal memuat data checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Pilih alamat pengiriman terlebih dahulu");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressId: selectedAddressId,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create order");
      }

      const order = await res.json();
      
      toast.success("Pesanan berhasil dibuat!", {
        description: `Order ${order.orderNumber}`,
      });

      router.push("/profile?tab=orders");
    } catch (error: any) {
      toast.error(error.message || "Gagal membuat pesanan");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 20000;
  const protectionFee = 1000;
  const total = subtotal + shipping + protectionFee;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  // Loading state
  if (isLoading || authLoading) {
    return (
      <div className="bg-gray-50 min-h-screen font-noto">
        <header className="w-full bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-baloo font-bold text-primary text-2xl text-shadow-logo">Trendique</h1>
            </Link>
            <div className="h-6 w-px bg-gray-200"></div>
            <span className="font-fredoka text-lg font-medium text-foreground">Checkout</span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Memuat checkout...</p>
          </div>
        </main>
      </div>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen font-noto">
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
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="font-fredoka text-2xl font-bold mb-2">Tidak ada item untuk checkout</h2>
            <p className="text-muted-foreground mb-6">Pilih produk dari keranjang untuk melanjutkan checkout.</p>
            <Button asChild>
              <Link href="/cart">Kembali ke Keranjang</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
              
              {addresses.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-4">Belum ada alamat tersimpan</p>
                  <Button variant="outline" asChild>
                    <Link href="/profile?tab=address" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Alamat
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`
                        cursor-pointer border rounded-lg p-4 transition-all
                        ${selectedAddressId === addr.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-gray-200 hover:border-gray-300"}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{user?.name || "User"}</span>
                            <span className="text-sm text-muted-foreground">{addr.phone}</span>
                            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                              {addr.name}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {addr.street}, {addr.details}
                          </p>
                        </div>
                        {selectedAddressId === addr.id && (
                          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white ring-1 ring-primary"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Items Ordered */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                 <Truck className="w-5 h-5 text-primary" />
                 <h2 className="font-fredoka text-xl font-bold">Items Ordered ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-border">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">{item.product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-sm">{formatPrice(item.product.price)}</span>
                        <span className="text-xs text-muted-foreground font-medium">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                             <span>Protection Fee</span>
                             <span>{formatPrice(protectionFee)}</span>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-end">
                        <span className="font-bold text-lg">Total Payment</span>
                        <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
                    </div>

                     <Button 
                        className="w-full h-12 font-fredoka text-lg mt-4" 
                        size="lg"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing || !selectedAddressId}
                     >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          "Place Order"
                        )}
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
