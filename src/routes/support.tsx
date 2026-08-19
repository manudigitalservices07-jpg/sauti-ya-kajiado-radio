import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Megaphone, Radio, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { station } from "@/data/station";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Bus Radio 99.9FM — Keep Kajiado on air" },
      {
        name: "description",
        content:
          "Support Bus Radio 99.9FM: sponsor a show, partner with our newsroom, donate equipment or volunteer with Kajiado's youth-run community station.",
      },
      { property: "og:title", content: "Support Bus Radio 99.9FM" },
      { property: "og:description", content: "Help keep community radio on air in Kajiado County." },
    ],
  }),
  component: SupportPage,
});

const ways = [
  { icon: Radio, title: "Sponsor a show", text: "Underwrite a programme and reach listeners while keeping it free to air." },
  { icon: Megaphone, title: "Advertise", text: "Commercial airtime funds our newsroom and community programming." },
  { icon: HandHeart, title: "Donate equipment", text: "Microphones, recorders, laptops and studio gear go straight to work." },
  { icon: Users, title: "Volunteer or partner", text: "Bring your skills to our youth-run newsroom or co-produce a series." },
];

function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support us"
        title="Keep the voice of Kajiado on air"
        description="Bus Radio is community-owned. Every shilling and every hour goes into local journalism and programming."
      />
      <section className="container-x grid gap-6 py-12 sm:grid-cols-2">
        {ways.map((w) => (
          <div key={w.title} className="rounded-2xl border border-border bg-card p-6">
            <w.icon className="size-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold">{w.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
          </div>
        ))}
      </section>
      <section className="container-x pb-16">
        <div className="rounded-3xl bg-ink p-8 text-ink-foreground">
          <h2 className="text-2xl">Talk to us about supporting the station</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Call {station.phoneDisplay}, WhatsApp the studio or email {station.email}. We will send you our partnership
            pack and rate card.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${station.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              WhatsApp the studio
            </a>
            <Link to="/contact" className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold">
              Contact & rates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
