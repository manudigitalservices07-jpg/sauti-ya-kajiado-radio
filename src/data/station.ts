import logo from "@/assets/image.png.asset.json";
import studio from "@/assets/image-2.png.asset.json";
import jukwaaSiasa from "@/assets/image-3.png.asset.json";
import jukwaaKaziBadge from "@/assets/image-4.png.asset.json";
import fieldTeam from "@/assets/image-5.png.asset.json";
import presenterMic from "@/assets/image-6.png.asset.json";
import qwetuAfrika from "@/assets/image-7.png.asset.json";
import farajaShow from "@/assets/image-8.png.asset.json";
import jukwaaKazi from "@/assets/image-9.png.asset.json";

export const images = {
  logo: logo.url,
  studio: studio.url,
  jukwaaSiasa: jukwaaSiasa.url,
  jukwaaKaziBadge: jukwaaKaziBadge.url,
  fieldTeam: fieldTeam.url,
  presenterMic: presenterMic.url,
  qwetuAfrika: qwetuAfrika.url,
  farajaShow: farajaShow.url,
  jukwaaKazi: jukwaaKazi.url,
};

export const station = {
  name: "Bus Radio 99.9FM",
  tagline: "Sauti ya Kajiado",
  frequency: "99.9 FM",
  address: "Sampu Villa, off Namanga Road, Kajiado Town, Kenya",
  phone: "+254720939088",
  phoneDisplay: "+254 720 939088",
  whatsapp: "254720939088",
  email: "info@busradiokajiado.co.ke",
  streamUrl: "https://stream.zeno.fm/v8ajo3atw0ntv",
  zeno: "https://zeno.fm/radio/bus-radio-99-9fm/",
  onlineRadioBox: "https://onlineradiobox.com/ke/bus/",
  youtube: "https://www.youtube.com/@BusRadioKajiado254",
  facebook: "https://www.facebook.com/SautiyaCounty034/",
  instagram: "https://www.instagram.com/sauti.ya.kajiado/",
  coords: { lat: -1.8523, lon: 36.7767 },
};

export type Show = {
  slug: string;
  name: string;
  category: "News" | "Talk Shows" | "Culture" | "Music" | "Youth" | "Gender & Community" | "Religious";
  host: string;
  days: string;
  time: string;
  language: string;
  description: string;
  image?: string;
};

export const shows: Show[] = [
  {
    slug: "jukwaa-la-kazi",
    name: "Jukwaa La Kazi Show",
    category: "Talk Shows",
    host: "MC Jumah",
    days: "Monday – Thursday",
    time: "10:00 AM – 1:00 PM",
    language: "Kiswahili",
    description:
      "Our flagship morning platform on jobs, hustle and enterprise in Kajiado — listeners call in with opportunities, skills and real stories from the ground.",
    image: images.jukwaaKazi,
  },
  {
    slug: "jukwaa-la-siasa",
    name: "Jukwaa La Siasa Show",
    category: "Talk Shows",
    host: "Milanoi Antonia",
    days: "Every Friday",
    time: "7:00 PM",
    language: "Kiswahili / Maa",
    description:
      "Accountability, governance and county politics — leaders answer to the people of Kajiado in a frank, moderated debate.",
    image: images.jukwaaSiasa,
  },
  {
    slug: "qwetu-afrika",
    name: "Qwetu Afrika",
    category: "Culture",
    host: "DJ Kitts",
    days: "Monday – Friday",
    time: "2:30 PM – 5:00 PM",
    language: "Kiswahili",
    description: "Muziki, utamaduni na motisha — Sauti ya Afrika, kwa Watu wa Afrika, kuhusu Afrika.",
    image: images.qwetuAfrika,
  },
  {
    slug: "faraja-show",
    name: "Faraja Show",
    category: "Religious",
    host: "Kaka J",
    days: "Every Sunday",
    time: "8:00 PM – 10:00 PM",
    language: "Kiswahili",
    description: "Comfort, faith and hope — gospel music, scripture and listener prayer requests.",
    image: images.farajaShow,
  },
  {
    slug: "mahojiano-live",
    name: "Mahojiano Live Show",
    category: "News",
    host: "Bus Radio Newsroom",
    days: "Every Monday",
    time: "Live",
    language: "Kiswahili / Maa",
    description:
      "Live interviews with newsmakers, county officials and community leaders. Watch the video interviews on our media page.",
    image: images.presenterMic,
  },
  {
    slug: "sauti-ya-mwanamke",
    name: "Sauti ya Mwanamke",
    category: "Gender & Community",
    host: "Milanoi Antonia",
    days: "Wednesday",
    time: "4:00 PM – 5:00 PM",
    language: "Maa / Kiswahili",
    description:
      "Gender equality, girls' education and ending harmful practices — women of Kajiado speaking in their own voice.",
    image: images.fieldTeam,
  },
  {
    slug: "vijana-tunaweza",
    name: "Vijana Tunaweza",
    category: "Youth",
    host: "Bus Radio Youth Desk",
    days: "Saturday",
    time: "11:00 AM – 1:00 PM",
    language: "Kiswahili",
    description: "Youth leadership, digital skills, sports and campus talk driven by young people in Kajiado County.",
    image: images.fieldTeam,
  },
  {
    slug: "habari-za-kaunti",
    name: "Habari za Kaunti",
    category: "News",
    host: "Bus Radio Newsroom",
    days: "Daily",
    time: "7:00 AM, 1:00 PM, 7:00 PM",
    language: "Kiswahili / Maa",
    description: "County bulletins three times a day — verified, local, bilingual news from across Kajiado.",
    image: images.studio,
  },
];

