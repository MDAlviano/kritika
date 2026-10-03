"use client";

import Link from "next/link";
import { useState } from "react";

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {off ? (
        <>
          <path d="M2 10c2.5 3.5 6 5 10 5s7.5-1.5 10-5" />
          <path d="M6 14.5 4.5 17M12 15.5V18.5M18 14.5l1.5 2.5" />
        </>
      ) : (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

function Field({
  label,
  id,
  children,
  password,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  password: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium lg:text-base">
          {label}
        </label>
        <a 
          href="/lupa-password" 
          className="text-sm text-[#7B7B7B] lg:text-base"
        >
          {password}
        </a>
      </div>
      {children}
    </div>
  );
}

function PasswordInput({
  id,
  name,
  placeholder,
}: {
  id: string;
  name: string;
  placeholder: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        required
        className="h-11 w-full rounded-field border border-border bg-transparent px-4 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary lg:h-12 lg:text-base pr-12"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-foreground"
      >
        <EyeIcon off={!show} />
      </button>
    </div>
  );
}

export default function LoginForm() {

  return (
    <div className="mx-auto w-full max-w-2xl lg:mx-0">
      <h1 className="text-3xl font-bold lg:text-4xl">
        Masuk ke <span className="text-primary">Kritika</span>
      </h1>
      <p className="mt-2 text-sm lg:text-base">
        Selamat datang! Masukkan akun anda untuk melanjutkan.
      </p>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="Email" id="email" password="">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="yourmail@example.com"
            autoComplete="email"
            required
            className="h-11 w-full rounded-field border border-border bg-transparent px-4 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary lg:h-12 lg:text-base"
          />
        </Field>

        <Field label="Password" id="password" password="Lupa password ?">
          <PasswordInput id="password" name="password" placeholder="password" />
        </Field>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="cursor-pointer h-11 w-full shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-glow sm:flex-1 transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:h-12 lg:text-base"
          >
            Masuk Sekarang
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm">
        Belum punya akun?{" "}
        <Link href="register" className="text-link hover:underline">
          Daftar sekarang.
        </Link>
      </p>
    </div>
  );
}