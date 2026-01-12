"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Package, User, MapPin, Settings, LogOut, Plus, Edit2, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useAuth } from "@/context/AuthContext";

type Address = {
  id: string;
  name: string;
  street: string;
  details: string;
  phone: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    street: "Jl. Mawar Melati Indah No. 123, Rt. 001 Rw. 002",
    details: "Kec. Tebet, Jakarta Selatan, DKI Jakarta 12810",
    phone: "(+62) 812-3456-7890",
    isDefault: true,
  },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  
  // Form States
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newPhone, setNewPhone] = useState("");

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddr: Address = {
      id: editingAddress ? editingAddress.id : Date.now().toString(),
      name: formData.get("name") as string,
      street: formData.get("street") as string,
      details: formData.get("details") as string,
      phone: formData.get("phone") as string,
      isDefault: addresses.length === 0,
    };

    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? newAddr : a));
    } else {
      setAddresses([...addresses, newAddr]);
    }
    
    setIsAddressDialogOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
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
    // In a real app, this would verify OTP then update server
    alert(`Phone number updated to ${newPhone}`);
    setIsPhoneDialogOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-noto">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
           
           {/* Sidebar */}
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-border flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user?.avatar} />
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
              <Tabs defaultValue="account" className="w-full">
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
                                      <Input id="firstName" defaultValue="John" />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="lastName">Last Name</Label>
                                      <Input id="lastName" defaultValue="Doe" />
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
                                  <Input id="phone" defaultValue="+62 812 3456 7890" disabled />
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
                              <div className="space-y-4">
                                  {[1, 2, 3].map((order) => (
                                      <div key={order} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                          <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                                          <div className="flex-1">
                                              <div className="flex justify-between mb-1">
                                                  <h4 className="font-bold">Order #TRD-{2024000 + order}</h4>
                                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">COMPLETED</span>
                                              </div>
                                              <p className="text-sm text-muted-foreground mb-2">Jan {10 + order}, 2024</p>
                                              <div className="font-bold text-sm">Total: Rp 150.000</div>
                                          </div>
                                          <Button variant="outline" size="sm">View Details</Button>
                                      </div>
                                  ))}
                              </div>
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
                               {addresses.map((addr) => (
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
                               ))}
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
                        Make changes to your address here. Click save when you're done.
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
                        <Button type="submit">Save Address</Button>
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
