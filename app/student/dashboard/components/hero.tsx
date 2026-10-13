import Image from "next/image";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export default function StudentHero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-gradient-to-br from-slate-100 via-blue-50 to-rose-50 px-10 py-10 sm:px-12">
      {/* Left content */}
      <div className="relative z-10 max-w-lg">
        {/* Class badge */}
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <BookOpen className="size-5 text-blue-700" strokeWidth={1.75} />
          <span className="font-semibold text-blue-700">IPA 8A · Kelas 8A</span>
          <span className="flex items-center gap-1.5 text-neutral-500">
            <Clock className="size-4" strokeWidth={1.75} />
            Hari ini, 20.00
          </span>
        </div>

        {/* Status label */}
        <p className="mt-4 text-sm font-semibold text-blue-700">Perlu dikerjakan</p>

        {/* Title */}
        <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          Mengapa banjir terjadi?
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-neutral-500">
          Baca materi dan susun hubungan antara klaim, bukti, penyebab, dan akibat.
        </p>

        {/* CTA */}
        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-4 font-semibold text-white shadow-md transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          Buka tugas <ArrowRight className="size-5" />
        </button>
      </div>

      {/* Right image */}
      <div
        aria-hidden
        className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:block"
      >
        <Image
          src="/student/dash-hero.png"
          alt=""
          width={280}
          height={220}
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>
    </section>
  );
}
