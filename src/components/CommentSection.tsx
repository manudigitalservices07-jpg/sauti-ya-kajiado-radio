import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Public comments: anyone may post, only admin-approved comments are shown. */
export function CommentSection({ target }: { target: string }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", target],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id,author_name,content,created_at")
        .eq("target", target)
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setState("sending");
    const { error } = await supabase
      .from("comments")
      .insert({ target, author_name: name.trim(), content: content.trim(), approved: false });
    if (error) {
      setState("error");
      return;
    }
    setName("");
    setContent("");
    setState("sent");
    void refetch();
  }

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <MessageSquare className="size-5 text-primary" /> Comments
      </h2>

      <form onSubmit={submit} className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          required
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts…"
          aria-label="Your comment"
          required
          rows={3}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {state === "sending" ? "Sending…" : "Post comment"}
          </button>
          {state === "sent" && <p className="text-sm text-muted-foreground">Thank you — your comment awaits approval.</p>}
          {state === "error" && <p className="text-sm text-destructive">Could not send. Please try again.</p>}
        </div>
      </form>

      <ul className="mt-6 space-y-4">
        {(comments ?? []).map((c) => (
          <li key={c.id} className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-bold">{c.author_name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.content}</p>
            <p className="mt-2 text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</p>
          </li>
        ))}
        {comments?.length === 0 && <li className="text-sm text-muted-foreground">Be the first to comment.</li>}
      </ul>
    </section>
  );
}
