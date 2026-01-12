"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal, Tag, Loader2, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { getVouchers, createVoucher, deleteVoucher, updateVoucherStatus } from "@/app/actions/vouchers"
import { toast } from "sonner"
import { VoucherType } from "@prisma/client"

export default function VouchersPage() {
    const [vouchers, setVouchers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Form State
    const [code, setCode] = useState("")
    const [type, setType] = useState<VoucherType>("PERCENTAGE")
    const [amount, setAmount] = useState("")
    const [minPurchase, setMinPurchase] = useState("")

    useEffect(() => {
        fetchVouchers()
    }, [])

    const fetchVouchers = async () => {
        setLoading(true)
        const res = await getVouchers()
        if (res.success && res.data) {
            setVouchers(res.data)
        }
        setLoading(false)
    }

    const handleCreate = async () => {
        if (!code || !amount) {
            toast.error("Code and Amount are required")
            return
        }

        setSubmitting(true)
        // Default start date now, end date 30 days later for simplicity
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 30)

        const res = await createVoucher({
            code: code.toUpperCase(),
            discount: parseInt(amount),
            type,
            minPurchase: minPurchase ? parseInt(minPurchase) : 0,
            startDate,
            endDate,
            isActive: true
        })

        if (res.success) {
            toast.success("Voucher created successfully")
            setCode("")
            setAmount("")
            setMinPurchase("")
            fetchVouchers()
        } else {
            toast.error(res.error || "Failed to create voucher")
        }
        setSubmitting(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this voucher?")) return

        const res = await deleteVoucher(id)
        if (res.success) {
            toast.success("Voucher deleted")
            fetchVouchers()
        } else {
            toast.error("Failed to delete voucher")
        }
    }
    
    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
         const res = await updateVoucherStatus(id, !currentStatus)
         if (res.success) {
             toast.success(`Voucher ${!currentStatus ? 'activated' : 'deactivated'}`)
             fetchVouchers()
         } else {
             toast.error("Failed to update status")
         }
    }

  return (
    <div className="grid gap-6 md:grid-cols-3 font-manrope">
        <div className="md:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Vouchers</h1>
             </div>

            <div className="border rounded-md min-h-[300px] relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                    </div>
                ) : vouchers.length === 0 ? (
                    <div className="flex items-center justify-center h-48 text-muted-foreground">
                        No vouchers found
                    </div>
                ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Min Purchase</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <Tag className="h-4 w-4 text-orange-500" />
                            {voucher.code}
                        </TableCell>
                        <TableCell>
                            {voucher.type === "PERCENTAGE" ? `${voucher.discount}%` : `$${voucher.discount}`}
                        </TableCell>
                         <TableCell>
                            ${voucher.minPurchase}
                        </TableCell>
                        <TableCell>
                             <Badge 
                                variant={voucher.isActive ? "outline" : "secondary"}
                                className="cursor-pointer"
                                onClick={() => handleToggleStatus(voucher.id, voucher.isActive)}
                             >
                                {voucher.isActive ? "Active" : "Inactive"}
                             </Badge>
                        </TableCell>
                        <TableCell>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleToggleStatus(voucher.id, voucher.isActive)}>
                                    {voucher.isActive ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(voucher.id)}>
                                    Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                )}
            </div>
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create Voucher</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Code</label>
                        <Input 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            placeholder="e.g. DISCOUNT50" 
                            style={{ textTransform: "uppercase" }} 
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <Select value={type} onValueChange={(v) => setType(v as VoucherType)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Discount Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                                <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Amount</label>
                        <Input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            placeholder="0" 
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Minimum Purchase ($)</label>
                        <Input 
                            type="number" 
                            value={minPurchase} 
                            onChange={(e) => setMinPurchase(e.target.value)} 
                            placeholder="0" 
                        />
                    </div>
                    <Button onClick={handleCreate} disabled={submitting} className="w-full bg-orange-500 hover:bg-orange-600">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Voucher"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
