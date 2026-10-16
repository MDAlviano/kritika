export type Tone = "blue" | "rose" | "amber";

export const toneStyles: Record<
  Tone,
  { header: string; icon: string; bar: string; badge: string; soft: string }
> = {
  blue: {
    header: "bg-blue-100",
    icon: "text-blue-700",
    bar: "bg-blue-700",
    badge: "bg-blue-100 text-blue-700",
    soft: "bg-blue-100 text-blue-700",
  },
  rose: {
    header: "bg-rose-100",
    icon: "text-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-100 text-rose-500",
    soft: "bg-rose-100 text-rose-500",
  },
  amber: {
    header: "bg-orange-50",
    icon: "text-amber-600",
    bar: "bg-amber-600",
    badge: "bg-orange-100 text-amber-700",
    soft: "bg-orange-100 text-amber-700",
  },
};

export const classes = [
  { id: 1, name: "IPA 8A", subject: "Ilmu Pengetahuan Alam", students: 32, progress: 78, tone: "blue" as Tone },
  { id: 2, name: "Bahasa 7B", subject: "Bahasa Indonesia", students: 28, progress: 64, tone: "rose" as Tone },
  { id: 3, name: "IPA 8B", subject: "Ilmu Pengetahuan Alam", students: 30, progress: 85, tone: "amber" as Tone },
];

export const tasks = [
  {
    id: 1,
    title: "Mengapa banjir terjadi?",
    category: "Literasi sains",
    blocks: 8,
    className: "IPA 8A",
    deadline: "Hari ini, 20.00",
    done: 25,
    total: 32,
    tone: "blue" as Tone,
  },
  {
    id: 2,
    title: "Menjaga ekosistem mangrove",
    category: "Bahasa Indonesia",
    blocks: 8,
    className: "Bahasa 7B",
    deadline: "Hari ini, 20.00",
    done: 18,
    total: 28,
    tone: "rose" as Tone,
  },
];

// ─── Student Assignments (flat list for /student/assignments) ─────────────────

export type StudentAssignmentStatus = "aktif" | "draft" | "selesai";

export type StudentAssignment = {
  id: number;
  title: string;
  description: string;
  deadlineLabel: string;
  badge: AssignmentBadge;
  status: StudentAssignmentStatus;
  progress: number; // 0–100
  classId: number;
  className: string;
};

export const studentAssignments: StudentAssignment[] = [
  // ── Aktif (3) ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Mengapa banjir terjadi?",
    description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
    deadlineLabel: "Hari ini, 20.00",
    badge: "hari_ini",
    status: "aktif",
    progress: 0,
    classId: 1,
    className: "IPA 8A",
  },
  {
    id: 2,
    title: "Menjaga Ekosistem Mangrove",
    description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
    deadlineLabel: "Besok, 20.00",
    badge: "besok",
    status: "aktif",
    progress: 49,
    classId: 2,
    className: "Bahasa 8A",
  },
  {
    id: 3,
    title: "Memahami Teks Argumentasi",
    description: "Temukan klaim utama dan bukti pendukung dalam teks",
    deadlineLabel: "Besok, 21.00",
    badge: "besok",
    status: "aktif",
    progress: 70,
    classId: 2,
    className: "Bahasa 8A",
  },
  // ── Draft (2) ──────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Siklus Air dan Kehidupan",
    description: "Identifikasi klaim dan temukan bukti pendukung dari teks",
    deadlineLabel: "3 hari lagi, 20.00",
    badge: null,
    status: "draft",
    progress: 0,
    classId: 1,
    className: "IPA 8A",
  },
  {
    id: 5,
    title: "Paragraf Persuasif",
    description: "Susun bukti dan hubungkan klaim dalam paragraf persuasif",
    deadlineLabel: "Minggu depan, 21.00",
    badge: null,
    status: "draft",
    progress: 0,
    classId: 2,
    className: "Bahasa 8A",
  },
  // ── Selesai (7) ────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Fotosintesis dan Rantai Makanan",
    description: "Hubungkan sebab-akibat dalam proses fotosintesis",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 3,
    className: "IPA 8B",
  },
  {
    id: 7,
    title: "Dampak Pencemaran Udara",
    description: "Susun bukti ilmiah tentang dampak polusi udara",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 1,
    className: "IPA 8A",
  },
  {
    id: 8,
    title: "Migrasi Hewan dan Perubahan Iklim",
    description: "Hubungkan fakta dengan dampak perubahan iklim",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 1,
    className: "IPA 8A",
  },
  {
    id: 9,
    title: "Struktur Teks Laporan",
    description: "Identifikasi struktur dan klaim dalam teks laporan",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 2,
    className: "Bahasa 8A",
  },
  {
    id: 10,
    title: "Kalimat Efektif dan Logis",
    description: "Temukan kalimat yang tidak logis dan berikan buktinya",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 2,
    className: "Bahasa 8A",
  },
  {
    id: 11,
    title: "Sumber Daya Alam Terbarukan",
    description: "Susun rantai bukti tentang energi terbarukan",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 3,
    className: "IPA 8B",
  },
  {
    id: 12,
    title: "Peran Hutan bagi Kehidupan",
    description: "Hubungkan sebab-akibat dari deforestasi terhadap ekosistem",
    deadlineLabel: "Sudah lewat",
    badge: null,
    status: "selesai",
    progress: 100,
    classId: 3,
    className: "IPA 8B",
  },
];

