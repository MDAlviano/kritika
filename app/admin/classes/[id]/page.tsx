import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  Target,
  Users,
} from "lucide-react";
import Header from "../../components/header";
import { classDetails } from "./data";

const toneClasses = {
  blue: { icon: "bg-blue-50 text-blue-600", assignment: "bg-blue-50 text-blue-600" },
  rose: { icon: "bg-rose-50 text-rose-500", assignment: "bg-rose-50 text-rose-500" },
  amber: { icon: "bg-orange-50 text-amber-600", assignment: "bg-orange-50 text-amber-600" },
};

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const classDetail = classDetails[id];

  return {
    title: classDetail ? `${classDetail.name} - Kritika Guru` : "Kelas Tidak Ditemukan - Kritika Guru",
    description: "Kelola siswa dan aktivitas pembelajaran kelas.",
  };
}

export default async function ClassDetailPage({ params }: PageProps) {
  const { id } = await params;
  const classDetail = classDetails[id];

  if (!classDetail) notFound();

  const tone = toneClasses[classDetail.tone];

  return (
    <>
      <Header
        title="Buat kelas baru"
        subtitle="Kelola kelas, siswa, dan aktivitas pembelajaran."
      />

      <main className="min-h-[calc(100vh-90px)] bg-[#f8f9fa] px-6 py-8 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm">
          <Link href="/admin/classes" className="text-neutral-500 transition-colors hover:text-blue-700">
            Daftar kelas
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span className="font-semibold text-neutral-900">{classDetail.name}</span>
        </nav>

        <section className="flex flex-col gap-5 rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-50 to-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/70 text-blue-700 sm:size-14">
              <BookOpen className="size-7" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500">Kode kelas</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-neutral-800">{classDetail.code}</p>
                <button aria-label={`Salin kode ${classDetail.code}`} className="text-blue-700">
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
          <button className="self-start rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 sm:self-auto">
            + Buat assignment
          </button>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard icon={Users} label="Total siswa" value={classDetail.students} tone={tone.icon} />
          <StatCard icon={BookOpen} label="Assignment" value={classDetail.assignments} tone={tone.icon} />
          <StatCard icon={Check} label="Rata-rata selesai" value={`${classDetail.averageCompletion}%`} tone={tone.icon} />
          <StatCard icon={Target} label="Rata-rata skor" value={classDetail.averageScore} tone={tone.icon} />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.9fr)]">
          <div className="rounded-2xl border border-neutral-200 bg-white">
            <PanelHeading title="Assignment terbaru" subtitle="Aktivitas kelas saat ini." action="Lihat semua" />
            <div className="px-5">
              {classDetail.recentAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center gap-3 border-t border-neutral-100 py-5 first:border-t-0">
                  <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${toneClasses[assignment.tone].assignment}`}>
                    <BookOpen className="size-6" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-800">{assignment.title}</p>
                    <p className="mt-1 text-xs text-neutral-500">{assignment.status}</p>
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">{assignment.progress}%</span>
                  <ChevronRight className="size-5 shrink-0 text-neutral-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white">
            <PanelHeading title="Siswa" subtitle="Aktivitas terbaru." />
            <div className="px-5">
              {classDetail.recentStudents.map((student) => (
                <div key={student.id} className="flex items-center gap-3 border-t border-neutral-100 py-3 first:border-t-0">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-[10px] font-medium text-blue-600">
                    {student.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-800">{student.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{student.activity}</p>
                  </div>
                  {student.online && <span aria-label="Sedang aktif" className="size-1.5 rounded-full bg-emerald-500" />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 sm:gap-4 sm:p-4">
      <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}>
        <Icon className="size-6" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[9px] text-neutral-500 sm:text-[10px]">{label}</p>
        <p className="mt-1 text-lg font-bold leading-none text-neutral-800 sm:text-xl">{value}</p>
      </div>
    </div>
  );
}

function PanelHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: string;
}) {
  return (
    <div className="flex items-start justify-between px-5 pb-4 pt-4">
      <div>
        <h2 className="text-base font-bold text-neutral-800">{title}</h2>
        <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>
      </div>
      {action && <button className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700">{action}</button>}
    </div>
  );
}

