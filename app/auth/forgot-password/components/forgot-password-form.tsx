"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-xl lg:mx-0">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Lupa Kata Sandi?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base max-w-md">
        Masukkan alamat email yang terdaftar untuk menerima tautan pengaturan
        ulang kata sandi.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-900 sm:text-base"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourmail@example.com"
            autoComplete="email"
            required
            className="h-12 w-full rounded-lg border border-neutral-300 bg-transparent px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-base transition-colors"
          />
        </div>

        {/* Centered CTA Pill Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-medium px-8 py-3 text-sm sm:text-base shadow-md shadow-blue-600/30 transition-all active:scale-[0.99]"
          >
            Daftar sebagai Siswa
          </button>
        </div>
      </form>

      {/* Back to login link */}
      <p className="mt-8 text-center text-sm text-neutral-700 sm:text-base">
        Ingat kata sandi ?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:underline font-normal"
        >
          Kembali ke halaman masuk
        </Link>
      </p>
    </div>
  );
}
