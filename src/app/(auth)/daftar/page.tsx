"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DaftarPage() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const { register, loginWithGoogle, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData);
  };

  const handleGoogleSignIn = async () => {
    console.log("🔵 Daftar Page: handleGoogleSignIn clicked");
    await loginWithGoogle();
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-10 overflow-hidden">
      
      {/* Left Section - Content & Illustration (Desktop only) */}
      <section className="hidden lg:flex flex-col flex-1 max-w-2xl text-left space-y-6">
          <header className="mb-4">
             <h1 className="font-baloo font-normal text-primary text-5xl lg:text-[80px] leading-none text-shadow-logo">
              Trendique
            </h1>
          </header>
          
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
             <Image
              src="/images/shopping-illustration.png"
              alt="Trendique shopping illustration"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="pl-4 space-y-2">
            <p className="font-fredoka font-normal text-black text-2xl lg:text-3xl tracking-tight">
                Mau Belanja Tanpa Drama? Gaskeun ke Trendique!
            </p>
            <p className="font-fredoka font-normal text-black text-lg lg:text-xl text-muted-foreground">
                Sekali klik, langsung happy.
            </p>
          </div>
      </section>

      {/* Right Section - Registration Form */}
      <section className="w-full max-w-[600px] flex-1 animate-fade-up">
         {/* Mobile Header */}
         <div className="lg:hidden text-center mb-8">
            <h1 className="font-baloo font-normal text-primary text-5xl leading-none text-shadow-logo mb-6">
              Trendique
            </h1>
             <div className="relative w-full max-w-[250px] aspect-square mx-auto mb-6">
                <Image
                  src="/images/mascot.png"
                  alt="Trendique mascot"
                  fill
                  className="object-contain"
                />
             </div>
         </div>

        <div className="space-y-2 mb-6 text-center lg:text-left">
             <h2 className="font-fredoka font-normal text-black text-3xl lg:text-[45px]">
                Daftar sekarang
            </h2>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="font-noto text-black text-lg">
                Sudah punya akun?
                </span>
                <Link
                href="/login"
                className="font-noto text-primary text-lg hover:underline transition-all font-semibold"
                >
                Masuk
                </Link>
            </div>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full h-14 lg:h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors focus:scale-[0.98] active:scale-95 relative z-20 cursor-pointer"
        >
          <Image
            src="/images/google-logo.svg"
            alt=""
            width={28}
            height={28}
            className="aspect-square object-contain"
          />
          <span className="font-baloo text-gray-700 text-xl">
            Google
          </span>
        </button>

        <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
            </div>
            <span className="relative bg-white px-2 text-muted-foreground font-baloo text-lg">
                atau
            </span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-noto text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="No. Telpon"
                required
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-noto text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-noto text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                minLength={8}
                className="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-5 font-noto text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
              />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/30 mt-4 active:scale-[0.98]"
          >
            <span className="font-fredoka text-white text-2xl">
              {isLoading ? "Mendaftar..." : "Daftar"}
            </span>
          </button>
        </form>
      </section>
    </div>
  );
}
