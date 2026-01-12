# Trendique - Modern E-Commerce Platform

Trendique is a premium e-commerce frontend built with **Next.js 16**, **Tailwind CSS 4**, and **Shadcn UI**. Designed to offer a seamless, responsive, and aesthetically pleasing shopping experience.

![Trendique Hero](/public/images/shopping-illustration.png)

## 👥 Tim Pengembang (Kelompok)

Proyek ini disusun dan dikembangkan oleh tim solid dengan pembagian peran sebagai berikut:

| Nama Anggota | Peran |
| :--- | :--- |
| **Pangestu Aprizaldi** | Project Manager |
| **Etheldreda Maria Hervem Pita Wea** | Sekretaris |
| **Dea Tiara** | UI/UX Designer |
| **M. Z. Haikal Hamdani** | Web Developer |
| **Siti Rismawati** | System Analyst |
| **Lutpandea Putra Sutriyana** | Quality Assurance |

---

## 🏢 Identitas Perusahaan

![Logo PT. AURESTLUMADE DIGITAL](/public/images/company-logo.jpg)

### **PT. AURESTLUMADE DIGITAL**
*"Cahaya Emas untuk Dunia Digital"*

**Makna Filosofis:**
Aurestlumade memiliki arti cahaya emas yang dibuat untuk dunia digital. Kami menawarkan karya digital bernilai tinggi, ibarat cahaya emas di tengah pesatnya perkembangan teknologi.

### **Filosofi Logo**
*   **Bentuk Huruf "A"**: Inisial Aurestlumade yang berdiri tegak, melambangkan pondasi kuat, ambisi tinggi, dan awal yang kokoh.
*   **Garis & Titik Digital**: Representasi sirkuit digital dan aliran data. Menandakan bahwa kami bergerak menyambungkan ide menjadi solusi inovatif.
*   **Gradasi Emas ke Hitam**: Transformasi dari ide cemerlang (cahaya emas) menuju realisasi yang solid, tegas, dan stabil (hitam).
*   **Lingkaran Emas & Hitam**: Simbol fokus dan pusat inovasi, di mana inti dari setiap karya adalah nilai positif.

> *Teknologi bukan sekadar alat, tapi juga jalan untuk menyebarkan kebaikan dan pencerahan bagi banyak orang.*

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Font**: Fredoka (Headings) & Noto Sans (Body)

## 🚀 Fitur Utama

*   **Responsive UI (Web-First)**: Tampilan optimal di desktop dan mobile.
*   **Chat AI Assistant ("Query")**: Fitur chat cerdas dengan widget floating yang interaktif.
*   **Manajemen Profil**: Edit profil, alamat (popup modal), dan riwayat pesanan.
*   **Mock Authentication**: Simulasi Login & Register yang mulus.
*   **Keranjang & Checkout**: Flow belanja lengkap dari add-to-cart hingga simulasi pembayaran.

## � Spesifikasi Fungsional (Functional Requirements)

Berikut adalah daftar kebutuhan fungsional sistem Trendique yang telah disepakati:

| No | Deskripsi Fungsionalitas | Prioritas | Status Implementasi |
| :--- | :--- | :--- | :--- |
| 1 | Menampilkan halaman utama (Home) | **Must** | ✅ Implemented |
| 2 | Input Email, Password, Username, Alamat, No. Telp | **Must** | ✅ Implemented |
| 3 | Menampilkan halaman Login pembeli | **Must** | ✅ Implemented |
| 4 | Menampilkan halaman Daftar pembeli | **Must** | ✅ Implemented |
| 5 | Validasi Email dan Password saat Login | **Must** | ✅ Implemented (Mock) |
| 6 | Update password dengan verifikasi OTP | **Must** | ⚠️ Partial (Phone OTP UI) |
| 7 | Halaman Data Akun (Profil) | **Must** | ✅ Implemented |
| 8 | Informasi Website Trendique | **Must** | ✅ Implemented |
| 9 | Halaman Room Chat AI "Que/ry" | **Must** | ✅ Implemented |
| 10 | Integrasi Produk dengan rekomendasi AI | **Must** | ✅ Implemented (Mock) |
| 11 | Analisis Sentimen Review oleh AI | **Must** | 📝 Planned |
| 12 | Pencarian Produk (Teks, Gambar, Suara) | **Must** | ⚠️ Partial (Text Verified) |
| 13 | AI Menjawab pertanyaan & rekomendasi | **Must** | ✅ Implemented (Gemini API) |
| 14 | Kuis Interaktif & Reward oleh AI | **Must** | 📝 Planned |
| 15 | Menampilkan Detail Produk | **Must** | ✅ Implemented |
| 16 | Halaman Kategori Produk | **Must** | ✅ Implemented |
| 17 | Menyimpan produk ke Keranjang | **Must** | ✅ Implemented |
| 18 | Menampilkan Detail Pesanan | **Must** | ✅ Implemented |
| 19 | Menampilkan Total Harga | **Must** | ✅ Implemented |
| 20 | Metode Pembayaran (COD/Transfer) | **Must** | ✅ Implemented (UI) |
| 21 | Menampilkan Kode Virtual Account (VA) | **Must** | ✅ Implemented (Mock) |
| 22 | Mengirimkan Faktur Pembayaran | **Must** | 📝 Planned |
| 23 | Mencetak Faktur Pembayaran | **Must** | 📝 Planned |
| 24 | Notifikasi Pengemasan Pesanan | **Must** | ✅ Implemented |
| 25 | Notifikasi Pengiriman Pesanan | **Must** | ✅ Implemented |
| 26 | Mengakses Riwayat Pesanan | **Must** | ✅ Implemented |
| 27 | Logout (Mengakhiri Sesi) | **Must** | ✅ Implemented |

## �💻 Cara Menjalankan Project

Pastikan Node.js sudah terinstall di komputer Anda.

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/username/trendique.git
    cd trendique
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

4.  **Buka di browser:**
    Kunjungi [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

Project ini siap untuk dideploy ke [Vercel](https://vercel.com/new).

1.  Push kode ke GitHub.
2.  Import project di Vercel.
3.  **Tambahkan Environment Variables**:
    *   `DATABASE_URL`: Connection string Supabase "Transaction" (Port 6543)
    *   `DIRECT_URL`: Connection string Supabase "Session" (Port 5432)
    *   `BETTER_AUTH_SECRET`: Generate random hash
    *   `BETTER_AUTH_URL`: URL deploy Vercel (e.g. `https://trendique.vercel.app`)
4.  Klik **Deploy**.

---
&copy; 2024 - 2026 PT. AURESTLUMADE DIGITAL. All rights reserved.
