import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Clock, Users } from "lucide-react";
import StudentHeader from "../../components/header";
import { classDetails, toneStyles } from "../../../lib/data";
import type { Assignment, ClassDetail } from "../../../lib/data";

// ─── Hero Banner ──────────────────────────────────────────────────────────────

function ClassHeroBanner({ detail }: { detail: ClassDetail }) {
  const completed = detail.completedMissions;
  const total = detail.totalMissions;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <section
      className="flex flex-col gap-6 rounded-3xl bg-blue-600 p-8 sm:flex-row sm:items-center"
      aria-label={`Info kelas ${detail.name}`}
    >
      {/* Left: icon + text */}
      <div className="flex items-center gap-5 flex-1 min-w-0">
        {/* Icon box */}
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-white">
          <BookOpen className="size-8" strokeWidth={1.75} />
        </div>

        {/* Meta */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-blue-100">{detail.subject}</p>
          <h2 className="mt-0.5 text-3xl font-bold tracking-tight text-white truncate">
            {detail.name}
          </h2>
          <p className="mt-1 text-sm text-blue-100">
            {detail.teacher} · {detail.students} Siswa
          </p>
        </div>
      </div>

      {/* Right: progress */}
      <div className="sm:w-64 shrink-0">
        <div className="flex items-center justify-between text-sm text-white mb-2">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">
            {completed} / {total}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress kelas: ${completed} dari ${total} selesai`}
          className="h-3 w-full overflow-hidden rounded-full bg-white/20"
        >
          <div
            className="h-full rounded-full bg-blue-900"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-blue-100">
          {detail.completedMissions} tugas selesai
        </p>
      </div>
    </section>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function AssignmentBadge({ badge }: { badge: Assignment["badge"] }) {
  if (!badge) return null;

  const styles =
    badge === "hari_ini"
      ? "bg-amber-100 text-amber-700"
      : "bg-neutral-100 text-neutral-500";

  const label = badge === "hari_ini" ? "Hari ini" : "Besok";

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}

// ─── Assignment Card ───────────────────────────────────────────────────────────

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const isInProgress = assignment.status === "in_progress";
  const isNotStarted = assignment.status === "not_started";

  return (
    <article className="rounded-3xl border border-neutral-200 bg-white p-7">
      {/* Badge row */}
      <AssignmentBadge badge={assignment.badge} />

      {/* Title + description */}
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
        {assignment.title}
      </h3>
      <p className="mt-1 text-neutral-500">{assignment.description}</p>

      {/* Footer row */}
      <div className="mt-5 flex items-end justify-between gap-4">
        {/* Left: deadline + optional progress */}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Clock className="size-4 shrink-0" strokeWidth={1.75} />
            {assignment.deadlineLabel}
          </p>

          {isInProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-neutral-500">Progress</span>
                <span className="text-sm font-semibold text-neutral-700">
                  {assignment.progress}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={assignment.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progress: ${assignment.progress}%`}
                className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200"
              >
                <div
                  className="h-full rounded-full bg-neutral-400"
                  style={{ width: `${assignment.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: CTA button */}
        {isNotStarted ? (
          <Link
            href={`/student/assignments/${assignment.id}`}
            aria-label={`Mulai ${assignment.title}`}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Mulai <ArrowRight className="size-4" />
          </Link>
        ) : isInProgress ? (
          <Link
            href={`/student/assignments/${assignment.id}`}
            aria-label={`Lanjutkan ${assignment.title}`}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Lanjutkan <ArrowRight className="size-4" />
          </Link>
        ) : (
          <span className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-green-100 px-6 py-3 font-semibold text-green-700">
            Selesai ✓
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Active Assignments Section ───────────────────────────────────────────────

function ActiveAssignments({ assignments }: { assignments: Assignment[] }) {
  const active = assignments.filter((a) => a.status !== "done");

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Tugas aktif
      </h2>
      <p className="mt-1 text-neutral-500">Selesaikan sebelum batas waktu</p>

      {active.length === 0 ? (
        <p className="mt-8 text-center text-neutral-400">
          Semua tugas sudah selesai 🎉
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {active.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function StudentClassDetailPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  const detail = classDetails.find((c) => c.id === Number(classId));

  if (!detail) notFound();

  return (
    <>
      <StudentHeader />

      <main className="px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-neutral-500"
        >
          <Link
            href="/student/classes"
            className="hover:text-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Daftar kelas
          </Link>
          <ChevronRight className="size-4 shrink-0 text-neutral-400" />
          <span className="font-semibold text-neutral-900">{detail.name}</span>
        </nav>

        {/* Hero banner */}
        <ClassHeroBanner detail={detail} />

        {/* Active assignments */}
        <ActiveAssignments assignments={detail.assignments} />
      </main>
    </>
  );
}
