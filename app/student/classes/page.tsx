"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Plus, Users, X } from "lucide-react";
import Link from "next/link";
import StudentHeader from "../components/header";

// ─── Types & Data ────────────────────────────────────────────────────────────

type Tone = "blue" | "rose" | "amber";

const tones: Tone[] = ["blue", "rose", "amber"];

const toneStyles: Record<
  Tone,
  { soft: string; icon: string; link: string; border: string }
> = {
  blue: {
    soft: "bg-blue-100 text-blue-700",
    icon: "text-blue-700",
    link: "text-blue-700",
    border: "border-blue-200",
  },
  rose: {
    soft: "bg-rose-100 text-rose-500",
    icon: "text-rose-500",
    link: "text-rose-500",
    border: "border-rose-200",
  },
  amber: {
    soft: "bg-orange-100 text-amber-600",
    icon: "text-amber-600",
    link: "text-amber-600",
    border: "border-orange-200",
  },
};

type StudentClass = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
};

const studentClasses: StudentClass[] = [
  { id: 1, name: "IPA 8A",     subject: "Ilmu Pengetahuan Alam", teacher: "Rani" },
  { id: 2, name: "BAHASA 7B",  subject: "Bahasa Indonesia",       teacher: "Rani" },
  { id: 3, name: "IPA 8B",     subject: "Ilmu Pengetahuan Alam", teacher: "Rani" },
  { id: 4, name: "IPA 8A",     subject: "Ilmu Pengetahuan Alam", teacher: "Rani" },
  { id: 5, name: "BAHASA 7B",  subject: "Bahasa Indonesia",       teacher: "Rani" },
  { id: 6, name: "IPA 8B",     subject: "Ilmu Pengetahuan Alam", teacher: "Rani" },
];

// ─── Class Card ───────────────────────────────────────────────────────────────

function ClassCard({
  id,
  name,
  subject,
  teacher,
  tone,
}: StudentClass & { tone: Tone }) {
  const s = toneStyles[tone];
  return (
    <article className="flex flex-col rounded-3xl border border-neutral-200 bg-white overflow-hidden">
      {/* Body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Icon + name */}
        <div className="flex items-center gap-4">
          <div
            className={`grid size-14 shrink-0 place-items-center rounded-2xl ${s.soft}`}
          >
            <BookOpen className="size-6" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xl font-bold text-neutral-900">{name}</p>
            <p className="text-sm text-neutral-500">{subject}</p>
          </div>
        </div>

        {/* Teacher */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Users className="size-4" strokeWidth={1.75} />
          {teacher}
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t ${s.border} px-6 py-4`}>
        <Link
          href={`/student/classes/${id}`}
          className={`flex items-center gap-2 text-sm font-semibold ${s.link} hover:underline focus-visible:outline-2 focus-visible:outline-blue-700`}
        >
          Lihat detail kelas <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

// ─── Join Modal ───────────────────────────────────────────────────────────────

function JoinModal({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  function handleJoin() {
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Kode kelas tidak boleh kosong.");
      return;
    }
    // Simulate join success (replace with real API call)
    setError("");
    setJoined(true);
    setTimeout(onClose, 1500);
  }

  return (
    /* Overlay — blue tinted as per design */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-700/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg mx-4 rounded-3xl bg-white p-10 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <X className="size-5" />
        </button>

        {/* Brand */}
        <p className="text-2xl font-extrabold tracking-tight text-blue-700">
          Kritika
        </p>

        {/* Heading */}
        <h2
          id="modal-title"
          className="mt-6 text-3xl font-bold tracking-tight text-neutral-900"
        >
          Masuk ke kelas
        </h2>
        <p className="mt-2 text-neutral-500">
          Masukkan kode kelas dan mulai tantangan!
        </p>

        {/* Input */}
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          placeholder="Contoh: Rks - 4821"
          disabled={joined}
          aria-label="Kode kelas"
          className={`mt-8 w-full rounded-full border-2 px-6 py-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-700/30 ${
            error ? "border-red-400" : "border-blue-700"
          }`}
        />
        {error && (
          <p className="mt-2 px-2 text-sm text-red-500">{error}</p>
        )}

        {/* Submit */}
        {joined ? (
          <div className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-green-500 py-4 text-lg font-semibold text-white">
            Berhasil bergabung! 🎉
          </div>
        ) : (
          <button
            type="button"
            onClick={handleJoin}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-blue-700 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Masuk <ArrowRight className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentClassesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StudentHeader
        title="Daftar kelas"
        subtitle="Lihat kelas anda dan aktivitas pembelajaran."
      />

      <main className="px-8 py-10">
        {/* Section heading */}
        <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
          Ruang belajar anda
        </h2>
        <p className="mt-2 text-neutral-500">Pilih kelas untuk melihat tugas.</p>

        {/* Join banner */}
        <div className="mt-8 flex items-center gap-5 rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-5">
          {/* Plus icon box */}
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
            <Plus className="size-6" strokeWidth={2} />
          </div>

          {/* Copy */}
          <div className="flex-1">
            <p className="font-semibold text-neutral-900">Punya kelas baru?</p>
            <p className="text-sm text-neutral-500">
              Gabung ruang belajar baru menggunakan kode.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 rounded-full border border-neutral-200 bg-white px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Join Kelas
          </button>
        </div>

        {/* Class grid — 3 cols, repeating blue/rose/amber */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studentClasses.map((cls, idx) => (
            <ClassCard
              key={cls.id}
              {...cls}
              tone={tones[idx % tones.length]}
            />
          ))}
        </div>
      </main>

      {/* Join Modal */}
      {showModal && <JoinModal onClose={() => setShowModal(false)} />}
    </>
  );
}
