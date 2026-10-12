import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { KritikaLogo } from "./Navbar";

const navLinks = [
  { label: "Tentang Kritika", href: "#tentang" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Keunggulan", href: "#keunggulan" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a2973] text-white pt-16 pb-8 px-6 overflow-hidden">
      {/* Background subtle grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="footer-grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.75" />
            <path d="M 38 40 L 42 40 M 40 38 L 40 42" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid-pattern)" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-12 sm:mb-16">

          {/* Brand column — 5 cols */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <KritikaLogo className="size-7" textColor="text-white" />
            </Link>
            <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Navigation column — 3 cols */}
          <div className="md:col-span-3">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 tracking-wide">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-blue-100/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay connected column — 4 cols */}
          <div className="md:col-span-4">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 tracking-wide">
              Tetap Terhubung
            </h3>
            <div className="space-y-2.5 max-w-xs">
              {/* Email input field */}
              <div className="flex items-center gap-2.5 border border-blue-400/25 rounded-lg px-3.5 py-2.5 bg-[#061e56]/90 shadow-inner">
                <Mail className="size-4 text-blue-200/60 shrink-0" />
                <input
                  type="email"
                  placeholder="Alamat Email"
                  className="w-full text-xs sm:text-sm bg-transparent outline-none text-white placeholder:text-blue-200/50"
                />
              </div>

              {/* Subscribe button */}
              <button
                type="button"
                className="w-full flex items-center justify-between bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <span>Berlangganan</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-blue-900/60 pt-6 sm:pt-8 text-center">
          <p className="text-xs text-blue-200/60 font-normal">
            © 2026 Kritika. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
}

