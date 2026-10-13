import type { Metadata } from "next";
import Header from "../components/header";
import ProfileForm from "./components/profile-form";

export const metadata: Metadata = {
  title: "Profil Guru - Kritika",
  description: "Kelola informasi akun dan preferensi pembelajaran.",
};

export default function ProfilePage() {
  return (
    <>
      <Header
        title="Profil guru"
        subtitle="Kelola informasi akun dan preferensi pembelajaran."
      />

      <main className="min-h-[calc(100vh-90px)] bg-[#f8f9fa] px-6 py-8 sm:px-8 lg:px-10">
        <section className="mx-auto max-w-5xl">
          <div className="flex items-center gap-4 rounded-3xl border border-neutral-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-rose-50 p-4 sm:p-5">
            <div
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-full bg-blue-100 text-lg font-bold text-blue-700"
            >
              RA
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 sm:text-lg">
                Rani Rahmawati
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
                Guru IPA · SMP Nusantara
              </p>
            </div>
          </div>

          <ProfileForm />
        </section>
      </main>
    </>
  );
}

