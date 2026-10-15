import { Check, Lightbulb } from "lucide-react";

const tips = ["3–8 paragraf", "Bahasa sesuai tingkat siswa", "Memiliki fakta atau bukti"];

export default function TipsCard() {
  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="grid size-8 place-items-center rounded-lg bg-violet-100 text-violet-600">
        <Lightbulb className="size-4" aria-hidden />
      </div>
      <h3 className="mt-3 text-sm font-bold">Materi yang cocok</h3>
      <p className="mt-1 text-xs text-neutral-500">
        Pilih bacaan yang memuat klaim, fakta, atau bukti yang bisa dianalisis siswa.
      </p>
      <ul className="mt-4 space-y-2.5">
        {tips.map((t) => (
          <li key={t} className="flex items-center gap-2 text-xs text-neutral-700">
            <Check className="size-4 shrink-0 text-emerald-500" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}