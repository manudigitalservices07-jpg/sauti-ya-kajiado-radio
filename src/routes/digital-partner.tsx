import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Smartphone,
  Sparkles,
} from "lucide-react";

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

type Lang = "en" | "sw" | "mas";

const T = {
  en: {
    eyebrow: "Digital Partner",
    title: "Websites & software that match your need or demand",
    desc: "This website was proudly designed and developed by Euspan Solutions — Kenya's best ICT & digital providers, led by Emmanuel Ndunda (Developer/CEO).",
    services: [
      ["Website Development", "Stunning, fast, mobile-first websites that turn visitors into customers."],
      ["Custom Software", "Tailored systems, portals & automation built to match your exact workflow."],
      ["Mobile & Web Apps", "Progressive apps that work smoothly on every device and screen size."],
      ["ICT & Digital Solutions", "Cloud, branding, SEO, AI chatbots and digital strategy under one roof."],
    ],
    visit: "Visit Euspan Solutions",
    quote: "Request a quote",
    bandEyebrow: "World-class digital experiences",
    bandTitle: "Ready for a world-class website?",
    bandText: "Euspan Solutions builds brands, systems and digital experiences that sell. From radio stations to resorts — if you can dream it, we can build it.",
    features: ["SEO optimized", "Mobile responsive", "AI & chatbot ready", "Fast & secure"],
    formTitle: "Start your project",
    formText: "Tell us what you need — a website, an app, a portal, or a full digital strategy. We reply fast.",
    name: "Your name",
    phone: "Phone number",
    email: "Email (optional)",
    service: "Service needed",
    message: "Describe your project",
    sendWa: "Send via WhatsApp",
    sendMail: "Send via Email",
    portfolioEyebrow: "Also by Euspan Solutions",
    portfolioText: "The tumainigardensresortisinya.co.ke website, booking software and AI assistant were developed by the same team that designed this site — Euspan Solutions.",
    signoff: "Proudly designed, developed & powered by",
    tagline: "Euspan Solutions · Best ICT & Digital Providers in Kenya",
  },
  sw: {
    eyebrow: "Mshirika wa Kidijitali",
    title: "Tovuti na programu zinazokidhi mahitaji yako",
    desc: "Tovuti hii imebuniwa na kutengenezwa kwa fahari na Euspan Solutions — watoa huduma bora wa TEHAMA na kidijitali nchini Kenya, wakiongozwa na Emmanuel Ndunda (Msanidi/Mkurugenzi Mtendaji).",
    services: [
      ["Utengenezaji wa Tovuti", "Tovuti za kuvutia, za haraka na zinazofaa simu, zinazogeuza wageni kuwa wateja."],
      ["Programu Maalum", "Mifumo, lango na otomatiki zilizoundwa kulingana na utaratibu wako wa kazi."],
      ["Programu za Simu na Wavuti", "Programu zinazofanya kazi vizuri kwenye kila kifaa na skrini."],
      ["Suluhisho za TEHAMA", "Wingu, chapa, SEO, chatbot za AI na mkakati wa kidijitali mahali pamoja."],
    ],
    visit: "Tembelea Euspan Solutions",
    quote: "Omba bei",
    bandEyebrow: "Huduma za kidijitali za kiwango cha dunia",
    bandTitle: "Uko tayari kwa tovuti ya kiwango cha dunia?",
    bandText: "Euspan Solutions hujenga chapa, mifumo na huduma za kidijitali zinazouza. Kuanzia vituo vya redio hadi hoteli — ukiweza kuota, tunaweza kujenga.",
    features: ["Imeboreshwa kwa SEO", "Inafaa simu", "Tayari kwa AI na chatbot", "Haraka na salama"],
    formTitle: "Anza mradi wako",
    formText: "Tuambie unachohitaji — tovuti, programu, lango au mkakati kamili wa kidijitali. Tunajibu haraka.",
    name: "Jina lako",
    phone: "Nambari ya simu",
    email: "Barua pepe (si lazima)",
    service: "Huduma unayohitaji",
    message: "Eleza mradi wako",
    sendWa: "Tuma kupitia WhatsApp",
    sendMail: "Tuma kupitia Barua Pepe",
    portfolioEyebrow: "Pia kazi ya Euspan Solutions",
    portfolioText: "Tovuti ya tumainigardensresortisinya.co.ke, programu ya kuhifadhi nafasi na msaidizi wa AI vilitengenezwa na timu ileile iliyobuni tovuti hii — Euspan Solutions.",
    signoff: "Imebuniwa, kutengenezwa na kuendeshwa kwa fahari na",
    tagline: "Euspan Solutions · Watoa Huduma Bora wa TEHAMA nchini Kenya",
  },
  mas: {
    eyebrow: "Olchore le Digital",
    title: "Websites o software naaitobiru enkiyieu inono",
    desc: "Etobiru website ene Euspan Solutions — naaitobiru ICT o digital natii Kenya, nikiikurraa Emmanuel Ndunda (Developer/CEO).",
    services: [
      ["Aitobir Websites", "Websites supati, nasioi, naatii esimu, naaitoki ilowuaa te ilaaji."],
      ["Software Enkiyieu", "Imfumo o portals naaitobiru tenkoitoi e esiai inono."],
      ["Apps e Simu o Wavuti", "Apps naasioi tiatua simu o kompyuta pooki."],
      ["ICT o Digital", "Cloud, branding, SEO, AI chatbots o digital strategy te ewueji obo."],
    ],
    visit: "Ilo Euspan Solutions",
    quote: "Iterrewa ewarie",
    bandEyebrow: "Digital supati te enkop pooki",
    bandTitle: "Iyieu website supati?",
    bandText: "Euspan Solutions eaitobir brands, imfumo o digital naaitoki ilaaji. Ilredio o ilhoteli — ore iyieu, kitobiru.",
    features: ["SEO", "Etii esimu", "AI o chatbot", "Esioi o sidai"],
    formTitle: "Ingor mradi lino",
    formText: "Tiaso enkiyieu — website, app, portal anaa digital strategy. Kiloito esioi.",
    name: "Enkarna ino",
    phone: "Namba e simu",
    email: "Email (meetae)",
    service: "Esiai naiyieu",
    message: "Tiaso mradi lino",
    sendWa: "Ikinyieki te WhatsApp",
    sendMail: "Ikinyieki te Email",
    portfolioEyebrow: "Ore pe Euspan Solutions",
    portfolioText: "Website e tumainigardensresortisinya.co.ke, booking software o AI assistant etobiru team naitobiru website ene — Euspan Solutions.",
    signoff: "Etobiru o eitashe",
    tagline: "Euspan Solutions · ICT o Digital Supati te Kenya",
  },
} as const;

