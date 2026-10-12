import Image from "next/image";
import Link from "next/link";
import { Send, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/landing/bg-grid.png"
          alt=""
          fill
          className="object-cover object-top opacity-60"
          priority
          aria-hidden
        />
        {/* Soft radial gradient mask to subtly focus content */}
        <div className="absolute inset-0 bg-radial from-transparent via-white/20 to-white/60" />
      </div>

      {/* Floating decorative elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* Left double 4-point amber sparkles */}
        <div className="absolute left-6 sm:left-12 lg:left-24 top-1/3 -translate-y-4">
          <svg
            className="w-8 h-8 text-[#f59e0b] fill-current drop-shadow-xs"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8Z" />
          </svg>
          <svg
            className="w-4 h-4 text-[#f59e0b] fill-current -mt-9 -ml-3 opacity-90"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8Z" />
          </svg>
        </div>

        {/* Right subtle floating coral brush strokes */}
        <div className="absolute right-10 sm:right-16 top-1/4 opacity-40">
          <div className="w-10 h-1.5 bg-rose-400 rounded-full rotate-45 transform" />
        </div>
        <div className="absolute right-8 sm:right-20 bottom-1/4 opacity-40">
          <div className="w-12 h-1.5 bg-rose-400 rounded-full -rotate-45 transform" />
        </div>
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-[4.25rem] font-semibold tracking-tight leading-[1.18] sm:leading-[1.15] text-neutral-900">
          Rangkai Ide{" "}
          <Image
            src="/landing/idea-bulb.png"
            alt="Idea Bulb"
            width={58}
            height={58}
            className="inline-block align-middle -mt-2.5 sm:-mt-4 mx-1 sm:mx-1.5 w-10 sm:w-[54px] md:w-[58px] h-auto select-none"
            priority
          />{" "}
          <span className="relative inline-block">
            Temukan
            {/* Sunburst radial rays above 'Temukan' */}
            <svg
              className="absolute -top-6 sm:-top-8 -right-4 sm:-right-8 w-11 h-11 sm:w-14 sm:h-14 text-[#f59e0b] pointer-events-none"
              viewBox="0 0 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="16" y1="30" x2="18" y2="22" />
              <line x1="23" y1="28" x2="28" y2="19" />
              <line x1="31" y1="28" x2="38" y2="21" />
              <line x1="37" y1="32" x2="45" y2="27" />
              <line x1="41" y1="39" x2="48" y2="37" />
            </svg>
          </span>
          <br />
          <span className="inline-flex items-center gap-2 sm:gap-3 flex-wrap justify-center mt-1">
            <span>Cara</span>
            <span className="relative inline-flex items-center justify-center px-6 sm:px-9 py-0.5 sm:py-1 border-[2.5px] border-[#C96B00] rounded-full text-[#C96B00] bg-[#D97706]/10 text-center align-middle">
              Berpikir
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Belajar berpikir kritis lewat cara yang seru. Susun potongan ide, hubungkan
          gagasan, dan bangun pemahamanmu sendiri bersama Kritika
          <span className="text-[#f59e0b] ml-1">✨</span>
        </p>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-medium px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base transition-all shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.99]"
          >
            Mulai Eksplorasi <Send className="size-4 fill-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}

