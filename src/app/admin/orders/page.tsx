"use client"

import { Search, CloudDownload, Plus, Filter, ArrowDown, MoreVertical, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getOrders, updateOrderStatus } from "@/app/actions/orders"
import { OrderStatus } from "@prisma/client"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    const res = await getOrders()
    if (res.success && res.data) {
      setOrders(res.data)
    }
    setLoading(false)
  }

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
      const res = await updateOrderStatus(id, status)
      if (res.success) {
          toast.success(`Order status updated to ${status}`)
          fetchOrders()
      } else {
          toast.error("Failed to update status")
      }
  }

  const getStatusColor = (status: OrderStatus) => {
      switch (status) {
          case "PENDING": return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
          case "PROCESSING": return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
          case "SHIPPED": return "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
          case "DELIVERED": return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
          case "CANCELLED": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          default: return "bg-gray-100 text-gray-700"
      }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative font-manrope">
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Breadcrumbs & Heading */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm font-medium text-[#756189] dark:text-slate-400">
              <Link href="/admin/dashboard" className="hover:text-[#8c2bee] transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#141118] dark:text-white">Orders</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#141118] dark:text-white">Order History</h1>
              <div className="flex items-center gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#1e1429] border border-[#e0dbe6] dark:border-slate-800 text-[#141118] dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer">
                  <CloudDownload className="h-5 w-5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white dark:bg-[#1e1429] p-1 rounded-xl">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#756189]" />
              </div>
              <input 
                className="block w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-[#f7f6f8] dark:bg-white/5 text-[#141118] dark:text-white placeholder:text-[#756189] focus:ring-2 focus:ring-[#8c2bee] sm:text-sm outline-none" 
                placeholder="Search by Order ID, Customer, or Phone" 
                type="text"
              />
            </div>
            {/* Status Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8c2bee] text-white text-sm font-medium whitespace-nowrap cursor-pointer">
                All Orders
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f6f8] text-[#756189] hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">
                Paid
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f6f8] text-[#756189] hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">
                Pending
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f7f6f8] text-[#756189] hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">
                Cancelled
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f7f6f8] text-[#756189] hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400 ml-auto lg:ml-2 shrink-0 cursor-pointer">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-white dark:bg-[#1e1429] rounded-xl shadow-sm border border-[#e0dbe6] dark:border-slate-800 overflow-hidden flex flex-col min-h-[300px]">
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#8c2bee]" />
                </div>
            ) : orders.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground">
                    <p>No orders found.</p>
                </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8]/50 dark:bg-white/5">
                    <th className="py-4 pl-6 pr-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#8c2bee]">
                        Order ID
                        <ArrowDown className="h-[14px] w-[14px]" />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400">Customer</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 hidden md:table-cell">Date</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 hidden sm:table-cell">Address</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 text-right">Total</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 text-center">Status</th>
                    <th className="py-4 pl-4 pr-6 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0dbe6] dark:divide-slate-800">
                  {orders.map((order, index) => (
                    <tr key={order.id} className="group hover:bg-[#8c2bee]/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 pl-6 pr-4 whitespace-nowrap">
                        <Link href={`/admin/orders/${order.id}`} className="text-[#8c2bee] font-bold hover:underline">
                            {order.orderNumber || order.id.substring(0, 8)}
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                           <Avatar className="h-9 w-9 border border-[#e0dbe6] dark:border-slate-800">
                             <AvatarImage src={order.user?.image} />
                             <AvatarFallback>{order.user?.name?.substring(0, 2).toUpperCase() || "CN"}</AvatarFallback>
                           </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#141118] dark:text-white">{order.user?.name || "Unknown"}</span>
                            <span className="text-xs text-[#756189] dark:text-slate-400">{order.user?.phone || "-"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-[#141118] dark:text-slate-300 hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 max-w-[200px] hidden sm:table-cell">
                        <p className="text-sm text-[#141118] dark:text-slate-300 truncate">
                            {order.address?.street}, {order.address?.details}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="text-sm font-bold text-[#141118] dark:text-white">${(order.total / 100).toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full bg-current opacity-50`}></span>
                            {order.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PROCESSING")}>Mark Processing</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "SHIPPED")}>Mark Shipped</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "DELIVERED")}>Mark Delivered</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "CANCELLED")} className="text-red-600">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8]/50 dark:bg-white/5">
              <span className="text-sm text-[#756189] dark:text-slate-400">Total Orders: <span className="font-bold text-[#141118] dark:text-white">{orders.length}</span></span>
              <div className="flex items-center gap-2">
                <button disabled className="p-2 rounded-lg text-[#756189] hover:bg-[#e0dbe6] dark:hover:bg-white/10 hover:text-[#141118] disabled:opacity-50 transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg text-[#141118] hover:bg-[#e0dbe6] dark:text-slate-400 dark:hover:bg-white/10 hover:text-[#141118] transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 mb-6 text-center">
            <p className="text-xs text-[#756189] dark:text-slate-500">© 2023 Trendique Inc. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
