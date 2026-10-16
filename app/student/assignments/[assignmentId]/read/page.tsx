import { notFound } from "next/navigation";
import Link from "next/link";
import { AlignLeft, ChevronRight, Lightbulb, ArrowRight } from "lucide-react";
import StudentHeader from "../../../components/header";
import { assignmentDetails, readEvidenceData } from "../../../../lib/data";

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
                  ? "bg-blue-700 text-white"
                  : "bg-neutral-200 text-neutral-400"
              }`}
            >
              {step}
            </div>
            {step < total && (
              <div
                className={`h-0.5 w-6 rounded-full ${
                  step < current ? "bg-blue-700" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Reading Guide Sidebar ────────────────────────────────────────────────────

function ReadingGuideCard({ assignmentId }: { assignmentId: number }) {
  const questions = [
    {
      number: 1,
      question: "Apa gagasan utamanya?",
      hint: "Apa yang ingin dijelaskan penulis?",
    },
    {
      number: 2,
      question: "Apa buktinya?",
      hint: "Kalimat mana yang berupa fakta?",
    },
    {
      number: 3,
      question: "Apa hubungannya?",
      hint: "Temukan penyebab dan akibat.",
    },
  ];

  return (
    <aside
      aria-label="Panduan membaca"
      className="rounded-3xl border border-neutral-200 bg-white p-6"
    >
      {/* Header */}
      <div className="rounded-2xl bg-blue-50 px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-700">
            <Lightbulb className="size-4" strokeWidth={1.75} aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">Panduan membaca</p>
            <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
              Gunakan tiga pertanyaan ini saat membaca:
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <ol className="mt-5 space-y-4" aria-label="Pertanyaan panduan">
        {questions.map((q) => (
          <li key={q.number} className="flex items-start gap-3">
            <span
              aria-hidden
              className="grid size-6 shrink-0 place-items-center rounded-md bg-blue-100 text-xs font-bold text-blue-700"
            >
              {q.number}
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-900">{q.question}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{q.hint}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* CTA */}
      <div className="mt-7">
        <Link
          href={`/student/assignments/${assignmentId}/blocks`}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label="Lanjut ke langkah berikutnya: kumpulkan blok"
        >
          Selesai membaca <ArrowRight className="size-4" />
        </Link>
      </div>
    </aside>
  );
}

// ─── Source Material Card ─────────────────────────────────────────────────────

function SourceMaterialCard({
  sourceTitle,
  paragraphCount,
  wordCount,
  paragraphs,
}: {
  sourceTitle: string;
  paragraphCount: number;
  wordCount: number;
  paragraphs: { index: number; text: string; highlighted?: boolean }[];
}) {
  return (
    <article
      aria-label="Materi sumber bacaan"
      className="rounded-3xl border border-neutral-200 bg-white"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 px-7 py-5">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <AlignLeft className="size-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <h2 className="text-base font-bold text-neutral-900">{sourceTitle}</h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            {paragraphCount} paragraf · {wordCount} kata
          </p>
        </div>
      </div>

      {/* Paragraphs */}
      <div className="space-y-1 px-7 py-6">
        {paragraphs.map((p) =>
          p.highlighted ? (
            <div
              key={p.index}
              className="flex gap-5 rounded-2xl border-l-4 border-amber-400 bg-orange-50 px-5 py-4"
            >
              <span
                aria-hidden
                className="mt-0.5 w-4 shrink-0 text-sm font-semibold text-neutral-400"
              >
                {p.index}
              </span>
              <p className="text-sm leading-7 text-neutral-800">{p.text}</p>
            </div>
          ) : (
            <div key={p.index} className="flex gap-5 px-5 py-4">
              <span
                aria-hidden
                className="mt-0.5 w-4 shrink-0 text-sm font-semibold text-neutral-400"
              >
                {p.index}
              </span>
              <p className="text-sm leading-7 text-neutral-700">{p.text}</p>
            </div>
          )
        )}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ReadEvidencePage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;
  const id = Number(assignmentId);

  const detail = assignmentDetails.find((a) => a.id === id);
  const evidence = readEvidenceData.find((r) => r.assignmentId === id);

  if (!detail || !evidence) notFound();

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
              href={`/student/assignments/${id}`}
              className="transition-colors hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              Detail tugas
            </Link>
            <ChevronRight className="size-4 shrink-0 text-neutral-400" />
            <span className="font-semibold text-neutral-900">Mission brief</span>
          </nav>

          <StepIndicator current={2} total={detail.totalSteps} />
        </div>

        {/* Main content – two column layout on large screens */}
        <div className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left: source material */}
          <SourceMaterialCard
            sourceTitle={evidence.sourceTitle}
            paragraphCount={evidence.paragraphCount}
            wordCount={evidence.wordCount}
            paragraphs={evidence.paragraphs}
          />

          {/* Right: reading guide */}
          <ReadingGuideCard assignmentId={id} />
        </div>
      </main>
    </>
  );
}
