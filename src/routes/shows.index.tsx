import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Radio } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { images, showCategories, shows } from "@/data/station";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/shows/")({
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

type ShowCard = {
  slug: string;
  name: string;
  category: string;
  host: string;
  days: string;
  time: string;
  language: string;
  description: string;
  image?: string;
};

function ShowsPage() {
  const [cat, setCat] = useState<string>("All");

  const { data: dbShows } = useQuery({
    queryKey: ["show-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("show_posts")
        .select("slug,name,category,host,days,time_slot,language,description,image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const list = useMemo<ShowCard[]>(() => {
    const fromDb: ShowCard[] = (dbShows ?? []).map((s) => ({
      slug: s.slug,
      name: s.name,
      category: s.category,
      host: s.host,
      days: s.days,
      time: s.time_slot,
      language: s.language,
      description: s.description,
      image: s.image_url ?? undefined,
    }));
    const seen = new Set(fromDb.map((s) => s.slug));
    const merged = [...fromDb, ...shows.filter((s) => !seen.has(s.slug))];
    return cat === "All" ? merged : merged.filter((s) => s.category === cat);
  }, [dbShows, cat]);

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
              {(s.image || images.studio) && (
                <img
                  src={s.image || images.studio}
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
        {list.length === 0 && <p className="mt-10 text-muted-foreground">No shows in this category yet.</p>}
      </section>
    </>
  );
}
