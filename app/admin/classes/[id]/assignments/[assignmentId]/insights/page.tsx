import { notFound } from "next/navigation";
import Header from "@/app/admin/components/header";
import { getAssignmentDetail } from "../data";
import DownloadReportButton from "./components/DownloadReportButton";
import ErrorPatterns from "./components/ErrorPatterns";
import InsightStats from "./components/InsightStats";
import ScoreDistribution from "./components/ScoreDistribution";
import { getInsights } from "./data";

export default async function AssignmentInsightsPage({
  params,
}: {
  params: Promise<{ id: string; assignmentId: string }>;
}) {
  const { assignmentId } = await params;

  const detail = getAssignmentDetail(assignmentId);
  const insights = getInsights(assignmentId);
  if (!detail || !insights) notFound();

  return (
    <>
      <Header
        title="Insight kelas"
        subtitle="Pahami pola jawaban dan tentukan tindak lanjut pembelajaran."
      />

      <main className="space-y-6 px-8 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
              {detail.className}
            </span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight">{detail.title}</h2>
            <p className="mt-1 text-[11px] text-neutral-500">
              Ditutup {detail.endsAt} · {detail.total} siswa
            </p>
          </div>
          <DownloadReportButton />
        </div>

        <nav aria-label="Bagian insight" className="border-b border-neutral-200">
          <span
            aria-current="page"
            className="-mb-px inline-block border-b-2 border-blue-700 px-1 pb-3 text-xs font-medium text-blue-700"
          >
            Ringkasan
          </span>
        </nav>

        <InsightStats detail={detail} insights={insights} />

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ScoreDistribution buckets={insights.buckets} />
          <ErrorPatterns patterns={insights.patterns} total={detail.submitted} />
        </div>
      </main>
    </>
  );
}