// ─── Class Detail Dummy Data ──────────────────────────────────────────────────

export type AssignmentStatus = "not_started" | "in_progress" | "done";
export type AssignmentBadge = "hari_ini" | "besok" | null;

export type Assignment = {
  id: number;
  title: string;
  description: string;
  deadlineLabel: string;
  badge: AssignmentBadge;
  status: AssignmentStatus;
  progress: number; // 0–100, only relevant when status === "in_progress"
};

export type ClassDetail = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  completedMissions: number;
  totalMissions: number;
  tone: Tone;
  assignments: Assignment[];
};

export const classDetails: ClassDetail[] = [
  {
    id: 1,
    name: "IPA 8A",
    subject: "Ilmu Pengetahuam Alam",
    teacher: "Bu Rani",
    students: 32,
    completedMissions: 3,
    totalMissions: 4,
    tone: "blue",
    assignments: [
      {
        id: 1,
        title: "Mengapa banjir terjadi?",
        description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
        deadlineLabel: "Hari ini, 20.00",
        badge: "hari_ini",
        status: "not_started",
        progress: 0,
      },
      {
        id: 2,
        title: "Menjaga Ekosistem Mangrove",
        description: "Susun bukti dan hubungkan sebab-akibat dari bacaan",
        deadlineLabel: "Besok, 20.00",
        badge: "besok",
        status: "in_progress",
        progress: 49,
      },
      {
        id: 3,
        title: "Siklus Air dan Kehidupan",
        description: "Identifikasi klaim dan temukan bukti pendukung dari teks",
        deadlineLabel: "3 hari lagi, 20.00",
        badge: null,
        status: "not_started",
        progress: 0,
      },
    ],
  },
  {
    id: 2,
    name: "BAHASA 7B",
    subject: "Bahasa Indonesia",
    teacher: "Bu Rani",
    students: 28,
    completedMissions: 2,
    totalMissions: 5,
    tone: "rose",
    assignments: [
      {
        id: 4,
        title: "Memahami Teks Argumentasi",
        description: "Temukan klaim utama dan bukti pendukung dalam teks",
        deadlineLabel: "Hari ini, 21.00",
        badge: "hari_ini",
        status: "in_progress",
        progress: 70,
      },
      {
        id: 5,
        title: "Paragraf Persuasif",
        description: "Susun bukti dan hubungkan klaim dalam paragraf persuasif",
        deadlineLabel: "Besok, 21.00",
        badge: "besok",
        status: "not_started",
        progress: 0,
      },
    ],
  },
  {
    id: 3,
    name: "IPA 8B",
    subject: "Ilmu Pengetahuan Alam",
    teacher: "Bu Rani",
    students: 30,
    completedMissions: 4,
    totalMissions: 4,
    tone: "amber",
    assignments: [
      {
        id: 6,
        title: "Fotosintesis dan Rantai Makanan",
        description: "Hubungkan sebab-akibat dalam proses fotosintesis",
        deadlineLabel: "Besok, 19.00",
        badge: "besok",
        status: "not_started",
        progress: 0,
      },
    ],
  },
];

