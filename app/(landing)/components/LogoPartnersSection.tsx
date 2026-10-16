"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainerSlow, viewportOnce } from "../../lib/animations";

const partners = [
  {
    name: "Tut Wuri Handayani",
    src: "/landing/tutwuri.png",
    width: 120,
    height: 80,
    className: "h-16 sm:h-20 w-auto",
  },
  {
    name: "Indonesia Mengajar",
    src: "/landing/indonesia-mengajar.png",
    width: 160,
    height: 80,
    className: "h-14 sm:h-16 md:h-18 w-auto",
  },
  {
    name: "Ganesha Operation",
    src: "/landing/ganesha-op.png",
    width: 120,
    height: 80,
    className: "h-14 sm:h-16 md:h-18 w-auto",
  },
  {
    name: "Google for Education",
    src: "/landing/google-edu.png",
    width: 180,
    height: 70,
    className: "h-12 sm:h-14 md:h-16 w-auto",
  },
  {
    name: "Kitabisa",
    src: "/landing/kitabisa.png",
    width: 140,
    height: 70,
    className: "h-14 sm:h-16 md:h-18 w-auto",
  },
];

export default function LogoPartnersSection() {
  return (
    <section className="bg-white border-y border-neutral-200/70 py-12 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-wrap items-center justify-center sm:justify-between gap-10 sm:gap-12 md:gap-16"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={fadeIn}
              className="group flex items-center justify-center flex-1 min-w-[140px] sm:min-w-0"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className={`object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-2xs ${partner.className}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
