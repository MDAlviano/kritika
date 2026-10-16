import { Check, Clock, Star } from "lucide-react";
import type { AssignmentDetail } from "../../data";
import type { InsightsData } from "../data";

type Props = {
  detail: AssignmentDetail;
  insights: InsightsData;
};

export default function InsightStats({ detail, insights }: Props) {
  const completion = detail.total ? Math.round((detail.submitted / detail.total) * 100) : 0;

  const delta =
    insights.scoreDelta === null
      ? null
      : `${insights.scoreDelta >= 0 ? "+" : "−"}${Math.abs(insights.scoreDelta)} dari tugas lalu`;

  const cards = [
    {
      label: "Sudah selesai",
      extra: `${completion}% completion`,
      value: String(detail.submitted),
      unit: `/ ${detail.total} siswa`,
      icon: Check,
      iconBox: "bg-green-100",
      iconClass: "size-5 text-green-600",
      strokeWidth: 3,
    },
    {
      label: "Rata-rata skor",
      extra: delta,
      value: insights.averageScore === null ? "—" : String(insights.averageScore),
      unit: "/ 100",
      icon: Star,
      iconBox: "bg-orange-100",
      iconClass: "size-5 fill-amber-600 text-amber-600",
      strokeWidth: 2,
    },
    {
      label: "Rata-rata waktu",
      extra: insights.timeRange ? `Rentang ${insights.timeRange}` : null,
      value: insights.averageMinutes === null ? "—" : String(insights.averageMinutes),
      unit: "menit",
      icon: Clock,
      iconBox: "bg-blue-100",
      iconClass: "size-5 fill-blue-700 text-white",
      strokeWidth: 2,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map(({ label, extra, value, unit, icon: Icon, iconBox, iconClass, strokeWidth }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-5"
        >
          <div>
            <p className="text-[10px] text-neutral-500">
              {label}
              {extra && <span className="font-semibold text-emerald-600"> · {extra}</span>}
            </p>
            <p className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs text-neutral-500">{unit}</span>
            </p>
          </div>
          <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${iconBox}`}>
            <Icon className={iconClass} strokeWidth={strokeWidth} aria-hidden />
          </span>
        </div>
      ))}
    </section>
  );
}