// ─── Read Evidence Dummy Data ─────────────────────────────────────────────────

export type ReadEvidenceParagraph = {
  /** 1-indexed paragraph number shown to the student */
  index: number;
  text: string;
  /** When true, this paragraph is highlighted with an orange/amber accent */
  highlighted?: boolean;
};

export type ReadEvidenceData = {
  /** Matches assignmentDetails[].id */
  assignmentId: number;
  /** Title shown in the source material card header */
  sourceTitle: string;
  /** Subline: "X paragraf · Y kata" */
  paragraphCount: number;
  wordCount: number;
  paragraphs: ReadEvidenceParagraph[];
};

export const readEvidenceData: ReadEvidenceData[] = [
  {
    assignmentId: 1,
    sourceTitle: "Materi sumber",
    paragraphCount: 5,
    wordCount: 386,
    paragraphs: [
      {
        index: 1,
        text: "Banjir menjadi salah satu masalah yang semakin sering terjadi di berbagai kota besar. Selain curah hujan tinggi, perubahan lingkungan ikut memengaruhi besarnya risiko banjir.",
      },
      {
        index: 2,
        text: "Data Dinas Lingkungan menunjukkan luas daerah resapan air di kota berkurang hingga 30 persen dalam sepuluh tahun terakhir. Ruang hijau banyak berubah menjadi kawasan bangunan.",
      },
      {
        index: 3,
        text: "Pembangunan menutup permukaan tanah dengan beton. Akibatnya, air hujan tidak dapat meresap dan mengalir cepat menuju saluran yang kapasitasnya terbatas.",
        highlighted: true,
      },
      {
        index: 4,
        text: "Memperbanyak taman kota dan menjaga saluran air dapat membantu mengurangi risiko. Namun, upaya ini perlu dilakukan bersama oleh pemerintah dan masyarakat agar hasilnya optimal.",
      },
      {
        index: 5,
        text: "Kesadaran warga juga menjadi faktor penting. Membuang sampah sembarangan di saluran air memperparah penyumbatan dan memperbesar dampak banjir saat hujan deras tiba.",
      },
    ],
  },
  {
    assignmentId: 2,
    sourceTitle: "Materi sumber",
    paragraphCount: 5,
    wordCount: 412,
    paragraphs: [
      {
        index: 1,
        text: "Hutan mangrove tumbuh di sepanjang pesisir pantai tropis dan subtropis. Akar-akarnya yang kuat menjadi tempat berlindung bagi berbagai jenis ikan dan biota laut.",
      },
      {
        index: 2,
        text: "Penelitian menunjukkan ekosistem mangrove mampu menyerap karbon dioksida empat kali lebih banyak dibandingkan hutan hujan tropis daratan. Hal ini menjadikannya penting dalam mitigasi perubahan iklim.",
        highlighted: true,
      },
      {
        index: 3,
        text: "Penebangan liar dan alih fungsi lahan untuk tambak mengancam keberadaan mangrove. Dalam dua dekade terakhir, lebih dari 35 persen hutan mangrove Indonesia telah hilang.",
      },
      {
        index: 4,
        text: "Hilangnya mangrove berdampak langsung pada pendapatan nelayan. Tanpa ekosistem yang sehat, hasil tangkapan ikan menurun drastis dan membebani kehidupan masyarakat pesisir.",
      },
      {
        index: 5,
        text: "Program rehabilitasi mangrove yang melibatkan komunitas lokal terbukti lebih berhasil. Warga yang memiliki rasa memiliki terhadap lingkungan cenderung aktif menjaga kelestarian ekosistem.",
      },
    ],
  },
  {
    assignmentId: 3,
    sourceTitle: "Materi sumber",
    paragraphCount: 5,
    wordCount: 398,
    paragraphs: [
      {
        index: 1,
        text: "Teks argumentasi bertujuan meyakinkan pembaca terhadap suatu pendapat atau klaim menggunakan bukti yang logis dan relevan. Keterampilan membaca kritis membantu kita menilai kekuatan argumen tersebut.",
      },
      {
        index: 2,
        text: "Setiap teks argumentasi yang baik memiliki tiga bagian utama: pernyataan pendapat, argumen pendukung, dan kesimpulan. Memahami struktur ini memudahkan kita melacak alur pikir penulis.",
        highlighted: true,
      },
      {
        index: 3,
        text: "Bukti yang digunakan penulis dapat berupa data statistik, hasil penelitian, atau kutipan ahli. Pembaca kritis harus memeriksa apakah bukti tersebut relevan dan dapat dipercaya.",
      },
      {
        index: 4,
        text: "Kalimat topik biasanya muncul di awal paragraf dan menyatakan ide utama. Kalimat-kalimat berikutnya berfungsi mengembangkan atau membuktikan ide tersebut.",
      },
      {
        index: 5,
        text: "Membedakan fakta dari opini adalah kunci dalam memahami teks argumentasi. Fakta dapat diverifikasi, sedangkan opini mencerminkan pandangan pribadi penulis yang bisa saja berbeda antar individu.",
      },
    ],
  },
];

