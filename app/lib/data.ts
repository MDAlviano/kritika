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