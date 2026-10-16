"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "../../../../lib/animations";
import { logicTrapData } from "../../../../lib/data";

// ─── Grid Background ──────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.5,
      }}
    />
  );
}

// ─── Radio Option ─────────────────────────────────────────────────────────────

function RadioOption({
  id,
  text,
  selected,
  onSelect,
}: {
  id: string;
  text: string;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      whileTap={{ scale: 0.985 }}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-blue-700 ${
        selected
          ? "border-blue-700 bg-blue-50"
          : "border-neutral-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
      }`}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-blue-700 bg-blue-700" : "border-neutral-300 bg-white"
        }`}
        aria-hidden
      >
        {selected && <span className="size-2.5 rounded-full bg-white" />}
      </span>
      <span className={`text-sm font-semibold leading-relaxed ${selected ? "text-blue-700" : "text-neutral-700"}`}>
        {text}
      </span>
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LogicTrapPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = use(params);
  const id = Number(assignmentId);

  const trapData = logicTrapData.find((d) => d.assignmentId === id);
  if (!trapData) notFound();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      <GridBackground />

      {/* Back nav */}
      <motion.nav
        aria-label="Navigasi kembali"
        className="relative z-10 px-8 py-6"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <Link
          href={`/student/assignments/${id}/chain`}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
          Kembali ke halaman
        </Link>
      </motion.nav>

      {/* Centered card */}
      <main className="relative z-10 flex items-center justify-center px-4 pb-16 pt-4">
        <motion.div
          className="w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white px-10 py-10 shadow-sm"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Target icon */}
          <div className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-700 shadow-md shadow-blue-700/30">
              <Target className="size-8 text-white" strokeWidth={1.75} aria-hidden />
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-neutral-900">
            {trapData.question}
          </h1>

          {/* Description */}
          <p className="mt-3 text-center text-sm leading-relaxed text-neutral-500">
            {trapData.descriptionPrefix}
            <strong className="font-bold text-neutral-800">{trapData.descriptionBold}</strong>
            {trapData.descriptionSuffix}
          </p>

          {/* Options — stagger in */}
          <motion.div
            className="mt-8 space-y-3"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {trapData.options.map((opt) => (
              <RadioOption
                key={opt.id}
                id={opt.id}
                text={opt.text}
                selected={selectedId === opt.id}
                onSelect={setSelectedId}
              />
            ))}
          </motion.div>

          {/* Submit */}
          <div className="mt-8 flex justify-center">
            {selectedId ? (
              <Link
                href={`/student/assignments/${id}/feedback`}
                className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                aria-label="Kirim jawaban logic trap"
              >
                Kirim jawaban <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-neutral-300 px-8 py-3.5 text-sm font-semibold text-white"
              >
                Kirim jawaban <ArrowRight className="size-4" strokeWidth={2} />
              </span>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