export const showCategories = [
  "All",
  "News",
  "Talk Shows",
  "Culture",
  "Music",
  "Youth",
  "Gender & Community",
  "Religious",
] as const;

export type Presenter = {
  name: string;
  role: string;
  show: string;
  bio: string;
  image: string;
};

export const presenters: Presenter[] = [
  {
    name: "Milanoi Antonia",
    role: "Head of News",
    show: "Jukwaa La Siasa Show",
    bio: "Leads the newsroom and presents bilingually in Kiswahili and Maa, championing women's voices in county governance.",
    image: images.jukwaaSiasa,
  },
  {
    name: "MC Jumah",
    role: "Presenter",
    show: "Jukwaa La Kazi Show",
    bio: "Hosts the flagship enterprise show, connecting listeners to jobs, training and opportunity across Kajiado.",
    image: images.jukwaaKazi,
  },
  {
    name: "DJ Kitts",
    role: "Presenter & DJ",
    show: "Qwetu Afrika",
    bio: "Afro-centric selector and cultural storyteller, keeping the afternoon drive warm and proudly African.",
    image: images.qwetuAfrika,
  },
  {
    name: "Kaka J",
    role: "Presenter",
    show: "Faraja Show",
    bio: "Sunday night host bringing comfort, gospel and prayer to families across the county.",
    image: images.farajaShow,
  },
  {
    name: "Field Reporting Team",
    role: "Community Correspondents",
    show: "Habari za Kaunti",
    bio: "Young reporters covering the manyattas, markets and barazas of Kajiado — where the story actually lives.",
    image: images.fieldTeam,
  },
  {
    name: "Community Desk",
    role: "Producer",
    show: "Sauti ya Mwanamke",
    bio: "Produces gender and community programming with grassroots groups and partner organisations.",
    image: images.presenterMic,
  },
];

export type Article = {
  slug: string;
  title: string;
  category: "County News" | "Community" | "Culture" | "Youth" | "Governance" | "Health";
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  image: string;
};

