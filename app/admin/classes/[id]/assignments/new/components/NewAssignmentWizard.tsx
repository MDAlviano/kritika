"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import Header from "@/app/admin/components/header";
import type { Draft } from "../draft";
import MaterialForm from "./Materialform";
import ReviewDraft from "./review/ReviewDraft";
import Stepper from "./Stepper";
import TipsCard from "./Tipscard";

export default function NewAssignmentWizard() {
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [draft, setDraft] = useState<Draft | null>(null);

  function handleGenerate(d: Draft) {
    setDraft(d);
    setStep(2);
    window.scrollTo({ top: 0 });
  }

  function handlePublish() {
    setStep(3);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <Header
        title="Buat tugas baru"
        subtitle={
          step === 1
            ? "Ubah materi yang Anda miliki menjadi latihan membaca aktif."
            : step === 2
              ? "Tinjau dan sesuaikan draft dari AI sebelum dibagikan ke kelas."
              : "Tugas berhasil dibuat dan siap dibagikan ke siswa."
        }
      />

      <div hidden={step !== 1}>
        <main className="space-y-6 px-8 py-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/admin" className="hover:text-neutral-800">
              Beranda
            </Link>
            <ChevronRight className="size-3" aria-hidden />
            <Link href={`/teacher/classes/${id}`} className="font-semibold text-neutral-800">
              Detail kelas
            </Link>
          </nav>

          <Stepper current={1} />

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_280px]">
            <MaterialForm onGenerate={handleGenerate} />
            <TipsCard />
          </div>
        </main>
      </div>

      {step === 2 && draft && (
        <ReviewDraft
          draft={draft}
          onChange={setDraft}
          onBack={() => setStep(1)}
          onPublish={handlePublish}
        />
      )}

      {step === 3 && draft && (
        <main className="px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <Stepper current={3} />

            <div className="mt-8 rounded-[28px] border border-neutral-200 bg-white p-8 shadow-[0_10px_28px_-24px_rgba(15,23,42,0.22)]">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(1.8rem,2vw,2.3rem)] font-medium tracking-[-0.02em] text-neutral-900">
                    Ringkasan Publikasi Tugas
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    Periksa kembali detail tugas sebelum dibagikan ke siswa.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
                >
                  <ChevronRight className="size-4 rotate-180" aria-hidden />
                  Ubah materi
                </button>
              </div>

              <div className="grid items-stretch gap-6 lg:grid-cols-[1.7fr_0.9fr]">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        Judul tugas
                      </p>
                      <h3 className="mt-3 text-[2rem] font-medium tracking-[-0.04em] text-neutral-800">
                        {draft.title}
                      </h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Kelas tujuan
                        </p>
                        <p className="mt-2 text-xl font-semibold text-neutral-800">{draft.kelas}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Batas waktu
                        </p>
                        <p className="mt-2 text-xl font-semibold text-neutral-800">
                          {new Date(draft.deadline).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          , {String(new Date(draft.deadline).getHours()).padStart(2, "0")}.{String(new Date(draft.deadline).getMinutes()).padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                        Komponen blok
                      </p>
                      <p className="mt-2 text-lg font-semibold text-neutral-800">
                        {draft.blocks.length} Blok Pembelajaran ({draft.blocks.length} Klaim)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-sky-200 p-6">
                  <div className="mb-4 flex">
                    <div className="grid size-12 place-items-center rounded-full bg-sky-100 text-sky-700 shadow-inner shadow-sky-200/80">
                      <Sparkles className="size-5" aria-hidden />
                    </div>
                  </div>

                  <h3 className="text-[1.65rem] font-medium tracking-[-0.03em] text-neutral-800">
                    Siap Dibagikan!
                  </h3>

                  <ul className="mt-6 space-y-4 text-sm text-neutral-700">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span>Isi tugas akan otomatis mengirimkan notifikasi kepada siswa.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      <span>Progress dan skor siswa akan terlihat secara real-time.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-neutral-300 bg-white px-7 py-3 text-base font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Draft
                </button>
                <Link
                  href={`/admin/classes/${id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-800"
                >
                  Publikasikan
                  <ChevronRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}