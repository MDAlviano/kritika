import type { Tone } from "../../../lib/data";

export type Assignment = {
  id: number;
  title: string;
  status: string;
  progress: number;
  tone: Tone;
};

export type StudentActivity = {
  id: number;
  initials: string;
  name: string;
  activity: string;
  online: boolean;
};

export type ClassDetail = {
  id: number;
  name: string;
  code: string;
  subject: string;
  tone: Tone;
  students: number;
  assignments: number;
  averageCompletion: number;
  averageScore: number;
  recentAssignments: Assignment[];
  recentStudents: StudentActivity[];
};

export const classDetails: Record<string, ClassDetail> = {
  "1": {
    id: 1,
    name: "IPA 8A",
    code: "IPA8-A24",
    subject: "Ilmu Pengetahuan Alam",
    tone: "blue",
    students: 25,
    assignments: 25,
    averageCompletion: 78,
    averageScore: 76,
    recentAssignments: [
      {
        id: 1,
        title: "Mengapa Banjir Terjadi?",
        status: "Aktif · Berakhir hari ini",
        progress: 78,
        tone: "blue",
      },
      {
        id: 2,
        title: "Siklus Air di Sekitar Kita",
        status: "Selesai · 18 Mei",
        progress: 92,
        tone: "rose",
      },
      {
        id: 3,
        title: "Perubahan Wujud Benda",
        status: "Selesai · 18 Mei",
        progress: 84,
        tone: "amber",
      },
    ],
    recentStudents: [
      { id: 1, initials: "AP", name: "Alya Putri", activity: "Aktif hari ini", online: true },
      { id: 2, initials: "BA", name: "Bima Aditya", activity: "Aktif hari ini", online: true },
      { id: 3, initials: "CL", name: "Citra Lestari", activity: "Aktif hari ini", online: true },
      { id: 4, initials: "DP", name: "Damar Pratama", activity: "Aktif kemarin", online: false },
    ],
  },
  "2": {
    id: 2,
    name: "Bahasa 7B",
    code: "BHS7-B18",
    subject: "Bahasa Indonesia",
    tone: "rose",
    students: 28,
    assignments: 18,
    averageCompletion: 64,
    averageScore: 72,
    recentAssignments: [
      { id: 1, title: "Menjaga Ekosistem Mangrove", status: "Aktif · Berakhir hari ini", progress: 64, tone: "rose" },
      { id: 2, title: "Menyusun Teks Eksplanasi", status: "Selesai · 17 Mei", progress: 81, tone: "blue" },
      { id: 3, title: "Mengenal Cerita Rakyat", status: "Selesai · 15 Mei", progress: 76, tone: "amber" },
    ],
    recentStudents: [
      { id: 1, initials: "NA", name: "Nadia Amalia", activity: "Aktif hari ini", online: true },
      { id: 2, initials: "RF", name: "Raka Fadillah", activity: "Aktif hari ini", online: true },
      { id: 3, initials: "SA", name: "Salsa Anindya", activity: "Aktif kemarin", online: false },
      { id: 4, initials: "ZP", name: "Zahra Putri", activity: "Aktif kemarin", online: false },
    ],
  },
  "3": {
    id: 3,
    name: "IPA 8B",
    code: "IPA8-B19",
    subject: "Ilmu Pengetahuan Alam",
    tone: "amber",
    students: 30,
    assignments: 21,
    averageCompletion: 85,
    averageScore: 81,
    recentAssignments: [
      { id: 1, title: "Perubahan Wujud Benda", status: "Aktif · Berakhir besok", progress: 85, tone: "amber" },
      { id: 2, title: "Sistem Pernapasan Manusia", status: "Selesai · 18 Mei", progress: 91, tone: "blue" },
      { id: 3, title: "Gaya dan Gerak", status: "Selesai · 16 Mei", progress: 88, tone: "rose" },
    ],
    recentStudents: [
      { id: 1, initials: "AR", name: "Aditya Rama", activity: "Aktif hari ini", online: true },
      { id: 2, initials: "KS", name: "Kirana Sari", activity: "Aktif hari ini", online: true },
      { id: 3, initials: "MF", name: "Miko Firmansyah", activity: "Aktif hari ini", online: true },
      { id: 4, initials: "TN", name: "Tania Nur", activity: "Aktif kemarin", online: false },
    ],
  },
};

