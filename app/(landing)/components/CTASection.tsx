"use client";

import Image from "next/image";
import Link from "next/link";
import { Puzzle, Lightbulb, Search } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, slideInRight, staggerContainer, viewportOnce } from "../../lib/animations";

const features = [
  { icon: Puzzle, label: "Tantangan interaktif" },
  { icon: Lightbulb, label: "Berbasis masalah nyata" },
  { icon: Search, label: "Melatih bukti & alasan" },
];

export default function CTASection() {
  return (
    <section id="keunggulan" className="relative bg-[#1d4ed8] overflow-hidden py-20 sm:py-28 px-6">
      {/* Background grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="grid-pattern-blue" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.75" />
            <path d="M 38 40 L 42 40 M 40 38 L 40 42" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-blue)" />
      </svg>

      {/* Decorative ambient glow circles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-blue-600/30 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left column content */}
        <motion.div
          className="text-white"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span variants={fadeUp} className="text-sm font-bold text-[#f97316] mb-3.5 block tracking-wide">
            Coba langsung
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-[2.65rem] font-extrabold leading-[1.2] tracking-tight mb-5 text-white">
            Susun potongannya.<br />
            Hubungkan idenya.<br />
            Lihat apa yang kamu temukan
          </motion.h2>
          <motion.p variants={fadeUp} className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-md mb-8">
            Setiap tantangan mengajak siswa memahami masalah, menemukan bukti,
            menghubungkan alasan, dan menguji kesimpulannya.
          </motion.p>

          {/* Features list */}
          <motion.ul variants={staggerContainer} className="flex flex-col gap-4 mb-10">
            {features.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={fadeUp}
                className="flex items-center gap-3.5 text-sm sm:text-base font-medium text-white"
              >
                <div className="w-9 h-9 rounded-xl bg-white text-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="size-4.5" strokeWidth={2.25} />
                </div>
                <span>{label}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Demo CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/teacher"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100 font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md"
            >
              👨‍🏫 Lihat Dashboard Guru
            </Link>
            <Link
              href="/student/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white hover:bg-white/20 font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              🎒 Lihat Tampilan Siswa
            </Link>
          </motion.div>
        </motion.div>

        {/* Right column: image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="relative w-full max-w-lg lg:max-w-xl">
            <Image
              src="/landing/coba-langsung-right-panel.png"
              alt="Preview tampilan soal Kritika"
              width={560}
              height={480}
              className="w-full h-auto object-contain drop-shadow-2xl select-none"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
