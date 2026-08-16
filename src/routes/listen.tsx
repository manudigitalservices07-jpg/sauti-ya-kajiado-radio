import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Pause, Play, Radio, Smartphone } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { LiveBadge } from "@/components/LiveBadge";
import { images, station } from "@/data/station";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen Live — Bus Radio 99.9FM Kajiado" },
      {
        name: "description",
        content:
          "Stream Bus Radio 99.9FM live from Kajiado Town. Tune in online, on Zeno.FM, Online Radio Box, or on 99.9 FM.",
      },
      { property: "og:title", content: "Listen Live — Bus Radio 99.9FM" },
      { property: "og:description", content: "Stream Sauti ya Kajiado live, 24/7, in Kiswahili and Maa." },
    ],
  }),
  component: Listen,
});

function Listen() {
  const { status, toggle, onAir } = usePlayer();
  const playing = status === "playing";

  return (
    <>
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-x text-center">
          <LiveBadge />
          <h1 className="mt-5 text-4xl md:text-5xl">Listen Live</h1>
          <p className="mt-3 text-white/70">{station.name} · {station.tagline}</p>

          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8">
            <img src={images.logo} alt="Bus Radio 99.9FM" className="h-16 w-auto rounded bg-white p-1.5" />
            <button
              type="button"
              onClick={toggle}
              className="grid size-24 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-105"
              aria-label={playing ? "Pause live stream" : "Play live stream"}
            >
              {status === "loading" ? (
                <Loader2 className="size-10 animate-spin" />
              ) : playing ? (
                <Pause className="size-10" />
              ) : (
                <Play className="size-10 translate-x-1" />
              )}
            </button>

            <div className="flex h-20 items-end justify-center gap-1.5" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 rounded-full bg-primary/80 ${playing ? "eq-bar" : ""}`}
                  style={{
                    height: `${20 + ((i * 53) % 80)}%`,
                    animationDelay: `${(i % 7) * 110}ms`,
                    transform: playing ? undefined : "scaleY(0.25)",
                  }}
                />
              ))}
            </div>

            {status === "error" ? (
              <p className="text-sm text-white/70">We'll be back on air shortly.</p>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-widest text-primary">On air now</p>
                <p className="mt-1 text-xl font-semibold">{onAir?.name}</p>
                <p className="text-sm text-white/60">with {onAir?.host} · {onAir?.time}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={station.zeno} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
              Listen on Zeno.FM
            </a>
            <a href={station.onlineRadioBox} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
              Online Radio Box
            </a>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="inline-flex items-center gap-2 text-2xl"><Radio className="size-6 text-primary" /> How to tune in</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><strong className="text-foreground">On radio:</strong> Set your dial to {station.frequency} anywhere in Kajiado Town and surrounding areas (approx. 3km core radius, with wider reach on clear days).</li>
            <li><strong className="text-foreground">Online:</strong> Press play above — the stream keeps playing while you browse the site.</li>
            <li><strong className="text-foreground">Studio:</strong> {station.address}</li>
            <li><strong className="text-foreground">Call the studio:</strong> <a className="text-primary" href={`tel:${station.phone}`}>{station.phoneDisplay}</a></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="inline-flex items-center gap-2 text-2xl"><Smartphone className="size-6 text-primary" /> Add to home screen</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Install Bus Radio as an app for one-tap listening — no app store needed.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Open this page in Chrome or Safari on your phone.</li>
            <li>Tap the browser menu (⋮ or Share).</li>
            <li>Choose “Add to Home screen” and confirm.</li>
          </ol>
        </div>
      </section>
    </>
  );
}
