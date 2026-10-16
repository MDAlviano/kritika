export type Tone = "blue" | "rose" | "amber";
export type AssignmentStatus = "aktif" | "draft" | "selesai";

export type Assignment = {
  id: number;
  title: string;
  className: string;
  blocks: number;
  status: AssignmentStatus;
  deadline: string;
  submitted: number;
  total: number;
  average: number | null;
  tone: Tone;
};

// Warna ikon per kelas
export const toneStyles: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-700",
  rose: "bg-rose-100 text-rose-500",
  amber: "bg-orange-100 text-amber-700",
};

// Warna badge per status
export const statusStyles: Record<AssignmentStatus, { label: string; badge: string }> = {
  aktif: { label: "Aktif", badge: "bg-emerald-100 text-emerald-700" },
  draft: { label: "Draft", badge: "bg-orange-100 text-amber-700" },
  selesai: { label: "Selesai", badge: "bg-neutral-200 text-neutral-600" },
};

// Data contoh — ganti dengan data dari API/database
export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Mengapa Banjir Terjadi?",
    className: "IPA 8A",
    blocks: 8,
    status: "aktif",
    deadline: "Hari ini, 20.00",
    submitted: 25,
    total: 32,
    average: 74,
    tone: "blue",
  },
  {
    id: 2,
    title: "Menjaga Ekosistem Mangrove",
    className: "Bahasa 7B",
    blocks: 8,
    status: "draft",
    deadline: "18 Mei 2025",
    submitted: 0,
    total: 28,
    average: null,
    tone: "rose",
  },
  {
    id: 3,
    title: "Siklus Air di Sekitar Kita",
    className: "IPA 8A",
    blocks: 6,
    status: "selesai",
    deadline: "10 Mei 2025",
    submitted: 30,
    total: 32,
    average: 82,
    tone: "amber",
  },
];