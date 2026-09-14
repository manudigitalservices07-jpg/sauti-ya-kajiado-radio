import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  Mail,
  Phone,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/digital-partner")({
  head: () => ({
    meta: [
      { title: "Digital Partner — Euspan Solutions | Bus Radio 99.9FM" },
      {
        name: "description",
        content:
          "This Bus Radio 99.9FM website was designed and developed by Euspan Solutions — Kenya's best ICT & digital providers, led by Emmanuel Ndunda. Websites, software, apps & AI chatbots.",
      },
      { property: "og:title", content: "Digital Partner — Euspan Solutions" },
      {
        property: "og:description",
        content: "Websites & software that match your need or demand. Built by Euspan Solutions.",
      },
    ],
  }),
  component: DigitalPartnerPage,
});

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Stunning, fast, mobile-first websites that turn visitors into customers.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Tailored systems, portals & automation built to match your exact workflow.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    desc: "Progressive apps that work smoothly on every device and screen size.",
  },
  {
    icon: Sparkles,
    title: "ICT & Digital Solutions",
    desc: "Cloud, branding, SEO, AI chatbots and digital strategy under one roof.",
  },
];

const features = ["SEO optimized", "Mobile responsive", "AI & chatbot ready", "Fast & secure"];

function DigitalPartnerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital Partner"
        title="Websites & software that match your need or demand"
        description="This website was proudly designed and developed by Euspan Solutions — Kenya's best ICT & digital providers, led by Emmanuel Ndunda (Developer/CEO)."
      />

      <section className="container-x -mt-6 flex justify-center">
        <img
          src="/media/euspan-logo.png"
          alt="Euspan Solutions — Tech Company logo"
          width={160}
          height={160}
          loading="lazy"
          className="size-36 rounded-full bg-white object-contain p-2 shadow-xl sm:size-44"
        />
      </section>

      {/* Services */}

      <section className="container-x py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://euspansolutions.co.ke"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            Visit Euspan Solutions <ArrowRight className="size-4" />
          </a>
          <a
            href="https://euspansolutions.co.ke"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold transition hover:border-primary"
          >
            Request a quote
          </a>
          <a
            href="tel:+254769722940"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold transition hover:border-primary"
          >
            <Phone className="size-4" /> 0769 722 940
          </a>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-primary/30" />
        <div className="container-x relative grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              World-class digital experiences
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl">Ready for a world-class website?</h2>
            <p className="mt-4 text-white/75">
              Euspan Solutions builds brands, systems and digital experiences that sell. From
              radio stations to resorts — if you can dream it, we can build it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                >
                  <CheckCircle2 className="size-4 text-primary" /> {f}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-2xl text-white">Start your project</h3>
            <p className="mt-2 text-sm text-white/70">
              Tell us what you need — a website, an app, a portal, or a full digital strategy. We
              reply fast.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href="tel:+254769722940" className="font-semibold hover:text-white">
                  0769 722 940
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a
                  href="mailto:infoeuspansolutions@gmail.com"
                  className="font-semibold hover:text-white"
                >
                  infoeuspansolutions@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="size-4 text-primary" />
                <a
                  href="https://euspansolutions.co.ke"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-white"
                >
                  euspansolutions.co.ke
                </a>
              </li>
            </ul>
            <a
              href="https://euspansolutions.co.ke"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
            >
              Get a website <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio credit */}
      <section className="container-x py-14">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Also by Euspan Solutions
          </p>
          <h3 className="mt-2 text-2xl">
            tumainigardensresortisinya.co.ke — booking software & AI assistant
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            The tumainigardensresortisinya.co.ke website, booking software and AI assistant were
            developed by the same team that designed this site — Euspan Solutions. We build
            world-class websites, custom software, mobile apps & AI chatbots tailored to your need
            or demand.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="tel:+254769722940"
              className="inline-flex items-center gap-2 font-semibold"
            >
              <Phone className="size-4 text-primary" /> 0769 722 940
            </a>
            <a
              href="mailto:infoeuspansolutions@gmail.com"
              className="inline-flex items-center gap-2 font-semibold"
            >
              <Mail className="size-4 text-primary" /> infoeuspansolutions@gmail.com
            </a>
            <a
              href="https://euspansolutions.co.ke"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold"
            >
              <Globe className="size-4 text-primary" /> euspansolutions.co.ke
            </a>
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="border-t border-border bg-secondary py-12 text-center">
        <div className="container-x">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Proudly designed, developed & powered by
          </p>
          <p className="mt-2 text-xl font-bold">
            Emmanuel Ndunda — Developer / CEO
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Euspan Solutions · Best ICT & Digital Providers in Kenya
          </p>
          <a
            href="https://euspansolutions.co.ke"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
          >
            Visit Euspan Solutions <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
