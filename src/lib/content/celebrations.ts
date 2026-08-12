import type { SectionContent, SubPageContent } from "./types";
import { img } from "./types";

const base = "/celebrations";

const sub = (
  slug: string, seoTitle: string, seoDescription: string, headline: string,
  tagline: string, poster: string, posterAlt: string, overview: string[],
  experiences: string[], atAGlance: { label: string; value: string }[],
): SubPageContent => ({
  slug, basePath: base, theme: "celebration", seoTitle, seoDescription,
  eyebrow: "Celebrations", headline, tagline, posterSrc: poster, posterAlt,
  overview, experiences, atAGlance,
});

export const celebrationsContent: SectionContent = {
  theme: "celebration",
  basePath: base,
  hubTitle: "Celebrations",
  seoTitle: "Birthday, Bachelor & Pool Party Packages Odisha",
  seoDescription:
    "Plan unforgettable birthdays, bachelor/bachelorette parties, pool parties & campfire nights in Odisha. Custom celebration packages with full hospitality.",
  eyebrow: "Celebrations",
  headline: "Because Some Moments Deserve More Than a Restaurant",
  subhead:
    "Birthdays, bachelor nights, pool parties, campfires & getaways — crafted with total care, zero planning stress.",
  intro: [
    "Total immersion. Total care. Zero planning stress. You arrive — we've already thought of everything.",
    "A free 30-minute planning call, a full proposal in 24 hours, 30% to confirm, and then we handle the décor, meals, activities, surprises, and photography. You just celebrate.",
  ],
  portals: [
    { tier: 2, label: "Birthday Packages", tagline: "A memory, not a package", href: `${base}/birthday`, theme: "celebration", posterSrc: img("photo-1530103862676-de8c9debad1d"), posterAlt: "Candlelit birthday celebration setup" },
    { tier: 2, label: "Bachelor & Bachelorette", tagline: "One last wild night", href: `${base}/bachelor-bachelorette`, theme: "celebration", posterSrc: img("photo-1467810563316-b5476525c0f9"), posterAlt: "Beach bonfire party at dusk" },
    { tier: 2, label: "Pool Parties", tagline: "Your pool, your rules", href: `${base}/pool-party`, theme: "celebration", posterSrc: img("photo-1571902943202-507ec2618e8f"), posterAlt: "Luxury poolside at dusk with string lights" },
    { tier: 2, label: "Campfire Nights", tagline: "Where stories come out", href: `${base}/campfire`, theme: "celebration", posterSrc: img("photo-1475483768296-6163e08872a1"), posterAlt: "Large bonfire under a starry sky" },
    { tier: 2, label: "Friends' Outing", tagline: "Just the right people", href: `${base}/friends-outing`, theme: "celebration", posterSrc: img("photo-1488646953014-85cb44e25828"), posterAlt: "Friends laughing together on a trip" },
  ],
  packages: [
    { title: "The Golden Weekend Birthday", duration: "2N/3D · 8–20 people", fromPrice: 8499, highlights: ["Welcome décor & custom cake", "Private cultural performance", "Bonfire & farewell breakfast"], href: `${base}/birthday` },
    { title: "Bachelor Party Blueprint", duration: "2N/3D · 8–20 people", fromPrice: 11999, highlights: ["Beach water sports", "Dolphin cruise", "Bonfire & seafood dinner"], href: `${base}/bachelor-bachelorette` },
    { title: "Private Pool Party", duration: "4-hour exclusive slot · min 10", fromPrice: 5999, highlights: ["Exclusive pool access", "Live BBQ & DJ", "Golden-hour photography"], href: `${base}/pool-party` },
  ],
  faqs: [
    { question: "How early should I book a celebration package?", answer: "We recommend 3–4 weeks for full personalisation, though shorter timelines can often be accommodated." },
    { question: "Can dietary requirements be managed?", answer: "Yes — all dietary needs are managed with advance notice, including vegetarian, vegan, and Jain options." },
    { question: "What is the minimum group size?", answer: "It varies: 4 for a friends' outing, 6 for birthdays, 8 for bachelor parties, 10 for pool parties." },
    { question: "Can I add surprises for the birthday person?", answer: "Absolutely — surprise setups, performances, and gifting moments are a speciality." },
    { question: "Do you handle décor and flowers?", answer: "Yes, themed décor and floral arrangements are included or available as add-ons." },
    { question: "What is the cancellation policy?", answer: "Full refund 21+ days prior, 50% for 7–21 days, no refund within 7 days (varies by package)." },
  ],
  subpages: [
    sub("birthday", "Birthday Trip Packages Odisha | Private Group Getaway",
      "Plan a private birthday weekend escape in Odisha — eco-camp stays, beach bonfires, custom cakes & nature experiences for groups of 6–20. From ₹8,499/person.",
      "The Birthday They'll Never Stop Talking About", "A private, curated, totally personal birthday experience — not a package, a memory.",
      img("photo-1530103862676-de8c9debad1d"), "Nature-decorated birthday welcome with candlelight",
      ["The Golden Weekend is our signature birthday package for 8–20 people over 2 nights and 3 days — beginning with a welcome of local wildflowers, a handmade Odia-motif board, and tea lights.",
       "Evening one brings a chef-curated open-sky dinner, a cake reveal with folk drumming, and a bonfire. Day two is the experience day; day three a personalised farewell breakfast."],
      ["Welcome décor with local wildflowers & tea lights", "Chef-curated 3-course celebration dinner", "Cake reveal with folk drumming", "Sunrise photography session", "Afternoon art & craft experience", "Private cultural performance at sunset"],
      [{ label: "Group", value: "8–20 (min 6)" }, { label: "Duration", value: "2N / 3D" }, { label: "From", value: "₹8,499/person" }]),
    sub("bachelor-bachelorette", "Bachelor Party Odisha | Bachelor & Bachelorette Weekends",
      "Plan the ultimate bachelor or bachelorette party in Odisha — beach water sports, dolphin cruise, bonfire nights, spa & coastal seafood. Groups of 8–20.",
      "One Last Wild Night. Make It Count.", "Odisha is the bachelor party destination nobody expects — and nobody forgets.",
      img("photo-1467810563316-b5476525c0f9"), "Beach bonfire with group silhouettes at dusk",
      ["The Bachelor Blueprint runs 2 nights and 3 days — water sports, a private deck sunset, a coastal seafood dinner with a surprise groom setup, a dawn dolphin cruise, and a beach bonfire.",
       "The Bachelorette Blueprint pairs a beachside spa and private Odissi tribute performance with morning yoga, a Tarakasi craft workshop, and a floral gourmet beach dinner."],
      ["Beach water sports — jet ski, parasailing, kayaking", "Dawn dolphin cruise on Chilika", "Private deck sunset & coastal seafood dinner", "Beachside spa & Odissi tribute performance", "Tarakasi silver filigree workshop", "Beach bonfire with acoustic music"],
      [{ label: "Group", value: "8–20 people" }, { label: "Duration", value: "2N / 3D" }, { label: "From", value: "₹11,999/person" }]),
    sub("pool-party", "Pool Party Packages Odisha | Private Pool Events",
      "Exclusive private pool party packages in Odisha — decorated poolside setup, DJ, live BBQ, cocktail stations & lifeguard. For birthdays, farewells & bachelorettes.",
      "Your Party. Your Pool. Your Rules.", "Exclusive pool access. Decorated setup. Live BBQ. No strangers in your lane.",
      img("photo-1576013551627-0cc20b96c2a7"), "Swimming pool with clear blue water surrounded by palm trees and lounge chairs",
      ["Every package gives you exclusive private pool access — no shared guests — with themed décor, a DJ or sound system, and poolside food stations.",
       "Live BBQ, a chaat counter, a cocktail and mocktail bar, and a dessert station, all with a lifeguard on duty and a golden-hour photography session."],
      ["Exclusive private pool area", "Themed floating & colour-scheme décor", "DJ / sound system with curated playlist", "Live BBQ, chaat & cocktail stations", "Lifeguard on duty throughout", "Golden-hour photography session"],
      [{ label: "Group", value: "Min 10 people" }, { label: "Duration", value: "4-hour exclusive slot" }, { label: "From", value: "₹5,999/person" }]),
    sub("campfire", "Campfire Night Packages Odisha | Forest & Beach Bonfires",
      "Curated campfire nights in Odisha — forest clearings, riverside camps & beachside bonfires with folk storytelling, live music & stargazing. For groups & families.",
      "Where Stories Come Out. Where People Come Together.", "The campfire is the world's oldest gathering technology. We just make it extraordinary.",
      img("photo-1475483768296-6163e08872a1"), "Group around a large bonfire under the stars",
      ["Choose a forest clearing, riverside, beach, or hilltop. Hot chai and roasted snacks greet you as the fire is built, and a local folk narrator shares tales from Odia mythology.",
       "Live folk music, group cooking on the fire, optional lantern release and guided stargazing — the fire burns down slowly, with no fixed end time."],
      ["Folk storytelling from Odia mythology", "Live folk music — bansuri, tabla, sarangi", "Group cooking on the campfire", "Optional lantern release ceremony", "Guided star-gazing with a naturalist", "Optional overnight tent extension"],
      [{ label: "Group", value: "Min 6 people" }, { label: "From", value: "₹2,999 (₹5,999 overnight)" }, { label: "Locations", value: "Satkosia, Similipal, Chilika & more" }]),
    sub("friends-outing", "Friends Group Trip Odisha | Weekend Outing Packages",
      "Budget-friendly, fuss-free weekend getaways in Odisha for groups of 4–15 friends. Nature, culture, bonfire & good food — all inclusive from ₹4,999 per person.",
      "Pack Light. Leave Your To-Do List Behind.", "No occasion needed. Just the right people and the right place.",
      img("photo-1488646953014-85cb44e25828"), "Group of friends laughing together outdoors",
      ["The Friends' Wild Weekend runs 2 nights and 3 days for 4–15 friends — accommodation, all meals, one outdoor activity, one cultural experience, a bonfire night, and transport from the nearest hub.",
       "Pick Puri, Chilika, Similipal, Koraput, or Satkosia — or choose a 1-day road trip, a 2-night beach escape, or a 3-night wilderness special."],
      ["Group-choice accommodation", "All meals + evening snacks", "One outdoor activity — trek, safari or beach", "One cultural experience", "Bonfire night with music", "Transport from the nearest city hub"],
      [{ label: "Group", value: "4–15 friends" }, { label: "Duration", value: "2N / 3D (flexible)" }, { label: "From", value: "₹4,999/person" }]),
  ],
};
