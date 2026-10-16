import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/app/admin/components/header";
import { statusStyles } from "../data";
import LearningStructure from "./components/LearningStructure";
import QuickActions from "./components/QuickActions";
import StatsOverview from "./components/StatsOverview";
import { getAssignmentDetail } from "./data";

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string; assignmentId: string }>;
}) {
  const { id, assignmentId } = await params;

  const detail = getAssignmentDetail(assignmentId);
  if (!detail) notFound();

  const base = `/teacher/classes/${id}/assignments/${assignmentId}`;
  const status = statusStyles[detail.status];

  return (
    <>
      <Header
        title="Detail tugas"
        subtitle="Pantau progres dan hasil tugas membaca aktif."
      />

      <main className="space-y-6 px-8 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href={`/teacher/classes/${id}/assignments`} className="hover:text-neutral-800">
            Tugas
          </Link>
          <ChevronRight className="size-3" aria-hidden />
          <span aria-current="page" className="font-semibold text-neutral-800">
            {detail.title}
          </span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${status.badge}`}>
              {status.label}
            </span>
            <h2 className="mt-2 text-3xl font-medium tracking-tight">{detail.title}</h2>
            <p className="mt-1 text-xs text-neutral-500">
              {detail.className}
              {detail.publishedAt && ` · Dipublikasikan ${detail.publishedAt}`}
              {` · Berakhir ${detail.endsAt}`}
            </p>
          </div>

          <Link
            href={`${base}/results`}
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Lihat hasil <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <StatsOverview detail={detail} />

        <div className="grid items-start gap-6 lg:grid-cols-[2.4fr_1fr]">
          <LearningStructure detail={detail} reviewHref={`${base}/review`} />
          <QuickActions resultsHref={`${base}/results`} insightsHref={`${base}/insights`} />
        </div>
      </main>
    </>
  );
}