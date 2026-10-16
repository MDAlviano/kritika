import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-neutral-300 bg-linear-to-br from-blue-50 via-indigo-50 to-rose-50 px-10 py-12 sm:px-16">
      <div className="relative z-10 max-w-xl">
        <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          <Sparkles className="size-5" /> Mulai dari materi
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
          Ubah bacaan menjadi latihan berpikir aktif
        </h2>
        <p className="mt-5 max-w-lg text-neutral-600">
          Unggah materi, tinjau draft blok dari AI, lalu bagikan ke kelas. Anda tetap
          memegang kendali penuh.
        </p>
        <Link
          href="/teacher/classes/1/assignments/new"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-4 font-semibold text-white shadow-md transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <Plus className="size-5" /> Buat tugas
        </Link>
      </div>

      <div aria-hidden className="absolute right-16 top-10 hidden h-72 w-104 md:block">
        <div className="absolute left-0 top-12 h-56 w-56 -rotate-6 rounded-3xl bg-blue-200/70" />
        <div className="absolute right-0 top-0 w-72 rotate-[4deg] space-y-3 rounded-3xl bg-white p-5 shadow-xl">
          <div className="h-2 w-4/5 rounded-full bg-indigo-400" />
          <div className="h-2 w-full rounded-full bg-neutral-300" />
          <div className="h-2 w-5/6 rounded-full bg-neutral-300" />
          <div className="mt-4 space-y-2 rounded-xl border border-rose-200 bg-rose-50 p-3">
            <div className="h-2 w-full rounded-full bg-rose-300" />
            <div className="h-2 w-4/5 rounded-full bg-neutral-300" />
          </div>
          <div className="space-y-2 rounded-xl border border-orange-200 bg-orange-50 p-3">
            <div className="h-2 w-full rounded-full bg-orange-300" />
            <div className="h-2 w-4/5 rounded-full bg-neutral-300" />
          </div>
        </div>
        <Plus className="absolute -right-4 top-6 size-5 text-rose-400" />
        <Plus className="absolute bottom-3 left-44 size-5 text-blue-700" />
      </div>
    </section>
  );
}