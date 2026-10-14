# Kritika

> **Evidence Detective Mission** — platform pembelajaran yang membantu siswa membangun pemahaman bacaan melalui penyusunan klaim, bukti, sebab, dan akibat secara visual.

Kritika adalah aplikasi web berbasis **Next.js + TypeScript** yang mengubah dokumen atau artikel menjadi aktivitas membaca aktif. Guru mengunggah materi, AI membantu membuat draft misi dan blok pembelajaran, lalu siswa menyelesaikan misi investigasi dengan menyusun *Evidence Chain*.

## Problem Statement

Latihan membaca konvensional sering hanya menilai jawaban akhir. Guru dapat melihat bahwa siswa menjawab salah, tetapi belum selalu mengetahui penyebabnya:

- apakah siswa tidak memahami fakta;
- apakah siswa memilih bukti yang tidak relevan;
- apakah siswa tertukar dalam memahami sebab dan akibat;
- atau apakah siswa menerima klaim yang tidak didukung teks.

Kritika membantu siswa menunjukkan proses berpikirnya dan membantu guru melihat pola kesalahan kelas.

## Key Features

### 1. AI Assignment Generator

Guru mengunggah PDF berbasis teks, DOCX, atau menempelkan artikel. AI membantu menghasilkan draft:

- mission brief;
- learning goal;
- claim block;
- fact block;
- cause block;
- effect block;
- evidence block;
- logic trap / distractor;
- relasi antarblok.

Guru tetap dapat meninjau, mengedit, menghapus, atau menambahkan blok sebelum assignment dipublikasikan.

### 2. Visual Evidence Chain

Siswa menyusun blok menjadi rantai alasan:

```text
Claim
  ↓ didukung oleh
Evidence
  ↓ menjelaskan
Cause / Effect
```

Pada desktop, siswa dapat menggunakan drag-and-drop berbasis React Flow. Pada mobile, tersedia mode *tap-to-place* agar pengalaman tetap mudah digunakan.

### 3. Logic Trap Challenge

Setelah menyusun evidence chain, siswa menguji klaim yang berpotensi menyesatkan.

Contoh:

> “Banjir selalu hanya disebabkan oleh hujan.”

Siswa memilih apakah klaim tersebut:

- didukung oleh teks;
- tidak cukup bukti;
- bertentangan dengan teks;
- tidak dibahas dalam teks.

### 4. Teacher Insight Dashboard

Guru dapat melihat:

- jumlah siswa yang mulai dan menyelesaikan assignment;
- rata-rata skor;
- jenis kesalahan paling umum;
- bukti yang paling sering salah;
- kesalahan hubungan sebab-akibat;
- contoh jawaban siswa.

## User Flow

### Teacher Flow

```text
Teacher Dashboard
    ↓
Create Class
    ↓
Upload / Paste Material
    ↓
Generate Mission with AI
    ↓
Review AI Draft
    ↓
Publish Assignment
    ↓
Monitor Submissions
    ↓
View Class Insights
```

### Student Flow

```text
Join Class
    ↓
Open Mission
    ↓
Read Evidence
    ↓
Collect Blocks
    ↓
Build Evidence Chain
    ↓
Solve Logic Trap
    ↓
Receive Feedback
    ↓
Case Solved
```

<!-- ## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Routing | Next.js App Router |
| Server state | TanStack Query |
| HTTP client | Axios |
| Form | React Hook Form |
| Validation | Zod |
| Visual canvas | React Flow (`@xyflow/react`) |
| Icons | Lucide React |
| Notifications | Sonner |
| Local UI state | Zustand |
| Charts | Recharts | -->