// ─── Assignment Detail Dummy Data ─────────────────────────────────────────────

export type AssignmentDetailStatus = "not_started" | "in_progress" | "done";

export type AssignmentDetail = {
  id: number;
  title: string;
  description: string; // mission brief subtitle
  deadlineLabel: string;
  badge: AssignmentBadge;
  status: AssignmentDetailStatus;
  progress: number; // 0–100
  classId: number;
  className: string;
  subject: string;
  teacher: string;
  estimasiWaktu: number; // in minutes
  jumlahBlok: number;
  percobaan: number; // max retry
  learningGoals: string[];
  teacherNote: string;
  // Step progress: current step (1-indexed, out of totalSteps)
  currentStep: number;
  totalSteps: number;
};

export const assignmentDetails: AssignmentDetail[] = [
  {
    id: 1,
    title: "Mengapa banjir terjadi?",
    description:
      "Baca artikel pendek dan menyusun rantai alasan berdasarkan bukti dari teks.",
    deadlineLabel: "Jumat, 24 Mei · 20.00",
    badge: "hari_ini",
    status: "not_started",
    progress: 0,
    classId: 1,
    className: "IPA 8A",
    subject: "Ilmu Pengetahuan Alam",
    teacher: "Bu Rani",
    estimasiWaktu: 15,
    jumlahBlok: 4,
    percobaan: 1,
    learningGoals: [
      "Menemukan klaim utama dalam teks.",
      "Memilih bukti yang relevan.",
      "Menghubungkan sebab dan akibat.",
    ],
    teacherNote:
      "Baca setiap paragraf dengan teliti. Jawabanmu harus punya bukti dari teks.",
    currentStep: 1,
    totalSteps: 4,
  },
  {
    id: 2,
    title: "Menjaga Ekosistem Mangrove",
    description:
      "Susun bukti dan hubungkan sebab-akibat untuk memahami pentingnya ekosistem mangrove.",
    deadlineLabel: "Sabtu, 25 Mei · 20.00",
    badge: "besok",
    status: "in_progress",
    progress: 49,
    classId: 2,
    className: "Bahasa 8A",
    subject: "Bahasa Indonesia",
    teacher: "Bu Rani",
    estimasiWaktu: 20,
    jumlahBlok: 6,
    percobaan: 2,
    learningGoals: [
      "Mengidentifikasi fungsi mangrove bagi ekosistem.",
      "Menyusun rantai sebab-akibat dari teks.",
      "Mengevaluasi klaim berdasarkan bukti.",
    ],
    teacherNote:
      "Perhatikan detail di setiap paragraf. Gunakan bukti langsung dari teks.",
    currentStep: 2,
    totalSteps: 4,
  },
  {
    id: 3,
    title: "Memahami Teks Argumentasi",
    description:
      "Temukan klaim utama dan bukti pendukung dalam teks argumentasi.",
    deadlineLabel: "Sabtu, 25 Mei · 21.00",
    badge: "besok",
    status: "in_progress",
    progress: 70,
    classId: 2,
    className: "Bahasa 8A",
    subject: "Bahasa Indonesia",
    teacher: "Bu Rani",
    estimasiWaktu: 25,
    jumlahBlok: 5,
    percobaan: 1,
    learningGoals: [
      "Membedakan fakta dan opini dalam teks.",
      "Menemukan klaim utama penulis.",
      "Menyusun bukti yang mendukung klaim.",
    ],
    teacherNote:
      "Fokus pada kalimat topik di setiap paragraf untuk menemukan klaim.",
    currentStep: 3,
    totalSteps: 4,
  },
];

