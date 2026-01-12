"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Users, ShoppingBag, DollarSign, Package, TrendingUp, TrendingDown, Store, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAdminStats, getRecentOrders } from "@/app/actions/admin"
import { formatPrice } from "@/lib/mockData"

interface Stats {
  totalRevenue: number
  totalSales: number
  productsInStock: number
  revenueChange: number
  salesChange: number
  stockChange: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  date: string
  total: number
  status: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [statsRes, ordersRes] = await Promise.all([
        getAdminStats(),
        getRecentOrders(),
      ])

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data)
      }
      if (ordersRes.success && ordersRes.data) {
        setOrders(ordersRes.data)
      }
    } catch (error) {
      console.error("Error loading dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED":
      case "PAID":
        return "bg-[#f2f0f4] dark:bg-slate-700/50 text-[#141118] dark:text-white"
      case "PENDING":
        return "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
      case "PROCESSING":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
      case "SHIPPED":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
      case "CANCELLED":
        return "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#8c2bee] mx-auto mb-4" />
          <p className="text-[#756189]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500 font-manrope">
      {/* Page Heading */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-[#141118] dark:text-white leading-tight">Dashboard Overview</h1>
          <p className="text-[#756189] dark:text-slate-400 text-base font-medium">Good morning, Admin</p>
        </div>
        <Button className="flex items-center justify-center gap-2 bg-[#8c2bee] hover:bg-[#7a25d0] text-white px-5 h-10 rounded-lg font-bold text-sm shadow-md shadow-[#8c2bee]/20 transition-all cursor-pointer">
          <Download className="h-5 w-5" />
          <span>Download Report</span>
        </Button>
      </header>

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Revenue Card */}
        <div className="bg-white dark:bg-[#1e1429] p-6 rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <span className="text-[#141118] dark:text-slate-200 text-base font-bold">Total Revenue</span>
            <div className="h-10 w-10 rounded-full bg-[#8c2bee]/10 flex items-center justify-center text-[#8c2bee]">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold tracking-tight text-[#141118] dark:text-white">
              {formatPrice(stats?.totalRevenue || 0)}
            </span>
            <div className={`flex items-center gap-1 text-sm font-bold ${(stats?.revenueChange || 0) >= 0 ? 'text-[#078847]' : 'text-[#e74808]'}`}>
              {(stats?.revenueChange || 0) >= 0 ? <TrendingUp className="h-[18px] w-[18px]" /> : <TrendingDown className="h-[18px] w-[18px]" />}
              <span>{(stats?.revenueChange || 0) >= 0 ? '+' : ''}{stats?.revenueChange || 0}%</span>
            </div>
          </div>
        </div>

        {/* Sales Card */}
        <div className="bg-white dark:bg-[#1e1429] p-6 rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <span className="text-[#141118] dark:text-slate-200 text-base font-bold">Sales</span>
            <div className="h-10 w-10 rounded-full bg-[#8c2bee]/10 flex items-center justify-center text-[#8c2bee]">
              <ShoppingBag className="h-6 w-6" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold tracking-tight text-[#141118] dark:text-white">
              +{stats?.totalSales || 0}
            </span>
            <div className={`flex items-center gap-1 text-sm font-bold ${(stats?.salesChange || 0) >= 0 ? 'text-[#078847]' : 'text-[#e74808]'}`}>
              {(stats?.salesChange || 0) >= 0 ? <TrendingUp className="h-[18px] w-[18px]" /> : <TrendingDown className="h-[18px] w-[18px]" />}
              <span>{(stats?.salesChange || 0) >= 0 ? '+' : ''}{stats?.salesChange || 0}%</span>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white dark:bg-[#1e1429] p-6 rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <span className="text-[#141118] dark:text-slate-200 text-base font-bold">Products in Stock</span>
            <div className="h-10 w-10 rounded-full bg-[#8c2bee]/10 flex items-center justify-center text-[#8c2bee]">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold tracking-tight text-[#141118] dark:text-white">
              {stats?.productsInStock || 0}
            </span>
            <div className={`flex items-center gap-1 text-sm font-bold ${(stats?.stockChange || 0) >= 0 ? 'text-[#078847]' : 'text-[#e74808]'}`}>
              {(stats?.stockChange || 0) >= 0 ? <TrendingUp className="h-[18px] w-[18px]" /> : <TrendingDown className="h-[18px] w-[18px]" />}
              <span>{(stats?.stockChange || 0) >= 0 ? '+' : ''}{stats?.stockChange || 0}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section - Placeholder for now */}
      <section className="bg-white dark:bg-[#1e1429] p-6 lg:p-8 rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-[#141118] dark:text-white">Revenue Overview</h2>
            <p className="text-[#756189] dark:text-slate-400 text-sm font-medium">Jan - Dec {new Date().getFullYear()}</p>
          </div>
          <h3 className="text-[32px] font-bold text-[#141118] dark:text-white tracking-tight">
            {formatPrice(stats?.totalRevenue || 0)}
          </h3>
        </div>
        
        {/* Chart Graphic - Placeholder SVG */}
        <div className="w-full aspect-[2/1] sm:aspect-[3/1] relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 300">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8c2bee" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#8c2bee" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line className="text-slate-100 dark:text-slate-800" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" x1="0" x2="1200" y1="225" y2="225"></line>
            <line className="text-slate-100 dark:text-slate-800" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" x1="0" x2="1200" y1="150" y2="150"></line>
            <line className="text-slate-100 dark:text-slate-800" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" x1="0" x2="1200" y1="75" y2="75"></line>
            {/* Area Fill */}
            <path d="M0,225 C100,225 150,100 200,100 C250,100 300,180 350,180 C400,180 450,120 500,120 C550,120 600,60 650,60 C700,60 750,140 800,140 C850,140 900,200 950,200 C1000,200 1050,40 1100,40 C1150,40 1200,100 1200,100 V300 H0 Z" fill="url(#chartGradient)"></path>
            {/* Stroke Line */}
            <path d="M0,225 C100,225 150,100 200,100 C250,100 300,180 350,180 C400,180 450,120 500,120 C550,120 600,60 650,60 C700,60 750,140 800,140 C850,140 900,200 950,200 C1000,200 1050,40 1100,40 C1150,40 1200,100 1200,100" fill="none" stroke="#8c2bee" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
          </svg>
        </div>
        
        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 text-[13px] font-bold text-[#756189] dark:text-slate-500 tracking-wide uppercase">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </section>

      {/* Recent Orders Table */}
      <section className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#e0dbe6] dark:border-slate-800">
          <h2 className="text-lg font-bold text-[#141118] dark:text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white dark:bg-[#1e1429]">
                <th className="px-6 py-4 text-[#141118] dark:text-white text-sm font-semibold">Order ID</th>
                <th className="px-6 py-4 text-[#141118] dark:text-white text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-[#141118] dark:text-white text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-[#141118] dark:text-white text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-[#141118] dark:text-white text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0dbe6] dark:divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#756189]">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm font-medium text-[#756189] dark:text-slate-400">#{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#141118] dark:text-white">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#756189] dark:text-slate-400">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#756189] dark:text-slate-400">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center justify-center h-8 px-4 rounded-lg text-xs font-bold ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      <div className="h-10"></div>
    </div>
  )
}
