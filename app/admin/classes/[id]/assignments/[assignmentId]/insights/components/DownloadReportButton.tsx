"use client";

export default function DownloadReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-neutral-300 bg-white px-6 py-2.5 text-xs font-semibold hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-blue-700"
    >
      Unduh laporan
    </button>
  );
}