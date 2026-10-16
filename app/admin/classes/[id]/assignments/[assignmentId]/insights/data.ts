export type Tone = "rose" | "amber" | "blue" | "green" | "sky" | "violet" | "red";

export const barTones: Record<Tone, string> = {
  rose: "bg-rose-400",
  amber: "bg-amber-600",
  blue: "bg-blue-700",
  green: "bg-green-600",
  sky: "bg-sky-700",
  violet: "bg-violet-500",
  red: "bg-red-500",
};

export type ScoreBucket = {
  range: string;
  count: number;
  tone: Tone;
};

export type ErrorPattern = {
  label: string;
  students: number;
  tone: Tone;
};

export type InsightsData = {
  averageScore: number | null;
  scoreDelta: number | null;
  averageMinutes: number | null;
  timeRange: string | null;
  buckets: ScoreBucket[];
  patterns: ErrorPattern[];
};

const insights: Record<string, InsightsData> = {
  "1": {
    averageScore: 76,
    scoreDelta: 6,
    averageMinutes: 12,
    timeRange: "7–21 menit",
    buckets: [
      { range: "0–55", count: 2, tone: "rose" },
      { range: "56–70", count: 5, tone: "amber" },
      { range: "71–85", count: 10, tone: "blue" },
      { range: "86–100", count: 7, tone: "green" },
    ],
    patterns: [
      { label: "Bukti belum mendukung klaim", students: 11, tone: "sky" },
      { label: "Sebab dan akibat tertukar", students: 8, tone: "violet" },
      { label: "Memilih distractor", students: 5, tone: "red" },
    ],
  },
  "2": {
    averageScore: null,
    scoreDelta: null,
    averageMinutes: null,
    timeRange: null,
    buckets: [
      { range: "0–55", count: 0, tone: "rose" },
      { range: "56–70", count: 0, tone: "amber" },
      { range: "71–85", count: 0, tone: "blue" },
      { range: "86–100", count: 0, tone: "green" },
    ],
    patterns: [],
  },
  "3": {
    averageScore: 82,
    scoreDelta: 3,
    averageMinutes: 14,
    timeRange: "9–25 menit",
    buckets: [
      { range: "0–55", count: 1, tone: "rose" },
      { range: "56–70", count: 3, tone: "amber" },
      { range: "71–85", count: 14, tone: "blue" },
      { range: "86–100", count: 12, tone: "green" },
    ],
    patterns: [
      { label: "Bukti belum mendukung klaim", students: 6, tone: "sky" },
      { label: "Sebab dan akibat tertukar", students: 4, tone: "violet" },
    ],
  },
};

export function getInsights(assignmentId: string): InsightsData | null {
  return insights[assignmentId] ?? null;
}