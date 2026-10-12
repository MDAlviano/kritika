"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleHelp, FileText, House, LogOut, User } from "lucide-react";

const menu = [
  { label: "Beranda", href: "/admin", icon: House },
  { label: "Daftar kelas", href: "/admin/kelas", icon: FileText },
  { label: "Akun", href: "/admin/akun", icon: User },
];

const general = [
  { label: "Bantuan", href: "/admin/bantuan", icon: CircleHelp },
  { label: "Keluar", href: "/logout", icon: LogOut }, 
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-65 shrink-0 border-r border-neutral-200 bg-white px-2 py-8 lg:block">
      <div className="px-4 pb-8 text-3xl font-extrabold tracking-tight text-blue-700">
        Kritika
      </div>

      <p className="px-4 pb-3 text-sm text-neutral-500">MENU</p>
      <nav className="space-y-1">
        {menu.map((m) => (
          <NavItem key={m.href} {...m} active={pathname === m.href} />
        ))}
      </nav>

      <p className="px-4 pb-3 pt-10 text-sm text-neutral-500">GENERAL</p>
      <nav className="space-y-1">
        {general.map((m) => (
          <NavItem key={m.href} {...m} active={pathname === m.href} />
        ))}
      </nav>
    </aside>
  );
}