// ─── Collect Blocks Dummy Data ────────────────────────────────────────────────

export type BlockType = "Klaim" | "Fakta" | "Sebab" | "Bukti" | "Akibat";

export type Block = {
  id: string;
  type: BlockType;
  text: string;
  paragraphRef: string;
};

export type CollectBlocksData = {
  assignmentId: number;
  missionLabel: string;
  blocks: Block[];
};

export const collectBlocksData: CollectBlocksData[] = [
  {
    assignmentId: 1,
    missionLabel: "Misi 1",
    blocks: [
      {
        id: "b1",
        type: "Klaim",
        text: "Banjir di perkotaan semakin sering terjadi karena perubahan lingkungan.",
        paragraphRef: "Paragraf 1",
      },
      {
        id: "b2",
        type: "Fakta",
        text: "Luas daerah resapan air berkurang hingga 30 persen dalam sepuluh tahun terakhir.",
        paragraphRef: "Paragraf 2",
      },
      {
        id: "b3",
        type: "Sebab",
        text: "Pembangunan menutup permukaan tanah dengan beton sehingga air tidak dapat meresap.",
        paragraphRef: "Paragraf 3",
      },
      {
        id: "b4",
        type: "Bukti",
        text: "Air hujan mengalir cepat menuju saluran yang kapasitasnya terbatas.",
        paragraphRef: "Paragraf 3",
      },
      {
        id: "b5",
        type: "Akibat",
        text: "Risiko banjir meningkat seiring berkurangnya ruang hijau dan daerah resapan.",
        paragraphRef: "Paragraf 1",
      },
      {
        id: "b6",
        type: "Fakta",
        text: "Sampah plastik menyumbat saluran drainase dan memperparah banjir saat hujan deras.",
        paragraphRef: "Paragraf 5",
      },
    ],
  },
  {
    assignmentId: 2,
    missionLabel: "Misi 2",
    blocks: [
      {
        id: "b1",
        type: "Klaim",
        text: "Ekosistem mangrove sangat penting untuk mitigasi perubahan iklim.",
        paragraphRef: "Paragraf 2",
      },
      {
        id: "b2",
        type: "Fakta",
        text: "Mangrove menyerap CO₂ empat kali lebih banyak dibandingkan hutan hujan tropis.",
        paragraphRef: "Paragraf 2",
      },
      {
        id: "b3",
        type: "Sebab",
        text: "Penebangan liar dan alih fungsi lahan untuk tambak mengancam mangrove.",
        paragraphRef: "Paragraf 3",
      },
      {
        id: "b4",
        type: "Akibat",
        text: "Hilangnya mangrove menyebabkan hasil tangkapan ikan menurun drastis.",
        paragraphRef: "Paragraf 4",
      },
      {
        id: "b5",
        type: "Bukti",
        text: "Lebih dari 35 persen hutan mangrove Indonesia telah hilang dalam dua dekade.",
        paragraphRef: "Paragraf 3",
      },
    ],
  },
  {
    assignmentId: 3,
    missionLabel: "Misi 3",
    blocks: [
      {
        id: "b1",
        type: "Klaim",
        text: "Teks argumentasi yang baik harus memiliki struktur yang jelas dan bukti yang logis.",
        paragraphRef: "Paragraf 1",
      },
      {
        id: "b2",
        type: "Fakta",
        text: "Setiap teks argumentasi memiliki tiga bagian: pernyataan pendapat, argumen, dan kesimpulan.",
        paragraphRef: "Paragraf 2",
      },
      {
        id: "b3",
        type: "Bukti",
        text: "Bukti dapat berupa data statistik, hasil penelitian, atau kutipan ahli.",
        paragraphRef: "Paragraf 3",
      },
      {
        id: "b4",
        type: "Sebab",
        text: "Kalimat topik di awal paragraf membantu pembaca melacak alur pikir penulis.",
        paragraphRef: "Paragraf 4",
      },
      {
        id: "b5",
        type: "Akibat",
        text: "Pembaca kritis mampu membedakan fakta dari opini dengan lebih mudah.",
        paragraphRef: "Paragraf 5",
      },
    ],
  },
];

