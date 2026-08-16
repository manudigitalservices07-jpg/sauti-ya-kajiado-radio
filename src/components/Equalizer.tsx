export function Equalizer({ active, bars = 4, className = "" }: { active: boolean; bars?: number; className?: string }) {
  return (
    <span className={`flex h-4 items-end gap-[2px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-current ${active ? "eq-bar" : ""}`}
          style={{
            height: `${40 + ((i * 37) % 60)}%`,
            animationDelay: `${i * 120}ms`,
            transform: active ? undefined : "scaleY(0.4)",
          }}
        />
      ))}
    </span>
  );
}
