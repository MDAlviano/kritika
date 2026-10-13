export default function WeekProgress() {
  const total = 4;
  const done = 3;
  const pct = done / total;

  // SVG donut ring math
  const radius = 52;
  const stroke = 10;
  const normalised = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalised;
  const offset = circumference * (1 - pct);

  return (
    <aside className="w-full lg:w-64 shrink-0 rounded-3xl border border-neutral-200 bg-white p-6">
      {/* Header */}
      <p className="text-base font-bold text-neutral-900">Progress minggu ini</p>
      <p className="mt-0.5 text-sm text-neutral-500">01 - 06 Oktober</p>

      {/* Donut chart */}
      <div className="mt-6 flex justify-center">
        <div className="relative">
          <svg
            width={radius * 2}
            height={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            aria-label={`${done} dari ${total} tugas selesai`}
            role="img"
          >
            {/* Background ring */}
            <circle
              cx={radius}
              cy={radius}
              r={normalised}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={stroke}
            />
            {/* Progress ring */}
            <circle
              cx={radius}
              cy={radius}
              r={normalised}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold leading-none text-neutral-900">
              {done}
            </span>
            <span className="mt-1 text-center text-xs leading-tight text-neutral-500">
              dari {total} tugas
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-6 flex items-stretch divide-x divide-neutral-200">
        <div className="flex-1 pr-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900">82</p>
          <p className="mt-1 text-xs text-neutral-500">Rata-rata skor</p>
        </div>
        <div className="flex-1 pl-4 text-center">
          <p className="text-2xl font-semibold text-neutral-900">37 mnt</p>
          <p className="mt-1 text-xs text-neutral-500">Waktu belajar</p>
        </div>
      </div>
    </aside>
  );
}
