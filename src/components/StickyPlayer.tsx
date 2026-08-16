import { Link } from "@tanstack/react-router";
import { Loader2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { Equalizer } from "@/components/Equalizer";
import { LiveBadge } from "@/components/LiveBadge";
import { images, station } from "@/data/station";

export function StickyPlayer() {
  const { status, toggle, volume, setVolume, muted, toggleMute, onAir } = usePlayer();
  const playing = status === "playing";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:w-[26rem]">
      <div className="border-t border-white/10 bg-ink text-ink-foreground shadow-2xl md:rounded-2xl md:border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause live stream" : "Play live stream"}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {status === "loading" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : playing ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 translate-x-[1px]" />
            )}
          </button>

          <img src={images.logo} alt="" className="hidden size-9 rounded-md bg-white object-contain p-0.5 sm:block" />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <LiveBadge />
              <Equalizer active={playing} className="text-primary" />
              <span className="truncate text-xs text-white/60">{station.frequency}</span>
            </div>
            <p className="mt-0.5 truncate text-sm font-semibold">
              {status === "error" ? "We'll be back on air shortly" : (onAir?.name ?? station.name)}
            </p>
            <p className="truncate text-[11px] text-white/60">
              {status === "error" ? "Stream offline — try again in a moment" : `with ${onAir?.host ?? "Bus Radio"}`}
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-white/70 transition hover:text-white"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 accent-[oklch(0.56_0.229_27.5)]"
            />
          </div>

          <Link
            to="/listen"
            className="hidden rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 md:inline-block"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
