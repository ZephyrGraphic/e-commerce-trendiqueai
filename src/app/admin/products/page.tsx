"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, RefreshCw, ChevronDown, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProducts, deleteProduct } from "@/app/actions/products"

// Type definitions from Prisma
import { Product, Category } from "@prisma/client"

type ProductWithCategory = Product & { category: Category | null }

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const loadProducts = async () => {
    setLoading(true)
    try {
      const res = await getProducts()
      if (res.success && res.data) {
        setProducts(res.data)
      } else {
        console.error(res.error)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    
    // Optimistic update
    setProducts(products.filter(p => p.id !== id))
    
    const res = await deleteProduct(id)
    if (!res.success) {
      alert("Failed to delete product")
      loadProducts() // Revert
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 h-full flex flex-col relative font-manrope">
      {/* Top Header & Controls Area */}
      <div className="w-full p-6 md:p-8 flex flex-col gap-6 flex-shrink-0 z-10">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#141118] dark:text-white">Product Inventory</h1>
            <p className="text-[#756189] dark:text-slate-400 text-sm mt-1">Manage your catalog, stock levels, and product details.</p>
          </div>
          <Link href="/admin/products/new">
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-[#8c2bee] hover:bg-[#7a25d0] text-white text-sm font-bold shadow-lg shadow-[#8c2bee]/30 transition-all duration-200 cursor-pointer">
              <Plus className="h-5 w-5" />
              <span>Add New Product</span>
            </button>
          </Link>
        </div>
        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Bar */}
          <div className="w-full lg:max-w-md">
            <label className="flex items-center w-full h-11 rounded-lg bg-white dark:bg-[#1e1429] border border-[#e0dbe6] dark:border-slate-800 focus-within:ring-2 focus-within:ring-[#8c2bee]/50 focus-within:border-[#8c2bee] transition-all overflow-hidden shadow-sm">
              <div className="flex items-center justify-center pl-3 text-[#756189] dark:text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <input 
                className="w-full h-full bg-transparent border-none focus:ring-0 text-[#141118] dark:text-white placeholder:text-[#756189] px-3 text-sm font-medium outline-none" 
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          {/* Chips/Filters */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative group">
              <button className="flex h-9 items-center gap-2 rounded-lg bg-white dark:bg-[#1e1429] border border-[#e0dbe6] dark:border-slate-800 px-3 hover:border-[#8c2bee]/50 transition-colors shadow-sm cursor-pointer">
                <span className="text-[#141118] dark:text-slate-200 text-sm font-medium">Category: All</span>
                <ChevronDown className="h-4 w-4 text-[#756189]" />
              </button>
            </div>
            <button 
              onClick={loadProducts}
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-white dark:bg-[#1e1429] border border-[#e0dbe6] dark:border-slate-800 hover:text-[#8c2bee] transition-colors shadow-sm cursor-pointer" 
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Scrollable Table Area */}
      <div className="flex-1 overflow-auto px-6 md:px-8 pb-8">
        <div className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
          {/* Table Header & Body Wrapper */}
          <div className="flex-1 overflow-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f7f6f8] dark:bg-white/5 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 w-12">
                    <input className="rounded border-slate-300 text-[#8c2bee] focus:ring-[#8c2bee] bg-white dark:bg-white/10 dark:border-white/20 h-4 w-4" type="checkbox"/>
                  </th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 min-w-[280px]">Product</th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400">Category</th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400">Price</th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400">Stock</th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400">Status</th>
                  <th className="p-4 border-b border-[#e0dbe6] dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#756189] dark:text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0dbe6] dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#756189]">
                      <div className="flex justify-center items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading products...
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                   <tr>
                    <td colSpan={7} className="p-8 text-center text-[#756189]">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-[#f7f6f8] dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 align-middle">
                        <input className="rounded border-slate-300 text-[#8c2bee] focus:ring-[#8c2bee] bg-white dark:bg-white/10 dark:border-white/20 h-4 w-4" type="checkbox"/>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 bg-cover bg-center border border-[#e0dbe6] dark:border-slate-800 shrink-0" style={{ backgroundImage: `url("${product.image}")` }}></div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#141118] dark:text-white group-hover:text-[#8c2bee] transition-colors">{product.name}</span>
                            <span className="text-xs text-[#756189] dark:text-slate-400">ID: {product.id.substring(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-sm text-[#141118] dark:text-slate-300">{product.category?.name || "Uncategorized"}</td>
                      <td className="p-4 align-middle text-sm font-medium text-[#141118] dark:text-white">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${(product.stock ?? 0) > 10 ? 'bg-green-500' : (product.stock ?? 0) > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm text-[#141118] dark:text-slate-300">{product.stock ?? 0}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          (product.stock ?? 0) > 0 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800'
                        }`}>
                            {(product.stock ?? 0) > 0 ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex items-center justify-end gap-2">
                           <Link href={`/admin/products/new?id=${product.id}`}>
                            <button className="p-1.5 rounded text-[#756189] hover:text-[#8c2bee] hover:bg-[#8c2bee]/10 transition-colors" title="Edit">
                                <Edit className="h-5 w-5" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 rounded text-[#756189] hover:text-red-500 hover:bg-red-500/10 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Footer - Static for now since we are fetching all */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8] dark:bg-white/5">
              <p className="text-sm text-[#756189] dark:text-slate-400">
                Showing <span className="font-medium text-[#141118] dark:text-white">{filteredProducts.length}</span> results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
