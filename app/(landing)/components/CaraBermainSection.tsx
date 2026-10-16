"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "../../lib/animations";

export default function CaraBermainSection() {
  return (
    <section id="cara-kerja" className="relative bg-[#f8f9fa] py-16 sm:py-24 px-6 overflow-hidden">
      {/* Background grid continuity */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/landing/bg-grid.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 sm:mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block text-xs font-semibold text-blue-700 border border-blue-200/90 bg-blue-50/80 px-3.5 py-1 rounded-full mb-3.5 shadow-2xs">
              Cara bermain
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-extrabold tracking-tight leading-snug">
              <span className="text-blue-700">Pecahkan masalah </span>
              <span className="text-neutral-900">dalam 3 langkah!</span>
            </h2>
            <p className="mt-3 text-neutral-500 max-w-md text-sm leading-relaxed">
              Seperti menyusun puzzle, setiap langkah membantumu melihat
              masalah dengan lebih jernih.
            </p>
          </motion.div>

          {/* Right: users-joined badge */}
          <motion.div variants={fadeUp} className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <Image
              src="/landing/users-joined.png"
              alt="Profil pelajar bergabung"
              width={100}
              height={40}
              className="object-contain"
            />
            <p className="text-xs sm:text-sm text-neutral-500 text-left sm:text-right leading-snug">
              <span className="font-bold text-neutral-800">500rb+</span> Pelajar sudah<br className="hidden sm:inline" /> bergabung
            </p>
          </motion.div>
        </motion.div>

        {/* 3 steps image */}
        <motion.div
          className="w-full max-w-5xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Image
            src="/landing/steps.png"
            alt="3 langkah cara bermain Kritika"
            width={1200}
            height={480}
            className="w-full h-auto object-contain drop-shadow-2xs select-none"
            priority
          />
        </motion.div>

        {/* Divider text */}
        <motion.p
          className="mt-14 sm:mt-16 text-center text-sm text-neutral-500"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          Tumbuh bersama{" "}
          <span className="font-bold text-blue-700">1.000+</span> mitra edukasi &amp;
          organisasi pembelajaran di Indonesia
        </motion.p>
      </div>
    </section>
  );
}
