export type Tone = "blue" | "rose" | "amber";

export const toneStyles: Record<
  Tone,
  { header: string; icon: string; bar: string; badge: string; soft: string }
> = {
  blue: {
    header: "bg-blue-100",
    icon: "text-blue-700",
    bar: "bg-blue-700",
    badge: "bg-blue-100 text-blue-700",
    soft: "bg-blue-100 text-blue-700",
  },
  rose: {
    header: "bg-rose-100",
    icon: "text-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-100 text-rose-500",
    soft: "bg-rose-100 text-rose-500",
  },
  amber: {
    header: "bg-orange-50",
    icon: "text-amber-600",
    bar: "bg-amber-600",
    badge: "bg-orange-100 text-amber-700",
    soft: "bg-orange-100 text-amber-700",
  },
};

export const classes = [
  { id: 1, name: "IPA 8A", subject: "Ilmu Pengetahuan Alam", students: 32, progress: 78, tone: "blue" as Tone },
  { id: 2, name: "Bahasa 7B", subject: "Bahasa Indonesia", students: 28, progress: 64, tone: "rose" as Tone },
  { id: 3, name: "IPA 8B", subject: "Ilmu Pengetahuan Alam", students: 30, progress: 85, tone: "amber" as Tone },
];

export const tasks = [
  {
    id: 1,
    title: "Mengapa banjir terjadi?",
    category: "Literasi sains",
    blocks: 8,
    className: "IPA 8A",
    deadline: "Hari ini, 20.00",
    done: 25,
    total: 32,
    tone: "blue" as Tone,
  },
  {
    id: 2,
    title: "Menjaga ekosistem mangrove",
    category: "Bahasa Indonesia",
    blocks: 8,
    className: "Bahasa 7B",
    deadline: "Hari ini, 20.00",
    done: 18,
    total: 28,
    tone: "rose" as Tone,
  },
];

// ─── Class Detail Dummy Data ──────────────────────────────────────────────────

export type AssignmentStatus = "not_started" | "in_progress" | "done";
export type AssignmentBadge = "hari_ini" | "besok" | null;

export type Assignment = {
  id: number;
  title: string;
  description: string;
  deadlineLabel: string;
  badge: AssignmentBadge;
  status: AssignmentStatus;
  progress: number; // 0–100, only relevant when status === "in_progress"
};

export type ClassDetail = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  completedMissions: number;
  totalMissions: number;
  tone: Tone;
  assignments: Assignment[];
};

export const classDetails: ClassDetail[] = [
  {
    id: 1,
    name: "IPA 8A",
    subject: "Ilmu Pengetahuam Alam",
    teacher: "Bu Rani",
    students: 32,
    completedMissions: 3,
    totalMissions: 4,
    tone: "blue",
    assignments: [
      {
        id: 1,
        title: "Mengapa banjir terjadi?",
        description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
        deadlineLabel: "Hari ini, 20.00",
        badge: "hari_ini",
        status: "not_started",
        progress: 0,
      },
      {
        id: 2,
        title: "Menjaga Ekosistem Mangrove",
        description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
        deadlineLabel: "Besok, 20.00",
        badge: "besok",
        status: "in_progress",
        progress: 49,
      },
      {
        id: 3,
        title: "Siklus Air dan Kehidupan",
        description: "Identifikasi klaim dan temukan bukti pendukung dari teks",
        deadlineLabel: "3 hari lagi, 20.00",
        badge: null,
        status: "not_started",
        progress: 0,
      },
    ],
  },
  {
    id: 2,
    name: "BAHASA 7B",
    subject: "Bahasa Indonesia",
    teacher: "Bu Rani",
    students: 28,
    completedMissions: 2,
    totalMissions: 5,
    tone: "rose",
    assignments: [
      {
        id: 4,
        title: "Memahami Teks Argumentasi",
        description: "Temukan klaim utama dan bukti pendukung dalam teks",
        deadlineLabel: "Hari ini, 21.00",
        badge: "hari_ini",
        status: "in_progress",
        progress: 70,
      },
      {
        id: 5,
        title: "Paragraf Persuasif",
        description: "Susun bukti dan hubungkan klaim dalam paragraf persuasif",
        deadlineLabel: "Besok, 21.00",
        badge: "besok",
        status: "not_started",
        progress: 0,
      },
    ],
  },
  {
    id: 3,
    name: "IPA 8B",
    subject: "Ilmu Pengetahuan Alam",
    teacher: "Bu Rani",
    students: 30,
    completedMissions: 4,
    totalMissions: 4,
    tone: "amber",
    assignments: [
      {
        id: 6,
        title: "Fotosintesis dan Rantai Makanan",
        description: "Hubungkan sebab-akibat dalam proses fotosintesis",
        deadlineLabel: "Besok, 19.00",
        badge: "besok",
        status: "not_started",
        progress: 0,
      },
    ],
  },
];