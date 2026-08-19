import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, Send } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Chat — Bus Radio 99.9FM Listeners" },
      {
        name: "description",
        content:
          "Chat live with other Bus Radio 99.9FM listeners across Kajiado County. Sign in to join the conversation with the station community.",
      },
      { property: "og:title", content: "Community Chat — Bus Radio 99.9FM" },
      { property: "og:description", content: "Talk with Bus Radio listeners across Kajiado County." },
    ],
  }),
  component: CommunityPage,
});

type Msg = { id: string; user_id: string; display_name: string; content: string; created_at: string };

function CommunityPage() {
  const { user, isAdmin, loading } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;
    let active = true;

    void supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(200)
      .then(({ data }) => {
        if (active && data) setMessages(data as Msg[]);
      });

    const channel = supabase
      .channel("community-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((m) => [...m, payload.new as Msg]);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages" }, (payload) => {
        setMessages((m) => m.filter((x) => x.id !== (payload.old as Msg).id));
      })
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || !user) return;
    setInput("");
    const displayName =
      (user.user_metadata?.["display_name"] as string | undefined) ??
      (user.user_metadata?.["username"] as string | undefined) ??
      user.email?.split("@")[0] ??
      "Listener";
    await supabase.from("chat_messages").insert({ user_id: user.id, display_name: displayName, content: text });
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  if (loading) {
    return <div className="container-x py-20 text-center text-muted-foreground">Loading…</div>;
  }

  if (!user) {
    return (
      <>
        <PageHeader
          eyebrow="Community"
          title="Bus Radio listener chat"
          description="Talk with listeners across Kajiado County — sign in to join the room."
        />
        <div className="container-x max-w-md py-14 text-center">
          <p className="text-muted-foreground">You need an account to chat with other listeners.</p>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            Sign in or join
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Community" title="Listener chat room" description="Be kind. Station moderators are present." />
      <section className="container-x max-w-3xl py-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground">
            Signed in as <span className="font-bold text-foreground">{user.email?.split("@")[0]}</span>
            {isAdmin && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">ADMIN</span>}
          </p>
          <div className="flex gap-2">
            {isAdmin && (
              <Link to="/admin" className="rounded-full border border-border px-4 py-1.5 font-semibold">
                Admin dashboard
              </Link>
            )}
            <button onClick={signOut} className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-1.5 font-semibold">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>

        <div ref={listRef} className="h-[26rem] space-y-3 overflow-y-auto rounded-2xl border border-border bg-card p-4">
          {messages.map((m) => {
            const mine = m.user_id === user.id;
            return (
              <div key={m.id} className={mine ? "ml-auto max-w-[80%] text-right" : "mr-auto max-w-[80%]"}>
                <p className="text-xs text-muted-foreground">{m.display_name}</p>
                <p
                  className={
                    mine
                      ? "inline-block rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "inline-block rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-sm"
                  }
                >
                  {m.content}
                </p>
                {(mine || isAdmin) && (
                  <button
                    onClick={() => void supabase.from("chat_messages").delete().eq("id", m.id)}
                    className="ml-2 text-xs text-muted-foreground hover:text-destructive"
                  >
                    delete
                  </button>
                )}
              </div>
            );
          })}
          {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet — say hello!</p>}
        </div>

        <form onSubmit={send} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            aria-label="Message"
            className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm"
          />
          <button type="submit" aria-label="Send" className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <Send className="size-4" />
          </button>
        </form>
      </section>
    </>
  );
}
