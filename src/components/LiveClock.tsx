import { useEffect, useState } from "react";
import { CloudSun, Clock } from "lucide-react";
import { station } from "@/data/station";

function useNairobiTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const WEATHER_CODES: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Showers",
  95: "Thunderstorm",
};

export function LiveClockWeather({ compact = false }: { compact?: boolean }) {
  const now = useNairobiTime();
  const [weather, setWeather] = useState<{ temp: number; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${station.coords.lat}&longitude=${station.coords.lon}&current=temperature_2m,weather_code&timezone=Africa%2FNairobi`,
    )
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d?.current) return;
        setWeather({
          temp: Math.round(d.current.temperature_2m),
          text: WEATHER_CODES[d.current.weather_code] ?? "Kajiado",
        });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-KE", { timeZone: "Africa/Nairobi", ...opts }).format(now) : "--";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${compact ? "text-[11px]" : "text-xs"}`}>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="size-3.5 text-primary" aria-hidden="true" />
        <span className="font-semibold tabular-nums">{fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
        <span className="opacity-70">{fmt({ weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
      </span>
      {weather && (
        <span className="inline-flex items-center gap-1.5">
          <CloudSun className="size-3.5 text-primary" aria-hidden="true" />
          <span className="font-semibold">{weather.temp}°C</span>
          <span className="opacity-70">{weather.text} · Kajiado</span>
        </span>
      )}
    </div>
  );
}
