"use client"

import { Plus, Search, Filter, ArrowUpDown, Shirt, Footprints, Watch, Gem, Trophy, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getCategories, createCategory, deleteCategory } from "@/app/actions/categories"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Mock icons mapping for now or we can use a library selector later
const ICON_MAP: Record<string, any> = {
  Shirt, Footprints, Watch, Gem, Trophy, Tag: Shirt // Fallback
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryIcon, setNewCategoryIcon] = useState("Shirt") // Default icon
  const [submitting, setSubmitting] = useState(false)
  // const { toast } = useToast() -> Removed

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    const res = await getCategories()
    if (res.success && res.data) {
      setCategories(res.data)
    }
    setLoading(false)
  }

  const handleCreate = async () => {
    if (!newCategoryName) {
        toast.error("Name is required")
        return
    }

    setSubmitting(true)
    // Simple slug generator
    const slug = newCategoryName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    
    const res = await createCategory({
        name: newCategoryName,
        icon: newCategoryIcon,
        slug: slug
    })

    if (res.success) {
        toast.success("Category created successfully")
        setNewCategoryName("")
        setIsDialogOpen(false)
        fetchCategories()
    } else {
        toast.error(res.error || "Failed to create category")
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
      if (!confirm("Are you sure you want to delete this category?")) return

      const res = await deleteCategory(id)
      if (res.success) {
          toast.success("Category deleted")
          fetchCategories()
      } else {
          toast.error("Failed to delete category")
      }
  }

  const getIconComponent = (iconName: string) => {
      const Icon = ICON_MAP[iconName] || Shirt
      return <Icon className="h-6 w-6" />
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative font-manrope">
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* Page Heading */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-black text-[#141118] dark:text-white tracking-tight">Categories</h1>
              <p className="text-[#756189] dark:text-slate-400 text-base">Manage and organize your store's product categories.</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button className="flex items-center justify-center gap-2 bg-[#8c2bee] hover:bg-[#7a25d0] text-white rounded-lg h-10 px-5 text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer">
                    <Plus className="h-5 w-5" />
                    <span>Add New</span>
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input 
                                value={newCategoryName} 
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Summer Collection"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Icon (Internal Name)</label>
                            <select 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newCategoryIcon}
                                onChange={(e) => setNewCategoryIcon(e.target.value)}
                            >
                                {Object.keys(ICON_MAP).map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                        <Button onClick={handleCreate} disabled={submitting} className="bg-[#8c2bee] hover:bg-[#7a25d0]">
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Category"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
          </div>

          {/* Filters & Search */}
          <div className="bg-white dark:bg-[#1e1429] p-4 rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#756189]" />
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-[#f7f6f8] dark:bg-white/5 text-[#141118] dark:text-white placeholder-[#756189] focus:ring-2 focus:ring-[#8c2bee]/50 transition-shadow text-sm outline-none" 
                  placeholder="Search categories by name..." 
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[300px]">
            {loading ? (
                 <div className="flex-1 flex items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin text-[#8c2bee]" />
                 </div>
            ) : categories.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <p>No categories found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-[#f7f6f8] dark:bg-[#251a30] border-b border-[#e0dbe6] dark:border-slate-800">
                        <th className="px-6 py-4 text-xs font-bold text-[#756189] dark:text-slate-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#756189] dark:text-slate-400 uppercase tracking-wider">Products Count</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#756189] dark:text-slate-400 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#756189] dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0dbe6] dark:divide-slate-800">
                    {categories.map((category) => (
                        <tr key={category.id} className="group hover:bg-[#8c2bee]/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-[#8c2bee] font-bold">
                                {getIconComponent(category.icon)}
                            </div>
                            <span className="text-sm font-semibold text-[#141118] dark:text-white">{category.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-[#756189] dark:text-slate-400">{category._count?.products || 0} Products</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-[#756189] dark:text-slate-400">{category.slug}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleDelete(category.id)} className="p-2 text-[#756189] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors cursor-pointer">
                                <Trash2 className="h-5 w-5" />
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
