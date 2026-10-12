import { ChevronRight, Clock, NotebookText } from "lucide-react";
import { tasks, toneStyles } from "../../lib/data";

export default function ActiveTasks() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Tugas aktif</h2>
      <p className="mt-1 text-neutral-500">Aktivitas yang sedang dikerjakan siswa.</p>

      <div className="mt-6 overflow-x-auto rounded-3xl bg-white">
        <div className="min-w-190">
          <div className="grid grid-cols-[2.2fr_1fr_1.3fr_1.4fr_40px] items-center bg-neutral-50 px-6 py-5 text-sm font-semibold">
            <span>Tugas</span>
            <span>Kelas</span>
            <span>Batas waktu</span>
            <span>Progress</span>
            <span />
          </div>

          {tasks.map((t) => {
            const s = toneStyles[t.tone];
            const pct = Math.round((t.done / t.total) * 100);
            return (
              <div
                key={t.id}
                className="grid grid-cols-[2.2fr_1fr_1.3fr_1.4fr_40px] items-center border-t border-neutral-100 px-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <div className={`grid size-11 place-items-center rounded-lg ${s.soft}`}>
                    <NotebookText className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {t.category} • {t.blocks} blok
                    </p>
                  </div>
                </div>

                <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${s.badge}`}>
                  {t.className}
                </span>

                <span className="flex items-center gap-2 text-neutral-700">
                  <Clock className="size-4" /> {t.deadline}
                </span>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-20 overflow-hidden rounded-full bg-neutral-200">
                    <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold">
                    {t.done}/{t.total}
                  </span>
                </div>

                <button aria-label={`Buka ${t.title}`} className="rounded-md focus-visible:outline-2 focus-visible:outline-blue-700">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}