"use client";

import { useState, type DragEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { generateDraftStub, type Draft } from "../draft";
import { ArrowUp, BookOpen, FileText, Sparkles, X } from "lucide-react";

const MAX_MB = 10;
const MIN_TEXT = 100;
const kelasOptions = ["IPA 8A", "IPA 8B", "Bahasa 7B"];

type Source = "upload" | "paste";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-blue-700";

function validate(f: File): string | null {
  if (!/\.(pdf|docx)$/i.test(f.name)) return "Format file harus PDF atau DOCX.";
  if (f.size > MAX_MB * 1024 * 1024) return `Ukuran file maksimal ${MAX_MB} MB.`;
  return null;
}

export default function MaterialForm({ onGenerate }: { onGenerate: (draft: Draft) => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [kelas, setKelas] = useState(kelasOptions[0]);
  const [deadline, setDeadline] = useState("");
  const [source, setSource] = useState<Source>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function pick(f: File | undefined) {
    if (!f) return;
    const err = validate(f);
    setError(err);
    setFile(err ? null : f);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files?.[0]);
  }

  const hasMaterial = source === "upload" ? !!file : text.trim().length >= MIN_TEXT;
  const canSubmit = title.trim() !== "" && deadline !== "" && hasMaterial;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      // TODO: ganti generateDraftStub dengan request ke API AI Anda
      // (kirim file / teks materi, lalu `await` hasilnya).
      const draft = generateDraftStub({ title: title.trim(), kelas, deadline });
      onGenerate(draft); // pindah ke langkah 2 tanpa ganti halaman
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-5">
        <div className="grid size-9 place-items-center rounded-lg bg-blue-100 text-blue-700">
          <BookOpen className="size-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-bold">Materi pembelajaran</h2>
          <p className="text-xs text-neutral-500">Tambahkan bacaan yang akan digunakan siswa.</p>
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div>
          <label htmlFor="judul" className="text-xs font-medium text-neutral-600">
            Judul tugas
          </label>
          <input
            id="judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Mengapa banjir terjadi?"
            className={inputCls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="kelas" className="text-xs font-medium text-neutral-600">
              Kelas
            </label>
            <select
              id="kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className={inputCls}
            >
              {kelasOptions.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="deadline" className="text-xs font-medium text-neutral-600">
              Batas waktu
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Sumber materi */}
        <div>
          <p className="text-xs font-medium text-neutral-600">Sumber materi</p>
          <div role="tablist" aria-label="Sumber materi" className="mt-2 flex gap-5 border-b border-neutral-200">
            {(
              [
                ["upload", "Upload dokumen"],
                ["paste", "Paste teks"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={source === key}
                onClick={() => setSource(key)}
                className={`-mb-px border-b-2 pb-2 text-xs font-medium focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  source === key
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {source === "upload" ? (
              file ? (
                <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                  <FileText className="size-5 text-blue-700" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Hapus file"
                    onClick={() => setFile(null)}
                    className="rounded-md p-1 text-neutral-500 hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors focus-within:outline-2 focus-within:outline-blue-700 ${
                    dragging
                      ? "border-blue-700 bg-blue-50"
                      : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="sr-only"
                    onChange={(e) => pick(e.target.files?.[0])}
                  />
                  <span className="grid size-9 place-items-center rounded-full bg-blue-100 text-blue-700">
                    <ArrowUp className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold">
                    Tarik dokumen ke sini, atau klik untuk memilih
                  </span>
                  <span className="text-xs text-neutral-500">
                    PDF atau DOCX · Maksimal {MAX_MB} MB · Disarankan dokumen berbasis teks
                  </span>
                </label>
              )
            ) : (
              <div>
                <label htmlFor="teks" className="sr-only">
                  Teks bacaan
                </label>
                <textarea
                  id="teks"
                  rows={9}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tempel teks bacaan di sini…"
                  className="w-full resize-y rounded-xl border border-neutral-300 px-3 py-3 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
                />
                <p className="mt-1 text-right text-xs text-neutral-500">
                  {text.trim().length} / min. {MIN_TEXT} karakter
                </p>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-2 text-xs text-rose-600">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 px-6 pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="size-4" aria-hidden />{" "}
          {loading ? "Membuat draft…" : "Generate draft"}
        </button>
      </div>
    </form>
  );
}