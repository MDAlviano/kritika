"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { ChevronLeft, Check, AlertCircle, ArrowRight } from "lucide-react";
import { feedbackData } from "../../../../lib/data";
import type { FeedbackItem } from "../../../../lib/data";

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

// ─── Circular Score Gauge ─────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={192}
        height={192}
        viewBox="0 0 192 192"
        className="-rotate-90"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={96}
          cy={96}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={16}
        />
        {/* Progress */}
        <circle
          cx={96}
          cy={96}
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700"
        />
        {/* Light blue tail for visual depth */}
        <circle
          cx={96}
          cy={96}
          r={radius}
          fill="none"
          stroke="rgba(147,197,253,0.4)"
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.08} ${circumference * 0.92}`}
          strokeDashoffset={-(progress - circumference * 0.04)}
        />
      </svg>
      {/* Score text */}
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-5xl font-extrabold text-white">{score}</span>
        <span className="mt-1 text-sm font-medium text-blue-200">/100</span>
      </div>
    </div>
  );
}

// ─── Feedback Item Card ───────────────────────────────────────────────────────

function FeedbackItemCard({ item }: { item: FeedbackItem }) {
  const isSuccess = item.type === "success";

  return (
    <div
      className={`rounded-2xl border p-4 ${
        isSuccess
          ? "border-green-200 bg-green-50"
          : "border-orange-200 bg-orange-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-500" : "bg-orange-500"
          }`}
          aria-hidden
        >
          {isSuccess ? (
            <Check className="size-3.5 text-white" strokeWidth={2.5} />
          ) : (
            <AlertCircle className="size-3.5 text-white" strokeWidth={2.5} />
          )}
        </span>
        {/* Content */}
        <div>
          <p
            className={`text-sm font-bold ${
              isSuccess ? "text-green-700" : "text-orange-700"
            }`}
          >
            {item.title}
          </p>
          <p
            className={`mt-1 text-xs leading-relaxed ${
              isSuccess ? "text-green-600" : "text-orange-600"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeedbackPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = use(params);
  const id = Number(assignmentId);

  const data = feedbackData.find((d) => d.assignmentId === id);
  if (!data) notFound();

  return (
    <div className="relative min-h-screen bg-[#f7f7f7]">
      <GridBackground />

      {/* Back nav */}
      <nav
        aria-label="Navigasi kembali"
        className="relative z-10 px-8 py-6"
      >
        <Link
          href={`/student/assignments/${id}/logic-trap`}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
          Kembali ke halaman
        </Link>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 pb-16 pt-2">
        {/* "Rantai alasan lengkap" pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700">
          <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
          Rantai alasan lengkap
        </div>

        {/* Title */}
        <h1 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-neutral-900">
          Cara berpikirmu makin tajam
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-center text-sm leading-relaxed text-neutral-500">
          Ini yang sudah kuat dan yang dapat kamu tingkatkan dari penyelidikan ini.
        </p>

        {/* Split card */}
        <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-3xl border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
            {/* Left: score panel */}
            <div className="flex flex-col items-center justify-center gap-5 bg-blue-700 px-8 py-10">
              <ScoreGauge score={data.score} />
              {/* Score label badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm">
                {data.scoreLabel}
              </span>
            </div>

            {/* Right: feedback items */}
            <div className="flex flex-col justify-between bg-white px-7 py-7">
              {/* Feedback list */}
              <div className="space-y-3">
                {data.feedbackItems.map((item) => (
                  <FeedbackItemCard key={item.id} item={item} />
                ))}
              </div>

              {/* Submit button */}
              <div className="mt-7 flex justify-end">
                <Link
                  href={`/student/assignments/${id}/completed`}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Kirim jawaban
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
