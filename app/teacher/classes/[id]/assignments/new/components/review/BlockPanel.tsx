"use client";

import { useRef } from "react";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { blockStyles, type Block } from "../../draft";
import BlockCard from "./BlockCard";

type Props = {
  blocks: Block[];
  paragraphCount: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Block>) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onReorder: (from: number, to: number) => void;
};

export default function BlockPanel({
  blocks,
  paragraphCount,
  selectedId,
  onSelect,
  onUpdate,
  onDelete,
  onAdd,
  onReorder,
}: Props) {
  const dragFrom = useRef<number | null>(null);

  // Urutan tipe blok untuk alur relasi (tanpa duplikat berurutan)
  const flow = blocks
    .map((b) => b.type)
    .filter((t, i, arr) => i === 0 || t !== arr[i - 1]);

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold">Blok pembelajaran</h2>
          <p className="mt-1 text-[11px] text-neutral-500">
            {blocks.length} blok · {Math.max(blocks.length - 1, 0)} relasi disarankan
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <Plus className="size-4" aria-hidden /> Tambah blok
        </button>
      </div>

      <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-blue-700" aria-hidden />
        <div>
          <h3 className="text-sm font-bold text-blue-700">Draft siap ditinjau</h3>
          <p className="mt-1 text-xs text-neutral-600">
            Pastikan setiap blok sesuai dengan materi sumber.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {blocks.map((b, i) => (
          <BlockCard
            key={b.id}
            block={b}
            paragraphCount={paragraphCount}
            selected={b.id === selectedId}
            onSelect={() => onSelect(b.id)}
            onUpdate={(patch) => onUpdate(b.id, patch)}
            onDelete={() => onDelete(b.id)}
            onMove={(dir) => onReorder(i, i + dir)}
            onDragStart={() => (dragFrom.current = i)}
            onDrop={() => {
              if (dragFrom.current !== null) onReorder(dragFrom.current, i);
              dragFrom.current = null;
            }}
          />
        ))}
      </ul>

      {blocks.length === 0 && (
        <p className="mt-5 text-center text-sm text-neutral-500">
          Belum ada blok. Klik “Tambah blok” untuk memulai.
        </p>
      )}

      {flow.length > 0 && (
        <div
          aria-label="Alur relasi blok"
          className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-4"
        >
          {flow.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-2">
              {i > 0 && <ArrowRight className="size-3 text-neutral-400" aria-hidden />}
              <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${blockStyles[t].badge}`}>
                {blockStyles[t].label}
              </span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}