import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Radio } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { galleryVideos, images, station } from "@/data/station";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Live Videos — Bus Radio 99.9FM" },
      {
        name: "description",
        content:
          "Watch Bus Radio 99.9FM live sessions, Facebook and YouTube videos, plus photos from the studio and field in Kajiado County.",
      },
      { property: "og:title", content: "Gallery & Live Videos — Bus Radio 99.9FM" },
      { property: "og:description", content: "Live sessions, interviews and photos from Sauti ya Kajiado." },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: images.studio, alt: "The Bus Radio studio booth in Kajiado Town" },
  { src: images.fieldTeam, alt: "Bus Radio field team recording a video interview" },
  { src: images.presenterMic, alt: "A Bus Radio presenter on the microphone at an event" },
  { src: images.jukwaaSiasa, alt: "Jukwaa La Siasa Show poster" },
  { src: images.qwetuAfrika, alt: "Qwetu Afrika show artwork" },
  { src: images.farajaShow, alt: "Faraja Show artwork" },
];

function GalleryPage() {
  const { data: links } = useQuery({
    queryKey: ["live-links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_links")
        .select("id,title,platform,url,description,is_live,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const allVideos = [
    ...(links ?? []).map((l) => ({
      title: l.title,
      description: l.description ?? "",
      url: l.url,
      platform: l.platform,
      isLive: l.is_live,
    })),
    ...galleryVideos.map((v) => ({
      title: v.title,
      description: v.description,
      url: v.url,
      platform: v.kind === "facebook" ? "Facebook" : "YouTube",
      isLive: false,
    })),
  ].filter((v, i, arr) => arr.findIndex((x) => x.url === v.url) === i);

  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Gallery, live sessions & videos"
        description="Catch our live Facebook and YouTube sessions, interviews from the field and photos from the studio."
      />

      <section className="container-x py-10">
        <h2 className="text-2xl">Live sessions & videos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allVideos.map((v) => (
            <a
              key={v.url}
              href={v.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{v.platform}</span>
                {v.isLive && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    LIVE
                  </span>
                )}
              </div>
              <p className="mt-2 font-bold">{v.title}</p>
              {v.description && <p className="mt-1 flex-1 text-sm text-muted-foreground">{v.description}</p>}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Watch <ExternalLink className="size-3.5" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={station.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-ink-foreground"
          >
            <Radio className="size-4" /> Our YouTube channel
          </a>
          <a
            href={station.facebook}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold"
          >
            Facebook page
          </a>
        </div>
      </section>

      <section className="container-x pb-14">
        <h2 className="text-2xl">Photos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover object-top"
            />
          ))}
        </div>
      </section>
    </>
  );
}
