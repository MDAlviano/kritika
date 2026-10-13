"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

export default function CreateClassForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("Kelas 8");
  const [subject, setSubject] = useState("Ilmu Pengetahuan Alam");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi penyimpanan kelas (dapat disambungkan ke API backend nanti)
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/classes");
    }, 400);
  };

  return (
    <div className="rounded-3xl border border-neutral-200/90 bg-white shadow-2xs overflow-hidden">
      {/* Card Header: Book icon + Info title */}
      <div className="flex items-center gap-4 sm:gap-5 border-b border-neutral-100 p-6 sm:p-8">
        <div className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
          <BookOpen className="size-7" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Informasi kelas
          </h2>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500">
            Informasi ini akan terlihat oleh siswa yang bergabung.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 sm:p-8 space-y-5">
          {/* Field 1: Nama Kelas */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
            >
              Nama Kelas
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: IPA 8C"
              className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Row 2: Tingkat & Mata pelajaran (2 kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tingkat */}
            <div>
              <label
                htmlFor="grade"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
              >
                Tingkat
              </label>
              <div className="relative">
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm sm:text-base text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer transition-colors"
                >
                  <option value="Kelas 7">Kelas 7</option>
                  <option value="Kelas 8">Kelas 8</option>
                  <option value="Kelas 9">Kelas 9</option>
                  <option value="Kelas 10">Kelas 10</option>
                  <option value="Kelas 11">Kelas 11</option>
                  <option value="Kelas 12">Kelas 12</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-neutral-500" />
              </div>
            </div>

            {/* Mata pelajaran */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
              >
                Mata pelajaran
              </label>
              <div className="relative">
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm sm:text-base text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer transition-colors"
                >
                  <option value="Ilmu Pengetahuan Alam">
                    Ilmu Pengetahuan Alam
                  </option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Ilmu Pengetahuan Sosial">
                    Ilmu Pengetahuan Sosial
                  </option>
                  <option value="Informatika">Informatika</option>
                  <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-neutral-500" />
              </div>
            </div>
          </div>

          {/* Field 3: Deskripsi (opsional) */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
            >
              Deskripsi{" "}
              <span className="font-normal text-neutral-400">(opsional)</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ruang belajar IPA untuk kelas 8C semester genap."
              className="w-full min-h-[120px] resize-y rounded-xl border border-neutral-200 bg-white p-4 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Info Banner: Kode kelas akan dibuat otomatis */}
          <div className="rounded-2xl bg-[#eff6ff] p-4 sm:p-5 flex items-start gap-3.5 border border-blue-100/60">
            <Sparkles className="size-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-blue-700">
                Kode kelas akan dibuat otomatis
              </p>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                Bagikan kode ketika sudah berhasil dibuat.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer: Batal & Buat kelas button */}
        <div className="border-t border-neutral-100 p-6 sm:p-8 flex items-center justify-end gap-3.5 bg-neutral-50/40">
          <Link
            href="/admin/classes"
            className="rounded-full border border-neutral-300 bg-white px-7 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer shadow-2xs"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 disabled:opacity-70 text-white px-7 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>{isSubmitting ? "Menyimpan..." : "Buat kelas"}</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
