import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { station } from "@/data/station";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Advertise — Bus Radio 99.9FM Kajiado" },
      {
        name: "description",
        content:
          "Call, WhatsApp or email Bus Radio 99.9FM in Kajiado Town. Advertise with the county's trusted community station or book a studio session.",
      },
      { property: "og:title", content: "Contact & Advertise — Bus Radio 99.9FM" },
      { property: "og:description", content: "Reach the Bus Radio 99.9FM studio in Kajiado Town." },
    ],
  }),
  component: ContactPage,
});

const rates = [
  { name: "Spot advert (30 sec)", detail: "Prime-time or off-peak rotation across the day." },
  { name: "Sponsored show segment", detail: "Your brand inside Jukwaa La Kazi, Qwetu Afrika or the bulletins." },
  { name: "Live outside broadcast", detail: "We bring the studio to your event anywhere in Kajiado County." },
  { name: "Announcements & obituaries", detail: "Community notices read on air in Kiswahili or Maa." },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact the studio & advertise with us"
        description="Talk to the team, book airtime, or send us a story. We answer every message."
      />

      <section className="container-x grid gap-8 py-12 md:grid-cols-2">
        <div className="grid gap-4">
          <a
            href={`tel:${station.phone}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <Phone className="size-5 text-primary" />
            <span>
              <span className="block font-bold">Call the studio</span>
              <span className="text-sm text-muted-foreground">{station.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={`https://wa.me/${station.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <MessageCircle className="size-5 text-primary" />
            <span>
              <span className="block font-bold">WhatsApp us</span>
              <span className="text-sm text-muted-foreground">Send a voice note, photo or tip</span>
            </span>
          </a>
          <a
            href={`mailto:${station.email}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <Mail className="size-5 text-primary" />
            <span>
              <span className="block font-bold">Email</span>
              <span className="text-sm text-muted-foreground">{station.email}</span>
            </span>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
            <MapPin className="size-5 text-primary" />
            <span>
              <span className="block font-bold">Visit us</span>
              <span className="text-sm text-muted-foreground">{station.address}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
              Book a studio session
            </Link>
            <Link to="/report" className="rounded-full border border-border px-5 py-2.5 text-sm font-bold">
              Report news
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl">Advertise on 99.9 FM</h2>
          <p className="mt-3 text-muted-foreground">
            Bus Radio reaches tens of thousands of listeners across Kajiado County in Kiswahili and Maa. Talk to our
            commercial desk for a package that fits your budget.
          </p>
          <ul className="mt-6 space-y-3">
            {rates.map((r) => (
              <li key={r.name} className="rounded-2xl border border-border bg-card p-4">
                <p className="font-bold">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
