import type { AssignmentStatus } from "../data";

export type FlowType = "klaim" | "fakta" | "sebab" | "akibat" | "bukti" | "pengecoh";

export const flowStyles: Record<FlowType, { label: string; chip: string }> = {
  klaim: { label: "Klaim", chip: "bg-emerald-100 text-emerald-700" },
  fakta: { label: "Fakta", chip: "bg-blue-100 text-blue-700" },
  sebab: { label: "Sebab", chip: "bg-orange-100 text-amber-700" },
  akibat: { label: "Akibat", chip: "bg-violet-100 text-violet-700" },
  bukti: { label: "Bukti", chip: "bg-rose-100 text-rose-500" },
  pengecoh: { label: "Pengecoh", chip: "bg-sky-100 text-sky-700" },
};

export type AssignmentDetail = {
  id: number;
  title: string;
  className: string;
  status: AssignmentStatus;
  publishedAt: string | null;
  endsAt: string;
  submitted: number;
  total: number;
  averageScore: number | null;
  scoreNote: string;
  averageTime: string | null;
  timeNote: string;
  flow: FlowType[];
  totalBlocks: number;
  requiredRelations: number;
  distractors: number;
};

const details: AssignmentDetail[] = [
  {
    id: 1,
    title: "Mengapa Banjir Terjadi?",
    className: "IPA 8A",
    status: "aktif",
    publishedAt: "20 Mei",
    endsAt: "hari ini, 20.00",
    submitted: 25,
    total: 32,
    averageScore: 76,
    scoreNote: "Naik 6 poin dari tugas lalu",
    averageTime: "12 mnt",
    timeNote: "Rentang 7–21 menit",
    flow: ["klaim", "fakta", "sebab", "akibat", "bukti", "pengecoh"],
    totalBlocks: 8,
    requiredRelations: 3,
    distractors: 2,
  },
  {
    id: 2,
    title: "Menjaga Ekosistem Mangrove",
    className: "Bahasa 7B",
    status: "draft",
    publishedAt: null,
    endsAt: "18 Mei 2025",
    submitted: 0,
    total: 28,
    averageScore: null,
    scoreNote: "Belum ada pengerjaan",
    averageTime: null,
    timeNote: "Belum ada pengerjaan",
    flow: ["klaim", "fakta", "sebab", "akibat", "bukti", "pengecoh"],
    totalBlocks: 8,
    requiredRelations: 3,
    distractors: 2,
  },
  {
    id: 3,
    title: "Siklus Air di Sekitar Kita",
    className: "IPA 8A",
    status: "selesai",
    publishedAt: "3 Mei",
    endsAt: "10 Mei 2025",
    submitted: 30,
    total: 32,
    averageScore: 82,
    scoreNote: "Naik 3 poin dari tugas lalu",
    averageTime: "14 mnt",
    timeNote: "Rentang 9–25 menit",
    flow: ["klaim", "fakta", "sebab", "akibat"],
    totalBlocks: 6,
    requiredRelations: 2,
    distractors: 1,
  },
];

export function getAssignmentDetail(id: string): AssignmentDetail | null {
  return details.find((d) => String(d.id) === id) ?? null;
}