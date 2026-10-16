"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../../lib/animations";
import { toneStyles, type Tone } from "../../../lib/data";

type TaskItem = {
  id: number;
  title: string;
  subject: string;
  className: string;
  blocks: number;
  progress: number;
  tone: Tone;
};

const studentTasks: TaskItem[] = [
  {
    id: 2,
    title: "Menjaga Ekosistem Mangrove",
    subject: "Bahasa Indonesia",
    className: "Bahasa 8A",
    blocks: 7,
    progress: 20,
    tone: "blue",
  },
  {
    id: 3,
    title: "Memahami Teks Argumentasi",
    subject: "Bahasa Indonesia",
    className: "Bahasa 8A",
    blocks: 5,
    progress: 49,
    tone: "rose",
  },
];

function TaskCard({ id, title, subject, className, blocks, progress, tone }: TaskItem) {
  const s = toneStyles[tone];
  return (
    <motion.article
      variants={fadeUp}
      className="flex items-center gap-5 rounded-3xl border border-neutral-200 bg-white p-6"
    >
      {/* Icon */}
      <div className={`grid size-14 shrink-0 place-items-center rounded-2xl ${s.soft}`}>
        <BookOpen className="size-6" strokeWidth={1.75} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${s.icon}`}>{subject}</p>
        <p className="mt-0.5 text-lg font-semibold text-neutral-900 truncate">{title}</p>
        <p className="mt-0.5 text-sm text-neutral-500">
          {className} · {blocks} blok penalaran
        </p>

        {/* Progress */}
        <div className="mt-3 flex items-center gap-3">
          <p className="text-xs text-neutral-500 shrink-0">Progress</p>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200"
          >
            <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${progress}%` }} />
          </div>
          <span className={`text-xs font-semibold ${s.icon}`}>{progress}%</span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/student/assignments/${id}`}
        aria-label={`Lanjutkan ${title}`}
        className="shrink-0 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
      >
        Lanjutkan <ArrowRight className="size-4" />
      </Link>
    </motion.article>
  );
}

export default function TaskList() {
  return (
    <section className="flex-1 min-w-0">
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {studentTasks.map((t) => (
          <TaskCard key={t.id} {...t} />
        ))}
      </motion.div>
    </section>
  );
}
