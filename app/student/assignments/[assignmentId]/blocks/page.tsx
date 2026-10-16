"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowRight, ChevronLeft, Check, Plus, Lightbulb } from "lucide-react";
import StudentHeader from "../../../components/header";
import { assignmentDetails, collectBlocksData } from "../../../../lib/data";
import type { Block, BlockType } from "../../../../lib/data";

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

// ─── Block type config ────────────────────────────────────────────────────────

const blockTypeConfig: Record<
  BlockType,
  {
    badge: string;
    border: string;
    borderSelected: string;
    bg: string;
    bgSelected: string;
    checkColor: string;
    checkBg: string;
  }
> = {
  Klaim: {
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-neutral-200",
    borderSelected: "border-emerald-400",
    bg: "bg-white",
    bgSelected: "bg-white",
    checkColor: "text-emerald-600",
    checkBg: "bg-emerald-50 border-emerald-200",
  },
  Fakta: {
    badge: "bg-blue-100 text-blue-700",
    border: "border-neutral-200",
    borderSelected: "border-blue-400",
    bg: "bg-white",
    bgSelected: "bg-white",
    checkColor: "text-blue-600",
    checkBg: "bg-blue-50 border-blue-200",
  },
  Sebab: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    borderSelected: "border-amber-400",
    bg: "bg-amber-50/30",
    bgSelected: "bg-amber-50/30",
    checkColor: "text-amber-600",
    checkBg: "bg-amber-50 border-amber-200",
  },
  Bukti: {
    badge: "bg-rose-100 text-rose-600",
    border: "border-neutral-200",
    borderSelected: "border-rose-400",
    bg: "bg-white",
    bgSelected: "bg-white",
    checkColor: "text-rose-500",
    checkBg: "bg-rose-50 border-rose-200",
  },
  Akibat: {
    badge: "bg-purple-100 text-purple-700",
    border: "border-neutral-200",
    borderSelected: "border-purple-400",
    bg: "bg-white",
    bgSelected: "bg-white",
    checkColor: "text-purple-600",
    checkBg: "bg-purple-50 border-purple-200",
  },
};

// ─── Block Card ───────────────────────────────────────────────────────────────

function BlockCard({
  block,
  selected,
  onToggle,
}: {
  block: Block;
  selected: boolean;
  onToggle: () => void;
}) {
  const cfg = blockTypeConfig[block.type];

  return (
    <button
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${selected ? "Hapus" : "Pilih"} blok: ${block.text}`}
      className={`group relative flex w-full flex-col gap-4 rounded-2xl border-2 p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-blue-700 ${
        selected
          ? `${cfg.borderSelected} ${cfg.bgSelected} shadow-sm`
          : `${cfg.border} ${cfg.bg} hover:border-neutral-300 hover:shadow-sm`
      }`}
    >
      {/* Top row: badge + icon */}
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.badge}`}
        >
          {block.type}
        </span>
        <span
          className={`flex size-7 items-center justify-center rounded-full border transition-colors ${
            selected
              ? `${cfg.checkBg} ${cfg.checkColor}`
              : "border-neutral-200 bg-white text-neutral-400 group-hover:border-neutral-300"
          }`}
        >
          {selected ? (
            <Check className="size-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="size-3.5" strokeWidth={2.5} />
          )}
        </span>
      </div>

      {/* Text */}
      <p className="text-sm font-semibold leading-relaxed text-neutral-800">
        {block.text}
      </p>

      {/* Paragraph ref */}
      <p className="text-xs text-neutral-400">{block.paragraphRef}</p>
    </button>
  );
}

// ─── Page (client) ────────────────────────────────────────────────────────────

export default function CollectBlocksPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = use(params);
  const id = Number(assignmentId);

  const detail = assignmentDetails.find((a) => a.id === id);
  const data = collectBlocksData.find((d) => d.assignmentId === id);

  if (!detail || !data) notFound();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggle(blockId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  }

  const totalBlocks = data.blocks.length;
  const selectedCount = selectedIds.size;

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
              href={`/student/assignments/${id}/read`}
              className="flex items-center gap-1 transition-colors hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              <ChevronLeft className="size-4" />
              <span>Kembali ke halaman</span>
            </Link>
            <span
              className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-700"
            >
              {data.missionLabel}
            </span>
          </nav>

          <StepIndicator current={3} total={detail.totalSteps} />
        </div>

        {/* Grid of block cards */}
        <section aria-label="Pilih blok informasi" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.blocks.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                selected={selectedIds.has(block.id)}
                onToggle={() => toggle(block.id)}
              />
            ))}
          </div>
        </section>

        {/* Collected count */}
        <p className="mt-6 text-center text-sm font-semibold text-blue-700">
          {selectedCount}/{totalBlocks} blok dikumpulkan
        </p>

        {/* Bottom hint bar */}
        <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3 text-neutral-500">
            <Lightbulb
              className="size-5 shrink-0 text-blue-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-neutral-700">
                Pilih dengan teliti
              </p>
              <p className="text-xs text-neutral-400">
                Tidak semua informasi harus digunakan.
              </p>
            </div>
          </div>

          <Link
            href={selectedCount > 0 ? `/student/assignments/${id}/chain` : "#"}
            aria-disabled={selectedCount === 0}
            onClick={(e) => selectedCount === 0 && e.preventDefault()}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              selectedCount > 0
                ? "bg-blue-700 hover:bg-blue-800"
                : "cursor-not-allowed bg-neutral-300"
            }`}
          >
            Lanjut susun rantai <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
