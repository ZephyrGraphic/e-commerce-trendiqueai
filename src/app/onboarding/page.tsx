"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: (user as any)?.phone || "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update user with phone and onboarding status
      await authClient.updateUser({
        phone: formData.phone,
        onboardingCompleted: true,
      } as any);

      // Navigate to homepage or profile
      router.push("/");
    } catch (error) {
      console.error("Onboarding failed:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-fredoka text-3xl text-primary">Selamat Datang!</h1>
          <p className="font-noto text-gray-500 mt-2">
            Silakan lengkapi data diri Anda untuk melanjutkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-noto text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
              required
              placeholder="Contoh: 08123456789"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-white rounded-lg font-bold font-fredoka text-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan & Lanjutkan"}
          </button>
        </form>
      </div>
    </div>
  );
}
