"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, CloudUpload, Loader2, Save, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createProduct, updateProduct, getProductById, getCategories } from "@/app/actions/products"

import { Category } from "@prisma/client"

function AddProductForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  
  // Form State
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("") // Selling Price
  const [originalPrice, setOriginalPrice] = useState("") // Regular Price
  const [stock, setStock] = useState("1")
  const [categoryId, setCategoryId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  
  // Helper for image preview
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    // Fetch categories
    getCategories().then(res => {
      if (res.success && res.data) setCategories(res.data)
    })

    // Fetch product if editing
    if (productId) {
      setLoading(true)
      getProductById(productId).then(res => {
        if (res.success && res.data) {
          const p = res.data
          setName(p.name)
          setDescription(p.description || "")
          setPrice(p.price.toString())
          setOriginalPrice(p.originalPrice.toString())
          setStock((p.stock ?? 0).toString())
          setCategoryId(p.categoryId)
          setImageUrl(p.image)
          setPreviewImage(p.image)
        }
        setLoading(false)
      })
    }
  }, [productId])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // For now, this is just a preview. The actual URL input is what saves.
    // In a real app, this would upload to S3/Blob and return a URL.
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setPreviewImage(url)
      // We can't easily save this blob URL to DB for persistence across devices.
      // We'll rely on the text input for now or just alert the user.
      alert("Note: File upload requires a storage service. Please provide an Image URL for permanent storage, or this image will only work locally/temporarily.")
      setImageUrl(url) // Still set it so form can submit, but it's fragile.
    }
  }

  const handleSubmit = async () => {
    if (!name || !price || !categoryId || !imageUrl) {
      alert("Please fill in all required fields (Name, Price, Category, Image URL)")
      return
    }

    setLoading(true)
    const productData = {
      name,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(originalPrice || price), // Default original to price if empty
      stock: parseInt(stock),
      categoryId,
      image: imageUrl,
    }

    let res
    if (productId) {
      res = await updateProduct(productId, productData)
    } else {
      res = await createProduct(productData)
    }

    setLoading(false)

    if (res.success) {
      router.push("/admin/products")
    } else {
      alert("Failed to save product: " + res.error)
    }
  }

  return (
    <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8 flex flex-col gap-6 font-manrope">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Link href="/admin/products" className="md:hidden p-1 -ml-1">
                <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-[#141118] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                {productId ? "Edit Product" : "Create Product"}
            </h1>
          </div>
          <p className="text-[#756189] dark:text-gray-400 text-base font-normal">
              {productId ? "Update product details." : "Add a new item to your store inventory."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
              <span className="truncate">Discard</span>
            </button>
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-[#8c2bee] hover:bg-[#7a25d0] text-white text-sm font-bold shadow-lg shadow-[#8c2bee]/30 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="truncate">{productId ? "Update Product" : "Save Product"}</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* General Info Card */}
          <div className="bg-white dark:bg-[#1e1429] rounded-xl shadow-sm border border-[#e0dbe6] dark:border-slate-800 p-6">
            <h2 className="text-lg font-bold text-[#141118] dark:text-white mb-6">General Information</h2>
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#141118] dark:text-white">Product Name <span className="text-red-500">*</span></span>
                <input 
                  className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 placeholder:text-[#756189] dark:placeholder:text-gray-500 outline-none transition-all" 
                  placeholder="e.g., Summer Floral Dress" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#141118] dark:text-white">Original Price ($)</span>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 placeholder:text-[#756189] dark:placeholder:text-gray-500 outline-none transition-all" 
                      placeholder="e.g. 150.00" 
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#141118] dark:text-white">Sale Price ($) <span className="text-red-500">*</span></span>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 placeholder:text-[#756189] dark:placeholder:text-gray-500 outline-none transition-all" 
                      placeholder="e.g. 89.00" 
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#141118] dark:text-white">Description</span>
                <textarea 
                  className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] p-4 min-h-[120px] resize-y placeholder:text-[#756189] dark:placeholder:text-gray-500 outline-none transition-all" 
                  placeholder="Describe your product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>

          {/* Organization Card */}
          <div className="bg-white dark:bg-[#1e1429] rounded-xl shadow-sm border border-[#e0dbe6] dark:border-slate-800 p-6">
            <h2 className="text-lg font-bold text-[#141118] dark:text-white mb-6">Organization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#141118] dark:text-white">Category <span className="text-red-500">*</span></span>
                <select 
                    className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 cursor-pointer outline-none transition-all"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="" disabled>Select category</option>
                  {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#141118] dark:text-white">Stock Quantity</span>
                <input 
                  className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 outline-none transition-all" 
                  type="number" 
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1e1429] rounded-xl shadow-sm border border-[#e0dbe6] dark:border-slate-800 p-6 h-full flex flex-col">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-[#141118] dark:text-white mb-4">Product Image</h2>
                <label className="flex flex-col gap-2 mb-4">
                    <span className="text-sm font-medium text-[#141118] dark:text-white">Image URL <span className="text-red-500">*</span></span>
                    <input 
                        className="w-full rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee]/20 focus:border-[#8c2bee] h-11 px-4 placeholder:text-[#756189] dark:placeholder:text-gray-500 outline-none transition-all text-sm" 
                        placeholder="https://..." 
                        type="text"
                        value={imageUrl}
                        onChange={(e) => {
                            setImageUrl(e.target.value)
                            setPreviewImage(e.target.value)
                        }}
                    />
                </label>
            </div>
            
            {/* Image Preview */}
            <div className="aspect-square rounded-lg overflow-hidden border border-[#e0dbe6] dark:border-slate-800 bg-gray-100 dark:bg-gray-800 mb-4 relative">
                {previewImage ? (
                     <img className="w-full h-full object-cover" src={previewImage} alt="Preview" onError={(e) => {
                         (e.target as HTMLImageElement).src = "https://placehold.co/400?text=Invalid+Image"
                     }}/>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image preview
                    </div>
                )}
                {previewImage && (
                    <button onClick={() => {setPreviewImage(null); setImageUrl("")}} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70">
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            
            {/* Upload Area Visual */}
            <label className="mt-auto border-2 border-dashed border-[#e0dbe6] dark:border-slate-800 hover:border-[#8c2bee] dark:hover:border-[#8c2bee] rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center transition-colors cursor-pointer bg-[#f7f6f8]/50 dark:bg-[#191022]/30 hover:bg-[#8c2bee]/5 group">
              <div className="bg-white dark:bg-[#2a2035] rounded-full p-3 shadow-sm group-hover:scale-110 transition-transform duration-200">
                <CloudUpload className="h-8 w-8 text-[#8c2bee]" />
              </div>
              <div className="flex flex-col gap-1">
                 <p className="text-sm font-bold text-[#141118] dark:text-white">Or upload local file</p>
                <p className="text-xs text-[#756189] dark:text-gray-400">Preview only (no persisted storage)</p>
              </div>
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AddProductPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#8c2bee]" /></div>}>
            <AddProductForm />
        </Suspense>
    )
}
