import Image from "next/image";
import ResetPasswordForm from "./components/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Kata Sandi - Kritika",
  description: "Masukkan kode verifikasi yang telah dikirim ke email kamu untuk melanjutkan.",
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-background p-6 lg:flex lg:justify-center lg:gap-10 lg:p-8">
      <section className="flex items-center py-6 lg:max-w-2xl lg:flex-1 lg:py-0">
        <ResetPasswordForm />
      </section>

      <aside className="relative hidden aspect-784/1037 h-[calc(100vh-4rem)] shrink-0 overflow-hidden rounded-panel lg:block">
        <Image
          src="/auth/right-panel.png"
          alt="Kritika AI Learning Platform"
          fill
          priority
          sizes="40vw"
          className="object-cover"
        />
      </aside>
    </main>
  );
}
