type Props = {
  value: number;
  label?: string;
};

export default function DonutProgress({ value, label = "Selesai" }: Props) {
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      role="img"
      aria-label={`${pct}% ${label.toLowerCase()}`}
      className="relative size-24 shrink-0"
    >
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" strokeWidth="9" className="stroke-blue-100" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          className="stroke-blue-700"
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-sm font-bold text-blue-700">{pct}%</span>
        <span className="text-[10px] text-neutral-500">{label}</span>
      </div>
    </div>
  );
}