"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChatInterface } from "./ChatInterface";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function FloatingAIButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide on auth pages or if already on chat page (mobile only)
  if (["/login", "/daftar"].includes(pathname)) return null;
  if (pathname === "/chat-ai" && isMobile) return null;

  const handleClick = () => {
    if (isMobile) {
      router.push("/chat-ai");
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Desktop Chat Window */}
      {!isMobile && (
        <div className={cn(
            "fixed bottom-24 right-6 z-50 w-[380px] h-[550px] transition-all duration-300 origin-bottom-right shadow-2xl rounded-2xl",
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}>
            <ChatInterface isMobile={false} onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className={cn(
            "fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 transition-all group animate-fade-in",
            isOpen && !isMobile && "scale-0 opacity-0" // Hide button when chat is open on desktop
        )}
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white shrink-0">
          <Image 
            src="/images/mascot.png" 
            alt="Query AI" 
            width={32} 
            height={32} 
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-fredoka font-medium pr-1 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Ask AI
        </span>
      </button>

        {/* Re-open button when chat is open (Desktop) - Optional, similar to Messenger's close/minimized state */}
        {/* For now, we use the button inside the header to close. To re-open after close, the original button reappears. */}
    </>
  );
}
