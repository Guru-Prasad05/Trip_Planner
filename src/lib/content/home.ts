import type { PortalData } from "@/components/portal/types";
import type { FAQ } from "@/components/ui/FAQAccordion";
import type { Step } from "@/components/ui/StepFlow";
import type { TripPackage } from "@/components/ui/PackageCard";

// Unsplash source images (optimized via next/image). Replace with curated/owned art later.
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const homePortals: PortalData[] = [
  {
    tier: 1,
    label: "Wild Odisha",
    tagline: "Forests, waterfalls, wildlife & coastlines",
    href: "/nature-tours",
    theme: "nature",
    posterSrc: img("photo-1518495973542-4542c06a5843"),
    posterAlt: "Sunlit forest canopy representing Odisha nature tours",
  },
  {
    tier: 1,
    label: "Team Outings",
    tagline: "Where teams breathe, bonds are built",
    href: "/corporate-groups",
    theme: "corporate",
    posterSrc: img("photo-1525811902-f2342640856e"),
    posterAlt: "Group gathered around a bonfire at night for a corporate retreat",
  },
  {
    tier: 1,
    label: "Celebrations",
    tagline: "Birthdays, bachelor parties, pool nights & campfires",
    href: "/celebrations",
    theme: "celebration",
    posterSrc: img("photo-1530103862676-de8c9debad1d"),
    posterAlt: "Festive celebration with warm lights at dusk",
  },
  {
    tier: 1,
    label: "Sacred India",
    tagline: "Odisha Kalinga circuit to all-India pilgrimages",
    href: "/spiritual-journeys",
    theme: "spiritual",
    posterSrc: img("photo-1561361513-2d000a50f0dc"),
    posterAlt: "Temple at golden hour representing spiritual journeys",
  },
];

export const howItWorks: Step[] = [
  { title: "Tell Us Your Vision", description: "Fill a quick inquiry with group size, dates & experience type." },
  { title: "Get Your Proposal", description: "Receive a detailed day-wise itinerary within 24 hours." },
  { title: "Confirm & Book", description: "Pay 30% advance to confirm; balance 15 days before travel." },
  { title: "Experience & Enjoy", description: "Your dedicated trip captain handles everything on ground." },
];

export const featuredPackages: TripPackage[] = [
  {
    title: "Complete Wild Odisha",
    duration: "7N / 8D · Similipal + Satkosia + Chilika + Bhitarkanika",
    fromPrice: 24999,
    highlights: ["Tiger safari & mangrove cruise", "Dolphin dawn ride on Chilika", "Eco-camp stays throughout"],
    href: "/nature-tours",
  },
  {
    title: "Char Dham Yatra",
    duration: "9N / 10D · Yamunotri, Gangotri, Kedarnath, Badrinath",
    highlights: ["Guided darshan at all four dhams", "Helicopter & road options", "Senior-friendly planning"],
    href: "/spiritual/char-dham",
  },
  {
    title: "The Golden Weekend Birthday",
    duration: "2N / 3D · Beach, forest or lagoon",
    fromPrice: 8499,
    highlights: ["Personalised décor & cake", "Private cultural performance", "Bonfire & farewell breakfast"],
    href: "/celebrations/birthday",
  },
];

export const homeFaqs: FAQ[] = [
  { question: "What types of group tours do you offer?", answer: "Nature tours, corporate retreats, celebrations, and all-India spiritual journeys — all fully customisable for your group." },
  { question: "Do you provide GST invoices for corporate bookings?", answer: "Yes. All corporate bookings are tax-compliant with full GST invoicing." },
  { question: "Can I customise my itinerary?", answer: "Absolutely. Every itinerary is built around your group's size, dates, interests, and budget." },
  { question: "What is the minimum group size?", answer: "It varies by experience — from 4 friends for an outing to 15+ for corporate plans. Each package lists its minimum." },
  { question: "How do I pay — what are the payment options?", answer: "A 30% advance confirms your booking; the balance is due 15 days before travel. We support standard digital payment methods." },
  { question: "Do you cover destinations outside Odisha?", answer: "Yes. Our spiritual journeys span all-India pilgrimage circuits including Char Dham, the Jyotirlingas, and Shakti Peethas." },
];

export const uspPoints = [
  { icon: "✨", title: "No Hidden Charges", text: "100% all-inclusive pricing — transport, stay, food, sightseeing and essentials covered." },
  { icon: "🍽️", title: "Quality Food Everywhere", text: "Hygienic, high-quality meals even in the most offbeat locations." },
  { icon: "🧭", title: "Experienced Trip Leaders", text: "Guided tours that save time and skip the confusion — more discovering, less logistics." },
  { icon: "🤝", title: "Relationships, Not Bookings", text: "We treat every traveller like family and build long-term trust." },
  { icon: "😌", title: "Stress-Free Travel", text: "From planning to the last day, we handle every detail so you simply relax." },
];