// ─── Chain Slots Dummy Data ───────────────────────────────────────────────────

export type ChainSlot = {
  id: string;
  position: { x: number; y: number };
};

export type ChainData = {
  assignmentId: number;
  slots: ChainSlot[];
};

export const chainData: ChainData[] = [
  {
    assignmentId: 1,
    slots: [
      { id: "slot-1", position: { x: 180, y: 40 } },
      { id: "slot-2", position: { x: 40, y: 200 } },
      { id: "slot-3", position: { x: 320, y: 200 } },
      { id: "slot-4", position: { x: 180, y: 360 } },
    ],
  },
  {
    assignmentId: 2,
    slots: [
      { id: "slot-1", position: { x: 180, y: 40 } },
      { id: "slot-2", position: { x: 40, y: 200 } },
      { id: "slot-3", position: { x: 320, y: 200 } },
      { id: "slot-4", position: { x: 180, y: 360 } },
    ],
  },
  {
    assignmentId: 3,
    slots: [
      { id: "slot-1", position: { x: 180, y: 40 } },
      { id: "slot-2", position: { x: 40, y: 200 } },
      { id: "slot-3", position: { x: 320, y: 200 } },
      { id: "slot-4", position: { x: 180, y: 360 } },
    ],
  },
];


// ─── Logic Trap Dummy Data ────────────────────────────────────────────────────

export type LogicTrapOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type LogicTrapData = {
  assignmentId: number;
  question: string;
  /** Part of the description that should be rendered bold */
  descriptionPrefix: string;
  descriptionBold: string;
  descriptionSuffix: string;
  options: LogicTrapOption[];
};

export const logicTrapData: LogicTrapData[] = [
  {
    assignmentId: 1,
    question: "Mana kesimpulan yang terlalu jauh?",
    descriptionPrefix: "Bacaan menyebutkan bahwa daerah resapan berkurang 30%. Pilih kesimpulan yang ",
    descriptionBold: "tidak dapat",
    descriptionSuffix: " dibuktikan oleh informasi tersebut.",
    options: [
      {
        id: "opt-1",
        text: "Daerah resapan air mengalami penurunan.",
        isCorrect: false,
      },
      {
        id: "opt-2",
        text: "Semua banjir pasti disebabkan oleh pembangunan.",
        isCorrect: true,
      },
      {
        id: "opt-3",
        text: "Perubahan lingkungan dapat meningkatkan risiko banjir.",
        isCorrect: false,
      },
    ],
  },
  {
    assignmentId: 2,
    question: "Mana kesimpulan yang terlalu jauh?",
    descriptionPrefix: "Bacaan menyebutkan mangrove menyerap lebih banyak CO₂. Pilih kesimpulan yang ",
    descriptionBold: "tidak dapat",
    descriptionSuffix: " dibuktikan oleh informasi tersebut.",
    options: [
      {
        id: "opt-1",
        text: "Mangrove membantu mitigasi perubahan iklim.",
        isCorrect: false,
      },
      {
        id: "opt-2",
        text: "Menanam mangrove seorang diri sudah cukup untuk mengatasi pemanasan global.",
        isCorrect: true,
      },
      {
        id: "opt-3",
        text: "Hilangnya mangrove berdampak pada kehidupan nelayan.",
        isCorrect: false,
      },
    ],
  },
  {
    assignmentId: 3,
    question: "Mana kesimpulan yang terlalu jauh?",
    descriptionPrefix: "Bacaan menyebutkan teks argumentasi memiliki struktur tiga bagian. Pilih kesimpulan yang ",
    descriptionBold: "tidak dapat",
    descriptionSuffix: " dibuktikan oleh informasi tersebut.",
    options: [
      {
        id: "opt-1",
        text: "Teks argumentasi yang baik memiliki pernyataan pendapat.",
        isCorrect: false,
      },
      {
        id: "opt-2",
        text: "Semua penulis yang mengikuti struktur argumentasi pasti memenangkan debat.",
        isCorrect: true,
      },
      {
        id: "opt-3",
        text: "Membedakan fakta dan opini penting dalam membaca kritis.",
        isCorrect: false,
      },
    ],
  },
];

