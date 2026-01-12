"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ListOrdered,
  Users,
  Tag,
  Settings,
  LogOut,
  ShoppingBag,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { authClient } from "@/lib/auth-client" // To use signOut
import { useRouter } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: ShoppingBag,
  },
  {
    title: "Order List",
    href: "/admin/orders",
    icon: ListOrdered,
  },
  {
    title: "Customers",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Billboards",
    href: "/admin/billboards",
    icon: Tag,
  },
  {
    title: "Vouchers",
    href: "/admin/vouchers",
    icon: Tag,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/admin/login")
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
         <div className="px-6 py-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8" onClick={() => setOpen(false)}>
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                T
            </div>
            <span className="text-xl font-bold font-fredoka">Trendique</span>
            </Link>
            <div className="space-y-1">
            {sidebarItems.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    // Simple logic to check active state, also handles sub-routes loosely
                    pathname.startsWith(item.href)
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50/50"
                )}
                >
                <item.icon className="h-4 w-4" />
                {item.title}
                </Link>
            ))}
            </div>
        </div>
        <div className="mt-auto px-6 py-6 border-t">
            <div className="space-y-1">
                <Link
                href="/admin/settings"
                onClick={() => setOpen(false)}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-orange-500 text-muted-foreground hover:bg-orange-50/50"
                )}
                >
                <Settings className="h-4 w-4" />
                Settings
                </Link>
                <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-red-600 text-muted-foreground hover:bg-red-50 cursor-pointer"
                >
                <LogOut className="h-4 w-4" />
                Log Out
                </button>
            </div>
        </div>
    </div>
  )

  return (
    <>
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex h-screen flex-col justify-between border-r bg-white w-64 fixed left-0 top-0 overflow-y-auto z-50">
           <SidebarContent />
        </div>

        {/* Mobile Sidebar Trigger */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-white border shadow-sm">
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                     <SidebarContent />
                </SheetContent>
            </Sheet>
        </div>
    </>
  )
}