export const articles: Article[] = [
  {
    slug: "kajiado-water-project-launch",
    title: "New borehole project brings clean water to three Kajiado manyattas",
    category: "County News",
    excerpt:
      "Residents say the new boreholes cut daily water-fetching journeys from six hours to under one, freeing girls to attend school.",
    body: [
      "Three manyattas on the outskirts of Kajiado Town now have year-round access to clean water following the commissioning of new boreholes supported by county and community contributions.",
      "Speaking to Bus Radio 99.9FM, residents said the project has cut daily water-fetching journeys from as much as six hours to under one, with the biggest change felt by girls who previously missed morning classes.",
      "The station will continue to follow the maintenance plan and report back on how the water committees are managing the facilities.",
    ],
    author: "Bus Radio Newsroom",
    date: "2026-08-10",
    image: "",
  },
  {
    slug: "youth-newsroom-training",
    title: "Twenty young journalists graduate from the Bus Radio newsroom programme",
    category: "Youth",
    excerpt:
      "The youth-run newsroom trained a new cohort in mobile reporting, verification and bilingual broadcasting in Kiswahili and Maa.",
    body: [
      "Twenty young reporters have completed a three-month attachment at Bus Radio 99.9FM, training in mobile journalism, fact verification and bilingual presentation.",
      "The programme is part of the station's commitment to youth leadership, with graduates going on to file stories from across Kajiado County.",
    ],
    author: "Bus Radio Newsroom",
    date: "2026-07-28",
    image: "",
  },
  {
    slug: "maa-language-preservation",
    title: "Elders and youth join forces to keep the Maa language on air",
    category: "Culture",
    excerpt:
      "A new weekly segment pairs elders with young presenters to record proverbs, songs and oral history in Maa.",
    body: [
      "Bus Radio has launched a weekly segment pairing Maasai elders with young presenters to record proverbs, songs and oral history in the Maa language.",
      "The recordings are archived and replayed across cultural programming, ensuring indigenous knowledge stays in daily circulation.",
    ],
    author: "Culture Desk",
    date: "2026-07-15",
    image: "",
  },
  {
    slug: "county-health-outreach",
    title: "Mobile clinics reach remote wards after radio call-out",
    category: "Health",
    excerpt:
      "Listeners phoned in locations with no health access; county mobile clinics followed the map that emerged on air.",
    body: [
      "A live call-in on Bus Radio produced a listener-generated map of wards without reliable health access, which county mobile clinics have since used to plan outreach visits.",
      "Health officers credited the show with improving turnout at immunisation drives.",
    ],
    author: "Health Desk",
    date: "2026-06-30",
    image: "",
  },
  {
    slug: "ward-accountability-forum",
    title: "Ward reps face listeners in live accountability forum",
    category: "Governance",
    excerpt: "Jukwaa La Siasa hosted a two-hour open forum where residents questioned ward representatives on budgets.",
    body: [
      "Ward representatives faced direct questions from residents on budget allocation and stalled projects during a two-hour live forum on Jukwaa La Siasa.",
      "The station publishes follow-up trackers on commitments made on air.",
    ],
    author: "Politics Desk",
    date: "2026-06-12",
    image: "",
  },
  {
    slug: "livestock-market-prices",
    title: "Weekly livestock market prices now broadcast in Maa",
    category: "Community",
    excerpt: "Pastoralists asked for market information in their own language — the station responded with a daily slot.",
    body: [
      "Following listener requests, Bus Radio now broadcasts weekly livestock market prices in Maa, helping pastoralists negotiate fairer prices.",
      "The slot airs after the midday bulletin every market day.",
    ],
    author: "Bus Radio Newsroom",
    date: "2026-05-29",
    image: "",
  },
];

export const newsCategories = [
  "All",
  "County News",
  "Community",
  "Culture",
  "Youth",
  "Governance",
  "Health",
] as const;

export const milestones = [
  { year: "2010", title: "Founded as a youth group", text: "A group of young people in Kajiado Town start organising around community information and peacebuilding." },
  { year: "2014", title: "Registered as a CBO", text: "The initiative formalises as a community based organisation to serve Kajiado County." },
  { year: "2015", title: "Frequency granted", text: "The Communications Authority of Kenya grants a broadcasting frequency in October 2015 — 99.9 FM goes live." },
  { year: "Today", title: "Sauti ya Kajiado", text: "A youth-run, gender-balanced newsroom broadcasting daily in Kiswahili and Maa, recognised internationally for grassroots indigenous media." },
];

export const stats = [
  { value: "40,000+", label: "Estimated listeners" },
  { value: "99.9 FM", label: "Kajiado Town & beyond" },
  { value: "2015", label: "On air since" },
  { value: "100%", label: "Youth-run newsroom" },
];

/** Positive station messages that scroll across the colour marquee. */
export const stationMessages = [
  "Sauti ya Kajiado — broadcasting live on 99.9 FM",
  "Habari za Kaunti at 7AM, 1PM and 7PM daily",
  "Report news from your ward — we will follow it up",
  "Book a studio session or interview with our team",
  "Youth-run newsroom · Kiswahili & Maa",
  "Call the studio: +254 720 939088",
  "Advertise with Kajiado's most trusted community voice",
  "Join the Bus Radio community chat and talk to listeners",
];

export type GalleryVideo = { title: string; description: string; url: string; kind: "youtube" | "facebook" };

export const galleryVideos: GalleryVideo[] = [
  {
    title: "Mahojiano Live — field interview",
    description: "Our team out in the community recording a live interview for Bus Radio 99.9FM.",
    url: "https://www.facebook.com/share/v/1EUY36jNjR/",
    kind: "facebook",
  },
  {
    title: "Bus Radio on the ground in Kajiado",
    description: "Behind the scenes with the Bus Radio field reporting team.",
    url: "https://www.facebook.com/share/v/1EaTu4uyAx/",
    kind: "facebook",
  },
];
