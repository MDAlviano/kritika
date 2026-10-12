"use client";

import { useState, useRef } from "react";

export default function ResetPasswordForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric digit
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // If user pasted multiple characters
    if (value.length > 1) {
      const pastedDigits = value.slice(0, 5).split("");
      pastedDigits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pastedDigits.length, 4);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input if filled
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.slice(0, 5).split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextFocus = Math.min(pasted.length, 4);
    inputRefs.current[nextFocus]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Submitted OTP:", code);
  };

  return (
    <div className="mx-auto w-full max-w-xl lg:mx-0">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Masukkan Kode Verifikasi
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base max-w-md">
        Masukkan kode verifikasi yang telah dikirim ke email kamu untuk
        melanjutkan.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-sm font-medium text-neutral-900 sm:text-base block mb-3">
            Kode Verifikasi
          </label>

          {/* 5 OTP Digit Input Boxes */}
          <div className="flex items-center gap-2.5 sm:gap-4 my-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                autoFocus={index === 0}
                className={`w-12 h-14 sm:w-16 sm:h-20 rounded-2xl text-center text-2xl sm:text-3xl font-medium transition-all outline-none bg-white ${
                  digit
                    ? "border-[1.5px] border-blue-500 text-blue-600 shadow-2xs"
                    : "border border-neutral-300 text-neutral-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Centered CTA Pill Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-medium px-8 py-3 text-sm sm:text-base shadow-md shadow-blue-600/30 transition-all active:scale-[0.99]"
          >
            Verifikasi Kode
          </button>
        </div>
      </form>

      {/* Resend code link */}
      <p className="mt-8 text-center text-sm text-neutral-700 sm:text-base">
        Belum menerima kode?{" "}
        <button
          type="button"
          onClick={() => alert("Kode verifikasi telah dikirim ulang!")}
          className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0 inline font-normal"
        >
          Kirim ulang kode
        </button>
      </p>
    </div>
  );
}
