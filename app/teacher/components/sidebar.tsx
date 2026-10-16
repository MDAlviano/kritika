"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleHelp, FileText, House, LogOut, User, X } from "lucide-react";
import { useState } from "react";

const menu = [
  { label: "Beranda", href: "/teacher", icon: House },
  { label: "Daftar kelas", href: "/teacher/classes", icon: FileText },
  { label: "Akun", href: "/teacher/akun", icon: User },
];

function NavItem({
  label,
  href,
  icon: Icon,
  active,
}: {
  label: string;
  href: string;
  icon: typeof House;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-r-lg border-l-4 px-4 py-3 text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 ${
        active
          ? "border-blue-700 bg-blue-50 text-blue-700"
          : "border-transparent text-neutral-500 hover:bg-neutral-50"
      }`}
    >
      <Icon className="size-6" strokeWidth={1.75} />
      {label}
    </Link>
  );
}

// ─── Logout Confirm Dialog ────────────────────────────────────────────────────

function LogoutDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  function handleLogout() {
    router.push("/auth/login");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative mx-4 w-full max-w-sm rounded-3xl bg-white px-8 py-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 hover:bg-neutral-50"
        >
          <X className="size-4" />
        </button>

        <div className="flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <LogOut className="size-6" strokeWidth={1.75} />
        </div>

        <h2
          id="logout-dialog-title"
          className="mt-5 text-xl font-bold text-neutral-900"
        >
          Keluar dari akun?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Kamu akan keluar dari sesi mengajar sekarang.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full rounded-full bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-red-500"
          >
            Ya, keluar
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <aside className="hidden w-65 shrink-0 border-r border-neutral-200 bg-white px-2 py-8 lg:block">
        <div className="px-4 pb-8 text-3xl font-extrabold tracking-tight text-blue-700">
          Kritika
        </div>

        <p className="px-4 pb-3 text-sm text-neutral-500">MENU</p>
        <nav className="space-y-1">
          {menu.map((m) => {
            const isActive =
              m.href === "/teacher"
                ? pathname === "/teacher"
                : pathname.startsWith(m.href);
            return <NavItem key={m.href} {...m} active={isActive} />;
          })}
        </nav>

        <p className="px-4 pb-3 pt-10 text-sm text-neutral-500">GENERAL</p>
        <nav className="space-y-1">
          {/* Bantuan → mailto */}
          <a
            href="mailto:bantuan@kritika.id"
            title="Hubungi bantuan: bantuan@kritika.id"
            className="flex items-center gap-3 rounded-r-lg border-l-4 border-transparent px-4 py-3 text-lg font-medium text-neutral-500 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <CircleHelp className="size-6" strokeWidth={1.75} />
            Bantuan
          </a>

          {/* Keluar → confirmation dialog */}
          <button
            onClick={() => setShowLogout(true)}
            className="flex w-full items-center gap-3 rounded-r-lg border-l-4 border-transparent px-4 py-3 text-lg font-medium text-neutral-500 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <LogOut className="size-6" strokeWidth={1.75} />
            Keluar
          </button>
        </nav>
      </aside>

      {showLogout && <LogoutDialog onClose={() => setShowLogout(false)} />}
    </>
  );
}
