import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { statusStyles, type StudentResult } from "../data";

type Props = {
  students: StudentResult[];
  baseHref: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export default function StudentTable({ students, baseHref }: Props) {
  return (
    <section className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
      <table className="w-full min-w-[640px] text-left">
        <thead className="bg-neutral-50">
          <tr className="text-[11px] font-medium text-neutral-500">
            <th scope="col" className="px-6 py-4 font-medium">
              Nama siswa
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Status
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Skor
            </th>
            <th scope="col" className="px-3 py-4 font-medium">
              Waktu
            </th>
            <th scope="col" className="w-12 px-3 py-4">
              <span className="sr-only">Detail</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-100">
          {students.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-neutral-500">
                Belum ada submission.
              </td>
            </tr>
          )}

          {students.map((s) => {
            const st = statusStyles[s.status];
            return (
              <tr key={s.id} className="relative hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-7 place-items-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700"
                    >
                      {initials(s.name)}
                    </span>
                    <Link
                      href={`${baseHref}/${s.id}`}
                      className="text-xs font-bold after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                    >
                      {s.name}
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span
                    className={`block w-36 rounded-xl px-3 py-2.5 text-center text-[11px] font-semibold ${st.pill}`}
                  >
                    {st.label}
                  </span>
                </td>
                <td
                  className={`px-3 py-4 text-xs font-bold ${
                    s.score !== null && s.score < 60 ? "text-rose-600" : ""
                  }`}
                >
                  {s.score ?? "—"}
                </td>
                <td className="px-3 py-4 text-xs text-neutral-600">
                  {s.minutes === null ? "—" : `${s.minutes} menit`}
                </td>
                <td className="px-3 py-4">
                  <ChevronRight className="size-4 text-neutral-400" aria-hidden />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}