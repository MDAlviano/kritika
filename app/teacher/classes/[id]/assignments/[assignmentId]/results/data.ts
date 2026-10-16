export type StudentStatus = "selesai" | "mengerjakan" | "belum";

export type StudentResult = {
  id: number;
  name: string;
  status: StudentStatus;
  score: number | null;
  minutes: number | null;
};

export type ResultsData = {
  updatedNote: string;
  highest: { score: number; name: string } | null;
  average: number | null;
  scoreDelta: number | null;
  needSupport: number;
  students: StudentResult[];
};

export const statusStyles: Record<StudentStatus, { label: string; pill: string }> = {
  selesai: { label: "Selesai", pill: "bg-emerald-50 text-emerald-700" },
  mengerjakan: { label: "Mengerjakan", pill: "bg-amber-50 text-amber-700" },
  belum: { label: "Belum mulai", pill: "bg-neutral-100 text-neutral-500" },
};

const results: Record<string, ResultsData> = {
  "1": {
    updatedNote: "Terakhir diperbarui beberapa detik lalu.",
    highest: { score: 96, name: "Alya Putri" },
    average: 76,
    scoreDelta: 6,
    needSupport: 5,
    students: [
      { id: 1, name: "Alya Putri", status: "selesai", score: 96, minutes: 9 },
      { id: 2, name: "Bima Aditya", status: "selesai", score: 84, minutes: 12 },
      { id: 3, name: "Citra Lestari", status: "selesai", score: 76, minutes: 14 },
      { id: 4, name: "Damar Pratama", status: "selesai", score: 68, minutes: 18 },
      { id: 5, name: "Eka Nabila", status: "selesai", score: 88, minutes: 10 },
      { id: 6, name: "Farhan Rizki", status: "selesai", score: 58, minutes: 21 },
    ],
  },
  "2": {
    updatedNote: "Belum ada pengerjaan.",
    highest: null,
    average: null,
    scoreDelta: null,
    needSupport: 0,
    students: [],
  },
  "3": {
    updatedNote: "Terakhir diperbarui 10 Mei.",
    highest: { score: 91, name: "Alya Putri" },
    average: 82,
    scoreDelta: 3,
    needSupport: 2,
    students: [
      { id: 1, name: "Alya Putri", status: "selesai", score: 91, minutes: 11 },
      { id: 2, name: "Bima Aditya", status: "selesai", score: 88, minutes: 13 },
      { id: 3, name: "Citra Lestari", status: "selesai", score: 79, minutes: 15 },
    ],
  },
};

export function getResults(assignmentId: string): ResultsData | null {
  return results[assignmentId] ?? null;
}