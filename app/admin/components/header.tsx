import { BellRing } from "lucide-react";

export default function Header({
  title = "Selamat pagi, Bu Rani",
  subtitle = "Mari bantu siswa membangun alasan yang lebih kuat hari ini",
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200/80 bg-white px-8 py-6 shadow-2xs">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{title}</h1>
        <p className="mt-1 text-sm sm:text-base text-neutral-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifikasi"
          className="grid size-12 place-items-center rounded-xl border border-neutral-200 bg-white text-blue-700 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <BellRing className="size-6" strokeWidth={1.75} />
        </button>
        <div className="grid size-14 place-items-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
          RA
        </div>
      </div>
    </header>
  );
}