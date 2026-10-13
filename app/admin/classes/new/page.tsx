import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "../../components/header";
import CreateClassForm from "./components/create-class-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buat Kelas Baru - Kritika Guru",
  description: "Kelola kelas, siswa, dan aktivitas pembelajaran.",
};

export default function CreateClassPage() {
  return (
    <>
      {/* Header Halaman */}
      <Header
        title="Buat kelas baru"
        subtitle="Kelola kelas, siswa, dan aktivitas pembelajaran."
      />

      <main className="min-h-[calc(100vh-90px)] bg-[#f8f9fa] px-8 py-8 sm:px-10">
        {/* Breadcrumb navigasi */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm mb-6"
        >
          <Link
            href="/admin/classes"
            className="text-neutral-500 hover:text-blue-700 transition-colors font-medium"
          >
            Daftar kelas
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span className="font-semibold text-neutral-900">Buat kelas</span>
        </nav>

        {/* Card Form Buat Kelas */}
        <div className="max-w-4xl">
          <CreateClassForm />
        </div>
      </main>
    </>
  );
}
