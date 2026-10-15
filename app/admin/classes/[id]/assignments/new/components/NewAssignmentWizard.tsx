"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/app/admin/components/header";
import type { Draft } from "../draft";
import MaterialForm from "./Materialform";
import ReviewDraft from "./review/ReviewDraft";
import Stepper from "./Stepper";
import TipsCard from "./Tipscard";

export default function NewAssignmentWizard() {
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState<1 | 2>(1);
  const [draft, setDraft] = useState<Draft | null>(null);

  function handleGenerate(d: Draft) {
    setDraft(d);
    setStep(2);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <Header
        title="Buat tugas baru"
        subtitle={
          step === 1
            ? "Ubah materi yang Anda miliki menjadi latihan membaca aktif."
            : "Tinjau dan sesuaikan draft dari AI sebelum dibagikan ke kelas."
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
        <ReviewDraft draft={draft} onChange={setDraft} onBack={() => setStep(1)} />
      )}
    </>
  );
}