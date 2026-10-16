import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { flowStyles, type AssignmentDetail } from "../data";

export default function LearningStructure({
  detail,
  reviewHref,
}: {
  detail: AssignmentDetail;
  reviewHref: string;
}) {
  const counts = [
    { value: detail.totalBlocks, label: "Total blok" },
    { value: detail.requiredRelations, label: "Relasi wajib" },
    { value: detail.distractors, label: "Distraktor" },
  ];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-6 py-5">
        <div>
          <h2 className="text-sm font-bold">Struktur pembelajaran</h2>
          <p className="mt-1 text-[11px] text-neutral-500">Blok dan hubungan yang digunakan.</p>
        </div>
        <Link
          href={reviewHref}
          className="rounded text-xs font-semibold text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          Buka review
        </Link>
      </div>

      <div
        aria-label="Alur blok pembelajaran"
        className="flex flex-wrap items-center justify-center gap-2 px-6 py-10"
      >
        {detail.flow.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-2">
            {i > 0 && <ArrowRight className="size-3.5 text-neutral-400" aria-hidden />}
            <span className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${flowStyles[t].chip}`}>
              {flowStyles[t].label}
            </span>
          </span>
        ))}
      </div>

      <dl className="flex flex-wrap items-center justify-around gap-4 border-t border-neutral-100 px-6 py-5 text-xs">
        {counts.map((c) => (
          <div key={c.label} className="flex items-baseline gap-2">
            <dd className="text-sm font-bold">{c.value}</dd>
            <dt className="text-neutral-500">{c.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}