import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Loader2,
  Radio,
  Trash2,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { newsCategories, showCategories } from "@/data/station";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Bus Radio 99.9FM" },
      {
        name: "description",
        content: "Station admin dashboard for Bus Radio 99.9FM — manage reports, bookings, comments, news, shows and live links.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "reports" | "bookings" | "comments" | "news" | "shows" | "live";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      void navigate({ to: "/auth", replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 size-5 animate-spin" /> Loading admin…
      </div>
    );
  }
  if (!user || !isAdmin) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "reports", label: "Reports" },
    { id: "bookings", label: "Bookings" },
    { id: "comments", label: "Comments" },
    { id: "news", label: "News" },
    { id: "shows", label: "Shows" },
    { id: "live", label: "Live links" },
  ];

  return (
    <section className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Admin</span>
          <h1 className="mt-1 text-3xl md:text-4xl">Station dashboard</h1>
        </div>
        <Link to="/auth" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          Sign out
        </Link>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "overview" && <Overview onJump={setTab} />}
        {tab === "reports" && <ReportsPanel />}
        {tab === "bookings" && <BookingsPanel />}
        {tab === "comments" && <CommentsPanel />}
        {tab === "news" && <NewsPanel />}
        {tab === "shows" && <ShowsPanel />}
        {tab === "live" && <LivePanel />}
      </div>
    </section>
  );
}

/* ---------------- Overview ---------------- */

