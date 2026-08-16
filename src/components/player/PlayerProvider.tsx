import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { station, shows } from "@/data/station";

type Status = "idle" | "loading" | "playing" | "error";

type PlayerCtx = {
  status: Status;
  toggle: () => void;
  play: () => void;
  volume: number;
  setVolume: (v: number) => void;
  muted: boolean;
  toggleMute: () => void;
  onAir: { name: string; host: string; time: string } | null;
};

const Ctx = createContext<PlayerCtx | null>(null);

function currentShow() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 0) return shows.find((s) => s.slug === "faraja-show")!;
  if (day === 5 && hour >= 19) return shows.find((s) => s.slug === "jukwaa-la-siasa")!;
  if (hour >= 10 && hour < 13 && day >= 1 && day <= 4) return shows.find((s) => s.slug === "jukwaa-la-kazi")!;
  if (hour >= 14 && hour < 17) return shows.find((s) => s.slug === "qwetu-afrika")!;
  return shows.find((s) => s.slug === "habari-za-kaunti")!;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [onAir, setOnAir] = useState<PlayerCtx["onAir"]>(null);

  useEffect(() => {
    const update = () => {
      const s = currentShow();
      setOnAir({ name: s.name, host: s.host, time: s.time });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.preload = "none";
      el.crossOrigin = "anonymous";
      el.addEventListener("playing", () => setStatus("playing"));
      el.addEventListener("waiting", () => setStatus("loading"));
      el.addEventListener("error", () => setStatus("error"));
      el.addEventListener("pause", () => setStatus("idle"));
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(() => {
    const el = ensureAudio();
    el.volume = volume;
    el.muted = muted;
    // cache-bust so the live stream always resumes at the live edge
    el.src = `${station.streamUrl}?t=${Date.now()}`;
    setStatus("loading");
    el.play().catch(() => setStatus("error"));
  }, [ensureAudio, volume, muted]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (el && !el.paused) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      setStatus("idle");
      return;
    }
    play();
  }, [play]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0 && audioRef.current) {
      audioRef.current.muted = false;
      setMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (audioRef.current) audioRef.current.muted = !m;
      return !m;
    });
  }, []);

  const value = useMemo(
    () => ({ status, toggle, play, volume, setVolume, muted, toggleMute, onAir }),
    [status, toggle, play, volume, setVolume, muted, toggleMute, onAir],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
