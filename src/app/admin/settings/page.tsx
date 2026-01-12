"use client"

import { ChevronRight, Mail, ChevronDown, Info, Copy, RefreshCw, Save } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative font-manrope">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 scroll-smooth">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-[#756189] dark:text-slate-400">
              <Link href="/admin/dashboard" className="hover:text-[#8c2bee] transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#141118] dark:text-white font-semibold">Settings</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-black text-[#141118] dark:text-white tracking-tight">Store Settings</h1>
              <p className="text-[#756189] dark:text-slate-400 text-base max-w-2xl">Manage your store details, update your security preferences, and configure your API keys for developer access.</p>
            </div>
          </div>

          {/* Section 1: Store Profile */}
          <section className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8]/50 dark:bg-white/5">
              <h2 className="text-lg font-bold text-[#141118] dark:text-white">Store Profile</h2>
            </div>
            <div className="p-6 grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#141118] dark:text-white">Store Name</span>
                <input 
                  className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all placeholder:text-[#756189]/50" 
                  placeholder="e.g. My Store" 
                  type="text" 
                  defaultValue="Trendique Fashion"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#141118] dark:text-white">Support Email</span>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#756189] dark:text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all" 
                    placeholder="support@example.com" 
                    type="email" 
                    defaultValue="support@trendique.store"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-semibold text-[#141118] dark:text-white">Store Currency</span>
                <div className="relative">
                  <select className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#756189] pointer-events-none">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Section 2: Security & Login */}
          <section className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8]/50 dark:bg-white/5">
              <h2 className="text-lg font-bold text-[#141118] dark:text-white">Security & Login</h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#141118] dark:text-white">Admin Email (Read-only)</span>
                <input 
                  className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8] dark:bg-[#191022] text-[#756189] dark:text-slate-400 cursor-not-allowed opacity-75" 
                  readOnly 
                  type="email" 
                  value="admin@trendique.store"
                />
              </label>
              <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-[#e0dbe6]/50 dark:border-slate-800/50">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#141118] dark:text-white">Current Password</span>
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </label>
                <div className="hidden md:block"></div> {/* Spacer */}
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#141118] dark:text-white">New Password</span>
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all" 
                    placeholder="New password" 
                    type="password"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#141118] dark:text-white">Confirm New Password</span>
                  <input 
                    className="w-full h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#2a2035] text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all" 
                    placeholder="Confirm password" 
                    type="password"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Section 3: Developer API Keys */}
          <section className="bg-white dark:bg-[#1e1429] rounded-xl border border-[#e0dbe6] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8]/50 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#141118] dark:text-white">API Keys</h2>
              <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wider">Active</span>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex gap-3 items-start">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">Your secret API keys grant full access to your account. Keep them secure and never share them in client-side code.</p>
              </div>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#141118] dark:text-white">Public Key</span>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8] dark:bg-[#191022] text-[#756189] dark:text-slate-400 font-mono text-sm truncate" 
                      readOnly 
                      type="text" 
                      value="pk_live_51M0d9jK2lq98s7a1x2B3c4D5e6F7g8H9i0J"
                    />
                    <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#1e1429] hover:bg-[#f7f6f8] dark:hover:bg-white/5 text-[#756189] dark:text-slate-400 transition-colors cursor-pointer" title="Copy Public Key">
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#141118] dark:text-white">Secret Key</span>
                    <button className="text-xs font-medium text-[#8c2bee] hover:text-[#8c2bee]/80 transition-colors cursor-pointer">Reveal Key</button>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      className="flex-1 h-12 px-4 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-[#f7f6f8] dark:bg-[#191022] text-[#756189] dark:text-slate-400 font-mono text-sm" 
                      readOnly 
                      type="password" 
                      value="sk_live_super_secret_key_dont_share"
                    />
                    <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-[#1e1429] hover:bg-[#f7f6f8] dark:hover:bg-white/5 text-[#756189] dark:text-slate-400 transition-colors cursor-pointer" title="Copy Secret Key">
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </label>
              </div>
              <div className="pt-4 border-t border-[#e0dbe6] dark:border-slate-800">
                <button className="text-red-500 dark:text-red-400 text-sm font-bold hover:underline flex items-center gap-2 cursor-pointer">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate API Keys
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Sticky Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1e1429] border-t border-[#e0dbe6] dark:border-slate-800 p-4 md:px-10 flex justify-end gap-3 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button className="px-6 h-11 rounded-lg border border-[#e0dbe6] dark:border-slate-800 bg-white dark:bg-white/5 text-[#141118] dark:text-white text-sm font-bold hover:bg-[#f7f6f8] dark:hover:bg-white/10 transition-colors cursor-pointer">
            Cancel
        </button>
        <button className="px-8 h-11 rounded-lg bg-[#8c2bee] hover:bg-[#7a25d0] text-white text-sm font-bold shadow-md shadow-[#8c2bee]/25 transition-all flex items-center gap-2 cursor-pointer">
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
