"use client";

import { use, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Check,
  Lightbulb,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import StudentHeader from "../../../components/header";
import {
  assignmentDetails,
  collectBlocksData,
  readEvidenceData,
} from "../../../../lib/data";
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
    leftBar: string;
    border: string;
    borderFilled: string;
    bgFilled: string;
    removeBg: string;
  }
> = {
  Klaim: {
    badge: "bg-emerald-100 text-emerald-700",
    leftBar: "bg-emerald-500",
    border: "border-neutral-200",
    borderFilled: "border-emerald-400",
    bgFilled: "bg-white",
    removeBg: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  },
  Fakta: {
    badge: "bg-blue-100 text-blue-700",
    leftBar: "bg-blue-500",
    border: "border-neutral-200",
    borderFilled: "border-blue-400",
    bgFilled: "bg-white",
    removeBg: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  },
  Sebab: {
    badge: "bg-amber-100 text-amber-700",
    leftBar: "bg-amber-500",
    border: "border-neutral-200",
    borderFilled: "border-amber-400",
    bgFilled: "bg-white",
    removeBg: "bg-amber-100 text-amber-700 hover:bg-amber-200",
  },
  Bukti: {
    badge: "bg-rose-100 text-rose-600",
    leftBar: "bg-rose-500",
    border: "border-neutral-200",
    borderFilled: "border-rose-400",
    bgFilled: "bg-white",
    removeBg: "bg-rose-100 text-rose-600 hover:bg-rose-200",
  },
  Akibat: {
    badge: "bg-purple-100 text-purple-700",
    leftBar: "bg-purple-500",
    border: "border-neutral-200",
    borderFilled: "border-purple-400",
    bgFilled: "bg-white",
    removeBg: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  },
};

// ─── React Flow custom node ───────────────────────────────────────────────────

type SlotNodeData = {
  slotNumber: number;
  block: Block | null;
  onRemove: (slotId: string) => void;
};

function SlotNode({ id, data }: NodeProps) {
  const { slotNumber, block, onRemove } = data as SlotNodeData;

  if (!block) {
    // Empty slot
    return (
      <div className="relative flex h-[120px] w-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-300 bg-white text-blue-300">
        <Handle
          type="target"
          position={Position.Top}
          className="!border-blue-200 !bg-blue-100"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="!border-blue-200 !bg-blue-100"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!border-blue-200 !bg-blue-100"
        />
        <Handle
          type="target"
          position={Position.Left}
          className="!border-blue-200 !bg-blue-100"
        />
        <span className="absolute left-3 top-2 text-xs font-bold text-blue-200">
          {String(slotNumber).padStart(2, "0")}
        </span>
        <Plus className="size-5" strokeWidth={1.75} />
        <span className="text-xs">Taruh blok di sini</span>
      </div>
    );
  }

  const cfg = blockTypeConfig[block.type];

  return (
    <div
      className={`relative w-[200px] rounded-2xl border-2 bg-white p-4 shadow-sm ${cfg.borderFilled}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!border-neutral-300 !bg-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-neutral-300 !bg-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!border-neutral-300 !bg-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!border-neutral-300 !bg-white"
      />

      {/* Top: slot number + type badge + remove */}
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-neutral-300">
            {String(slotNumber).padStart(2, "0")}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge}`}
          >
            {block.type}
          </span>
        </div>
        <button
          onClick={() => onRemove(id)}
          className={`flex size-5 items-center justify-center rounded-full text-xs transition-colors ${cfg.removeBg}`}
          aria-label={`Hapus blok dari slot ${slotNumber}`}
        >
          <X className="size-3" strokeWidth={2.5} />
        </button>
      </div>

      {/* Block text */}
      <p className="mt-2 text-xs font-semibold leading-relaxed text-neutral-800 line-clamp-3">
        {block.text}
      </p>
    </div>
  );
}

const nodeTypes = { slot: SlotNode };

// ─── Submit Popup ─────────────────────────────────────────────────────────────

