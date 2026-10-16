import type { AssignmentDetail } from "../data";
import DonutProgress from "./DonutProgress";

export default function StatsOverview({ detail }: { detail: AssignmentDetail }) {
  const pct = detail.total ? Math.round((detail.submitted / detail.total) * 100) : 0;
  const missing = detail.total - detail.submitted;

  const metrics = [
    {
      label: "Submission",
      value: `${detail.submitted} / ${detail.total}`,
      note: missing > 0 ? `${missing} siswa belum mengirimkan` : "Semua siswa sudah mengirimkan",
    },
    {
      label: "Rata-rata skor",
      value: detail.averageScore === null ? "—" : String(detail.averageScore),
      note: detail.scoreNote,
    },
    {
      label: "Rata-rata waktu",
      value: detail.averageTime ?? "—",
      note: detail.timeNote,
    },
  ];

  return (
    <section className="grid items-center gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:grid-cols-[auto_1fr_1fr_1fr]">
      <DonutProgress value={pct} />

      {metrics.map((m) => (
        <div key={m.label} className="md:border-l md:border-neutral-200 md:pl-6">
          <p className="text-[11px] text-neutral-500">{m.label}</p>
          <p className="mt-1 text-2xl font-bold">{m.value}</p>
          <p className="mt-1 text-[11px] text-neutral-500">{m.note}</p>
        </div>
      ))}
    </section>
  );
}