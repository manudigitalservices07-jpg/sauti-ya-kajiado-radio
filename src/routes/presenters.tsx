import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { presenters } from "@/data/station";

export const Route = createFileRoute("/presenters")({
  head: () => ({
    meta: [
      { title: "Presenters & Team — Bus Radio 99.9FM Kajiado" },
      {
        name: "description",
        content:
          "Meet the youth-run team behind Bus Radio 99.9FM — presenters, reporters and producers broadcasting in Kiswahili and Maa from Kajiado Town.",
      },
      { property: "og:title", content: "Presenters & Team — Bus Radio 99.9FM" },
      { property: "og:description", content: "The voices behind Sauti ya Kajiado." },
    ],
  }),
  component: PresentersPage,
});

function PresentersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="The voices of Sauti ya Kajiado"
        description="A youth-run, gender-balanced team of presenters, reporters and producers serving Kajiado County."
      />
      <section className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {presenters.map((p) => (
          <article key={p.name} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={p.image} alt={p.name} loading="lazy" className="h-56 w-full object-cover object-top" />
            <div className="p-5">
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{p.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.bio}</p>
              <p className="mt-3 text-sm font-semibold">On: {p.show}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
