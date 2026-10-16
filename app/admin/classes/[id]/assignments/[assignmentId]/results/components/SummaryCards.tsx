import type { ResultsData } from "../data";

export default function SummaryCards({ results }: { results: ResultsData }) {
  const { highest, average, scoreDelta, needSupport } = results;

  const deltaText =
    scoreDelta === null
      ? "Belum ada data"
      : `${scoreDelta >= 0 ? "+" : "−"}${Math.abs(scoreDelta)} dari tugas lalu`;

  const cards = [
    {
      label: "Skor tertinggi",
      value: highest ? String(highest.score) : "—",
      note: highest ? highest.name : "Belum ada data",
    },
    {
      label: "Rata-rata",
      value: average === null ? "—" : String(average),
      note: deltaText,
    },
    {
      label: "Perlu dukungan",
      value: String(needSupport),
      note: "siswa di bawah 60",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="flex items-baseline gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-5"
        >
          <span className="text-[11px] text-neutral-500">{c.label}</span>
          <span className="text-2xl font-bold">{c.value}</span>
          <span className="text-[11px] text-neutral-500">{c.note}</span>
        </div>
      ))}
    </section>
  );
}