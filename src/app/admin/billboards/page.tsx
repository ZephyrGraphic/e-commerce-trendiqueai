"use client"

import { Plus, Search, Edit, Trash2, Loader2, CloudUpload, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getBillboards, createBillboard, deleteBillboard } from "@/app/actions/billboards"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { BannerType } from "@prisma/client"

export default function BillboardsPage() {
  const [billboards, setBillboards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [label, setLabel] = useState("")
  const [image, setImage] = useState("")
  const [href, setHref] = useState("#")
  const [type, setType] = useState<BannerType>("HERO")

  useEffect(() => {
    fetchBillboards()
  }, [])

  const fetchBillboards = async () => {
    setLoading(true)
    const res = await getBillboards()
    if (res.success && res.data) {
      setBillboards(res.data)
    }
    setLoading(false)
  }

  const handleCreate = async () => {
    if (!label || !image) {
        toast.error("Label and Image URL are required")
        return
    }

    setSubmitting(true)
    const res = await createBillboard({
        alt: label,
        image,
        href,
        type
    })

    if (res.success) {
        toast.success("Billboard created successfully")
        setLabel("")
        setImage("")
        setHref("#")
        setIsDialogOpen(false)
        fetchBillboards()
    } else {
        toast.error(res.error || "Failed to create billboard")
    }
    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
      if (!confirm("Are you sure you want to delete this billboard?")) return

      const res = await deleteBillboard(id)
      if (res.success) {
          toast.success("Billboard deleted")
          fetchBillboards()
      } else {
          toast.error("Failed to delete billboard")
      }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative font-manrope">
      {/* Top Bar / Header Area */}
      <header className="w-full bg-white dark:bg-[#1e1429] border-b border-[#e0dbe6] dark:border-[#332a40] px-6 py-5 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#141118] dark:text-white text-3xl font-extrabold leading-tight tracking-tight">Billboards ({billboards.length})</h2>
          <p className="text-[#756189] dark:text-slate-400 text-base font-normal">Overview of your store's banners</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-[#8c2bee] hover:bg-[#7a25d0] text-white h-11 px-5 text-sm font-bold leading-normal tracking-wide shadow-lg shadow-[#8c2bee]/30 transition-all active:scale-95 cursor-pointer">
                <Plus className="h-5 w-5" />
                <span className="truncate">Add New</span>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Billboard</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Label (Alt Text)</label>
                        <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Summer Sale" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
                    </div>
                    {image && (
                        <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100 border">
                             <img src={image} alt="Preview" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.src='https://placehold.co/600x400?text=Invalid+Image')} />
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Link URL</label>
                        <Input value={href} onChange={(e) => setHref(e.target.value)} placeholder="/promo/summer" />
                    </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Type</label>
                        <select 
                             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                             value={type}
                             onChange={(e) => setType(e.target.value as BannerType)}
                        >
                            <option value="HERO">Hero Banner (Top)</option>
                            <option value="PROMO">Promo Banner (Grid)</option>
                        </select>
                    </div>

                    <Button onClick={handleCreate} disabled={submitting} className="bg-[#8c2bee] hover:bg-[#7a25d0]">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Billboard"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Data Table */}
          <div className="w-full @container">
            <div className="flex flex-col overflow-hidden rounded-xl border border-[#e0dbe6] dark:border-[#332a40] bg-white dark:bg-[#1e1429] shadow-sm min-h-[300px]">
               {loading ? (
                 <div className="flex-1 flex items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin text-[#8c2bee]" />
                 </div>
               ) : billboards.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center p-8 text-center text-muted-foreground">
                        <p>No billboards found.</p>
                    </div>
               ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="bg-[#fcfbfc] dark:bg-[#261d30] border-b border-[#e0dbe6] dark:border-[#332a40]">
                        <th className="px-6 py-4 text-left text-[#141118] dark:text-white w-[40%] text-xs font-semibold uppercase tracking-wider">Label</th>
                        <th className="px-6 py-4 text-left text-[#141118] dark:text-white w-[20%] text-xs font-semibold uppercase tracking-wider">Type</th>
                         <th className="px-6 py-4 text-left text-[#141118] dark:text-white w-[20%] text-xs font-semibold uppercase tracking-wider">Date Created</th>
                        <th className="px-6 py-4 text-right text-[#141118] dark:text-white w-[20%] text-xs font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0dbe6] dark:divide-[#332a40]">
                        {billboards.map((billboard) => (
                        <tr key={billboard.id} className="group hover:bg-[#f7f6f8] dark:hover:bg-[#2d2438] transition-colors">
                            <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${billboard.image}')` }}></div>
                                </div>
                                <span className="text-[#141118] dark:text-gray-100 text-sm font-semibold">{billboard.alt}</span>
                            </div>
                            </td>
                            <td className="px-6 py-4 text-[#756189] dark:text-slate-400 text-sm font-medium">
                                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold ring-1 ring-blue-500/10">
                                    {billboard.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-[#756189] dark:text-slate-400 text-sm font-medium">
                            {new Date(billboard.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-3">
                                <button onClick={() => handleDelete(billboard.id)} className="p-2 rounded-full hover:bg-red-50 text-[#756189] dark:text-slate-400 hover:text-red-500 transition-colors" title="Delete">
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
    </div>
  )
}
