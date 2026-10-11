import { BellRing } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-8 py-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Selamat pagi, Bu Rani</h1>
        <p className="mt-1 text-neutral-500">
          Mari bantu siswa membangun alasan yang lebih kuat hari ini
        </p>
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