<div align="center">
  <img src="public/readme/logo.png" alt="Logo Kritika" width="220" />

  <p>"Baca, Tautkan, Buktikan"</p>
</div>

---

## Tentang Kritika

Kritika adalah aplikasi web berbasis Next.js dan TypeScript yang dirancang untuk membantu siswa SD akhir hingga SMP mengembangkan pemahaman bacaan dan kemampuan berpikir kritis.

Melalui konsep *Evidence Detective Mission*, materi pembelajaran dikemas menjadi misi investigasi. Siswa membaca teks, menemukan informasi penting, menyusun hubungan antara klaim, bukti, sebab, dan akibat melalui blok visual, lalu menguji apakah suatu klaim benar-benar didukung oleh teks.

Bagi guru, Kritika membantu menyiapkan aktivitas pembelajaran dengan dukungan AI dan menampilkan pola kesalahan siswa. Dengan demikian, guru tidak hanya melihat jawaban akhir, tetapi juga hubungan alasan dan bukti yang dibangun siswa.

## Fitur Utama

### 1. AI Assignment Generator

Mengubah materi yang diunggah guru menjadi draft aktivitas membaca interaktif dengan bantuan AI. Sistem membantu menyusun misi investigasi, tujuan pembelajaran, blok informasi, serta tantangan untuk menguji pemahaman siswa terhadap teks.

Blok yang dihasilkan mencakup klaim, fakta, sebab, akibat, dan bukti yang merujuk pada materi sumber. Guru dapat meninjau, mengedit, menghapus, atau menambahkan blok sebelum assignment dipublikasikan. Dengan pendekatan ini, AI membantu proses persiapan materi, sementara kendali atas konten pembelajaran tetap berada di tangan guru.

### 2. Visual Evidence Chain

Membantu siswa membangun alasan melalui penyusunan blok klaim, bukti, sebab, dan akibat secara visual. Siswa membaca materi, memilih informasi yang relevan, lalu menghubungkannya untuk menunjukkan bagaimana suatu kesimpulan didukung oleh isi teks.

Aktivitas ini tidak hanya menanyakan “apa jawabannya”, tetapi juga “bukti mana yang mendukungnya” dan “bagaimana informasi tersebut saling berhubungan”. Susunan blok menjadi representasi penalaran siswa yang dapat ditinjau oleh guru, bukan sekadar jawaban akhir.

### 3. Logic Trap Challenge

Mengajak siswa menguji klaim yang terlihat meyakinkan, tetapi belum tentu sesuai dengan materi. Tantangan dapat berupa kesimpulan yang terlalu luas, hubungan sebab-akibat yang keliru, atau pernyataan yang tidak memiliki bukti memadai.

Siswa menentukan apakah klaim tersebut didukung oleh teks, tidak cukup bukti, bertentangan dengan teks, atau tidak dibahas. Setelah menjawab, siswa menerima umpan balik dan petunjuk untuk meninjau kembali informasi yang relevan. Tujuannya adalah membiasakan siswa memeriksa dasar suatu pernyataan sebelum menerima atau menolaknya.

### 4. Teacher Insight Dashboard

Menyajikan ringkasan hasil pengerjaan siswa untuk setiap assignment, mulai dari progres penyelesaian dan skor hingga kategori kesalahan yang muncul. Guru dapat melihat apakah siswa mengalami kesulitan memahami klaim, memilih bukti, menghubungkan sebab-akibat, atau mengevaluasi pernyataan dalam Logic Trap Challenge.

Selain ringkasan kelas, guru dapat meninjau jawaban individual untuk memahami hubungan blok yang disusun siswa. Informasi ini membantu guru menentukan tindak lanjut yang lebih terarah, seperti membahas kembali bukti yang sering disalahartikan atau memberikan latihan tambahan pada hubungan logika tertentu.

---

## Teknologi & Dependensi

### Framework & Runtime

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3.6 | App Router, SSR, file-based routing |
| [React](https://react.dev) | 19.2.8 | UI library utama |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety di seluruh codebase |

### Dependencies

| Package | Versi | Keterangan |
|---|---|---|
| [@xyflow/react](https://xyflow.com) | ^12.12.0 | Node-based diagram untuk Visual Evidence Chain |
| [framer-motion](https://www.framer.com/motion) | ^14.3.0 | Animasi dan transisi halaman landing |
| [lucide-react](https://lucide.dev) | ^1.55.0 | Icon set konsisten di seluruh UI |

### Dev Dependencies

| Package | Versi | Keterangan |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first CSS framework |
| [@tailwindcss/postcss](https://tailwindcss.com) | ^4 | PostCSS plugin untuk Tailwind v4 |
| [ESLint](https://eslint.org) | ^9 | Linting dengan konfigurasi Next.js |

---

## Tipografi & Desain

### Tipografi

| Peran | Font | Keterangan |
|---|---|---|
| **Font Utama (body & UI)** | [Guton](public/fonts/) | Font custom lokal, tersedia dalam 6 weight: Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900) |
| **Font Fallback** | Geist Sans | Font Google via `next/font`, dimuat sebagai CSS variable `--font-geist-sans` |
| **Font Monospace** | Geist Mono | Font Google via `next/font`, dimuat sebagai CSS variable `--font-geist-mono` |

### Palet Warna

| Token | Nilai | Penggunaan |
|---|---|---|
| `--primary` | `#1d4ed8` | Tombol utama, aksen biru |
| `--primary-hover` | `#1e40af` | State hover tombol utama |
| `--background` | `#f7f7f7` | Latar belakang halaman |
| `--foreground` | `#0a0a0a` | Teks utama |
| `--muted` | `#6b7280` | Teks sekunder / placeholder |
| `--border` | `#9ca3af` | Garis batas input & komponen |
| `--panel-from` | `#3b82f6` | Warna awal panel kanan auth |
| `--panel-to` | `#1d4ed8` | Warna akhir panel kanan auth |

### Radius & Shadow

| Token | Nilai | Penggunaan |
|---|---|---|
| `--radius-field` | `0.5rem` | Input, select, textarea |
| `--radius-panel` | `2rem` | Panel gambar di halaman auth |
| `--shadow-glow` | `0 4px 16px rgba(29,78,216,0.35)` | Efek glow tombol primary |
---
Kritika dikembangkan untuk kebutuhan hackathon dengan tujuan menghadirkan pembelajaran membaca yang lebih aktif dan bermakna. Siswa tidak hanya menemukan jawaban, tetapi belajar menjelaskan mengapa jawaban tersebut dapat dipercaya.

---
