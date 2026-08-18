import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Languages, Radio } from "lucide-react";
import { shows } from "@/data/station";
import { usePlayer } from "@/components/player/PlayerProvider";

export const Route = createFileRoute("/shows/$slug")({
  loader: ({ params }) => {
    const show = shows.find((s) => s.slug === params.slug);
    if (!show) throw notFound();
    return { show };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Show unavailable — Bus Radio 99.9FM" }, { name: "robots", content: "noindex" }] };
    }
    const { show } = loaderData;
    return {
      meta: [
        { title: `${show.name} — Bus Radio 99.9FM` },
        { name: "description", content: show.description.slice(0, 155) },
        { property: "og:title", content: `${show.name} — Bus Radio 99.9FM` },
        { property: "og:description", content: show.description.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: ShowNotFound,
  errorComponent: ShowNotFound,
  component: ShowDetail,
});

function ShowNotFound() {
  return (
    <div className="container-x py-20 text-center">
      <h1 className="text-2xl font-bold">Show not found</h1>
      <Link to="/shows" className="mt-4 inline-block font-semibold text-primary">
        Back to all shows
      </Link>
    </div>
  );
}

function ShowDetail() {
  const { show } = Route.useLoaderData();
  const { play } = usePlayer();

  return (
    <article>
      <div className="bg-ink text-ink-foreground">
        <div className="container-x grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
          <div>
            <Link to="/shows" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="size-4" /> All shows
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">{show.category}</p>
            <h1 className="mt-2 text-3xl md:text-5xl">{show.name}</h1>
            <p className="mt-4 text-sm text-white/75 md:text-base">{show.description}</p>
            <ul className="mt-6 grid gap-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Radio className="size-4 text-primary" /> Hosted by {show.host}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" /> {show.days} · {show.time}
              </li>
              <li className="flex items-center gap-2">
                <Languages className="size-4 text-primary" /> {show.language}
              </li>
            </ul>
            <button
              type="button"
              onClick={play}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:brightness-110"
            >
              Listen live now
            </button>
          </div>
          {show.image && (
            <img
              src={show.image}
              alt={show.name}
              className="max-h-[26rem] w-full rounded-2xl object-cover object-top"
            />
          )}
        </div>
      </div>

      <section className="container-x py-12">
        <h2 className="text-2xl">More shows you may like</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shows
            .filter((s) => s.slug !== show.slug)
            .slice(0, 3)
            .map((s) => (
              <Link
                key={s.slug}
                to="/shows/$slug"
                params={{ slug: s.slug }}
                className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{s.category}</p>
                <p className="mt-1 font-bold">{s.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {s.days} · {s.time}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
