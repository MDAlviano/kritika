import Link from "next/link";
import { ChevronRight, TrendingUp, Users } from "lucide-react";

type Props = {
  resultsHref: string;
  insightsHref: string;
};

export default function QuickActions({ resultsHref, insightsHref }: Props) {
  const actions = [
    { icon: Users, title: "Hasil siswa", desc: "Lihat semua submission", href: resultsHref },
    { icon: TrendingUp, title: "Insight assignment", desc: "Lihat pola kesalahan", href: insightsHref },
  ];

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-sm font-bold">Tindakan cepat</h2>

      <ul className="mt-4 divide-y divide-neutral-100">
        {actions.map(({ icon: Icon, title, desc, href }) => (
          <li key={title}>
            <Link
              href={href}
              className="flex items-center gap-3 rounded-lg py-4 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold">{title}</span>
                <span className="block text-[11px] text-neutral-500">{desc}</span>
              </span>
              <ChevronRight className="size-4 text-neutral-400" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}