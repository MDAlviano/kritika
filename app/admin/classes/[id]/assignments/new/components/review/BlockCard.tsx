"use client";

import { useState, type KeyboardEvent } from "react";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { blockStyles, blockTypes, type Block, type BlockType } from "../../draft";

type Props = {
  block: Block;
  paragraphCount: number;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<Block>) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
  onDragStart: () => void;
  onDrop: () => void;
};

const iconBtn =
  "grid size-9 place-items-center rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-blue-700";
const fieldCls =
  "rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-xs focus-visible:outline-2 focus-visible:outline-blue-700";

export default function BlockCard({
  block,
  paragraphCount,
  selected,
  onSelect,
  onUpdate,
  onDelete,
  onMove,
  onDragStart,
  onDrop,
}: Props) {
  // Blok baru (teks kosong) langsung masuk mode edit
  const [editing, setEditing] = useState(block.text === "");
  const [text, setText] = useState(block.text);
  const [type, setType] = useState<BlockType>(block.type);
  const [paragraph, setParagraph] = useState(block.paragraph);

  const style = blockStyles[block.type];

  function save() {
    if (!text.trim()) return;
    onUpdate({ text: text.trim(), type, paragraph });
    setEditing(false);
  }

  function cancel() {
    if (block.text === "") return onDelete(); // blok baru yang dibatalkan
    setText(block.text);
    setType(block.type);
    setParagraph(block.paragraph);
    setEditing(false);
  }

  function onHandleKey(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onMove(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onMove(1);
    }
  }

  return (
    <li
      draggable={!editing}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-4 transition-colors ${
        selected ? "border-blue-300 ring-1 ring-blue-200" : "border-neutral-200"
      }`}
    >
      <button
        type="button"
        aria-label="Pindahkan blok (gunakan panah atas atau bawah)"
        onKeyDown={onHandleKey}
        className="cursor-grab rounded text-neutral-400 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        <GripVertical className="size-4" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[10px]">
          <span className={`rounded-full px-2.5 py-0.5 font-semibold ${style.badge}`}>{style.label}</span>
          <span className="text-neutral-400">Paragraf {block.paragraph}</span>
        </div>

        {editing ? (
          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <select
                aria-label="Tipe blok"
                value={type}
                onChange={(e) => setType(e.target.value as BlockType)}
                className={fieldCls}
              >
                {blockTypes.map((t) => (
                  <option key={t} value={t}>
                    {blockStyles[t].label}
                  </option>
                ))}
              </select>
              <select
                aria-label="Paragraf sumber"
                value={paragraph}
                onChange={(e) => setParagraph(Number(e.target.value))}
                className={fieldCls}
              >
                {Array.from({ length: paragraphCount }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Paragraf {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              aria-label="Isi blok"
              rows={3}
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full resize-y rounded-lg border border-neutral-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={!text.trim()}
                className="rounded-full bg-blue-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={cancel}
                className="rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-semibold hover:bg-neutral-50"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm leading-relaxed">{block.text}</p>
        )}
      </div>

      {!editing && (
        <div className="flex gap-2">
          <button type="button" aria-label="Edit blok" onClick={() => setEditing(true)} className={iconBtn}>
            <Pencil className="size-4" />
          </button>
          <button type="button" aria-label="Hapus blok" onClick={onDelete} className={iconBtn}>
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </li>
  );
}