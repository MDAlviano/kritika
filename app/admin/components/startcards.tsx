import { ClipboardCheck, Check, GraduationCap } from "lucide-react";

const stats = [
  {
    label: "Kelas aktif",
    value: "2",
    note: "50 Siswa",
    noteClass: "text-neutral-500",
    icon: GraduationCap,
    iconBox: "bg-blue-100 text-blue-700",
  },
  {
    label: "Rata-rata selesai",
    value: "78%",
    note: "+8% minggu ini",
    noteClass: "text-emerald-500",
    icon: Check,
    iconBox: "bg-rose-100 text-rose-500",
  },
  {
    label: "Tugas aktif",
    value: "2",
    note: "2 Perlu ditinjau",
    noteClass: "text-neutral-500",
    icon: ClipboardCheck,
    iconBox: "bg-orange-100 text-amber-600",
  },
];

export default function StatCards() {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      {stats.map(({ label, value, note, noteClass, icon: Icon, iconBox }) => (
        <div
          key={label}
          className="flex items-center gap-5 rounded-3xl border border-neutral-200 bg-white p-7"
        >
          <div className={`grid size-16 shrink-0 place-items-center rounded-xl ${iconBox}`}>
            <Icon className="size-7" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <p className="text-sm">{label}</p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-4xl font-extrabold leading-none text-black">{value}</p>
              <p className={`text-xs ${noteClass}`}>{note}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}