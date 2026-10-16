"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Ellipsis, Users } from "lucide-react";
import { toneStyles, type Tone } from "../../lib/data";

type Props = {
  name: string;
  subject: string;
  students: number;
  progress: number;
  tone: Tone;
};

export default function ClassCard({ name, subject, students, progress, tone }: Props) {
  const t = toneStyles[tone];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <article className="w-80 shrink-0 overflow-visible rounded-3xl border border-neutral-200 bg-white sm:w-90 lg:w-100">
      <div className={`relative flex items-center justify-between rounded-t-3xl px-6 py-4 ${t.header}`}>
        <div className={`grid size-12 place-items-center rounded-lg border border-neutral-200 bg-white ${t.icon}`}>
          <BookOpen className="size-6" strokeWidth={1.75} />
        </div>

        <div ref={ref} className="relative">
          <button
            aria-label={`Menu kelas ${name}`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`rounded-md p-1 focus-visible:outline-2 focus-visible:outline-blue-700 ${t.icon}`}
          >
            <Ellipsis className="size-6" />
          </button>
          {open && (
            <div
              role="menu"
              className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-lg bg-white text-xs shadow-lg ring-1 ring-black/5"
            >
              <button role="menuitem" className="block w-full px-3 py-2.5 text-left hover:bg-neutral-50">
                Edit
              </button>
              <button role="menuitem" className="block w-full border-t border-neutral-100 px-3 py-2.5 text-left text-rose-600 hover:bg-rose-50">
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-5">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-2 text-neutral-600">{subject}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
          <Users className="size-4" /> {students} Siswa
        </p>

        <div className="mt-5 flex justify-between text-sm text-neutral-500">
          <span>Progress kelas</span>
          <span>{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200"
        >
          <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </article>
  );
}