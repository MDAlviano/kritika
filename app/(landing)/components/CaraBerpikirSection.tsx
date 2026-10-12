import Image from "next/image";
import { Star } from "lucide-react";

export default function CaraBerpikirSection() {
  return (
    <section id="tentang" className="relative bg-[#f8f9fa] py-20 px-6 overflow-hidden">
      {/* Background grid continuity */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/landing/bg-grid.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-bold text-blue-700 mb-2.5 block tracking-wide">
              Cara baru untuk berpikir
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-neutral-900 tracking-tight leading-[1.2]">
              Bukan cuma cari jawaban, tapi{" "}
              <br className="hidden sm:inline" />
              tahu{" "}
              <span className="text-blue-700 underline underline-offset-8 decoration-blue-700 decoration-[3.5px]">
                alasannya.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-[260px] sm:text-right leading-relaxed shrink-0">
            Setiap jawaban membuka cara baru untuk memahami bagaimana siswa berpikir.
          </p>
        </div>

        {/* Cards grid — 3 cols on large: 2-col card on left + stacked cards on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Large student review card — col-span-2 */}
          <div className="lg:col-span-2 bg-blue-700 text-white rounded-3xl p-8 sm:p-9 flex flex-col md:flex-row justify-between gap-6 overflow-hidden relative shadow-md shadow-blue-700/10">
            {/* Left content: Quote + Text + Avatar */}
            <div className="flex-1 flex flex-col justify-between z-10">
              <div>
                {/* Double quote icon — snug spacing directly above text */}
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 text-white/90 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Review statement */}
                <p className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white max-w-md">
                  Saya jadi lebih memahami mengapa suatu jawaban dapat dianggap benar,
                  bukan hanya mengetahui jawabannya.
                </p>
              </div>

              {/* Avatar & author info at bottom */}
              <div className="flex items-center gap-3 mt-8">
                <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white shrink-0 border-2 border-white/30 shadow-xs">
                  DA
                </div>
                <div>
                  <p className="font-bold text-sm text-white">Dayana</p>
                  <p className="text-blue-200 text-xs font-medium">Siswi SMP</p>
                </div>
              </div>
            </div>

            {/* Right: student-review-flow preview diagram */}
            <div className="shrink-0 self-center md:self-end md:-mr-3 md:-mb-5 flex items-center justify-center">
              <Image
                src="/landing/student-review-flow.png"
                alt="Alur review siswa"
                width={240}
                height={280}
                className="w-48 sm:w-56 md:w-[250px] h-auto object-contain drop-shadow-xl select-none"
              />
            </div>
          </div>

          {/* Right column: 2 cards stacked */}
          <div className="flex flex-col gap-6">

            {/* Stats card (84%) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-3 shadow-xs border border-neutral-100 flex-1">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <p className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-none mt-1">
                84%
              </p>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Siswa lebih mudah menjelaskan alasan setelah melihat hubungan antarblok
              </p>
            </div>

            {/* Quote card — Bu Rani */}
            <div className="bg-[#eef4ff] rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-3 shadow-xs border border-blue-100/70 flex-1">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cfe0fc] flex items-center justify-center text-xs font-bold text-blue-800 shrink-0">
                  RA
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">Bu Rani</p>
                  <p className="text-neutral-500 text-xs">Guru IPA</p>
                </div>
              </div>

              {/* Quote mark */}
              <div>
                <svg
                  className="w-5 h-5 text-neutral-400 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
                Diskusi kelas jadi lebih terarah karena saya tahu hubungan mana yang masih lemah.
              </p>

              {/* 5 Filled Stars */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

