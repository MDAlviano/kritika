import Link from "next/link";
import { notFound } from "next/navigation";
import { ChartColumn } from "lucide-react";
import Header from "@/app/admin/components/header";
import { getAssignmentDetail } from "../data";
import StudentTable from "./components/StudentTable";
import SummaryCards from "./components/SummaryCards";
import { getResults } from "./data";

export default async function AssignmentResultsPage({
  params,
}: {
  params: Promise<{ id: string; assignmentId: string }>;
}) {
  const { id, assignmentId } = await params;

  const detail = getAssignmentDetail(assignmentId);
  const results = getResults(assignmentId);
  if (!detail || !results) notFound();

  const base = `/teacher/classes/${id}/assignments/${assignmentId}`;

  return (
    <>
      <Header
        title="Hasil assignment"
        subtitle="Pantau skor dan waktu pengerjaan setiap siswa."
      />

      <main className="space-y-6 px-8 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
              {detail.className}
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {detail.submitted} dari {detail.total} siswa sudah selesai
            </h2>
            <p className="mt-1 text-[11px] text-neutral-500">{results.updatedNote}</p>
          </div>

          <Link
            href={`${base}/insights`}
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Buka insight <ChartColumn className="size-4" aria-hidden />
          </Link>
        </div>

        <SummaryCards results={results} />
        <StudentTable students={results.students} baseHref={`${base}/results`} />
      </main>
    </>
  );
}