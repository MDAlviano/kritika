"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, ChevronRight, ListFilter, Plus } from "lucide-react";
import {
  assignments,
  statusStyles,
  toneStyles,
  type AssignmentStatus,
} from "./data";

type Tab = "semua" | AssignmentStatus;

const tabs: { key: Tab; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "aktif", label: "Aktif" },
  { key: "draft", label: "Draft" },
  { key: "selesai", label: "Selesai" },
];

export default function AssignmentList({ classId }: { classId: string }) {
  const [tab, setTab] = useState<Tab>("semua");
  const [kelas, setKelas] = useState("semua");

  const classNames = useMemo(
    () => Array.from(new Set(assignments.map((a) => a.className))),
    []
  );

  const byClass = assignments.filter((a) => kelas === "semua" || a.className === kelas);
  const count = (key: Tab) =>
    key === "semua" ? byClass.length : byClass.filter((a) => a.status === key).length;

  const visible = byClass.filter((a) => tab === "semua" || a.status === tab);

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-medium tracking-tight">Semua tugas</h2>
          <p className="mt-2 text-sm text-neutral-500">
            {assignments.length} assignment dari {classNames.length} kelas.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          <Plus className="size-4" /> Buat assignment
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200">
        <div role="tablist" aria-label="Status tugas" className="flex gap-6">
          {tabs.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {label}
                <span
                  className={`grid min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold ${
                    active ? "bg-blue-700 text-white" : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {count(key)}
                </span>
              </button>
            );
          })}
        </div>

        <label className="mb-2 flex items-center gap-2 text-xs text-neutral-600">
          <ListFilter className="size-4" aria-hidden />
          <span className="sr-only">Filter kelas</span>
          <select
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="rounded-md bg-transparent py-1 pr-1 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <option value="semua">Semua kelas</option>
            {classNames.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-6 divide-y divide-neutral-100 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
        {visible.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-neutral-500">
            Belum ada tugas pada filter ini.
          </li>
        )}

        {visible.map((a) => {
          const st = statusStyles[a.status];
          return (
            <li key={a.id}>
              <Link
                href={`/teacher/classes/${classId}/assignments/${a.id}`}
                className="grid min-w-[720px] grid-cols-[2.4fr_1.2fr_1fr_0.8fr_24px] items-center gap-4 px-6 py-5 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-700"
              >
                <div>
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${st.badge}`}>
                    {st.label}
                  </span>
                  <div className="mt-1.5 flex items-center gap-3">
                    <div className={`grid size-9 place-items-center rounded-lg ${toneStyles[a.tone]}`}>
                      <BookOpen className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{a.title}</p>
                      <p className="text-xs text-neutral-500">
                        {a.className} · {a.blocks} blok
                      </p>
                    </div>
                  </div>
                </div>

                <Cell label="Batas waktu" value={a.deadline} />
                <Cell label="Submission" value={`${a.submitted} / ${a.total}`} />
                <Cell label="Rata-rata" value={a.average === null ? "—" : String(a.average)} />

                <ChevronRight className="size-4 text-neutral-400" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-neutral-500">{label}</p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}