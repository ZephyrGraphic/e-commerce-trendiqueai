"use client"

import { Search, Download, Plus, ArrowUp, Filter, ArrowDown, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const customers = [
  {
    id: 1,
    name: "Alice Freeman",
    email: "alice.f@example.com",
    status: "Active",
    orders: 24,
    spent: "$1,240.00",
    joined: "Oct 24, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYk9_aR90JZbcQzsHGI-_PzCPNdIDjgjqVhi27mZHiW2_u5FTn_af3aRVP407YZ_ul9bT6RH21u6TPLDTs6uYSyyClJM0dHsI3aitsZdaJCLe3ELahyelVv1FZx8yFmMPU_RGeHUqQ1E5q9hLJSVAB0GgD1qjtLSteZVeeZ0hDXhyq5ETw-p9C6hWV98iJxMsAUkp8hPHFAkarfP067Crxp7EArsQ1llsYDfUUjuY5KI-Dku99fW7jlPmvMbRWluHFP-JICtqGMaaY"
  },
  {
    id: 2,
    name: "John Miller",
    email: "john.miller@test.com",
    status: "Inactive",
    orders: 2,
    spent: "$85.50",
    joined: "Nov 02, 2023",
    avatar: "",
    initials: "JM"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    email: "s.jenkins@design.co",
    status: "VIP",
    orders: 142,
    spent: "$12,450.00",
    joined: "Jan 15, 2022",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANWxtqgtZOCbixYbbpJYmNL2aWcDM5g55BTrPmqLR6CP8SZfjwtzLmAMulfp1Jc6fq1qSntyXqTIcLUTaWJXquQwc72-ADb2FQ_1pUtq31nabilYAiteTWHHcmcGLRN3PAwWd8B49C4mO3xztMtHY1fbeGjYwNdiZ4NnKCmlEX0E6kpnwOVnWcqAFfPVr6wfU6ceuRCC_QsjkCool4jyOmHCme-0bK_EzGRujtkDyo_Smk-9GEfvBtnB92-3NxifHL2et78c7HfuYL"
  },
  {
    id: 4,
    name: "Michael King",
    email: "mking99@webmail.com",
    status: "New",
    orders: 1,
    spent: "$45.00",
    joined: "Today",
    avatar: "",
    initials: "MK"
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.chen@techhub.io",
    status: "Active",
    orders: 8,
    spent: "$320.00",
    joined: "Sep 10, 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx70hUJLkZRudfvnPsLaBKPhmSvWLFJe_CVJSRFpBmc8e3kFKPXYzr9IRlnTdMBYHiTem1e7nQfb2CGW_txQbceYaAbnuZiyXQMDu6_zLvQEb2HNolxSdQyeak-1wtHT9alCFOQitlHLE_KH0MGytGiEYeuIbv-6ZeXKU2nD568I2NFeuqMZgIYYhf_BKjuRIADDeW8SKRAdAy5KkHONDs-DmeO-QjsWCZj1RFtfaqWzPQapbXNjMgsbcwv4sT9gFCxx5vSbRxNTRg"
  }
]

export default function UsersPage() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col font-manrope">
      <div className="layout-container flex flex-col flex-1 p-4 md:p-8 w-full gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#141118] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.033em]">Customers</h1>
              <p className="text-[#756189] dark:text-slate-400 text-base font-normal leading-normal">Manage your customer base and view their order history.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-[#1e1429] border border-[#e0dbe6] dark:border-slate-800 text-[#141118] dark:text-white text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <Download className="h-5 w-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-[#8c2bee] hover:bg-[#7a25d0] text-white text-sm font-bold shadow-sm transition-colors cursor-pointer">
                <Plus className="h-5 w-5" />
                <span>Add Customer</span>
              </button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#1e1429] rounded-xl p-5 border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[#756189] dark:text-slate-400 text-sm font-medium">Total Customers</p>
                <p className="text-[#141118] dark:text-white text-2xl font-bold mt-1">2,543</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                <ArrowUp className="h-[14px] w-[14px]" />
                <span>12%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1e1429] rounded-xl p-5 border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[#756189] dark:text-slate-400 text-sm font-medium">Active Now</p>
                <p className="text-[#141118] dark:text-white text-2xl font-bold mt-1">124</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                <ArrowUp className="h-[14px] w-[14px]" />
                <span>5%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1e1429] rounded-xl p-5 border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[#756189] dark:text-slate-400 text-sm font-medium">New this Month</p>
                <p className="text-[#141118] dark:text-white text-2xl font-bold mt-1">85</p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                <ArrowUp className="h-[14px] w-[14px]" />
                <span>2.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Table Section */}
        <div className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm flex flex-col">
          {/* Filter Toolbar */}
          <div className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#756189] h-5 w-5" />
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-[#f7f6f8] dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-white/10 focus:border-[#8c2bee]/30 rounded-lg text-sm transition-all outline-none text-[#141118] dark:text-white" 
                  placeholder="Search customers..." 
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-sm font-medium text-[#141118] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 whitespace-nowrap cursor-pointer">
                <Filter className="h-[18px] w-[18px]" />
                Filters
              </button>
              <div className="h-6 w-px bg-[#e0dbe6] dark:bg-slate-800 mx-1"></div>
              <button className="px-3 py-2 rounded-lg bg-[#8c2bee]/10 text-[#8c2bee] text-sm font-bold whitespace-nowrap cursor-pointer">All</button>
              <button className="px-3 py-2 rounded-lg text-[#756189] dark:text-slate-400 hover:text-[#141118] dark:hover:text-white text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">Active</button>
              <button className="px-3 py-2 rounded-lg text-[#756189] dark:text-slate-400 hover:text-[#141118] dark:hover:text-white text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">VIP</button>
              <button className="px-3 py-2 rounded-lg text-[#756189] dark:text-slate-400 hover:text-[#141118] dark:hover:text-white text-sm font-medium whitespace-nowrap transition-colors cursor-pointer">New</button>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f7f6f8]/50 dark:bg-white/5 text-[#756189] dark:text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-[#e0dbe6] dark:border-slate-800">
                  <th className="px-6 py-4 w-12">
                     <input className="rounded border-[#e0dbe6] dark:border-slate-700 text-[#8c2bee] focus:ring-[#8c2bee]/20 w-4 h-4" type="checkbox"/>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-[#8c2bee] transition-colors group">
                    <div className="flex items-center gap-1">
                      Customer
                      <ArrowDown className="opacity-0 group-hover:opacity-100 transition-opacity h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-[#8c2bee] transition-colors">Status</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-[#8c2bee] transition-colors text-right">Orders</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-[#8c2bee] transition-colors text-right">Total Spent</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-[#8c2bee] transition-colors">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0dbe6] dark:divide-slate-800 text-sm text-[#141118] dark:text-white">
                {customers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-[#8c2bee]/5 transition-colors">
                    <td className="px-6 py-4">
                       <input className="rounded border-[#e0dbe6] dark:border-slate-700 text-[#8c2bee] focus:ring-[#8c2bee]/20 w-4 h-4" type="checkbox"/>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10 border border-[#e0dbe6] dark:border-slate-800">
                           {customer.avatar ? (
                             <AvatarImage src={customer.avatar} />
                           ) : (
                             <AvatarFallback className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 font-bold text-xs">{customer.initials}</AvatarFallback>
                           )}
                           <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                         </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#141118] dark:text-white">{customer.name}</span>
                          <span className="text-[#756189] dark:text-slate-400 text-xs">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {customer.status === "Active" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                          Active
                        </span>
                      )}
                      {customer.status === "Inactive" && (
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                          Inactive
                        </span>
                      )}
                      {customer.status === "VIP" && (
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-[#8c2bee] dark:bg-[#8c2bee]/20 dark:text-[#8c2bee]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8c2bee]"></span>
                          VIP
                        </span>
                      )}
                       {customer.status === "New" && (
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{customer.orders}</td>
                    <td className="px-6 py-4 text-right text-[#756189] dark:text-slate-400">{customer.spent}</td>
                    <td className="px-6 py-4 text-[#756189] dark:text-slate-400">{customer.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#756189] hover:text-[#8c2bee] hover:bg-[#8c2bee]/10 p-1.5 rounded-lg transition-colors cursor-pointer">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#e0dbe6] dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm text-[#756189] dark:text-slate-400">Showing <span className="font-bold text-[#141118] dark:text-white">1-5</span> of <span className="font-bold text-[#141118] dark:text-white">2,543</span></p>
            <div className="flex items-center gap-2">
              <button disabled className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-[#756189] dark:text-slate-400 hover:bg-[#f7f6f8] dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="h-[18px] w-[18px]" />
              </button>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#8c2bee] text-white text-sm font-bold shadow-sm">1</button>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-[#756189] dark:text-slate-400 hover:bg-[#f7f6f8] dark:hover:bg-white/5 transition-colors text-sm">2</button>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-[#756189] dark:text-slate-400 hover:bg-[#f7f6f8] dark:hover:bg-white/5 transition-colors text-sm">3</button>
              <span className="text-[#756189] px-1">...</span>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-[#756189] dark:text-slate-400 hover:bg-[#f7f6f8] dark:hover:bg-white/5 transition-colors text-sm">50</button>
              <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-[#e0dbe6] dark:border-slate-800 text-[#756189] dark:text-slate-400 hover:bg-[#f7f6f8] dark:hover:bg-white/5 transition-colors">
                <ChevronRight className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
