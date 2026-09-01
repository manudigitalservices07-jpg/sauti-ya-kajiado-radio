import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, Menu, Radio, ShieldCheck, X } from "lucide-react";
import { images, station } from "@/data/station";
import { LiveClockWeather } from "@/components/LiveClock";
import { usePlayer } from "@/components/player/PlayerProvider";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";


const links = [
  { to: "/", label: "Home" },
  { to: "/listen", label: "Listen Live" },
  { to: "/shows", label: "Shows" },
  { to: "/news", label: "News" },
  { to: "/presenters", label: "Presenters" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function AuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (loading) return null;

  if (!user) {
    return (
      <Link
        to="/auth"
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-semibold transition hover:bg-secondary"
      >
        <LogIn className="size-4" aria-hidden="true" /> Sign in
      </Link>
    );
  }

  async function signOut() {
    onNavigate?.();
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to={isAdmin ? "/admin" : "/community"}
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-semibold transition hover:bg-secondary"
      >
        {isAdmin ? <ShieldCheck className="size-4" aria-hidden="true" /> : null}
        {isAdmin ? "Admin" : "Community"}
      </Link>
      <button
        type="button"
        onClick={() => void signOut()}
        className="rounded-full px-2 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { play } = usePlayer();


  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="bg-ink text-ink-foreground">
        <div className="container-x flex items-center justify-between py-1.5">
          <LiveClockWeather compact />
          <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-primary sm:block">
            {station.tagline}
          </span>
        </div>
      </div>

      <nav className="container-x flex items-center justify-between gap-4 py-3" aria-label="Main">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={images.logo} alt="Bus Radio 99.9FM logo" className="h-10 w-auto" width={120} height={40} />
          <span className="sr-only">Bus Radio 99.9FM — Sauti ya Kajiado</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <AuthNav />
          </div>

          <button
            type="button"
            onClick={play}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110"
          >
            <Radio className="size-4" aria-hidden="true" />
            Listen Live
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="container-x grid gap-1 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "bg-secondary text-primary" }}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/support"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium"
              >
                Support Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