<!-- ## Project Structure

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── (teacher)/
│   ├── (student)/
│   ├── api/
│   ├── layout.tsx
│   ├── globals.css
│   └── providers.tsx
│
├── features/
│   ├── auth/
│   ├── classes/
│   ├── documents/
│   ├── missions/
│   ├── mission-workspace/
│   ├── submissions/
│   ├── insights/
│   └── dashboard/
│
├── components/
│   ├── ui/
│   ├── layouts/
│   └── shared/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── constants/
│   └── utils/
│
├── hooks/
├── stores/
├── types/
└── middleware.ts
``` -->

<!-- ## Getting Started

### Prerequisites

- Node.js 20 LTS atau lebih baru
- npm 10 atau lebih baru
- Backend API Kritika
- API key LLM provider untuk fitur generate mission dan feedback

### Installation

1. Clone repository:

```bash
git clone [https://github.com/](https://github.com/)<username>/kritika.git
cd kritika
```

2. Install dependencies:

```bash
npm install
```

3. Buat file environment:

```bash
cp .env.example .env.local
```

4. Isi environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Kritika
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_LLM_PROVIDER=openai
LLM_API_KEY=your_llm_api_key
LLM_MODEL=gpt-4o-mini
```

5. Jalankan development server:

```bash
npm run dev
```

6. Buka aplikasi:

```text
http://localhost:3000
``` -->
<!-- 
## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Menjalankan aplikasi dalam mode development |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan production build |
| `npm run lint` | Menjalankan ESLint |
| `npm run type-check` | Menjalankan TypeScript type checking | -->

<!-- ## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Base URL backend API |
| `NEXT_PUBLIC_APP_NAME` | No | Nama aplikasi yang ditampilkan |
| `NEXT_PUBLIC_APP_URL` | No | URL aplikasi frontend |
| `NEXT_PUBLIC_LLM_PROVIDER` | No | Provider LLM yang digunakan |
| `LLM_API_KEY` | Yes | API key LLM provider |
| `LLM_MODEL` | No | Model LLM yang digunakan | -->

## Core Concepts

### Evidence Detective Mission

Setiap assignment dikemas sebagai misi investigasi.

Contoh:

> **Kasus #001: Misteri Banjir Kota Arunika**  
> Temukan penyebab banjir dan buktikan jawabanmu menggunakan informasi dari teks.

### Block Types

| Block | Description |
|---|---|
| Claim | Kesimpulan atau gagasan utama |
| Fact | Informasi yang dinyatakan langsung oleh teks |
| Cause | Penyebab atau faktor pemicu |
| Effect | Akibat atau dampak |
| Evidence | Kutipan atau data yang mendukung klaim |
| Distractor | Klaim yang tidak cukup didukung atau terlalu luas |

### Relation Types

| Relation | Description |
|---|---|
| `supports` | Mendukung sebuah klaim |
| `evidence_for` | Menjadi bukti untuk sebuah klaim |
| `causes` | Menyebabkan sebuah akibat |
| `contributes_to` | Berkontribusi pada sebuah akibat |
| `contradicts` | Bertentangan dengan klaim |

## AI Principles

Kritika menerapkan prinsip *human-in-the-loop*:

1. AI membuat draft mission dan blok pembelajaran.
2. Guru meninjau dan mengedit draft.
3. Backend melakukan scoring berbasis aturan deterministik.
4. AI hanya membantu menyusun feedback dalam bahasa yang mudah dipahami siswa.
5. AI tidak digunakan untuk mendiagnosis kemampuan siswa.

<!-- ## MVP Scope

### Included

- Landing page
- Login dan register
- Teacher dashboard
- Class management
- Document upload / paste
- AI mission generation
- Teacher review
- Publish assignment
- Student mission workspace
- Evidence chain builder
- Logic trap challenge
- Feedback
- Teacher insight dashboard -->

<!-- ### Not Included Yet

- Multi-document reasoning
- OCR untuk tulisan tangan
- Google Classroom integration
- Dapodik / e-Rapor integration
- Leaderboard
- Real-time collaboration
- Chatbot bebas
- Avatar customization
- Advanced analytics -->

<!-- ## Roadmap

- [x] Landing page
- [x] Authentication
- [ ] Teacher dashboard
- [ ] Class management
- [ ] Document upload
- [ ] AI mission generation
- [ ] Teacher review
- [ ] Student mission workspace
- [ ] Evidence chain builder
- [ ] Logic trap challenge
- [ ] Feedback system
- [ ] Teacher insight dashboard
- [ ] Badge system
- [ ] Multi-document support
- [ ] Accessibility improvements -->

<!-- ## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login pengguna |
| `POST` | `/api/auth/register` | Registrasi pengguna |
| `GET` | `/api/classes` | Mengambil daftar kelas |
| `POST` | `/api/classes` | Membuat kelas |
| `POST` | `/api/classes/:id/members` | Menambahkan siswa ke kelas |
| `POST` | `/api/documents` | Mengunggah dokumen |
| `POST` | `/api/missions/:id/generate` | Membuat draft mission dengan AI |
| `GET` | `/api/missions/:id` | Mengambil detail mission |
| `POST` | `/api/missions/:id/publish` | Mempublikasikan mission |
| `POST` | `/api/missions/:id/submissions` | Mengirim jawaban siswa |
| `GET` | `/api/submissions/:id` | Mengambil hasil submission |
| `GET` | `/api/missions/:id/insights` | Mengambil insight kelas | -->

## Design Principles

1. **Evidence over guessing** — siswa harus menunjukkan bukti dari teks.
2. **Teacher-in-control** — AI membuat draft, guru memvalidasi.
3. **Simple before clever** — satu alur belajar yang jelas lebih penting daripada banyak fitur.
4. **Safe feedback** — sistem mengoreksi jawaban tanpa menghakimi siswa.
5. **Accessible by default** — warna, ikon, label, dan target sentuh dirancang agar mudah digunakan.

<!-- ## Contributing

Kontribusi bersifat internal untuk tim Kritika.

1. Buat branch baru dari `main`.
2. Gunakan nama branch yang deskriptif, misalnya `feat/student-evidence-chain`.
3. Pastikan `npm run lint` dan `npm run type-check` lulus.
4. Buat pull request dengan deskripsi perubahan yang jelas.

## Team

- Product / Research
- UI/UX Design
- Frontend Development
- Backend Development -->
- AI / Data

## License

Proyek ini dibuat oleh untuk kebutuhan hackathon. Lisensi akan ditentukan setelah fase pengembangan selesai.