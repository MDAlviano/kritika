import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Kritika",
  description: "Maaf, halaman yang kamu cari tidak dapat ditemukan atau sudah dipindahkan.",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* 404 Graphic Illustration */}
      <div className="relative w-64 sm:w-80 md:w-[380px] h-auto flex justify-center items-center">
        <Image
          src="/not-found/illustration-404.png"
          alt="404 Halaman Tidak Ditemukan"
          width={531}
          height={175}
          priority
          className="w-full h-auto object-contain select-none"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mt-6 sm:mt-8">
        Halaman Tidak Ditemukan
      </h1>

      {/* Description */}
      <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-md mx-auto">
        Maaf, halaman yang kamu cari tidak dapat ditemukan atau sudah{" "}
        <br className="hidden sm:inline" />
        dipindahkan
      </p>

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-medium px-10 py-3 text-sm sm:text-base shadow-md shadow-blue-600/30 transition-all active:scale-[0.99]"
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}
