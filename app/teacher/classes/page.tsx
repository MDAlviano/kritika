import Link from "next/link";
import Header from "../components/header";
import TeacherClassCard, { type TeacherClass } from "./components/teacher-class-card";
import { Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Kelas - Kritika Guru",
  description: "Kelola kelas, siswa, dan aktivitas pembelajaran.",
};

// Data dummy list kelas (dapat langsung digantikan oleh fetch API)
const teacherClasses: TeacherClass[] = [
  {
    id: 1,
    code: "01",
    name: "IPA 8A",
    subject: "Ilmu Pengetahuan Alam",
    students: 32,
    progress: 78,
    tone: "blue",
    href: "/teacher/classes/1",
  },
  {
    id: 2,
    code: "02",
    name: "Bahasa 7B",
    subject: "Bahasa Indonesia",
    students: 32,
    progress: 78,
    tone: "rose",
    href: "/teacher/classes/2",
  },
  {
    id: 3,
    code: "03",
    name: "IPA 8B",
    subject: "Ilmu Pengetahuan Alam",
    students: 32,
    progress: 78,
    tone: "amber",
    href: "/teacher/classes/3",
  },
];

export default function TeacherClassesPage() {
  return (
    <>
      {/* Header dengan judul & subtitle yang sesuai desain */}
      <Header
        title="Daftar kelas"
        subtitle="Kelola kelas, siswa, dan aktivitas pembelajaran."
      />

      <main className="min-h-[calc(100vh-90px)] bg-[#f8f9fa] px-8 py-10 sm:px-10">
        {/* Badge status kelas aktif */}
        <div>
          <span className="inline-flex items-center rounded-full bg-[#fff3e8] px-3.5 py-1 text-xs font-semibold text-[#ea580c] shadow-2xs">
            {teacherClasses.length} Kelas aktif
          </span>
        </div>

        {/* Section Heading */}
        <div className="mt-3.5 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Ruang belajar anda
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-neutral-500">
            Pilih kelas untuk melihat siswa dan tugas.
          </p>
        </div>

        {/* List kelas dengan mapping array data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teacherClasses.map((classItem) => (
            <TeacherClassCard key={classItem.id} {...classItem} />
          ))}
        </div>

        {/* Card dashed: Punya kelas baru? */}
        <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-2xs">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Plus className="size-7" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                Punya kelas baru?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                Buat ruang belajar dan bagikan kode undangan kepada siswa.
              </p>
            </div>
          </div>

          <Link
            href="/teacher/classes/new"
            className="self-start sm:self-center shrink-0 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 transition-colors shadow-2xs inline-block"
          >
            Buat kelas baru
          </Link>
        </div>
      </main>
    </>
  );
}
