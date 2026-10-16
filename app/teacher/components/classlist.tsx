import Link from "next/link";
import ClassCard from "./classcard";
import { classes } from "../../lib/data";

export default function ClassList() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Kelas Anda</h2>
      <p className="mt-1 text-neutral-500">Pantau aktivitas dan perkembangan setiap kelas.</p>

      <div className="-mr-8 mt-6 flex gap-6 overflow-x-auto pb-3 pr-8">
        {classes.map((c) => (
          // Outer link navigates to class detail on card body click;
          // the inner "Edit"/"Hapus" buttons stop propagation so they work independently.
          <Link
            key={c.id}
            href={`/teacher/classes/${c.id}`}
            className="block shrink-0 rounded-3xl focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <ClassCard {...c} />
          </Link>
        ))}
      </div>
    </section>
  );
}
