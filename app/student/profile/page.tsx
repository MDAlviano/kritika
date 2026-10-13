"use client";

import { useState } from "react";
import { BookOpen, Pencil } from "lucide-react";
import StudentHeader from "../components/header";

// ─── Types & dummy data ───────────────────────────────────────────────────────

type ActivityStatus = "done" | "lanjutkan";

type Activity = {
  id: number;
  subject: string;
  title: string;
  classInfo: string;
  blocks: number;
  status: ActivityStatus;
  score?: number;
};

const recentActivities: Activity[] = [
  {
    id: 1,
    subject: "Bahasa Indonesia",
    title: "Menjaga Ekosistem Mangrove",
    classInfo: "Bahasa 8A",
    blocks: 7,
    status: "done",
    score: 92,
  },
  {
    id: 2,
    subject: "Bahasa Indonesia",
    title: "Menjaga Ekosistem Mangrove",
    classInfo: "Bahasa 8A",
    blocks: 7,
    status: "done",
    score: 89,
  },
  {
    id: 3,
    subject: "Bahasa Indonesia",
    title: "Menjaga Ekosistem Mangrove",
    classInfo: "Bahasa 8A",
    blocks: 7,
    status: "lanjutkan",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActivityBadge({ status, score }: { status: ActivityStatus; score?: number }) {
  if (status === "done" && score !== undefined) {
    return (
      <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-600">
        Skor {score}
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-600">
      Lanjutkan
    </span>
  );
}

function ActivityCard({ subject, title, classInfo, blocks, status, score }: Activity) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
      <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700">
        <BookOpen className="size-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-blue-700">{subject}</p>
        <p className="mt-0.5 truncate font-semibold text-neutral-900">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-500">
          {classInfo} · {blocks} blok penalaran
        </p>
      </div>
      <ActivityBadge status={status} score={score} />
    </div>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`rounded-xl border px-4 py-3 text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700/30 ${
          disabled
            ? "border-neutral-200 bg-white text-neutral-700 cursor-default"
            : "border-blue-300 bg-white focus:border-blue-700"
        }`}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentProfilePage() {
  const [editing, setEditing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    namaLengkap: "Budi",
    namaPanggilan: "Di",
    email: "Budiiiiiiia@sekolah.id",
    whatsapp: "+62 812-3456-7890",
    sekolah: "SMP Nusantara",
  });

  // Snapshot to revert on cancel (optional — here we just save on submit)
  function handleSave() {
    setEditing(false);
  }

  const totalTugas = 10;
  const tugasSelesai = 25;
  const sedangDikerjakan = 2;
  const rataRataSkor = 85;
  const progressPct = Math.round((tugasSelesai / (totalTugas * 3)) * 100); // illustrative

  return (
    <>
      <StudentHeader />

      <main className="px-8 py-10 space-y-8">
        {/* ── Profile hero card ── */}
        <section className="relative flex items-center gap-6 rounded-3xl bg-blue-100 px-8 py-8">
          {/* Avatar */}
          <div className="grid size-20 shrink-0 place-items-center rounded-full border-2 border-blue-300 bg-white text-2xl font-extrabold text-blue-700">
            BM
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Profil Siswa
            </p>
            <p className="mt-1 text-3xl font-semibold text-neutral-900">{form.namaLengkap}</p>
            <p className="mt-0.5 text-sm text-neutral-600">
              Kelas 8A · {form.sekolah}
            </p>
          </div>

          {/* Edit profile button */}
          <button
            onClick={() => setEditing(true)}
            disabled={editing}
            aria-label="Edit profil"
            className={`absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 ${
              editing
                ? "border-neutral-200 bg-white/60 text-neutral-400 cursor-default"
                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Pencil className="size-4" />
            Edit profile
          </button>
        </section>

        {/* ── Two-column layout ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* ── Left: Informasi pribadi ── */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8">
            <h2 className="text-2xl font-semibold text-neutral-900">Informasi pribadi</h2>
            <p className="mt-1.5 text-sm text-neutral-500">
              Pastikan data Anda selalu terbaru untuk sinkronisasi kelas.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <Field
                label="Nama Lengkap"
                value={form.namaLengkap}
                onChange={(v) => setForm((f) => ({ ...f, namaLengkap: v }))}
                disabled={!editing}
              />
              <Field
                label="Nama Panggilan"
                value={form.namaPanggilan}
                onChange={(v) => setForm((f) => ({ ...f, namaPanggilan: v }))}
                disabled={!editing}
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                disabled={!editing}
                type="email"
              />
              <Field
                label="Nomor Whatsapp"
                value={form.whatsapp}
                onChange={(v) => setForm((f) => ({ ...f, whatsapp: v }))}
                disabled={!editing}
                type="tel"
              />
              <Field
                label="Sekolah"
                value={form.sekolah}
                onChange={(v) => setForm((f) => ({ ...f, sekolah: v }))}
                disabled={!editing}
              />
            </div>

            {/* Simpan perubahan — hanya muncul saat editing */}
            {editing && (
              <button
                onClick={handleSave}
                className="mt-8 w-full rounded-full bg-blue-700 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Simpan perubahan
              </button>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-6">
            {/* Aktivitas Terakhir */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-base font-semibold text-neutral-900">Aktivitas Terakhir</h3>
              <div className="mt-4 flex flex-col gap-3">
                {recentActivities.map((a) => (
                  <ActivityCard key={a.id} {...a} />
                ))}
              </div>
            </div>

            {/* Progress Belajar */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-base font-semibold text-neutral-900">Progress Belajar</h3>

              {/* Stat grid */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="flex flex-col items-center py-4 px-2">
                  <p className="text-3xl font-semibold text-neutral-900">{tugasSelesai}</p>
                  <p className="mt-1 text-center text-xs text-neutral-500">Tugas selesai</p>
                </div>
                <div className="flex flex-col items-center py-4 px-2">
                  <p className="text-3xl font-semibold text-neutral-900">{sedangDikerjakan}</p>
                  <p className="mt-1 text-center text-xs text-neutral-500">Sedang dikerjakan</p>
                </div>
                <div className="flex flex-col items-center py-4 px-2">
                  <p className="text-3xl font-semibold text-neutral-900">{rataRataSkor}%</p>
                  <p className="mt-1 text-center text-xs text-neutral-500">Rata-rata skor</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div
                  role="progressbar"
                  aria-valuenow={tugasSelesai}
                  aria-valuemin={0}
                  aria-valuemax={totalTugas}
                  className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200"
                >
                  <div
                    className="h-full rounded-full bg-blue-700"
                    style={{ width: `${Math.min((tugasSelesai / totalTugas) * 100, 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-right text-xs text-neutral-400">
                  {tugasSelesai}/{totalTugas} tugas
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
