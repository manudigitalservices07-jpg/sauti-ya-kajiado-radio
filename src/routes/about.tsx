import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { images, milestones, stats, station } from "@/data/station";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Bus Radio 99.9FM — Sauti ya Kajiado" },
      {
        name: "description",
        content:
          "Bus Radio 99.9FM is a youth-run community radio station in Kajiado Town, on air since 2015, broadcasting in Kiswahili and Maa.",
      },
      { property: "og:title", content: "About Bus Radio 99.9FM — Sauti ya Kajiado" },
      { property: "og:description", content: "Our story, mission and milestones since 2015." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Community radio, owned by the people of Kajiado"
        description="From a youth group to a licensed county broadcaster — Bus Radio 99.9FM exists to give Kajiado a voice it can trust."
      />

      <section className="container-x grid gap-10 py-12 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl">Our mission</h2>
          <p className="mt-4 text-muted-foreground">
            We inform, connect and empower the people of Kajiado County through accurate local journalism, open debate
            and culture that belongs to us. We broadcast in Kiswahili and Maa so no one is left out of the conversation.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our newsroom is youth-run and gender-balanced. We cover governance and accountability, health, education,
            pastoralism, gender equality and the arts — always from the ground up.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-2xl font-black text-primary">{s.value}</dt>
                <dd className="text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <img src={images.studio} alt="Inside the Bus Radio studio" className="rounded-2xl object-cover object-top" />
      </section>

      <section className="bg-secondary/40 py-12">
        <div className="container-x">
          <h2 className="text-2xl">Our milestones</h2>
          <ol className="mt-8 space-y-6 border-l-2 border-primary/30 pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-primary" aria-hidden="true" />
                <p className="text-sm font-black text-primary">{m.year}</p>
                <p className="font-bold">{m.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted-foreground">
            Find us at {station.address}. Call the studio on {station.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
