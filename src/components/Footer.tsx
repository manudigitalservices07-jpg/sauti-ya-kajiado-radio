import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { images, station } from "@/data/station";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink pb-28 text-ink-foreground md:pb-12">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <img src={images.logo} alt="Bus Radio 99.9FM" className="h-14 w-auto rounded bg-white p-1.5" />
          <p className="mt-4 text-sm text-white/70">
            {station.tagline} — community radio broadcasting on {station.frequency} from Kajiado Town in Kiswahili and Maa.
          </p>
          <div className="mt-4 flex gap-3">
            <a href={station.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/70 hover:text-primary">
              <Youtube className="size-5" />
            </a>
            <a href={station.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/70 hover:text-primary">
              <Facebook className="size-5" />
            </a>
            <a href={station.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/70 hover:text-primary">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/listen" className="hover:text-white">Listen Live</Link></li>
            <li><Link to="/shows" className="hover:text-white">Shows</Link></li>
            <li><Link to="/news" className="hover:text-white">News</Link></li>
            <li><Link to="/presenters" className="hover:text-white">Presenters</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
          </ul>
        </nav>

        <nav aria-label="Station">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Station</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/support" className="hover:text-white">Support Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact & Advertise</Link></li>
            <li><a href={station.zeno} target="_blank" rel="noreferrer" className="hover:text-white">Zeno.FM</a></li>
            <li><a href={station.onlineRadioBox} target="_blank" rel="noreferrer" className="hover:text-white">Online Radio Box</a></li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Reach us</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />{station.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /><a href={`tel:${station.phone}`} className="hover:text-white">{station.phoneDisplay}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /><a href={`mailto:${station.email}`} className="hover:text-white">{station.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bus Radio 99.9FM · Sauti ya Kajiado. All rights reserved.</p>
          <p>Privacy Policy · Terms of Use</p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <a href="https://euspansolutions.co.ke" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-primary">
              Euspan Solutions
            </a>{" "}
            · euspansolutions.co.ke. All rights reserved.
          </p>
          <p>
            Developed by Emmanuel Ndunda — Website Developer, Euspan Solutions · Best ICT &amp; Digital Providers ·{" "}
            <a href="tel:+254769722940" className="font-semibold text-white hover:text-primary">0769 722 940</a>
          </p>
        </div>
      </div>

    </footer>
  );
}
