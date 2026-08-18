import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { articles, images, newsCategories } from "@/data/station";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News from Kajiado County — Bus Radio 99.9FM" },
      {
        name: "description",
        content:
          "Verified local news, governance, health, culture and youth stories from across Kajiado County, reported by the Bus Radio 99.9FM newsroom.",
      },
      { property: "og:title", content: "News from Kajiado County — Bus Radio 99.9FM" },
      { property: "og:description", content: "Local reporting from the Bus Radio 99.9FM newsroom in Kajiado." },
    ],
  }),
  component: NewsPage,
});

type Card = { slug: string; title: string; category: string; excerpt: string; date: string; image: string; author: string };

function NewsPage() {
  const [cat, setCat] = useState<string>("All");

  const { data: dbPosts } = useQuery({
    queryKey: ["news-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_posts")
        .select("slug,title,category,excerpt,image_url,author,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const all: Card[] = useMemo(() => {
    const fromDb: Card[] = (dbPosts ?? []).map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.excerpt,
      date: p.created_at.slice(0, 10),
      image: p.image_url || images.studio,
      author: p.author,
    }));
    const statics: Card[] = articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      category: a.category,
      excerpt: a.excerpt,
      date: a.date,
      image: a.image || images.fieldTeam,
      author: a.author,
    }));
    const seen = new Set(fromDb.map((p) => p.slug));
    return [...fromDb, ...statics.filter((s) => !seen.has(s.slug))];
  }, [dbPosts]);

  const list = cat === "All" ? all : all.filter((a) => a.category === cat);

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="Habari za Kaunti — news from Kajiado"
        description="Verified, local and bilingual reporting from the wards, markets and barazas of Kajiado County."
      />
      <section className="container-x py-10">
        <div className="flex flex-wrap gap-2">
          {newsCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Link
              key={a.slug}
              to="/news/$slug"
              params={{ slug: a.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={a.image} alt="" loading="lazy" className="h-44 w-full object-cover object-top" />
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{a.category}</span>
                <h2 className="mt-1 text-lg font-bold leading-snug">{a.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" /> {a.date} · {a.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-muted-foreground">No stories in this category yet.</p>}
      </section>
    </>
  );
}