const icons = [Globe, Code2, Smartphone, Sparkles];

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+0-9 ]{9,16}$/),
  email: z.union([z.literal(""), z.string().trim().email().max(255)]),
  service: z.string().max(60),
  message: z.string().trim().min(5).max(1000),
});

function DigitalPartnerPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: T.en.services[0][0] as string, message: "" });
  const [error, setError] = useState("");

  function buildText() {
    const r = schema.safeParse(form);
    if (!r.success) {
      setError(lang === "sw" ? "Tafadhali jaza jina, simu sahihi na maelezo." : lang === "mas" ? "Ingor enkarna, namba e simu o mradi." : "Please enter your name, a valid phone and a message.");
      return null;
    }
    setError("");
    const d = r.data;
    return `New project inquiry (Bus Radio site)\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || "-"}\nService: ${d.service}\n\n${d.message}`;
  }

  function sendWa(e: FormEvent) {
    e.preventDefault();
    const text = buildText();
    if (text) window.open(`https://wa.me/254769722940?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }
  function sendMail() {
    const text = buildText();
    if (text)
      window.location.href = `mailto:infoeuspansolutions@gmail.com?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(text)}`;
  }

  const input = "w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none";

  return (
    <>
      <section className="border-b border-border bg-ink text-ink-foreground">
        <div className="container-x py-12 md:py-16">
          <div className="mb-6 inline-flex rounded-full border border-white/20 p-1" role="group" aria-label="Language">
            {([["en", "English"], ["sw", "Kiswahili"], ["mas", "Maa"]] as const).map(([k, l]) => (
              <button
                key={k}
                type="button"
                onClick={() => setLang(k)}
                aria-pressed={lang === k}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${lang === k ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-2 max-w-3xl text-3xl md:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">{t.desc}</p>
        </div>
      </section>

      <section className="container-x -mt-6 flex justify-center">
        <img src="/media/euspan-logo.png" alt="Euspan Solutions — Tech Company logo" width={160} height={160} loading="lazy" className="size-36 rounded-full bg-white object-contain p-2 shadow-xl sm:size-44" />
      </section>

      <section className="container-x py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map(([title, desc], i) => {
            const Icon = icons[i];
            return (
              <article key={i} className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://euspansolutions.co.ke" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110">
            {t.visit} <ArrowRight className="size-4" />
          </a>
          <a href="#partner-form" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold transition hover:border-primary">
            {t.quote}
          </a>
          <a href="tel:+254769722940" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold transition hover:border-primary">
            <Phone className="size-4" /> 0769 722 940
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-primary/30" />
        <div className="container-x relative grid items-start gap-10 py-16 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.bandEyebrow}</span>
            <h2 className="mt-2 text-3xl md:text-4xl">{t.bandTitle}</h2>
            <p className="mt-4 text-white/75">{t.bandText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {t.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="size-4 text-primary" /> {f}
                </span>
              ))}
            </div>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3"><Phone className="size-4 text-primary" /><a href="tel:+254769722940" className="font-semibold hover:text-white">0769 722 940</a></li>
              <li className="flex items-center gap-3"><Mail className="size-4 text-primary" /><a href="mailto:infoeuspansolutions@gmail.com" className="font-semibold hover:text-white">infoeuspansolutions@gmail.com</a></li>
              <li className="flex items-center gap-3"><Globe className="size-4 text-primary" /><a href="https://euspansolutions.co.ke" target="_blank" rel="noreferrer" className="font-semibold hover:text-white">euspansolutions.co.ke</a></li>
            </ul>
          </div>

          <form id="partner-form" onSubmit={sendWa} className="scroll-mt-28 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="text-2xl text-white">{t.formTitle}</h3>
            <p className="mt-2 text-sm text-white/70">{t.formText}</p>
            <div className="mt-5 grid gap-3">
              <input className={input} placeholder={t.name} maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className={input} type="tel" placeholder={t.phone} maxLength={16} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <input className={input} type="email" placeholder={t.email} maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <label className="text-xs font-semibold text-white/70">
                {t.service}
                <select className={`${input} mt-1`} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  {T.en.services.map(([s], i) => (
                    <option key={s} value={s} className="text-foreground">{t.services[i][0]}</option>
                  ))}
                </select>
              </label>
              <textarea className={`${input} min-h-28`} placeholder={t.message} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              {error && <p className="text-sm font-semibold text-primary">{error}</p>}
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110">
                  <MessageCircle className="size-4" /> {t.sendWa}
                </button>
                <button type="button" onClick={sendMail} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-primary">
                  <Mail className="size-4" /> {t.sendMail}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{t.portfolioEyebrow}</p>
          <h3 className="mt-2 text-2xl">tumainigardensresortisinya.co.ke</h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t.portfolioText}</p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-12 text-center">
        <div className="container-x">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">{t.signoff}</p>
          <p className="mt-2 text-xl font-bold">Emmanuel Ndunda — Developer / CEO</p>
          <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>
          <a href="https://euspansolutions.co.ke" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110">
            {t.visit} <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </>
  );
}
