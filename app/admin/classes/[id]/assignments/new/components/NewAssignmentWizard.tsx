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

      {/* Langkah 1 tetap ter-mount (hanya disembunyikan) supaya isian form tidak hilang saat kembali */}
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

      {/* Langkah 2 */}
      {step === 2 && draft && (
        <ReviewDraft
          draft={draft}
          onChange={setDraft}
          onBack={() => setStep(1)}
          onPublish={handlePublish}
        />
      )}

      {/* Langkah 3 */}
      {step === 3 && draft && (
        <main className="px-8 py-8">
          <div className="mx-auto max-w-5xl">
            <Stepper current={3} />

            <div className="mt-8 p-8">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                  <Sparkles className="size-3.5" aria-hidden />
                  Tugas terkirim
                </span>

                <div className="mt-6 grid size-28 place-items-center rounded-full bg-gradient-to-br from-blue-700 via-indigo-600 to-cyan-500 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.8)]">
                  <Check className="size-12 text-white" strokeWidth={2.8} />
                </div>

                <h1 className="mt-6 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
                  Selesai
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
                  Tugas <span className="font-semibold text-neutral-800">{draft.title}</span> sudah
                  dipublikasikan ke kelas <span className="font-semibold text-neutral-800">{draft.kelas}</span>
                  dan siap dikerjakan siswa.
                </p>

                <div className="mt-8">
                  <Link
                    href={`/admin/classes/${id}`}
                    className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    Kembali ke kelas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}