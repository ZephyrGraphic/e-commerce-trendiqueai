"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ShoppingBag, Tag, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Notification Data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "Pesanan Dikirim",
    message: "Paket untuk pesanan #TRD-2024003 sedang dalam perjalanan menuju alamatmu.",
    time: "2 jam yang lalu",
    read: false,
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    type: "promo",
    title: "Flash Sale 12.12!",
    message: "Jangan lewatkan diskon hingga 90% hanya hari ini. Buruan cek sekarang!",
    time: "5 jam yang lalu",
    read: true,
    icon: Tag,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    type: "info",
    title: "Update Keamanan Akun",
    message: "Kami telah memperbarui kebijakan privasi kami untuk keamananmu.",
    time: "1 hari yang lalu",
    read: true,
    icon: Info,
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: 4,
    type: "order",
    title: "Pesanan Selesai",
    message: "Terima kasih telah berbelanja! Pesanan #TRD-2024002 telah diterima.",
    time: "2 hari yang lalu",
    read: true,
    icon: ShoppingBag,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    type: "promo",
    title: "Diskon Pengguna Baru",
    message: "Dapatkan potongan Rp 50.000 untuk pembelian pertamamu.",
    time: "3 hari yang lalu",
    read: true,
    icon: Tag,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function NotificationsPage() {
  const NotificationItem = ({ item }: { item: typeof notifications[0] }) => {
    const Icon = item.icon;
    return (
      <div className={cn(
        "flex gap-4 p-4 rounded-xl border transition-colors",
        item.read ? "bg-white border-border" : "bg-primary/5 border-primary/20"
      )}>
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", item.color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className={cn("font-fredoka text-lg font-semibold", !item.read && "text-primary")}>
              {item.title}
            </h3>
            <span className="text-xs text-muted-foreground font-noto">{item.time}</span>
          </div>
          <p className="text-sm text-muted-foreground font-noto leading-relaxed">
            {item.message}
          </p>
        </div>
        {!item.read && (
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-noto">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Bell className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-fredoka text-3xl font-bold">Notifikasi</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start h-auto p-1 bg-white border border-border rounded-xl mb-6 overflow-x-auto">
            <TabsTrigger value="all" className="flex-1 min-w-[100px] h-10">Semua</TabsTrigger>
            <TabsTrigger value="order" className="flex-1 min-w-[100px] h-10">Pesanan</TabsTrigger>
            <TabsTrigger value="promo" className="flex-1 min-w-[100px] h-10">Promo</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((item) => (
              <NotificationItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
            {notifications
              .filter(n => n.type === "order")
              .map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
          </TabsContent>

          <TabsContent value="promo" className="space-y-4">
            {notifications
              .filter(n => n.type === "promo")
              .map((item) => (
                <NotificationItem key={item.id} item={item} />
              ))}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
