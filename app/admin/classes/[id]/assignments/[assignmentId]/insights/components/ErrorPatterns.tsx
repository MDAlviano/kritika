import { barTones, type ErrorPattern } from "../data";

type Props = {
  patterns: ErrorPattern[];
  total: number;
};

export default function ErrorPatterns({ patterns, total }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-sm font-bold">Pola kesalahan utama</h2>
      <p className="mt-1 text-[11px] text-neutral-500">Area yang paling membutuhkan penguatan.</p>

      {patterns.length === 0 ? (
        <p className="mt-8 text-center text-sm text-neutral-500">Belum ada pola kesalahan.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {patterns.map((p) => {
            const pct = total ? Math.min(100, (p.students / total) * 100) : 0;
            return (
              <li key={p.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-semibold">{p.label}</span>
                  <span className="text-[10px] text-neutral-500">{p.students} siswa</span>
                </div>
                <div aria-hidden className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${barTones[p.tone]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}