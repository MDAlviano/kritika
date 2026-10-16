import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { completedData } from "../../../../lib/data";

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

// ─── Stat Item ────────────────────────────────────────────────────────────────

function StatItem({
  value,
  label,
  highlight,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`text-3xl font-extrabold tracking-tight ${
          highlight ? "text-blue-700" : "text-neutral-900"
        }`}
      >
        {value}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        {label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompletedPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = use(params);
  const id = Number(assignmentId);

  const data = completedData.find((d) => d.assignmentId === id);
  if (!data) notFound();

  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      <GridBackground />

      {/* Centered content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Check icon with outer ring */}
        <div
          className="flex size-24 items-center justify-center rounded-full bg-blue-100"
          aria-hidden
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-700 shadow-lg shadow-blue-700/30">
            <Check className="size-8 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Mission label */}
        <p className="mt-5 text-sm font-semibold text-purple-600">
          Misi #{data.missionNumber} · Selesai
        </p>

        {/* Title */}
        <h1 className="mt-3 max-w-sm text-center text-4xl font-extrabold leading-tight tracking-tight text-neutral-900">
          Alasanmu berhasil memecahkan kasus
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-sm text-center text-sm leading-relaxed text-neutral-500">
          Kamu tidak hanya menemukan jawaban. Kamu menunjukkan bukti dan
          menjelaskan bagaimana semuanya terhubung.
        </p>

        {/* Stats row */}
        <div className="mt-10 flex items-center gap-0 divide-x divide-neutral-200">
          <div className="px-8">
            <StatItem
              value={String(data.score)}
              label="Skor Akhir"
              highlight
            />
          </div>
          <div className="px-8">
            <StatItem
              value={`${data.timeMinutes} mnt`}
              label="Waktu"
            />
          </div>
          <div className="px-8">
            <StatItem
              value={`${data.relationsCorrect}/${data.relationsTotal}`}
              label="Hubungan"
            />
          </div>
        </div>

        {/* Back to dashboard button */}
        <div className="mt-10">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-8 py-4 text-base font-semibold text-white shadow-md shadow-blue-700/30 transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Kembali ke beranda
            <ArrowRight className="size-5" strokeWidth={2} />
          </Link>
        </div>
      </main>
    </div>
  );
}
