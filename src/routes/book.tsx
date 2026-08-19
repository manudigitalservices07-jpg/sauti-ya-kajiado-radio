import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Studio Session — Bus Radio 99.9FM Kajiado" },
      {
        name: "description",
        content:
          "Request a studio interview, live outside broadcast, advert recording or talk-show appearance with Bus Radio 99.9FM in Kajiado Town.",
      },
      { property: "og:title", content: "Book a Studio Session — Bus Radio 99.9FM" },
      { property: "og:description", content: "Request an interview or session with Bus Radio 99.9FM." },
    ],
  }),
  component: BookPage,
});

const sessionTypes = [
  "Studio interview",
  "Live talk show appearance",
  "Advert / jingle recording",
  "Outside broadcast",
  "Studio hire",
  "Station tour",
];

function BookPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    const { error } = await supabase.from("bookings").insert({
      full_name: String(fd.get("full_name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? "") || null,
      organisation: String(fd.get("organisation") ?? "") || null,
      session_type: String(fd.get("session_type") ?? "Studio interview"),
      preferred_date: String(fd.get("preferred_date") ?? "") || null,
      preferred_time: String(fd.get("preferred_time") ?? "") || null,
      notes: String(fd.get("notes") ?? "") || null,
    });
    if (error) {
      setMessage(error.message);
      setState("error");
      return;
    }
    e.currentTarget.reset();
    setState("sent");
  }

  return (
    <>
      <PageHeader
        eyebrow="Bookings"
        title="Book a session with Bus Radio"
        description="Interviews, talk-show slots, advert recording, outside broadcasts and studio hire — tell us what you need."
      />
      <section className="container-x max-w-2xl py-10">
        {state === "sent" ? (
          <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center">
            <h2 className="text-xl font-bold">Booking request received</h2>
            <p className="mt-2 text-muted-foreground">
              Asante! Our team will call you to confirm your session. For anything urgent, call the studio directly.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Make another booking
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
            <label className="grid gap-1 text-sm font-semibold">
              Full name
              <input name="full_name" required className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">
                Phone
                <input name="phone" required className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Email (optional)
                <input name="email" type="email" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">
              Organisation (optional)
              <input name="organisation" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Session type
              <select name="session_type" className="rounded-lg border border-input bg-background px-3 py-2 font-normal">
                {sessionTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">
                Preferred date
                <input name="preferred_date" type="date" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Preferred time
                <input name="preferred_time" placeholder="e.g. 10:00 AM" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">
              Notes
              <textarea name="notes" rows={4} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
            </label>
            {state === "error" && <p className="text-sm text-destructive">{message}</p>}
            <button
              type="submit"
              disabled={state === "sending"}
              className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Request booking"}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
