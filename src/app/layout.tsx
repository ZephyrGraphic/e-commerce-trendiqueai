import type { Metadata } from "next";
import { Fredoka, Noto_Sans, Baloo_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Trendique - Belanja Fashion Tanpa Drama",
  description: "Mau Belanja Tanpa Drama? Gaskeun ke Trendique! Sekali klik, langsung happy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${notoSans.variable} ${baloo.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <BottomNav />
          <FloatingAIButton />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
