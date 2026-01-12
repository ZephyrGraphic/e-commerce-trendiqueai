"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, X, Loader2 } from "lucide-react";
import { FormattedTime } from "@/components/FormattedTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Halo! Aku Query, asisten pribadimu. Ada yang bisa aku bantu untuk mencari outfit terbaikmu hari ini? ✨",
    timestamp: new Date(),
  },
];

interface ChatInterfaceProps {
    isMobile?: boolean; // If true, rendering full page style. If false, widget style.
    onClose?: () => void;
    className?: string;
}

export function ChatInterface({ isMobile = false, onClose, className }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgContent = inputText;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMsgContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsgContent }),
        });

        const data = await res.json();
        
        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: "ai",
            content: data.content || "Maaf, aku lagi bingung nih. Coba lagi ya!",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
        console.error("Failed to send message", error);
        const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: "ai",
            content: "Oops, ada gangguan jaringan. Cek koneksi kamu ya! 📶",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className={cn("flex flex-col bg-gray-50 overflow-hidden relative border-border", 
        !isMobile && "h-full w-full rounded-2xl shadow-2xl border", // Widget styles
        isMobile && "h-screen w-full max-w-2xl mx-auto shadow-2xl border-x", // Fullpage styles
        className
    )}>
      {/* Header */}
      <header className={cn("bg-primary p-4 text-white shadow-md flex items-center justify-between shrink-0")}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-white">
                <Image src="/images/mascot.png" alt="Query AI" width={40} height={40} className="w-full h-full object-cover" />
             </div>
            <div>
              <h1 className="font-fredoka text-xl font-bold">Query AI</h1>
              <p className="text-xs text-white/80 font-noto flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse my-auto inline-block"></span>
                Online
              </p>
            </div>
          </div>
          {/* Close button for widget mode */}
          {!isMobile && onClose && (
             <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
                 <X className="w-5 h-5" />
             </Button>
          )}
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-gray-200 bg-white items-center justify-center flex shadow-sm">
              {msg.role === "ai" ? (
                 <Image src="/images/mascot.png" alt="Query" width={32} height={32} className="w-full h-full object-cover" />
              ) : (
                 <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback>U</AvatarFallback>
                 </Avatar>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm font-noto shadow-sm ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none prose prose-sm max-w-none"
              }`}
            >
              {msg.role === "ai" ? (
                <ReactMarkdown 
                    components={{
                        a: ({node, ...props}) => <a {...props} className="text-blue-600 underline font-bold hover:text-blue-800" target="_blank" />
                    }}
                >
                    {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
              <div className={`text-[10px] mt-1 opacity-70 ${msg.role === "user" ? "text-right text-white/80" : "text-left text-gray-400"}`}>
                <FormattedTime timestamp={msg.timestamp} />
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-gray-200 bg-white p-1 shadow-sm">
                 <Image src="/images/mascot.png" alt="Query" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-border shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanya soal outfit..."
            className="flex-1 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-primary"
          />
          <Button type="submit" size="icon" className="rounded-full w-10 h-10 shrink-0" disabled={!inputText.trim() || isTyping}>
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