function SubmitPopup({
  assignmentId,
  score,
  onClose,
}: {
  assignmentId: number;
  score: number;
  onClose: () => void;
}) {
  // SVG circular progress gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Hasil pengiriman rantai bukti"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-white px-8 py-10 shadow-2xl mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-blue-700"
          aria-label="Tutup popup"
        >
          <X className="size-4" strokeWidth={2} />
        </button>

        {/* Circular score gauge */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center">
            <svg
              width={160}
              height={160}
              viewBox="0 0 160 160"
              className="-rotate-90"
              aria-hidden
            >
              {/* Track */}
              <circle
                cx={80}
                cy={80}
                r={radius}
                fill="none"
                stroke="#e0e7ff"
                strokeWidth={14}
              />
              {/* Progress */}
              <circle
                cx={80}
                cy={80}
                r={radius}
                fill="none"
                stroke="#2563eb"
                strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700"
              />
            </svg>
            {/* Score text */}
            <div className="absolute flex flex-col items-center leading-none">
              <span className="text-4xl font-extrabold text-neutral-900">
                {score}
              </span>
              <span className="text-sm text-neutral-400">/100</span>
            </div>
          </div>
        </div>

        {/* "Sudah bagus" badge */}
        <div className="mt-5 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm font-semibold text-neutral-600">
            <Check className="size-3.5 text-neutral-500" strokeWidth={2.5} />
            Sudah bagus
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-2xl font-extrabold tracking-tight text-neutral-900">
          Hampir tepat!
        </h2>

        {/* Description */}
        <p className="mt-3 text-center text-sm leading-relaxed text-neutral-500">
          Klaim dan buktimu sudah tepat! Mari periksa apakah ada klaim jebakan
          (logic trap) di dalam rangkaian penalaranmu
        </p>

        {/* CTA */}
        <div className="mt-7">
          <Link
            href={`/student/assignments/${assignmentId}/logic-trap`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Mulai Uji Logic Trap <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Source Text Panel ────────────────────────────────────────────────────────

function SourceTextPanel({
  assignmentId,
  title,
}: {
  assignmentId: number;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const evidence = readEvidenceData.find(
    (r) => r.assignmentId === assignmentId
  );

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-blue-700"
        aria-expanded={open}
        aria-controls="source-text-panel"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
          <ImageIcon className="size-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-neutral-800">
            Baca teks sumber
          </p>
          <p className="text-xs text-neutral-500">{title}</p>
        </div>
        {open ? (
          <ChevronUp className="size-4 shrink-0 text-neutral-400" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-neutral-400" />
        )}
      </button>

      {/* Collapsible body */}
      {open && evidence && (
        <div
          id="source-text-panel"
          className="max-h-64 overflow-y-auto border-t border-blue-100 px-4 py-3"
        >
          {evidence.paragraphs.map((p) => (
            <div
              key={p.index}
              className={`mb-3 flex gap-3 rounded-xl px-3 py-2 text-xs leading-relaxed ${
                p.highlighted
                  ? "border-l-4 border-amber-400 bg-amber-50 text-neutral-700"
                  : "text-neutral-600"
              }`}
            >
              <span className="shrink-0 font-semibold text-neutral-300">
                {p.index}
              </span>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Left Panel: block list ───────────────────────────────────────────────────

function BlockListItem({
  block,
  onAdd,
  placed,
}: {
  block: Block;
  onAdd: (block: Block) => void;
  placed: boolean;
}) {
  const cfg = blockTypeConfig[block.type];
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-opacity ${
        placed ? "border-neutral-100 opacity-40" : "border-neutral-200"
      }`}
    >
      {/* Colored left accent bar */}
      <div className={`h-10 w-1 shrink-0 rounded-full ${cfg.leftBar}`} />
      <div className="flex-1 min-w-0">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge}`}
        >
          {block.type}
        </span>
        <p className="mt-1 truncate text-xs font-semibold text-neutral-700">
          {block.text}
        </p>
      </div>
      <button
        onClick={() => !placed && onAdd(block)}
        disabled={placed}
        className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 ${
          placed
            ? "cursor-not-allowed border-neutral-100 text-neutral-300"
            : "border-neutral-200 text-neutral-400 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        }`}
        aria-label={placed ? `Blok sudah ditempatkan` : `Tambah blok ke kanvas`}
      >
        {placed ? (
          <Check className="size-3.5" strokeWidth={2.5} />
        ) : (
          <Plus className="size-3.5" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}

// ─── Main Chain Builder ───────────────────────────────────────────────────────

const SLOT_POSITIONS = [
  { x: 170, y: 30 },
  { x: 30, y: 200 },
  { x: 310, y: 200 },
  { x: 170, y: 370 },
];

const INITIAL_EDGES: Edge[] = [
  {
    id: "e1-2",
    source: "slot-1",
    target: "slot-2",
    type: "default",
    style: { strokeDasharray: "6 4", stroke: "#93c5fd", strokeWidth: 2 },
    animated: false,
  },
  {
    id: "e1-3",
    source: "slot-1",
    target: "slot-3",
    type: "default",
    style: { strokeDasharray: "6 4", stroke: "#93c5fd", strokeWidth: 2 },
    animated: false,
  },
  {
    id: "e2-4",
    source: "slot-2",
    target: "slot-4",
    type: "default",
    style: { strokeDasharray: "6 4", stroke: "#93c5fd", strokeWidth: 2 },
    animated: false,
  },
  {
    id: "e3-4",
    source: "slot-3",
    target: "slot-4",
    type: "default",
    style: { strokeDasharray: "6 4", stroke: "#93c5fd", strokeWidth: 2 },
    animated: false,
  },
];

function buildInitialNodes(
  slotCount: number,
  onRemove: (slotId: string) => void
): Node[] {
  return Array.from({ length: slotCount }, (_, i) => ({
    id: `slot-${i + 1}`,
    type: "slot",
    position: SLOT_POSITIONS[i] ?? { x: 100 + i * 220, y: 100 },
    data: {
      slotNumber: i + 1,
      block: null,
      onRemove,
    } as SlotNodeData,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChainPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = use(params);
  const id = Number(assignmentId);

  const detail = assignmentDetails.find((a) => a.id === id);
  const blockData = collectBlocksData.find((d) => d.assignmentId === id);

  if (!detail || !blockData) notFound();

  const [showPopup, setShowPopup] = useState(false);

  // Track which blocks are placed into which slot
  const [slotBlocks, setSlotBlocks] = useState<Record<string, Block | null>>(
    () => {
      const init: Record<string, Block | null> = {};
      for (let i = 1; i <= 4; i++) {
        init[`slot-${i}`] = null;
      }
      return init;
    }
  );

  const handleRemove = useCallback((slotId: string) => {
    setSlotBlocks((prev) => ({ ...prev, [slotId]: null }));
  }, []);

  // Build nodes from slot state
  const buildNodes = useCallback(
    (slotBlocksMap: Record<string, Block | null>): Node[] => {
      return Array.from({ length: 4 }, (_, i) => {
        const slotId = `slot-${i + 1}`;
        return {
          id: slotId,
          type: "slot",
          position: SLOT_POSITIONS[i] ?? { x: 100 + i * 220, y: 100 },
          data: {
            slotNumber: i + 1,
            block: slotBlocksMap[slotId] ?? null,
            onRemove: handleRemove,
          } as SlotNodeData,
        };
      });
    },
    [handleRemove]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(
    buildNodes(slotBlocks)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            animated: true,
          },
          eds
        )
      ),
    [setEdges]
  );

  // Add block to next empty slot
  function addBlockToCanvas(block: Block) {
    const emptySlotId = Object.keys(slotBlocks).find(
      (sid) => slotBlocks[sid] === null
    );
    if (!emptySlotId) return;

    const next = { ...slotBlocks, [emptySlotId]: block };
    setSlotBlocks(next);
    setNodes(buildNodes(next));
  }

  // Sync remove: when node remove is triggered, rebuild
  function handleRemoveAndSync(slotId: string) {
    const next = { ...slotBlocks, [slotId]: null };
    setSlotBlocks(next);
    setNodes(buildNodes(next));
  }

  // Nodes need the latest handleRemove — rebuild on slotBlocks change
  // We sync via effect-free approach: rebuild nodes directly above

  const placedBlockIds = new Set(
    Object.values(slotBlocks)
      .filter(Boolean)
      .map((b) => b!.id)
  );
  const filledSlots = Object.values(slotBlocks).filter(Boolean).length;
  const totalSlots = 4;
  const emptySlots = totalSlots - filledSlots;

  return (
    <>
      <StudentHeader />

      <main className="px-8 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-neutral-500"
          >
            <Link
              href={`/student/assignments/${id}/blocks`}
              className="flex items-center gap-1 transition-colors hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              <ChevronLeft className="size-4" />
              <span>Kembali ke halaman</span>
            </Link>
            <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-700">
              {blockData.missionLabel}
            </span>
          </nav>

          <StepIndicator current={4} total={detail.totalSteps} />
        </div>

        {/* Page heading */}
        <div className="mt-6">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            {detail.title}
          </h1>
          <p className="mt-2 max-w-lg text-base text-neutral-500">
            Bacalah teks di sebelah kanan, lalu rangkai blok yang tersedia untuk
            membangun alasan yang tepat.
          </p>
        </div>

        {/* Split panel */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
            {/* ── Left panel ── */}
            <div className="flex flex-col gap-4 border-r border-neutral-100 p-6">
              {/* Section label */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                  Blok
                </p>
                <h2 className="mt-1 text-xl font-bold text-neutral-900">
                  Blok informasi
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                  Klik blok untuk mengisi kanvas, atau seret ke tempat yang kamu
                  pilih.
                </p>
              </div>

              {/* Source text accordion */}
              <SourceTextPanel
                assignmentId={id}
                title={detail.title}
              />

              {/* Block list */}
              <div>
                <p className="mb-2 text-xs font-semibold text-neutral-500">
                  Pilih blok
                </p>
                <div className="space-y-2">
                  {blockData.blocks.map((block) => (
                    <BlockListItem
                      key={block.id}
                      block={block}
                      placed={placedBlockIds.has(block.id)}
                      onAdd={addBlockToCanvas}
                    />
                  ))}
                </div>
              </div>

              {/* Hint box */}
              <div className="mt-auto rounded-2xl bg-amber-50 px-4 py-3">
                <div className="flex items-start gap-2.5">
                  <Lightbulb
                    className="mt-0.5 size-4 shrink-0 text-amber-600"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <p className="text-xs font-semibold leading-relaxed text-amber-700">
                    Petunjuk: periksa apakah sebuah klaim didukung oleh data
                    yang tepat.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right panel: React Flow canvas ── */}
            <div className="flex flex-col">
              <div className="border-b border-neutral-100 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                  Rangkai gagasanmu
                </p>
                <h2 className="mt-1 text-xl font-bold text-neutral-900">
                  Kanvas berpikir
                </h2>
              </div>

              {/* Tip banner */}
              <div className="mx-6 mt-4 flex items-center gap-3 rounded-2xl bg-blue-50 px-5 py-3.5 text-sm font-semibold text-blue-700">
                <Lightbulb className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
                Klik dua blok di kanvas untuk menghubungkan atau melepas
                hubungannya.
              </div>

              {/* React Flow */}
              <div className="relative mx-6 mt-4 h-[480px] overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
                <ReactFlow
                  nodes={nodes.map((n) => ({
                    ...n,
                    data: {
                      ...(n.data as SlotNodeData),
                      onRemove: handleRemoveAndSync,
                    },
                  }))}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.3 }}
                  minZoom={0.5}
                  maxZoom={1.5}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background
                    color="#dbeafe"
                    gap={24}
                    size={1.5}
                  />
                </ReactFlow>
              </div>

              {/* Bottom bar */}
              <div className="mx-6 mb-6 mt-4 flex items-center gap-4 rounded-2xl border border-neutral-100 bg-white px-5 py-4">
                {/* Status icon */}
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                    filledSlots === totalSlots
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-neutral-100 text-neutral-400"
                  }`}
                >
                  <Check className="size-5" strokeWidth={2.5} />
                </div>

                {/* Status text */}
                <div className="flex-1">
                  <p className="text-sm font-bold text-neutral-800">
                    {emptySlots > 0
                      ? `${emptySlots} tempat lagi untuk diisi`
                      : "Semua blok sudah ditempatkan!"}
                  </p>
                  <p className="text-xs text-neutral-400">
                    Hubungkan blok dan tandai klaim sebelum mengirim.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  onClick={() => setShowPopup(true)}
                  disabled={filledSlots === 0}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                    filledSlots > 0
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "cursor-not-allowed bg-neutral-300"
                  }`}
                  aria-label="Kirim jawaban"
                >
                  Kirim jawaban <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Submit popup */}
      {showPopup && (
        <SubmitPopup
          assignmentId={id}
          score={84}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
