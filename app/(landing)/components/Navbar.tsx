import Link from "next/link";
import { Send } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kritika", href: "#tentang" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Keunggulan", href: "#keunggulan" },
];

/** Icon logo Kritika — squircle biru dengan 3 bar vertikal putih */
export function KritikaLogo({
  className = "size-7",
  textColor = "text-neutral-900",
}: {
  className?: string;
  textColor?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${className} bg-blue-600 rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-xs`}
        aria-hidden
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          <rect x="2" y="8" width="3.5" height="10" rx="1.75" fill="currentColor" />
          <rect x="8.25" y="2" width="3.5" height="16" rx="1.75" fill="currentColor" />
          <rect x="14.5" y="5" width="3.5" height="13" rx="1.75" fill="currentColor" />
        </svg>
      </div>
      <span className={`font-extrabold text-xl tracking-tight ${textColor}`}>
        Kritika
      </span>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9fa]/85 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <KritikaLogo className="size-7" textColor="text-neutral-900" />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-700 hover:text-blue-700 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-2.5">
          {/* Demo links */}
          <Link
            href="/teacher"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-full transition-colors"
          >
            <span>Demo Guru</span>
          </Link>
          <Link
            href="/student/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-full transition-colors"
          >
            <span>Demo Siswa</span>
          </Link>
          <Link
            href="/auth/login"
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            Masuk <Send className="size-3.5 fill-current" />
          </Link>
        </div>
      </div>
    </header>
  );
}

