import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Upload } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report News or an Issue — Bus Radio 99.9FM" },
      {
        name: "description",
        content:
          "Send a news tip, photo, audio or video to the Bus Radio 99.9FM newsroom in Kajiado. Submissions are private and seen only by our editors.",
      },
      { property: "og:title", content: "Report News or an Issue — Bus Radio 99.9FM" },
      { property: "og:description", content: "Confidential news tips and media uploads to the Bus Radio newsroom." },
    ],
  }),
  component: ReportPage,
});

const categories = ["News tip", "Community issue", "Corruption / accountability", "Health", "Security", "Water & environment", "Education", "Other"];

function ReportPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState("sending");

    try {
      const paths: string[] = [];
      for (const file of files.slice(0, 5)) {
        const key = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error } = await supabase.storage.from("submissions").upload(key, file);
        if (error) throw error;
        paths.push(key);
      }

      const kind = files[0]?.type.split("/")[0] ?? null;
      const { error } = await supabase.from("reports").insert({
        reporter_name: String(fd.get("reporter_name") ?? "Anonymous") || "Anonymous",
        phone: String(fd.get("phone") ?? "") || null,
        email: String(fd.get("email") ?? "") || null,
        location: String(fd.get("location") ?? "") || null,
        category: String(fd.get("category") ?? "News tip"),
        title: String(fd.get("title") ?? ""),
        details: String(fd.get("details") ?? ""),
        media_urls: paths,
        media_kind: kind,
      });
      if (error) throw error;
      form.reset();
      setFiles([]);
      setState("sent");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="Report news, upload photos, audio or video"
        description="Tell us what is happening in your ward. Only Bus Radio editors can see your submission."
      />
      <section className="container-x max-w-2xl py-10">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
          <ShieldCheck className="size-4 text-primary" /> Your report is private — visible to station editors only.
        </p>

        {state === "sent" ? (
          <div className="rounded-2xl border border-primary/40 bg-card p-8 text-center">
            <h2 className="text-xl font-bold">Report submitted</h2>
            <p className="mt-2 text-muted-foreground">
              Asante sana. Our newsroom will review your report and may contact you to verify details.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Send another report
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">
                Your name (or Anonymous)
                <input name="reporter_name" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Phone (optional)
                <input name="phone" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">
                Email (optional)
                <input name="email" type="email" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Location / ward
                <input name="location" className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
              </label>
            </div>
            <label className="grid gap-1 text-sm font-semibold">
              Category
              <select name="category" className="rounded-lg border border-input bg-background px-3 py-2 font-normal">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Headline
              <input name="title" required className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              What happened?
              <textarea name="details" required rows={5} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Attach photos, audio or video (up to 5)
              <input
                type="file"
                multiple
                accept="image/*,audio/*,video/*"
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                className="rounded-lg border border-input bg-background px-3 py-2 font-normal"
              />
            </label>
            {files.length > 0 && (
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Upload className="size-4" /> {files.length} file(s) ready to upload
              </p>
            )}
            {state === "error" && <p className="text-sm text-destructive">{message}</p>}
            <button
              type="submit"
              disabled={state === "sending"}
              className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60"
            >
              {state === "sending" ? "Uploading…" : "Submit report"}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
