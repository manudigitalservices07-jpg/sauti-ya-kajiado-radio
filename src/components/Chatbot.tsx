import { useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Karibu Bus Radio 99.9FM! I'm Bus Bot. Ask me about our shows, presenters, how to listen live, book a studio session or report news.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/public/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Sorry, I couldn't answer that right now. Call the studio on +254 720 939088.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network hiccup — please try again in a moment." },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => listRef.current?.scrollTo({ top: 99999 }));
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Bus Bot chat" : "Chat with Bus Bot"}
        className="fixed right-4 bottom-24 z-50 grid size-12 place-items-center rounded-full bg-ink text-ink-foreground shadow-lg ring-2 ring-primary transition hover:scale-105 md:bottom-32"
      >
        {open ? <X className="size-5" /> : <Bot className="size-6" />}
      </button>

      {open && (
        <div className="fixed right-4 bottom-40 z-50 flex h-96 w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:bottom-48">
          <div className="flex items-center gap-2 bg-ink px-4 py-3 text-ink-foreground">
            <Bot className="size-4 text-primary" />
            <p className="text-sm font-bold">Bus Bot · Sauti ya Kajiado</p>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-sm"
                }
              >
                {m.content}
              </div>
            ))}
            {busy && <p className="text-xs text-muted-foreground">Bus Bot is typing…</p>}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-border p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about shows, booking, news…"
              aria-label="Message Bus Bot"
              className="min-w-0 flex-1 rounded-full border border-input bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label="Send message"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
