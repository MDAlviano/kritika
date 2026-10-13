import Link from "next/link";
import { BookOpen, Users, ArrowRight } from "lucide-react";

export type ClassTone = "blue" | "rose" | "amber";

export interface TeacherClass {
  id: string | number;
  code: string;
  name: string;
  subject: string;
  students: number;
  progress: number;
  tone: ClassTone;
  href?: string;
}

const toneStyles: Record<
  ClassTone,
  { iconBg: string; barBg: string; textColor: string }
> = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600",
    barBg: "bg-blue-600",
    textColor: "text-blue-600",
  },
  rose: {
    iconBg: "bg-rose-50 text-rose-500",
    barBg: "bg-rose-500",
    textColor: "text-rose-500",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600",
    barBg: "bg-amber-600",
    textColor: "text-amber-600",
  },
};

export default function TeacherClassCard({
  code,
  name,
  subject,
  students,
  progress,
  tone,
  href = "#",
}: TeacherClass) {
  const t = toneStyles[tone] || toneStyles.blue;

  return (
    <article className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-neutral-300">
      <div>
        {/* Top Header: Icon + Number */}
        <div className="flex items-center justify-between">
          <div
            className={`grid size-14 place-items-center rounded-2xl ${t.iconBg} transition-transform group-hover:scale-105`}
          >
            <BookOpen className="size-7" strokeWidth={1.8} />
          </div>
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-300 select-none">
            {code}
          </span>
        </div>

        {/* Content: Name + Subject */}
        <div className="mt-6">
          <h3 className="text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-blue-700 transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-neutral-500 font-normal">
            {subject}
          </p>
        </div>

        {/* Students count */}
        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Users className="size-4 text-neutral-400" />
          <span>{students} Siswa</span>
        </div>

        {/* Progress section */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-neutral-500 font-normal">Progress kelas</span>
            <span className="font-semibold text-neutral-700">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${t.barBg}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer: Detail Link */}
      <div className="mt-6 border-t border-neutral-100 pt-4">
        <Link
          href={href}
          className={`flex items-center justify-between text-xs font-semibold ${t.textColor} group-hover:underline`}
        >
          <span>Lihat detail kelas</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
