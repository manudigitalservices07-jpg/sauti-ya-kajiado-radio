import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, usernameToEmail } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Bus Radio 99.9FM Community" },
      {
        name: "description",
        content:
          "Sign in or join the Bus Radio 99.9FM community to chat with other listeners. Station staff sign in here to manage the site.",
      },
      { property: "og:title", content: "Sign in — Bus Radio 99.9FM" },
      { property: "og:description", content: "Join the Bus Radio 99.9FM listener community." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      void navigate({ to: isAdmin ? "/admin" : "/community", replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const email = usernameToEmail(username);
    const res =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { data: { username: username.trim(), display_name: username.trim() } },
          });
    setBusy(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    void navigate({ to: "/community", replace: true });
  }

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title={mode === "signin" ? "Sign in to Bus Radio" : "Join the Bus Radio community"}
        description="Use a username and password. Station staff sign in here to reach the admin dashboard."
      />
      <section className="container-x max-w-md py-10">
        <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <label className="grid gap-1 text-sm font-semibold">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="rounded-lg border border-input bg-background px-3 py-2 font-normal"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="rounded-lg border border-input bg-background px-3 py-2 font-normal"
            />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-sm font-semibold text-primary"
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Just want to listen?{" "}
          <Link to="/listen" className="font-semibold text-primary">
            Go to Listen Live
          </Link>
        </p>
      </section>
    </>
  );
}
