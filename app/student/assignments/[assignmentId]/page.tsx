import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, RefreshCw, Target, Timer } from "lucide-react";
import StudentHeader from "../../components/header";
import { assignmentDetails } from "../../../lib/data";
import type { AssignmentDetail } from "../../../lib/data";

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <nav aria-label="Langkah misi" className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              aria-label={`Langkah ${step}${isActive ? " (aktif)" : isDone ? " (selesai)" : ""}`}
              className={`flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                isActive
                  ? "bg-blue-700 text-white shadow-sm"
                  : isDone
                  ? "bg-neutral-200 text-neutral-400"
                  : "bg-neutral-200 text-neutral-400"
              }`}
            >
              {step}
            </div>
            {/* Connector line */}
            {step < total && (
              <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function TimeBadge({ badge }: { badge: AssignmentDetail["badge"] }) {
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

// ─── Mission Info Card ────────────────────────────────────────────────────────

function MissionInfoCard({ detail }: { detail: AssignmentDetail }) {
  const stats: { icon: React.ReactNode; value: string; label: string }[] = [
    {
      icon: <Timer className="size-5 text-blue-700" strokeWidth={1.75} />,
      value: `${detail.estimasiWaktu} menit`,
      label: "Estimasi waktu",
    },
    {
      icon: (
        // Custom "blocks" icon – two small rectangles side by side
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="size-5 text-blue-700"
          aria-hidden
        >
          <rect x="2" y="4" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="11" y="4" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      ),
      value: `${detail.jumlahBlok} blok`,
      label: "Rantai alasan",
    },
    {
      icon: <RefreshCw className="size-5 text-blue-700" strokeWidth={1.75} />,
      value: `${detail.percobaan} percobaan ulang`,
      label: "Kesempatan retry",
    },
  ];

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white px-8 py-8">
      {/* Badge + title */}
      <TimeBadge badge={detail.badge} />

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900">
        {detail.title}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-neutral-500">
        {detail.description}
      </p>

      {/* Deadline */}
      <p className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500">
        <Clock className="size-4 shrink-0" strokeWidth={1.75} />
        Tenggat: {detail.deadlineLabel}
      </p>

      {/* Divider */}
      <div className="my-7 border-t border-neutral-100" />

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50">
              {stat.icon}
            </span>
            <div>
              <p className="text-base font-bold text-neutral-900">{stat.value}</p>
              <p className="text-xs text-neutral-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8">
        <button
          aria-label={`Mulai mission brief: ${detail.title}`}
          className="inline-flex items-center gap-2.5 rounded-full bg-blue-700 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Mission brief <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Learning Goals Card ──────────────────────────────────────────────────────

function LearningGoalsCard({ detail }: { detail: AssignmentDetail }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white px-7 py-7">
      {/* Icon */}
      <div className="grid size-14 place-items-center rounded-2xl bg-blue-700 text-white">
        <Target className="size-7" strokeWidth={1.75} />
      </div>

      {/* Section label */}
      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-blue-700">
        Tujuan Pembelajaran
      </p>

      {/* Heading */}
      <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900">
        Setelah latihan ini, kamu dapat...
      </h3>

      {/* Goals list */}
      <ul className="mt-5 space-y-3" aria-label="Tujuan pembelajaran">
        {detail.learningGoals.map((goal, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
            <span
              aria-hidden
              className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-blue-700"
            >
              {/* checkmark */}
              <svg viewBox="0 0 16 16" fill="none" className="size-4">
                <path
                  d="M3 8l3.5 3.5L13 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {goal}
          </li>
        ))}
      </ul>

      {/* Teacher note */}
      <div className="mt-6 rounded-2xl bg-blue-50 px-5 py-4">
        <div className="flex items-start gap-2.5">
          {/* lightbulb */}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="mt-0.5 size-4 shrink-0 text-blue-700"
            aria-hidden
          >
            <path
              d="M10 2a5 5 0 00-3 9v1a1 1 0 001 1h4a1 1 0 001-1v-1a5 5 0 00-3-9z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 16h4M9 18h2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <p className="text-xs font-bold text-blue-700">
              Pesan dari {detail.teacher}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-blue-700">
              {detail.teacherNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function StudentAssignmentDetailPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  const detail = assignmentDetails.find((a) => a.id === Number(assignmentId));

  if (!detail) notFound();

  return (
    <>
      <StudentHeader />

      <main className="px-8 py-8">
        {/* Top bar: breadcrumb + step indicator */}
        <div className="flex items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-neutral-500"
          >
            <Link
              href="/student/assignments"
              className="transition-colors hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              Daftar kelas
            </Link>
            <ChevronRight className="size-4 shrink-0 text-neutral-400" />
            <span className="font-semibold text-neutral-900">Detail tugas</span>
          </nav>

          <StepIndicator
            current={detail.currentStep}
            total={detail.totalSteps}
          />
        </div>

        {/* Main content – two column layout on large screens */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: mission info */}
          <MissionInfoCard detail={detail} />

          {/* Right: learning goals */}
          <LearningGoalsCard detail={detail} />
        </div>
      </main>
    </>
  );
}
