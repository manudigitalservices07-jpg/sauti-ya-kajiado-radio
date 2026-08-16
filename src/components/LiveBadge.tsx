export function LiveBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground ${className}`}
    >
      <span className="live-dot inline-block size-1.5 rounded-full bg-primary-foreground" />
      Live
    </span>
  );
}