// ─── Feedback Dummy Data ──────────────────────────────────────────────────────

export type FeedbackItemType = "success" | "warning";

export type FeedbackItem = {
  id: string;
  type: FeedbackItemType;
  title: string;
  description: string;
};

export type FeedbackData = {
  assignmentId: number;
  score: number;
  scoreLabel: string;
  feedbackItems: FeedbackItem[];
};

export const feedbackData: FeedbackData[] = [
  {
    assignmentId: 1,
    score: 84,
    scoreLabel: "Penalaran kuat",
    feedbackItems: [
      {
        id: "f1",
        type: "success",
        title: "Pilihan bukti sangat baik",
        description: "Kamu memilih data resmi untuk memeriksa klaim media sosial.",
      },
      {
        id: "f2",
        type: "success",
        title: "Rantai sebab-akibat jelas",
        description: "Hujan dan drainase dihubungkan dengan akibat yang tepat.",
      },
      {
        id: "f3",
        type: "warning",
        title: "Hubungan sebab lebih spesifik",
        description: "Jelaskan bagaimana beton membuat air tidak dapat meresap ke tanah.",
      },
    ],
  },
  {
    assignmentId: 2,
    score: 76,
    scoreLabel: "Penalaran baik",
    feedbackItems: [
      {
        id: "f1",
        type: "success",
        title: "Klaim utama tepat",
        description: "Kamu berhasil mengidentifikasi peran mangrove dalam mitigasi perubahan iklim.",
      },
      {
        id: "f2",
        type: "warning",
        title: "Bukti perlu lebih spesifik",
        description: "Cantumkan angka persentase mangrove yang hilang untuk memperkuat argumen.",
      },
      {
        id: "f3",
        type: "warning",
        title: "Hubungan sebab-akibat kurang lengkap",
        description: "Jelaskan hubungan antara hilangnya mangrove dan penurunan hasil tangkapan ikan.",
      },
    ],
  },
  {
    assignmentId: 3,
    score: 90,
    scoreLabel: "Penalaran sangat kuat",
    feedbackItems: [
      {
        id: "f1",
        type: "success",
        title: "Struktur argumen sangat baik",
        description: "Kamu memahami tiga bagian utama teks argumentasi dengan tepat.",
      },
      {
        id: "f2",
        type: "success",
        title: "Bukti relevan dan kuat",
        description: "Penggunaan data dan kutipan ahli memperkuat klaim dengan baik.",
      },
      {
        id: "f3",
        type: "success",
        title: "Membedakan fakta dan opini",
        description: "Kamu berhasil mengidentifikasi perbedaan fakta dan opini dalam teks.",
      },
    ],
  },
];

// ─── Completed / Result Dummy Data ───────────────────────────────────────────

export type CompletedData = {
  assignmentId: number;
  missionNumber: number;
  score: number;
  timeMinutes: number;
  relationsCorrect: number;
  relationsTotal: number;
};

export const completedData: CompletedData[] = [
  {
    assignmentId: 1,
    missionNumber: 1,
    score: 84,
    timeMinutes: 11,
    relationsCorrect: 4,
    relationsTotal: 4,
  },
  {
    assignmentId: 2,
    missionNumber: 2,
    score: 76,
    timeMinutes: 15,
    relationsCorrect: 3,
    relationsTotal: 4,
  },
  {
    assignmentId: 3,
    missionNumber: 3,
    score: 90,
    timeMinutes: 9,
    relationsCorrect: 4,
    relationsTotal: 4,
  },
];
