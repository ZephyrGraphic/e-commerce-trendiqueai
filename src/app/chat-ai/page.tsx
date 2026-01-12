"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";

export default function ChatAIPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 
        This page acts as a wrapper for the ChatInterface in "Full Page" mode.
        It is primarily for mobile users or direct access.
      */}
      
      {/* Mobile-only Header (since ChatInterface has its own header, we might want to overlay or adjust) */}
      {/* However, for consistent "Page" feel, we might want a back button outside the ChatInterface on mobile */}
      
      <div className="md:hidden fixed top-4 left-4 z-50">
           <Link href="/" className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors text-white drop-shadow-md">
              <ArrowLeft className="w-6 h-6" />
           </Link>
      </div>

      <ChatInterface isMobile={true} />
    </div>
  );
}
