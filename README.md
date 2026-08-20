# Bus Radio 99.9 FM,Sauti Ya Kajiado

# Lovable Build Prompt — Bus Radio 99.9FM Website

Copy everything below into Lovable as your project prompt.

---

## PROJECT BRIEF

Build a world-class, mobile-first, fully responsive website for **Bus Radio 99.9FM — "Sauti ya Kajiado"**, a community radio station broadcasting from Kajiado Town, Kenya, in Kiswahili and Maa. The station empowers indigenous voices, youth, and grassroots communities in Kajiado County through news, talk shows, culture, and entertainment. It is run entirely by young journalists and has been recognized internationally (featured by UNESCO for grassroots/indigenous media).

The site must feel modern, energetic, and trustworthy — broadcast-grade, not a template. Think: a hybrid of a live-streaming radio player, a local news portal, and a community-pride brand site.

## BRAND IDENTITY

- **Name:** Bus Radio 99.9FM
- **Tagline:** "Sauti ya Kajiado" (The Voice of Kajiado)
- **Frequency:** 99.9 FM, broadcasting from Kajiado Town
- **Colors:** Bold red (#E01B22-ish), charcoal/black, white — pulled from the logo (red "BUS", black gradient "RADIO", red microphone badge with Maasai warrior + woman silhouettes)
- **Logo elements:** Microphone with dotted grille + Maasai silhouette figures inside a red shield — use this as the primary logo mark in the navbar and footer
- **Secondary show brand:** "Jukwaa La Kazi Show" — an orange/black badge-style logo for a flagship talk show; use similar badge styling for other show branding
- **Tone of voice:** Warm, proud, community-first, bilingual (Swahili/English), energetic but credible

## TECHNICAL FOUNDATION

- Fully responsive: flawless on mobile (primary audience), tablet, and desktop
- Fast load times, lazy-loaded images, optimized for low-bandwidth mobile connections (many listeners are on mobile data in rural Kajiado)
- Sticky/persistent audio player that keeps playing while the user navigates between pages (never interrupt playback on route change)
- Accessible (proper contrast, alt text, keyboard navigation, semantic HTML)
- SEO-optimized: meta tags, Open Graph tags, structured data for a RadioStation, sitemap-friendly routing
- PWA-ready (installable "Add to Home Screen" for the live player)

## LIVE STREAMING INTEGRATION

- Primary live stream source: Zeno.FM embed/API — https://zeno.fm/radio/bus-radio-99-9fm/
- Build a persistent floating/sticky audio player component (bottom bar on mobile, bottom-right widget on desktop) with:
  - Play/Pause button with animated equalizer bars when live
  - "LIVE" badge with pulsing red dot
  - Station name + current show name (placeholder text/CMS field for "On Air Now")
  - Volume control / mute
  - Fallback message if stream is offline: "We'll be back on air shortly"
- Also embed a secondary player option pointing to Online Radio Box (https://onlineradiobox.com/ke/bus/) as backup reference, but Zeno.FM should be the primary functional stream

## SITE STRUCTURE / PAGES

### 1. Home Page
- Hero section: full-bleed image/video background (studio shots — modern desk setup with mics, headphones, monitors, red-and-white branded backdrop), large logo, tagline "Sauti ya Kajiado", prominent "Listen Live" button that triggers the sticky player
- "On Air Now" strip showing current show + host
- Weekly show schedule preview (grid or horizontal scroll cards)
- Featured/flagship show spotlight: "Jukwaa La Kazi Show" with its badge logo, description, and airtime
- Latest news/stories section (3-6 card grid, image + headline + excerpt + date)
- "Why Bus Radio" / About teaser section — community impact stats (e.g., estimated 40,000+ listeners, 3km broadcast radius from Kajiado town, on air since 2015, youth-run newsroom)
- Social proof section: embedded YouTube video feed, Facebook page plugin/feed, follower counts
- Call-to-action band: "Support Bus Radio" (community station, donation-friendly messaging) and "Advertise With Us"
- Footer with logo, quick links, social icons, contact info, frequency, and "Sauti ya Kajiado" tagline

### 2. Listen Live Page
- Full-page dedicated live player experience
- Large animated waveform/equalizer visual synced to playback state
- Current show + next show up
- Alternate listening links: Zeno.FM, Online Radio Box
- "How to tune in" section: FM frequency 99.9, coverage area map/description (Kajiado Town and surrounding areas)
- Mobile app / PWA install prompt

### 3. Shows / Programs Page
- Grid of show cards, each with: show badge/logo (style like the "Jukwaa La Kazi Show" badge), name, short description, host name, days/times on air, language (Swahili/Maa)
- Filter by category: News, Talk Shows, Culture, Music, Youth, Gender & Community, Religious programming
- Individual show detail page/modal: full description, host bio, past episode highlights (YouTube embeds), social links

### 4. News / Blog Page
- Card-grid news feed with categories: County News, Community, Culture, Youth, Governance, Health
- Individual article page template: hero image, headline, author, date, body content, related articles, share buttons
- Search and category filter

### 5. Presenters / Team Page
- Grid of presenter profile cards: photo, name, role, show they host, short bio, social links
- Emphasize the youth-led, gender-balanced newsroom story (e.g., head of news is a woman presenting bilingually)

### 6. Media / Gallery Page
- Photo gallery of the studio (use uploaded studio images as reference style — red-and-white branded booth, on-air desk with monitors, mics on tripods, headphones)
- Embedded YouTube video grid pulling from https://www.youtube.com/@BusRadioKajiado254
- Behind-the-scenes content

### 7. About Us Page
- Station story: founded 2010 as a youth group, registered as a CBO in 2014, granted broadcasting frequency by the Communications Authority of Kenya in October 2015
- Mission: advocate for peace, harmony, justice, and development in Kajiado County through community media
- Vision: agent of transformative change in Kajiado County
- Values: indigenous voice empowerment, gender equality, youth leadership
- Timeline/milestones component (2010 → 2014 → 2015 → today)
- Link out to the UNESCO feature article as a credibility citation

### 8. Contact / Advertise Page
- Contact form (name, email, message)
- Studio address in Kajiado Town, phone number, email
- Map embed (Kajiado Town location)
- "Advertise with Bus Radio" section with rate card CTA / contact prompt
- Social links: YouTube, Facebook, X/Twitter, SoundCloud

### 9. Support Us Page
- Community station donation appeal (mirroring the "support our independent broadcast" messaging used on their Zeno.FM page)
- Ways to support: donate, volunteer, internship program for journalism students, partnerships

## NAVIGATION

- Sticky top navbar: logo left, nav links center/right (Home, Listen Live, Shows, News, Presenters, Gallery, About, Contact), prominent red "Listen Live" pill button always visible
- Mobile: hamburger menu with slide-in drawer, sticky mini-player pinned to bottom
- Footer navigation mirrors main nav, plus legal links (Privacy Policy, Terms)

## VISUAL / UX DIRECTION

- Use the microphone + Maasai silhouette motif as a recurring graphic element (subtle background watermark, section dividers, icon accents)
- Bold typography: heavy/condensed sans-serif for headlines (matching the punchy "BUS RADIO" wordmark energy), clean readable sans-serif for body text
- Red/black/white core palette with generous white space so the red pops
- Micro-interactions: hover states on cards, animated equalizer bars near the player, subtle pulse on the "LIVE" indicator
- Real, warm photography over stock/generic imagery — studio shots, community imagery, Maasai cultural motifs used respectfully and authentically, not as decoration alone
- Rounded badge-style show logos (like "Jukwaa La Kazi Show") for program branding throughout

## CONTENT/DATA NOTES FOR LOVABLE

- Structure shows, presenters, and news as reusable data models/components (JSON or CMS-style arrays) so content is easy to update later
- Placeholder content should reflect real details already known: frequency 99.9FM, Kajiado Town, tagline "Sauti ya Kajiado", founded 2010/licensed 2015, bilingual Swahili/Maa broadcasting, flagship show "Jukwaa La Kazi Show"
- Reference links to wire up: YouTube (https://www.youtube.com/@BusRadioKajiado254), Facebook (https://www.facebook.com/SautiyaCounty034/), live stream (https://zeno.fm/radio/bus-radio-99-9fm/), Online Radio Box listing (https://onlineradiobox.com/ke/bus/)

## GOAL

The finished site should feel like the digital home of a proud, credible, youth-led community broadcaster — instantly recognizable by its red/black identity, effortless to listen live from any device, and built to showcase Bus Radio as a serious, award-winning voice for Kajiado County.                                          is an award-winning community radio station broadcasting from Kajiado Town, Kenya, on 99.9 FM. It broadcasts primarily in Swahili and Maasai to educate, empower, and inform local indigenous communities.                                      Station Overview & Details

Frequency: 99.9 FM

Location: Sampu Villa, off Namanga Road, Kajiado, Kenya

Languages: Swahili and Maasai

Phone Contact: +254 720 939088

Focus: Local development, community education, and cultural programming     https://share.google/AdhYBH72gEteYW8Mb https://scontent-mba2-1.xx.fbcdn.net/v/t39.99422-6/771729168_27408504518827884_1887138476637751630_n.png?stp=c214.0.853.853a_dst-jpg_tt6&cstp=mx853x853&ctp=s206x206&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeHoFbOw8_uOQpj9CJ0ix29CKywKI-zYpTcrLAoj7NilN3ApXO4pIiuc8mdzRU9g2YMvPTgu76kDw7susS_5VWhe&_nc_ohc=OwpYxepEPYQQ7kNvwGCuxRv&_nc_oc=AdpAkekCDN2ykdjrpCh3KVvMVaafARoz97fWRM-l0fWwGH2Zl-Uq6zec8KJnTos_M4Y&_nc_zt=14&_nc_ht=scontent-mba2-1.xx&_nc_gid=a7M8pcyWowEW1sj66Lhz2w&_nc_ss=7b2a8&oh=00_AQHNR-x4aK8PaRVDFjaPF1-NmXAZyJrvwTAlL_2LTJPFgQ&oe=6A86DD16                       MOHOJIANO LIVE SHOW EVERY MONDAY                                                                         Add whatsapp button,phone call button,allow posting through admin                 Add live clock,time,date        add live weather      add chat bot         put place to post showa video links for any mahojiano          https://www.instagram.com/sauti.ya.kajiado/reel/Db8DcXIucD_/                                 all it to great people  https://www.youtube.com/@BusRadioKajiado254 all people to report anything admin can see allow admin to edit things where necessay from his side admin login user name KajiadoBusRadio Password @BUS202699.9KAJIADO

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sauti-ya-kajiado-radio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b4111694-03c6-4967-8650-0e9e41d18abd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
