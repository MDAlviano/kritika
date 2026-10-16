import { Check } from "lucide-react";

const steps = [
  { title: "Materi", desc: "Pilih sumber bacaan" },
  { title: "Tinjau draft", desc: "Periksa hasil AI" },
  { title: "Publikasikan", desc: "Bagikan ke kelas" },
];

export default function Stepper({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol aria-label="Langkah pembuatan tugas" className="flex items-center gap-4">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={s.title}
            aria-current={active ? "step" : undefined}
            className="flex flex-1 items-center gap-4 last:flex-none"
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  active || done ? "bg-blue-700 text-white" : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {done ? <Check className="size-4" /> : n}
              </span>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-neutral-500">{s.desc}</p>
              </div>
            </div>
            {n < steps.length && <span aria-hidden className="h-px flex-1 bg-neutral-300" />}
          </li>
        );
      })}
    </ol>
  );
}