"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Package, User, MapPin, Settings, LogOut, Plus, Edit2, Loader2, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { formatPrice } from "@/lib/mockData";

interface Address {
  id: string;
  name: string;
  street: string;
  details: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "account";
  
  const { user, logout, isLoading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    fetchProfileData();
  }, [user, authLoading]);

  const fetchProfileData = async () => {
    try {
      const [addressRes, orderRes] = await Promise.all([
        fetch("/api/addresses"),
        fetch("/api/orders"),
      ]);

      if (addressRes.ok) {
        const addressData = await addressRes.json();
        setAddresses(addressData || []);
      }

      if (orderRes.ok) {
        const orderData = await orderRes.json();
        setOrders(orderData || []);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    const addressData = {
      name: formData.get("name") as string,
      street: formData.get("street") as string,
      details: formData.get("details") as string,
      phone: formData.get("phone") as string,
      isDefault: addresses.length === 0,
    };

    try {
      const url = editingAddress 
        ? `/api/addresses?id=${editingAddress.id}` 
        : "/api/addresses";
      
      const res = await fetch(url, {
        method: editingAddress ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) throw new Error("Failed to save address");

      toast.success(editingAddress ? "Alamat diperbarui" : "Alamat ditambahkan");
      fetchProfileData();
      setIsAddressDialogOpen(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error("Gagal menyimpan alamat");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const res = await fetch(`/api/addresses?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setAddresses(addresses.filter(a => a.id !== id));
      toast.success("Alamat dihapus");
    } catch (error) {
      toast.error("Gagal menghapus alamat");
    }
  };

  const handleEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setIsAddressDialogOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsAddressDialogOpen(true);
  };

  const handleUpdatePhone = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Fitur verifikasi nomor akan segera hadir`);
    setIsPhoneDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-orange-100 text-orange-700",
      PROCESSING: "bg-blue-100 text-blue-700",
      SHIPPED: "bg-purple-100 text-purple-700",
      DELIVERED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  // Not logged in
  if (!authLoading && !user) {
    return (
      <div className="bg-gray-50 min-h-screen font-noto">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="font-fredoka text-2xl font-bold mb-2">Masuk ke Akun Anda</h2>
            <p className="text-muted-foreground mb-6">Silakan login untuk melihat profil Anda.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
           
           {/* Sidebar */}
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-border flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user?.image || undefined} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-fredoka text-xl font-bold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                  <Button variant="outline" onClick={logout} className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                  </Button>
              </div>

               <div className="bg-white rounded-xl border border-border overflow-hidden">
                   <nav className="flex flex-col p-2 space-y-1">
                       <Button variant="ghost" className="justify-start gap-3 h-12 bg-primary/5 text-primary">
                           <User className="w-5 h-5" />
                           My Account
                       </Button>
                       <Button variant="ghost" className="justify-start gap-3 h-12">
                           <Package className="w-5 h-5" />
                           My Orders
                       </Button>
                       <Button variant="ghost" className="justify-start gap-3 h-12">
                           <Settings className="w-5 h-5" />
                           Settings
                       </Button>
                   </nav>
               </div>
           </div>

           {/* Content Area */}
           <div className="space-y-6">
              <Tabs defaultValue={defaultTab} className="w-full">
                  <TabsList className="mb-6 w-full justify-start h-auto p-1 bg-white border border-border rounded-xl">
                      <TabsTrigger value="account" className="flex-1 h-10">Profile</TabsTrigger>
                      <TabsTrigger value="orders" className="flex-1 h-10">Orders</TabsTrigger>
                      <TabsTrigger value="address" className="flex-1 h-10">Addresses</TabsTrigger>
                  </TabsList>

                  <TabsContent value="account">
                      <Card>
                          <CardHeader>
                              <CardTitle>Personal Information</CardTitle>
                              <CardDescription>Update your personal details here.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                      <Label htmlFor="firstName">First Name</Label>
                                      <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || ""} />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="lastName">Last Name</Label>
                                      <Input id="lastName" defaultValue={user?.name?.split(" ").slice(1).join(" ") || ""} />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" defaultValue={user?.email} disabled />
                              </div>
                              
                              <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Button 
                                        variant="link" 
                                        className="h-auto p-0 text-primary"
                                        onClick={() => setIsPhoneDialogOpen(true)}
                                    >
                                        Change
                                    </Button>
                                  </div>
                                  <Input id="phone" defaultValue={user?.phone || "Not set"} disabled />
                              </div>
                          </CardContent>
                          <CardFooter>
                              <Button>Save Changes</Button>
                          </CardFooter>
                      </Card>
                  </TabsContent>

                  <TabsContent value="orders">
                      <Card>
                          <CardHeader>
                              <CardTitle>Order History</CardTitle>
                              <CardDescription>View your past orders and their status.</CardDescription>
                          </CardHeader>
                          <CardContent>
                              {isLoading ? (
                                <div className="text-center py-8">
                                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                                  <p className="text-muted-foreground">Memuat pesanan...</p>
                                </div>
                              ) : orders.length === 0 ? (
                                <div className="text-center py-8">
                                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                  <p className="text-muted-foreground">Belum ada pesanan</p>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative shrink-0">
                                              {order.items[0]?.product?.image && (
                                                <Image 
                                                  src={order.items[0].product.image} 
                                                  alt="Product" 
                                                  fill 
                                                  className="object-cover" 
                                                />
                                              )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <h4 className="font-bold">Order #{order.orderNumber}</h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getStatusBadge(order.status)}`}>
                                                      {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                  {new Date(order.createdAt).toLocaleDateString("id-ID", { 
                                                    year: "numeric", 
                                                    month: "long", 
                                                    day: "numeric" 
                                                  })}
                                                </p>
                                                <div className="font-bold text-sm">Total: {formatPrice(order.total)}</div>
                                            </div>
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </div>
                                    ))}
                                </div>
                              )}
                          </CardContent>
                      </Card>
                  </TabsContent>

                  <TabsContent value="address">
                      <Card>
                          <CardHeader>
                             <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>My Addresses</CardTitle>
                                    <CardDescription>Manage your shipping addresses.</CardDescription>
                                </div>
                                <Button size="sm" onClick={handleAddNewAddress} className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Address
                                </Button>
                             </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                               {isLoading ? (
                                 <div className="text-center py-8">
                                   <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                                   <p className="text-muted-foreground">Memuat alamat...</p>
                                 </div>
                               ) : addresses.length === 0 ? (
                                 <div className="text-center py-8">
                                   <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                   <p className="text-muted-foreground">Belum ada alamat tersimpan</p>
                                 </div>
                               ) : (
                                 addresses.map((addr) => (
                                     <div key={addr.id} className="border border-input rounded-lg p-4 bg-white relative hover:border-primary/50 transition-colors group">
                                          {addr.isDefault && (
                                              <div className="absolute top-4 right-4 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">DEFAULT</div>
                                          )}
                                          <h4 className="font-bold mb-1 flex items-center gap-2">
                                              {addr.name}
                                              <MapPin className="w-4 h-4 text-muted-foreground" />
                                          </h4>
                                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                              {addr.street}<br/>
                                              {addr.details}<br/>
                                              {addr.phone}
                                          </p>
                                          <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Button variant="outline" size="sm" onClick={() => handleEditAddress(addr)} className="gap-2">
                                                  <Edit2 className="w-3 h-3" /> Edit
                                              </Button>
                                              {!addr.isDefault && (
                                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                                              )}
                                          </div>
                                     </div>
                                 ))
                               )}
                          </CardContent>
                      </Card>
                  </TabsContent>
              </Tabs>
           </div>
        </div>

        {/* Address Dialog */}
        <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                    <DialogDescription>
                        Make changes to your address here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveAddress} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Label (e.g., Home, Office)</Label>
                        <Input id="name" name="name" defaultValue={editingAddress?.name} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input id="street" name="street" defaultValue={editingAddress?.street} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="details">District, City, Province, Zip</Label>
                        <Input id="details" name="details" defaultValue={editingAddress?.details} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" defaultValue={editingAddress?.phone} required />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                          Save Address
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {/* Phone Dialog */}
        <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
             <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Phone Number</DialogTitle>
                    <DialogDescription>
                        Enter your new phone number. We will send a verification code.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdatePhone} className="grid gap-4 py-4">
                     <div className="grid gap-2">
                        <Label htmlFor="new-phone">New Phone Number</Label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center px-3 border border-input rounded-md bg-muted text-muted-foreground text-sm font-bold">+62</span>
                            <Input 
                                id="new-phone" 
                                value={newPhone} 
                                onChange={(e) => setNewPhone(e.target.value)} 
                                placeholder="812 3456 7890" 
                                className="flex-1"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Send Verification Code</Button>
                    </DialogFooter>
                </form>
             </DialogContent>
        </Dialog>

      </main>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 min-h-screen font-noto">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Memuat profil...</p>
          </div>
        </main>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
