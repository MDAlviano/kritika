"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StudentHeader from "../components/header";
import {
  studentAssignments,
  type StudentAssignment,
  type StudentAssignmentStatus,
} from "../../lib/data";
import { fadeUp, staggerContainer } from "../../lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "semua" | StudentAssignmentStatus;

const tabs: { key: TabKey; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "aktif", label: "Aktif" },
  { key: "draft", label: "Draft" },
  { key: "selesai", label: "Selesai" },
];

// ─── Badge ────────────────────────────────────────────────────────────────────

function TimeBadge({
  badge,
}: {
  badge: StudentAssignment["badge"];
}) {
  if (!badge) return null;

  const isToday = badge === "hari_ini";

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        isToday
          ? "bg-amber-100 text-amber-700"
          : "bg-neutral-100 text-neutral-500"
      }`}
    >
      {isToday ? "Hari ini" : "Besok"}
    </span>
  );
}

// ─── Assignment Card ──────────────────────────────────────────────────────────

function AssignmentCard({
  assignment,
}: {
  assignment: StudentAssignment;
}) {
  const { title, description, deadlineLabel, badge, status, progress, className } =
    assignment;

  const isActive = status === "aktif";
  const isDraft = status === "draft";
  const isDone = status === "selesai";
  const hasProgress = isActive && progress > 0;
  const isNotStarted = isActive && progress === 0;

  return (
    <motion.article variants={fadeUp} className="rounded-3xl border border-neutral-200 bg-white px-8 py-7">
      {/* Top row: badge + class name */}
      <div className="flex items-center gap-3">
        <TimeBadge badge={badge} />
        {isDone ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
            <CheckCircle2 className="size-4" strokeWidth={2} />
            Selesai
          </span>
        ) : isDraft ? (
          <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-500">
            Draft
          </span>
        ) : null}
        <span className="text-sm font-medium text-neutral-500">{className}</span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-neutral-500">{description}</p>

      {/* Footer: deadline + optional progress + CTA */}
      <div className="mt-5 flex items-end justify-between gap-6">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Clock className="size-4 shrink-0" strokeWidth={1.75} />
            {deadlineLabel}
          </p>

          {/* Progress bar — only for in-progress aktif */}
          {hasProgress && (
            <div className="mt-3 max-w-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm text-neutral-500">Progress</span>
                <span className="text-sm font-semibold text-neutral-700">
                  {progress}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${progress}%`}
                className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
              >
                <div
                  className="h-full rounded-full bg-neutral-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {isDone ? null : isNotStarted ? (
          <Link
            href={`/student/assignments/${assignment.id}`}
            aria-label={`Mulai ${title}`}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Mulai <ArrowRight className="size-4" />
          </Link>
        ) : hasProgress ? (
          <Link
            href={`/student/assignments/${assignment.id}`}
            aria-label={`Lanjutkan ${title}`}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Lanjutkan <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </motion.article>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

function TabBar({
  active,
  onChange,
  counts,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  counts: Record<TabKey, number>;
}) {
  return (
    <div
      className="flex items-center gap-1 border-b border-neutral-200"
      role="tablist"
      aria-label="Filter tugas"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`relative flex items-center gap-2 px-4 pb-3 pt-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 ${
              isActive
                ? "text-blue-700"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab.label}
            {/* Count badge */}
            <span
              className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {counts[tab.key]}
            </span>
            {/* Active underline */}
            {isActive && (
              <span
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-700"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("semua");

  const counts: Record<TabKey, number> = {
    semua: studentAssignments.length,
    aktif: studentAssignments.filter((a) => a.status === "aktif").length,
    draft: studentAssignments.filter((a) => a.status === "draft").length,
    selesai: studentAssignments.filter((a) => a.status === "selesai").length,
  };

  const filtered =
    activeTab === "semua"
      ? studentAssignments
      : studentAssignments.filter((a) => a.status === activeTab);

  return (
    <>
      <StudentHeader />

      <main className="px-8 py-10">
        {/* Page heading */}
        <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
          Ruang belajar anda
        </h2>
        <p className="mt-2 text-neutral-500">Semua tugas dan kelasmu ada disini.</p>

        {/* Tab filter */}
        <div className="mt-8">
          <TabBar
            active={activeTab}
            onChange={setActiveTab}
            counts={counts}
          />
        </div>

        {/* Assignment list */}
        <div className="mt-6 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="space-y-5"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {filtered.length === 0 ? (
                <motion.p variants={fadeUp} className="py-16 text-center text-neutral-400">
                  Tidak ada tugas di kategori ini.
                </motion.p>
              ) : (
                filtered.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
