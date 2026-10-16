import { barTones, type ScoreBucket } from "../data";

export default function ScoreDistribution({ buckets }: { buckets: ScoreBucket[] }) {
  const max = Math.max(...buckets.map((b) => b.count), 0);
  const top = max > 0 ? buckets.find((b) => b.count === max) : undefined;
  const summary = top
    ? `Paling banyak siswa berada di rentang ${top.range}.`
    : "Belum ada data skor.";
  const cols = { gridTemplateColumns: `repeat(${buckets.length}, minmax(0, 1fr))` };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-sm font-bold">Distribusi skor</h2>
      <p className="mt-1 text-[11px] text-neutral-500">{summary}</p>

      <ul style={cols} className="mt-8 grid items-end">
        {buckets.map((b) => {
          const pct = max ? (b.count / max) * 100 : 0;
          const height = b.count > 0 ? Math.max(pct, 6) : 0;
          return (
            <li
              key={b.range}
              aria-label={`${b.range}: ${b.count} siswa`}
              className="flex flex-col items-center gap-2"
            >
              <span aria-hidden className="text-[11px] font-bold">
                {b.count}
              </span>
              <div aria-hidden className="relative h-48 w-8 overflow-hidden rounded-md bg-slate-100">
                <div
                  className={`absolute inset-x-0 bottom-0 rounded-md ${barTones[b.tone]}`}
                  style={{ height: `${height}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div aria-hidden className="mt-2 border-t border-neutral-200" />
      <div aria-hidden style={cols} className="mt-2 grid text-center text-[10px] text-neutral-500">
        {buckets.map((b) => (
          <span key={b.range}>{b.range}</span>
        ))}
      </div>
    </section>
  );
}