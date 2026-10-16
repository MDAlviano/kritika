export type BlockType = "klaim" | "bukti" | "penyebab" | "akibat";

export type Block = {
  id: string;
  type: BlockType;
  paragraph: number; // nomor paragraf sumber (mulai dari 1)
  text: string;
};

export type Draft = {
  title: string;
  kelas: string;
  deadline: string; // format datetime-local, mis. "2025-05-25T20:00"
  objective: string;
  paragraphs: string[];
  blocks: Block[];
};

export const DRAFT_KEY = "kritika:draft";

export const blockStyles: Record<BlockType, { label: string; badge: string }> = {
  klaim: { label: "Klaim", badge: "bg-blue-100 text-blue-700" },
  bukti: { label: "Bukti", badge: "bg-emerald-100 text-emerald-700" },
  penyebab: { label: "Penyebab", badge: "bg-rose-100 text-rose-500" },
  akibat: { label: "Akibat", badge: "bg-orange-100 text-amber-700" },
};

export const blockTypes = Object.keys(blockStyles) as BlockType[];

export function saveDraft(draft: Draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* storage tidak tersedia */
  }
}

export function loadDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function wordCount(paragraphs: string[]) {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

/** "2025-05-25T20:00" → "25 Mei, 20.00" (atau "hari ini, 20.00") */
export function formatDeadline(iso: string): string {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return "";
  const time = `${String(d.getHours()).padStart(2, "0")}.${String(d.getMinutes()).padStart(2, "0")}`;
  const isToday = d.toDateString() === new Date().toDateString();
  const date = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  return `${isToday ? "hari ini" : date}, ${time}`;
}

export function todayAt2000(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T20:00`;
}

/**
 * STUB — menggantikan panggilan AI.
 * Ganti isi fungsi ini dengan request ke API Anda (kirim file/teks materi,
 * terima paragraf + blok hasil generate). Untuk sekarang selalu mengembalikan contoh yang sama.
 */
export function generateDraftStub(input: {
  title: string;
  kelas: string;
  deadline: string;
}): Draft {
  return {
    ...input,
    objective:
      "Siswa dapat menghubungkan perubahan lingkungan dengan penyebab dan dampak banjir di perkotaan.",
    paragraphs: [
      "Banjir menjadi salah satu masalah yang semakin sering terjadi di berbagai kota besar. Selain curah hujan tinggi, perubahan lingkungan ikut memengaruhi besarnya risiko banjir.",
      "Data Dinas Lingkungan menunjukkan luas daerah resapan air di kota berkurang hingga 30 persen dalam sepuluh tahun terakhir. Ruang hijau banyak berubah menjadi kawasan bangunan.",
      "Pembangunan menutup permukaan tanah dengan beton. Akibatnya, air hujan tidak dapat meresap dan mengalir cepat menuju saluran yang kapasitasnya terbatas.",
      "Memperbanyak taman kota dan menjaga saluran air dapat membantu mengurangi risiko. Namun, upaya ini perlu dilakukan bersama oleh pemerintah dan masyarakat.",
    ],
    blocks: [
      { id: "b1", type: "klaim", paragraph: 1, text: "Banjir di perkotaan semakin sering terjadi karena perubahan lingkungan." },
      { id: "b2", type: "bukti", paragraph: 2, text: "Luas daerah resapan air di kota berkurang hingga 30% dalam sepuluh tahun." },
      { id: "b3", type: "penyebab", paragraph: 3, text: "Pembangunan menutup tanah dengan beton sehingga air hujan tidak dapat meresap." },
      { id: "b4", type: "akibat", paragraph: 3, text: "Air hujan mengalir cepat ke saluran yang kapasitasnya terbatas." },
    ],
  };
}