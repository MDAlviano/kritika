"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { formatDeadline, saveDraft, type Block, type Draft } from "../../draft";
import BlockPanel from "./BlockPanel";
import SourcePanel from "./SourcePanel";
import Stepper from "../Stepper";

type Props = {
  draft: Draft;
  onChange: (draft: Draft) => void;
  onBack: () => void;
};

export default function ReviewDraft({ draft, onChange, onBack }: Props) {
  const { id } = useParams<{ id: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Pindahkan fokus ke judul saat langkah 2 muncul (membantu pembaca layar)
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const blocks = draft.blocks;
  const setBlocks = (blocks: Block[]) => onChange({ ...draft, blocks });

  const updateBlock = (blockId: string, patch: Partial<Block>) =>
    setBlocks(blocks.map((x) => (x.id === blockId ? { ...x, ...patch } : x)));

  const deleteBlock = (blockId: string) => setBlocks(blocks.filter((x) => x.id !== blockId));

  const addBlock = () =>
    setBlocks([...blocks, { id: `b-${Date.now()}`, type: "klaim", paragraph: 1, text: "" }]);

  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length || from === to) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setBlocks(next);
  };

  function onSave() {
    saveDraft(draft); // TODO: ganti dengan request simpan ke API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const highlight = blocks.find((b) => b.id === selectedId)?.paragraph ?? null;
  const deadline = formatDeadline(draft.deadline);

  return (
    <main className="px-8 py-8">
      <div className="mb-6">
        <Stepper current={2} />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded text-xs text-neutral-500 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Ubah materi
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-amber-700">
            <Sparkles className="size-3" aria-hidden /> Draft
          </span>
          <h2
            ref={titleRef}
            tabIndex={-1}
            className="mt-3 text-3xl font-bold tracking-tight outline-none"
          >
            {draft.title}
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            {draft.kelas}
            {deadline && ` · Berakhir ${deadline}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span role="status" className="text-xs text-emerald-600">
            {saved ? "Draft tersimpan" : ""}
          </span>
          <button
            type="button"
            onClick={onSave}
            className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-sm font-semibold hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            Simpan draft
          </button>
          <Link
            // Langkah 3 (Publikasikan) — belum dibuat
            href={`/teacher/classes/${id}/assignments/new/publish`}
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Lihat hasil <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[5fr_6fr]">
        <SourcePanel
          objective={draft.objective}
          paragraphs={draft.paragraphs}
          highlight={highlight}
        />
        <BlockPanel
          blocks={blocks}
          paragraphCount={draft.paragraphs.length}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={updateBlock}
          onDelete={deleteBlock}
          onAdd={addBlock}
          onReorder={reorder}
        />
      </div>
    </main>
  );
}