import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Facebook, Play, Radio, Youtube } from "lucide-react";
import { articles, images, shows, stats, station } from "@/data/station";
import { usePlayer } from "@/components/player/PlayerProvider";
import { LiveBadge } from "@/components/LiveBadge";
import { Equalizer } from "@/components/Equalizer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bus Radio 99.9FM — Sauti ya Kajiado | Listen Live" },
      {
        name: "description",
        content:
          "Community radio from Kajiado Town on 99.9 FM. News, talk shows, culture and music in Kiswahili and Maa. Listen live online, anywhere.",
      },
      { property: "og:title", content: "Bus Radio 99.9FM — Sauti ya Kajiado" },
      {
        property: "og:description",
        content: "Listen live to Kajiado's youth-run community radio station broadcasting in Kiswahili and Maa.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { play, status, onAir } = usePlayer();
  const playing = status === "playing";

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={images.studio}
          alt="The Bus Radio studio in Kajiado Town with microphones, monitors and a branded backdrop"
          className="absolute inset-0 size-full object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-primary/40" />
        <div className="container-x relative py-20 md:py-28">
          <LiveBadge />
          <img src={images.logo} alt="Bus Radio 99.9FM" className="mt-6 h-20 w-auto rounded-lg bg-white p-2 md:h-28" />
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] text-balance-tight md:text-6xl">
            Sauti ya Kajiado — the voice of our community, on {station.frequency}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">
            Youth-run community radio broadcasting from Kajiado Town in Kiswahili and Maa. News, accountability, culture
            and music for the people of Kajiado County.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition hover:brightness-110"
            >
              <Play className="size-5" aria-hidden="true" /> Listen Live
              <Equalizer active={playing} className="text-primary-foreground" />
            </button>
            <Link
              to="/shows"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Our shows <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-4 text-sm">
          <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-primary">
            <Radio className="size-4" /> On Air Now
          </span>
          <span className="font-semibold">{onAir?.name}</span>
          <span className="text-muted-foreground">with {onAir?.host}</span>
          <span className="text-muted-foreground">· {onAir?.time}</span>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHead
          kicker="Weekly schedule"
          title="What's on this week"
          action={{ to: "/shows", label: "All shows" }}
        />
        <div className="-mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {shows.slice(0, 6).map((s) => (
            <article
              key={s.slug}
              className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl md:w-auto"
            >
              {s.image && (
                <img src={s.image} alt={s.name} loading="lazy" className="h-40 w-full object-cover object-top" />
              )}
              <div className="p-5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{s.category}</span>
                <h3 className="mt-1 text-lg">{s.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
                  <Calendar className="size-3.5 text-primary" /> {s.days} · {s.time}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <img
            src={images.jukwaaKazi}
            alt="Jukwaa La Kazi Show badge with host MC Jumah"
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Flagship show</span>
            <h2 className="mt-2 text-3xl md:text-4xl">Jukwaa La Kazi Show</h2>
            <p className="mt-4 text-white/75">
              Our flagship morning platform on jobs, hustle and enterprise in Kajiado. Listeners call in with
              opportunities, skills and real stories from the ground — hosted by MC Jumah.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <Calendar className="size-4 text-primary" /> Monday – Thursday · 10:00 AM – 1:00 PM
            </p>
            <div className="mt-6">
              <Link to="/shows" className="inline-flex items-center gap-2 font-semibold text-primary">
                Explore all programmes <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHead kicker="Newsroom" title="Latest from Kajiado" action={{ to: "/news", label: "All news" }} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((a) => (
            <Link
              key={a.slug}
              to="/news/$slug"
              params={{ slug: a.slug }}
              className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{a.category}</span>
              <h3 className="mt-2 text-lg group-hover:text-primary">{a.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {a.author} · {new Date(a.date).toLocaleDateString("en-KE", { dateStyle: "medium" })}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-14">
        <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHead kicker="Watch & follow" title="Bus Radio on video" action={{ to: "/gallery", label: "Gallery" }} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              className="size-full"
              src="https://www.youtube.com/embed?listType=user_uploads&list=BusRadioKajiado254"
              title="Bus Radio Kajiado YouTube channel"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-card p-8">
            <h3 className="text-2xl">Join the conversation</h3>
            <p className="text-muted-foreground">
              Mahojiano, live shows and behind-the-scenes from the newsroom — follow us and never miss a broadcast.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={station.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
                <Youtube className="size-4" /> YouTube
              </a>
              <a href={station.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold">
                <Facebook className="size-4" /> Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <h3 className="text-2xl">Support Bus Radio</h3>
            <p className="mt-2 text-primary-foreground/85">
              We are an independent community broadcaster. Your support keeps grassroots voices on air.
            </p>
            <Link to="/support" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary">
              Ways to support <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-2xl">Advertise with us</h3>
            <p className="mt-2 text-muted-foreground">
              Reach over 40,000 listeners across Kajiado County in Kiswahili and Maa.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ink-foreground">
              Request a rate card <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  kicker,
  title,
  action,
}: {
  kicker: string;
  title: string;
  action?: { to: "/shows" | "/news" | "/gallery"; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary">{kicker}</span>
        <h2 className="mt-1 text-3xl md:text-4xl">{title}</h2>
      </div>
      {action && (
        <Link to={action.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {action.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
