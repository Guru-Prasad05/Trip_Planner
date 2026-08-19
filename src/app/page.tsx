import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { FlyingBirds } from "@/components/ambient/FlyingBirds";
import { CategoryRow, type CategoryCard } from "@/components/home/CategoryRow";
import { FullBleedBanner } from "@/components/home/FullBleedBanner";
import { CoolCities } from "@/components/home/CoolCities";
import { Testimonials } from "@/components/home/Testimonials";
import { Partners } from "@/components/home/Partners";
import { Section } from "@/components/ui/Section";
import { StepFlow } from "@/components/ui/StepFlow";
import { TrustBar } from "@/components/ui/TrustBar";
import { howItWorks, homeFaqs, uspPoints } from "@/lib/content/home";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=75`;

// --- Category data matching the horizontal-scroll card row pattern ---

const natureCards: CategoryCard[] = [
  { title: "Koraput Highlands", description: "Scale Deomali Peak, witness thundering waterfalls & immerse in tribal culture in Odisha's untamed frontier.", count: "6 Experiences", href: "/nature-tours/koraput", imageSrc: img("photo-1454942901704-3c44c11b2ad1"), imageAlt: "Misty mountain peaks of Koraput" },
  { title: "Similipal", href: "/nature-tours/similipal", imageSrc: img("photo-1549366021-9f761d450615"), imageAlt: "Sal forest canopy" },
  { title: "Chilika Lake", href: "/nature-tours/chilika", imageSrc: img("photo-1518467166778-b88f373ffec7"), imageAlt: "Boat on lagoon at sunset" },
  { title: "Satkosia Gorge", href: "/nature-tours/satkosia", imageSrc: img("photo-1437482078695-73f5ca6c96e2"), imageAlt: "River gorge with forested walls" },
  { title: "Coastal Odisha", href: "/nature-tours/coastal-odisha", imageSrc: img("photo-1505228395891-9a51e7e86bf6"), imageAlt: "Beach at sunrise" },
  { title: "Bhitarkanika", href: "/nature-tours/bhitarkanika", imageSrc: img("photo-1559825481-12a05cc00344"), imageAlt: "Mangrove channel" },
];

const celebrationCards: CategoryCard[] = [
  { title: "Birthday Parties", description: "Private birthday weekends with custom cake, cultural performances & bonfire nights. For groups of 6-20.", count: "From ₹8,499/person", href: "/celebrations/birthday", imageSrc: img("photo-1530103862676-de8c9debad1d"), imageAlt: "Birthday celebration with warm lighting" },
  { title: "Bachelor & Bachelorette", href: "/celebrations/bachelor-bachelorette", imageSrc: img("photo-1467810563316-b5476525c0f9"), imageAlt: "Beach party at dusk" },
  { title: "Pool Parties", href: "/celebrations/pool-party", imageSrc: img("photo-1576013551627-0cc20b96c2a7"), imageAlt: "Swimming pool with clear blue water and lounge chairs" },
  { title: "Campfire Nights", href: "/celebrations/campfire", imageSrc: img("photo-1475483768296-6163e08872a1"), imageAlt: "Bonfire under stars" },
  { title: "Friends' Outing", href: "/celebrations/friends-outing", imageSrc: img("photo-1488646953014-85cb44e25828"), imageAlt: "Friends outdoors" },
];

const corporateCards: CategoryCard[] = [
  { title: "Team Building", description: "Real challenges in Odisha's forests & rivers - raft-building, navigation, jungle cooking & bonfire debriefs.", count: "20-100 people", href: "/corporate-groups/team-building", imageSrc: img("photo-1531545514256-b1400bc00f31"), imageAlt: "Team collaboration outdoors" },
  { title: "Leadership Offsite", href: "/corporate-groups/leadership-offsite", imageSrc: img("photo-1517048676732-d65bc937f952"), imageAlt: "Executive meeting" },
  { title: "Annual Day", href: "/corporate-groups/annual-day", imageSrc: img("photo-1511795409834-ef04bbd61622"), imageAlt: "Company celebration" },
  { title: "Incentive Trips", href: "/corporate-groups/incentive-trips", imageSrc: img("photo-1469474968028-56623f02e42e"), imageAlt: "Scenic reward destination" },
  { title: "Day Out", href: "/corporate-groups/day-out", imageSrc: img("photo-1539635278303-d4002c07eae3"), imageAlt: "Group enjoying an outdoor activity together" },
];

const spiritualCards: CategoryCard[] = [
  { title: "Char Dham Yatra", description: "Yamunotri, Gangotri, Kedarnath & Badrinath - one of India's most revered pilgrimage routes, planned with care.", count: "9N/10D", href: "/spiritual/char-dham", imageSrc: img("photo-1626621341517-bbf3d9990a23"), imageAlt: "Kedarnath temple with snow mountains" },
  { title: "Kashi & Varanasi", href: "/spiritual/kashi-varanasi", imageSrc: "/spiritual-varanasi-ghat.png", imageAlt: "Varanasi ghats with boats" },
  { title: "Jyotirlinga Circuit", href: "/spiritual/jyotirlinga", imageSrc: img("photo-1609766857041-ed402ea8069a"), imageAlt: "Shiva temple stone carvings" },
  { title: "Shakti Peetha", href: "/spiritual/shakti-peetha", imageSrc: img("photo-1604608672516-f1b9b1d37076"), imageAlt: "Goddess temple" },
  { title: "Sacred Rivers", href: "/spiritual/sacred-rivers", imageSrc: "/spiritual-boat.png", imageAlt: "Boat on sacred river" },
  { title: "South India", href: "/spiritual/south-india-tirtha", imageSrc: img("photo-1582510003544-4d00b7f74220"), imageAlt: "Temple gopuram" },
];

const coolDestinations = [
  { name: "Similipal", imageSrc: img("photo-1549366021-9f761d450615"), href: "/nature-tours/similipal" },
  { name: "Chilika", imageSrc: img("photo-1518467166778-b88f373ffec7"), href: "/nature-tours/chilika" },
  { name: "Varanasi", imageSrc: img("photo-1561361513-2d000a50f0dc"), href: "/spiritual/kashi-varanasi" },
  { name: "Koraput", imageSrc: img("photo-1454942901704-3c44c11b2ad1"), href: "/nature-tours/koraput" },
  { name: "Konark", imageSrc: img("photo-1590766940554-634c4a4708ab"), href: "/nature-tours/coastal-odisha" },
  { name: "Kedarnath", imageSrc: img("photo-1469474968028-56623f02e42e"), href: "/spiritual/char-dham" },
];

export default function HomePage() {
  return (
    <>
      <FlyingBirds />
      <h1 className="sr-only">
        Trip Planner - Group Tours, Spiritual Journeys & Celebrations
      </h1>

      {/* Hero - full-bleed waterfall + person, reference style */}
      <Hero />

      {/* Trust stats bar */}
      <TrustBar />

      {/* Nature Tours row */}
      <CategoryRow
        scriptTitle="Wild Odisha"
        boldTitle="Nature Tours"
        description="Forests, waterfalls, wildlife & coastlines - six distinct natural worlds crafted for groups who want to go deeper."
        ctaLabel="Explore All Nature Tours"
        ctaHref="/nature-tours"
        cards={natureCards}
        theme="nature"
      />

      {/* Full-bleed banner - like "Learn & Give Back" section */}
      <FullBleedBanner
        imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Person gazing at misty mountains from a viewpoint"
        scriptTitle="Discover"
        boldTitle="Sacred India"
        description="From the ghats of Kashi to the peaks of Char Dham - tirtha, Jyotirlinga, and Shakti Peetha journeys, planned with reverence and care."
        ctaLabel="Explore Pilgrimages"
        ctaHref="/spiritual-journeys"
      />

      {/* Celebrations row */}
      <CategoryRow
        scriptTitle="Celebrate"
        boldTitle="Special Moments"
        description="Birthdays, bachelor nights, pool parties, campfires & friends' getaways - crafted with total care, zero planning stress."
        ctaLabel="Explore Celebrations"
        ctaHref="/celebrations"
        cards={celebrationCards}
        reversed
        theme="celebration"
      />

      {/* Corporate row */}
      <CategoryRow
        scriptTitle="Team Outings"
        boldTitle="Corporate & Groups"
        description="Nature-immersive corporate experiences in Odisha - where your team returns with shared stories no team-building worksheet could create."
        ctaLabel="Explore Corporate Plans"
        ctaHref="/corporate-groups"
        cards={corporateCards}
        theme="corporate"
      />

      {/* Cool Destinations strip (like "Cool Cities" in reference) */}
      <CoolCities title="Popular Destinations" cities={coolDestinations} />

      {/* Testimonials - matching reference style */}
      <Testimonials />

      {/* Affiliated Partners */}
      <Partners />

      {/* Full-bleed banner #2 - Philosophy / About */}
      <FullBleedBanner
        imageSrc="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Scenic landscape with person overlooking mountains and lake"
        scriptTitle="Philosophy"
        boldTitle="Of Slow Travel"
        description="We don't just sell trips. We create comfortable, safe, and hassle-free experiences. Every route is built around slow travel, local immersion, and transparent pricing."
        ctaLabel="More About Us"
        ctaHref="/about"
        align="right"
      />

      {/* Spiritual Journeys row */}
      <CategoryRow
        scriptTitle="Spiritual"
        boldTitle="Pilgrimages"
        description="Char Dham, Jyotirlinga, Shakti Peetha & Varanasi - guided, family-friendly pilgrimage packages across all of India."
        ctaLabel="Explore Sacred Routes"
        ctaHref="/spiritual-journeys"
        cards={spiritualCards}
        reversed
        theme="spiritual"
      />

      {/* How it works */}
      <Section className="bg-[#f7f5f2]">
        <header className="mb-12 text-center">
          <h2 className="font-[family-name:--font-display] text-[--text-section] font-semibold">
            How It Works
          </h2>
        </header>
        <StepFlow steps={howItWorks} />
      </Section>

      {/* === WHY TRAVEL WITH US - dark olive section with Patachitra texture === */}
      <section className="relative overflow-hidden bg-[#1a2e1f] text-white">
        {/* Patachitra art as visible decorative background */}
        <Image
          src="/patachitra-1.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.12]"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-[#1a2e1f]/80" aria-hidden />
        {/* Patachitra border strip at top */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-orange-700 via-amber-500 to-orange-700 opacity-60" />

        {/* Content */}
        <div className="relative z-10">
          {/* USP Header */}
          <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-16 sm:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
              {/* Left: title + description (reference style) */}
              <div>
                <h2>
                  <span className="block font-[family-name:--font-display] text-[clamp(2.5rem,5vw,4rem)] italic font-light text-white/90">
                    Why Travel
                  </span>
                  <span className="block text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold uppercase tracking-wider text-white">
                    With Us
                  </span>
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70">
                  We don&apos;t just sell trips - we create comfortable, safe, and
                  hassle-free travel experiences. Every traveller is family.
                </p>
                <Link
                  href="/about"
                  className="mt-8 inline-block rounded-sm border-2 border-white/40 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[--color-forest]"
                >
                  More About Us
                </Link>
              </div>

              {/* Right: USP cards grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {uspPoints.map((u) => (
                  <div
                    key={u.title}
                    className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors hover:bg-white/15"
                  >
                    <div className="text-2xl">{u.icon}</div>
                    <h3 className="mt-2 text-sm font-bold text-white">{u.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">{u.text}</p>
                  </div>
                ))}
                {/* Patachitra art reference card - Odisha cultural touch */}
                <div className="relative overflow-hidden rounded-xl border border-[--color-gold]/20 sm:col-span-2">
                  <div className="relative h-28 w-full">
                    <Image
                      src="/patachitra-1.jpg"
                      alt="Traditional Odisha Patachitra art depicting mythology and nature"
                      fill
                      sizes="(max-width: 640px) 100vw, 600px"
                      className="object-cover opacity-30"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#1a2e1f]/80 to-transparent px-6">
                    <p className="font-[family-name:--font-display] text-sm italic text-white/90">
                      &ldquo;Rooted in Odisha&apos;s Patachitra tradition - every journey we craft tells a story&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing warning */}
            <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-[--color-gold]/30 bg-[--color-gold]/10 p-5 text-center">
              <p className="text-sm text-white/80">
                ⚠️ Don&apos;t be misled by unrealistic prices. A trip advertised for ₹4,000
                can end up costing ₹8,000+. We focus on <strong className="text-[--color-gold]">transparent pricing</strong> and
                unforgettable experiences.
              </p>
            </div>
          </div>

          {/* FAQ - still inside the dark section */}
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-3xl px-6 py-20">
              <h2 className="text-center font-[family-name:--font-display] text-[--text-section] font-semibold text-white">
                Frequently Asked Questions
              </h2>
              <dl className="mt-10 divide-y divide-white/10">
                {homeFaqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white">
                      <span>{faq.question}</span>
                      <span className="text-[--color-gold] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{faq.answer}</p>
                  </details>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
