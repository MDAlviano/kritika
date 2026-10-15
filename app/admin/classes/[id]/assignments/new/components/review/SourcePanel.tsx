import { BookOpen, Target } from "lucide-react";
import { wordCount } from "../../draft";

type Props = {
  objective: string;
  paragraphs: string[];
  highlight: number | null; // nomor paragraf (mulai dari 1)
};

export default function SourcePanel({ objective, paragraphs, highlight }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-blue-100 text-blue-700">
          <BookOpen className="size-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-bold">Materi sumber</h2>
          <p className="text-[11px] text-neutral-500">
            {paragraphs.length} paragraf · {wordCount(paragraphs)} kata
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Target className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden />
        <div>
          <h3 className="text-sm font-bold text-blue-700">Tujuan pembelajaran</h3>
          <p className="mt-1 text-xs text-neutral-600">{objective}</p>
        </div>
      </div>

      <ol className="mt-5 space-y-1">
        {paragraphs.map((p, i) => {
          const active = highlight === i + 1;
          return (
            <li
              key={i}
              className={`flex gap-4 rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed transition-colors ${
                active ? "border-orange-400 bg-orange-100" : "border-transparent"
              }`}
            >
              <span className="w-3 shrink-0 text-xs font-medium text-neutral-500">{i + 1}</span>
              <p>{p}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}