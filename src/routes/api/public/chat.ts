import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are "Bus Bot", the friendly assistant for Bus Radio 99.9FM ("Sauti ya Kajiado"), a youth-run community radio station in Kajiado Town, Kenya.
Facts: frequency 99.9 FM; on air since 2015; studios at Sampu Villa, off Namanga Road, Kajiado Town; phone/WhatsApp +254 720 939088; broadcasts in Kiswahili and Maa.
Shows: Jukwaa La Kazi (MC Jumah, Mon-Thu 10am-1pm), Jukwaa La Siasa (Milanoi Antonia, Fridays 7pm), Qwetu Afrika (DJ Kitts, Mon-Fri 2:30-5pm), Faraja Show (Kaka J, Sundays 8-10pm), Habari za Kaunti bulletins 7am/1pm/7pm.
Site pages: /listen (live stream), /shows, /news, /presenters, /gallery, /about, /contact, /support, /book (book a studio session), /report (send news tips, photos, audio, video), /community (listener chat).
Always be warm, positive about the station, and brief (max 90 words). Reply in the language the listener uses (English, Kiswahili or Maa greetings). If unsure, invite them to call or WhatsApp the studio.`;

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return Response.json({ error: "Chat is not configured yet." }, { status: 500 });

        const body = (await request.json()) as { messages?: Msg[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (messages.length === 0) return Response.json({ error: "No message provided." }, { status: 400 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "openai/gpt-5.6-sol",
            input: [
              { role: "system", content: SYSTEM },
              ...messages.map((m) => ({
                role: m.role,
                content: String(m.content ?? "").slice(0, 2000),
              })),
            ],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          console.error("AI gateway error", res.status, detail);
          if (res.status === 429) return Response.json({ error: "Bus Bot is busy — try again shortly." });
          return Response.json({ error: "Bus Bot is offline right now. Call the studio on +254 720 939088." });
        }

        const data = (await res.json()) as {
          output_text?: string;
          output?: { content?: { type?: string; text?: string }[] }[];
        };
        const reply =
          data.output_text ??
          data.output
            ?.flatMap((o) => o.content ?? [])
            .filter((c) => c.type === "output_text")
            .map((c) => c.text ?? "")
            .join("") ??
          "";

        return Response.json({ reply: reply.trim() || "Karibu! Ask me anything about Bus Radio 99.9FM." });
      },
    },
  },
});
