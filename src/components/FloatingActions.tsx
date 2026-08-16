import { MessageCircle, Phone } from "lucide-react";
import { station } from "@/data/station";

export function FloatingActions() {
  return (
    <div className="fixed left-4 bottom-24 z-40 flex flex-col gap-3 md:bottom-8">
      <a
        href={`https://wa.me/${station.whatsapp}?text=${encodeURIComponent("Hello Bus Radio 99.9FM")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Bus Radio on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
      <a
        href={`tel:${station.phone}`}
        aria-label="Call the Bus Radio studio"
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}
