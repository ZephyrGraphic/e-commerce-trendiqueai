"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO: Implement Google OAuth
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-8 p-6">
      {/* Login Card */}
      <div className="w-full max-w-[753px] bg-white border border-muted-foreground/30 shadow-[inset_0px_4px_0px_rgba(0,0,0,0.1)] rounded-[10px] p-8 lg:p-16 animate-fade-up">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <h1 className="font-fredoka font-normal text-black text-2xl lg:text-3xl">
            Masuk ke Trendique
          </h1>
          <Link
            href="/daftar"
            className="font-noto text-primary text-xl lg:text-[25px] hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            Daftar
          </Link>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email-input" className="sr-only">
              Email atau Nomor Telepon
            </label>
            <input
              id="email-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email/No.Telpon"
              required
              className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-noto text-lg text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              aria-label="Email atau Nomor Telepon"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/bantuan"
              className="font-fredoka text-primary text-lg hover:underline transition-all"
            >
              Butuh Bantuan?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all disabled:opacity-50 shadow-lg shadow-primary/30 active:scale-[0.98]"
            aria-label="Masuk"
          >
            <span className="font-fredoka text-white text-2xl">
              {isLoading ? "Memproses..." : "Masuk"}
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
            </div>
            <span className="relative bg-white px-2 text-muted-foreground font-baloo text-lg">
                atau masuk dengan
            </span>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-14 bg-secondary rounded-xl flex items-center justify-center gap-3 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-[#4285f4]/50 transition-all active:scale-[0.98]"
          aria-label="Masuk dengan Google"
        >
          <Image
            src="/images/google-logo.svg"
            alt=""
            width={28}
            height={28}
            className="aspect-square object-contain"
          />
          <span className="font-baloo text-muted-foreground text-xl">
            Google
          </span>
        </button>
      </div>

      {/* Mascot Image */}
      <div className="relative w-full max-w-[300px] lg:max-w-[423px] aspect-square">
        <Image
          src="/images/mascot.png"
          alt="Trendique mascot"
          fill
          className="object-contain animate-fade-in"
          priority
        />
      </div>
    </div>
  );
}
