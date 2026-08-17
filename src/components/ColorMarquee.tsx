import { useMemo } from "react";
import { stationMessages } from "@/data/station";

/** Moving colour ticker that keeps positive station messages rolling across the site. */
export function ColorMarquee() {
  const items = useMemo(() => [...stationMessages, ...stationMessages], []);

  return (
    <div className="marquee-shell border-y border-border/60">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={`${m}-${i}`} className="marquee-item">
            <span className="marquee-dot" aria-hidden="true" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