function Overview({ onJump }: { onJump: (t: Tab) => void }) {
  const [counts, setCounts] = useState<{ reports: number; bookings: number; comments: number } | null>(null);

  useEffect(() => {
    (async () => {
      const [r, b, c] = await Promise.all([
        supabase.from("reports").select("id", { count: "exact", head: true }).neq("status", "resolved"),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("comments").select("id", { count: "exact", head: true }).eq("approved", false),
      ]);
      setCounts({
        reports: r.count ?? 0,
        bookings: b.count ?? 0,
        comments: c.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Open reports", value: counts?.reports, tab: "reports" as Tab },
    { label: "Pending bookings", value: counts?.bookings, tab: "bookings" as Tab },
    { label: "Comments to approve", value: counts?.comments, tab: "comments" as Tab },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <button
          key={c.label}
          type="button"
          onClick={() => onJump(c.tab)}
          className="rounded-2xl border border-border bg-card p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <p className="font-display text-4xl font-extrabold text-primary">
            {c.value === undefined ? "…" : c.value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
        </button>
      ))}
    </div>
  );
}

/* ---------------- Reports ---------------- */

type ReportRow = {
  id: string;
  title: string;
  category: string;
  reporter_name: string;
  phone: string | null;
  email: string | null;
  location: string | null;
  details: string;
  media_kind: string | null;
  media_urls: string[];
  status: string;
  created_at: string;
};

function ReportsPanel() {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [signed, setSigned] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as ReportRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function viewMedia(path: string) {
    if (signed[path]) return;
    const { data } = await supabase.storage.from("submissions").createSignedUrl(path, 300);
    if (data?.signedUrl) setSigned((s) => ({ ...s, [path]: data.signedUrl }));
  }

  async function setStatus(id: string, status: string) {
    await supabase.from("reports").update({ status }).eq("id", id);
    void load();
  }

  if (loading) return <PanelLoader />;
  if (rows.length === 0) return <Empty label="No reports submitted yet." />;

  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{r.category}</span>
              <h3 className="text-lg font-bold">{r.title}</h3>
              <p className="text-xs text-muted-foreground">
                {r.reporter_name} · {r.phone ?? "no phone"} · {r.location ?? "no location"} ·{" "}
                {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                r.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {r.status}
            </span>
          </div>

          {open === r.id && (
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              <p className="text-sm whitespace-pre-wrap">{r.details}</p>
              {r.media_urls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {r.media_urls.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => viewMedia(p)}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-secondary"
                    >
                      <ImageIcon className="size-3.5" /> {r.media_kind ?? "file"} · view
                    </button>
                  ))}
                </div>
              )}
              {Object.entries(signed).map(([path, url]) =>
                r.media_urls.includes(path) ? (
                  <a key={path} href={url} target="_blank" rel="noreferrer" className="block text-sm font-semibold text-primary">
                    Open media file <ExternalLink className="inline size-3.5" />
                  </a>
                ) : null,
              )}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOpen(open === r.id ? null : r.id)}
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold"
            >
              {open === r.id ? "Hide" : "View"}
            </button>
            {r.status !== "reviewed" && (
              <button
                type="button"
                onClick={() => void setStatus(r.id, "reviewed")}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
              >
                Mark reviewed
              </button>
            )}
            {r.status !== "resolved" && (
              <button
                type="button"
                onClick={() => void setStatus(r.id, "resolved")}
                className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
              >
                Resolve
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Bookings ---------------- */

type BookingRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  organisation: string | null;
  session_type: string;
  preferred_date: string | null;
  preferred_time: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

function BookingsPanel() {
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setRows((data as BookingRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    void load();
  }

  if (loading) return <PanelLoader />;
  if (rows.length === 0) return <Empty label="No studio bookings yet." />;

  return (
    <div className="space-y-3">
      {rows.map((b) => (
        <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold">{b.full_name}</h3>
              <p className="text-xs text-muted-foreground">
                {b.session_type} · {b.preferred_date ?? "flexible"} · {b.preferred_time ?? "flexible"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {b.phone} · {b.email ?? "no email"} · {b.organisation ?? "no org"}
              </p>
              {b.notes && <p className="mt-2 text-sm">{b.notes}</p>}
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">{b.status}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {b.status !== "confirmed" && (
              <button onClick={() => void setStatus(b.id, "confirmed")} className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Confirm
              </button>
            )}
            {b.status !== "completed" && (
              <button onClick={() => void setStatus(b.id, "completed")} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                Mark completed
              </button>
            )}
            {b.status !== "cancelled" && (
              <button onClick={() => void setStatus(b.id, "cancelled")} className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Comments ---------------- */

type CommentRow = {
  id: string;
  target: string;
  author_name: string;
  content: string;
  approved: boolean;
  created_at: string;
};

function CommentsPanel() {
  const [rows, setRows] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("comments")
      .select("id,target,author_name,content,approved,created_at")
      .order("created_at", { ascending: false });
    setRows((data as CommentRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function approve(id: string) {
    await supabase.from("comments").update({ approved: true }).eq("id", id);
    void load();
  }
  async function remove(id: string) {
    await supabase.from("comments").delete().eq("id", id);
    void load();
  }

  if (loading) return <PanelLoader />;
  if (rows.length === 0) return <Empty label="No comments submitted." />;

  return (
    <div className="space-y-3">
      {rows.map((c) => (
        <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{c.author_name}</span> on {c.target} ·{" "}
                {new Date(c.created_at).toLocaleString()}
              </p>
              <p className="mt-1 text-sm">{c.content}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                c.approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {c.approved ? "approved" : "pending"}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            {!c.approved && (
              <button onClick={() => void approve(c.id)} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                <CheckCircle2 className="size-3.5" /> Approve
              </button>
            )}
            <button onClick={() => void remove(c.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold">
              <XCircle className="size-3.5" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- News ---------------- */

const newsCats = newsCategories.filter((c) => c !== "All");

function NewsPanel() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<{ id: string; slug: string; title: string; category: string; published: boolean; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(newsCats[0]);
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Bus Radio Newsroom");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("news_posts").select("id,slug,title,category,published,created_at").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const slug = slugify(title);
    if (!slug) {
      setMsg("Title is required.");
      setSaving(false);
      return;
    }
    const { error } = await supabase.from("news_posts").insert({
      title,
      slug,
      category,
      excerpt: excerpt || body.slice(0, 160),
      body,
      image_url: image_url || null,
      author,
      published,
    });
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setTitle(""); setExcerpt(""); setBody(""); setImageUrl("");
    qc.invalidateQueries({ queryKey: ["news-posts"] });
    void load();
  }

  async function toggle(id: string, published: boolean) {
    await supabase.from("news_posts").update({ published: !published }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["news-posts"] });
    void load();
  }
  async function remove(id: string) {
    await supabase.from("news_posts").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["news-posts"] });
    void load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Post a news story</h2>
        <Input label="Title" value={title} onChange={setTitle} required />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 font-normal">
              {newsCats.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <Input label="Author" value={author} onChange={setAuthor} />
        </div>
        <Input label="Image URL (optional)" value={image_url} onChange={setImageUrl} />
        <label className="grid gap-1 text-sm font-semibold">
          Excerpt
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Body
          <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={6} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publish immediately
        </label>
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
          {saving ? "Saving…" : "Publish story"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold">Posted stories</h2>
        {loading ? <PanelLoader /> : rows.length === 0 ? <Empty label="No stories posted yet." /> : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.category} · {r.published ? "published" : "draft"}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => void toggle(r.id, r.published)} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {r.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => void remove(r.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold">
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Shows ---------------- */

const showCats = showCategories.filter((c) => c !== "All");

function ShowsPanel() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<{ id: string; slug: string; name: string; host: string; category: string; published: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [days, setDays] = useState("");
  const [time_slot, setTimeSlot] = useState("");
  const [category, setCategory] = useState(showCats[0]);
  const [language, setLanguage] = useState("Kiswahili & Maa");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("show_posts").select("id,slug,name,host,category,published").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const slug = slugify(name);
    if (!slug) {
      setMsg("Show name is required.");
      setSaving(false);
      return;
    }
    const { error } = await supabase.from("show_posts").insert({
      name,
      slug,
      host,
      days,
      time_slot,
      category,
      language,
      description,
      image_url: image_url || null,
      published,
    });
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setName(""); setHost(""); setDays(""); setTimeSlot(""); setDescription(""); setImageUrl("");
    qc.invalidateQueries({ queryKey: ["show-posts"] });
    void load();
  }

  async function remove(id: string) {
    await supabase.from("show_posts").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["show-posts"] });
    void load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Add a show</h2>
        <Input label="Show name" value={name} onChange={setName} required />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Host" value={host} onChange={setHost} />
          <label className="grid gap-1 text-sm font-semibold">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 font-normal">
              {showCats.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Days (e.g. Monday – Thursday)" value={days} onChange={setDays} />
          <Input label="Time slot (e.g. 10:00 AM – 1:00 PM)" value={time_slot} onChange={setTimeSlot} />
        </div>
        <Input label="Language" value={language} onChange={setLanguage} />
        <Input label="Image URL (optional)" value={image_url} onChange={setImageUrl} />
        <label className="grid gap-1 text-sm font-semibold">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publish immediately
        </label>
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
          {saving ? "Saving…" : "Add show"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold">Posted shows</h2>
        {loading ? <PanelLoader /> : rows.length === 0 ? <Empty label="No shows posted yet." /> : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.host} · {r.category} · {r.published ? "published" : "draft"}</p>
                </div>
                <button onClick={() => void remove(r.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold">
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Live links ---------------- */

function LivePanel() {
  const qc = useQueryClient();
  const [rows, setRows] = useState<{ id: string; title: string; platform: string; url: string; is_live: boolean; published: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [description, setDescription] = useState("");
  const [is_live, setIsLive] = useState(false);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("live_links").select("id,title,platform,url,is_live,published").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const { error } = await supabase.from("live_links").insert({
      title,
      url,
      platform,
      description: description || null,
      is_live,
      published,
    });
    setSaving(false);
    if (error) {
      setMsg(error.message);
      return;
    }
    setTitle(""); setUrl(""); setDescription(""); setIsLive(false);
    qc.invalidateQueries({ queryKey: ["live-links"] });
    void load();
  }

  async function toggleField(id: string, field: "is_live" | "published", val: boolean) {
    await supabase.from("live_links").update({ [field]: !val }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["live-links"] });
    void load();
  }
  async function remove(id: string) {
    await supabase.from("live_links").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["live-links"] });
    void load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Post a live session link</h2>
        <Input label="Title" value={title} onChange={setTitle} required />
        <Input label="Stream / video URL" value={url} onChange={setUrl} required />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold">
            Platform
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2 font-normal">
              <option>Facebook</option>
              <option>YouTube</option>
              <option>Instagram</option>
              <option>Other</option>
            </select>
          </label>
          <div className="grid gap-2">
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={is_live} onChange={(e) => setIsLive(e.target.checked)} /> Currently live
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published
            </label>
          </div>
        </div>
        <label className="grid gap-1 text-sm font-semibold">
          Description (optional)
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="rounded-lg border border-input bg-background px-3 py-2 font-normal" />
        </label>
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
          <Radio className="size-4" /> {saving ? "Saving…" : "Add live link"}
        </button>
      </form>

      <div>
        <h2 className="mb-3 text-lg font-bold">Live links</h2>
        {loading ? <PanelLoader /> : rows.length === 0 ? <Empty label="No live links yet." /> : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.platform} · {r.url}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.is_live ? "🔴 live" : "not live"} · {r.published ? "published" : "hidden"}
                    </p>
                  </div>
                  <a href={r.url} target="_blank" rel="noreferrer" className="shrink-0 text-primary">
                    <ExternalLink className="size-4" />
                  </a>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button onClick={() => void toggleField(r.id, "is_live", r.is_live)} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {r.is_live ? "End live" : "Mark live"}
                  </button>
                  <button onClick={() => void toggleField(r.id, "published", r.published)} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {r.published ? "Hide" : "Publish"}
                  </button>
                  <button onClick={() => void remove(r.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold">
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- shared bits ---------------- */

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-lg border border-input bg-background px-3 py-2 font-normal"
      />
    </label>
  );
}

function PanelLoader() {
  return (
    <div className="flex items-center gap-2 py-10 text-muted-foreground">
      <Loader2 className="size-5 animate-spin" /> Loading…
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="py-10 text-muted-foreground">{label}</p>;
}
