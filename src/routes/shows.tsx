import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Radio } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { showCategories, shows } from "@/data/station";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "Shows & Schedule — Bus Radio 99.9FM Kajiado" },
      {
        name: "description",
        content:
          "Full programme line-up on Bus Radio 99.9FM: news bulletins, talk shows, culture, youth and gospel programming in Kiswahili and Maa.",
      },
      { property: "og:title", content: "Shows & Schedule — Bus Radio 99.9FM" },
      { property: "og:description", content: "Browse every Bus Radio 99.9FM programme, host and airtime." },
    ],
  }),
  component: ShowsPage,
});

function ShowsPage() {
  const [cat, setCat] = useState<string>("All");
  const list = useMemo(() => (cat === "All" ? shows : shows.filter((s) => s.category === cat)), [cat]);

  return (
    <>
      <PageHeader
        eyebrow="Programming"
        title="Our shows & weekly schedule"
        description="From county bulletins to late-night gospel — here is everything on air at Bus Radio 99.9FM."
      />
      <section className="container-x py-10">
        <div className="flex flex-wrap gap-2">
          {showCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Link
              key={s.slug}
              to="/shows/$slug"
              params={{ slug: s.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-48 w-full object-cover object-top transition group-hover:scale-[1.02]"
                />
              )}
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{s.category}</span>
                <h2 className="mt-1 text-lg font-bold">{s.name}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Radio className="size-3.5" /> {s.host}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {s.days} · {s.time}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
