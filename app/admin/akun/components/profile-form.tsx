"use client";

import { useState } from "react";

const initialProfile = {
  fullName: "Rani Rahmawati, S.Pd.",
  nickname: "Bu Dian",
  email: "Rani.rahma@sekolah.id",
  whatsapp: "+62 812-3456-7890",
  school: "SMP Nusantara",
  subject: "Ilmu Pengetahuan Alam",
};

type Profile = typeof initialProfile;

const fields: Array<{
  key: keyof Profile;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
}> = [
  { key: "fullName", label: "Nama Lengkap", type: "text", autoComplete: "name" },
  { key: "nickname", label: "Nama Panggilan", type: "text", autoComplete: "nickname" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "whatsapp", label: "Nomor Whatsapp", type: "tel", autoComplete: "tel" },
  { key: "school", label: "Sekolah", type: "text", autoComplete: "organization" },
  { key: "subject", label: "Mata Pelajaran", type: "text", autoComplete: "organization-title" },
];

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof Profile, value: string) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSaved(false);

    window.setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
    }, 400);
  };

  return (
    <div className="mt-5 rounded-3xl border border-neutral-200 bg-white px-6 py-6 sm:px-8 sm:py-7">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
          Informasi pribadi
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Pastikan data Anda selalu terbaru untuk sinkronisasi kelas.
        </p>
      </div>

      <div className="my-7 border-t border-neutral-100" />

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="mb-1.5 block text-xs font-semibold text-slate-500"
              >
                {field.label}
              </label>
              <input
                id={field.key}
                name={field.key}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                value={profile[field.key]}
                onChange={(event) => handleChange(field.key, event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 transition-colors focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          ))}
        </div>

        <div className="my-7 border-t border-neutral-100" />

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          {saved && (
            <p role="status" className="text-sm font-medium text-emerald-600">
              Perubahan berhasil disimpan.
            </p>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-70"
          >
            {isSaving ? "Menyimpan..." : "Simpan perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

