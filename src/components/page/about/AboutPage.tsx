import Features from "./AboutFeatures";

import Hero from "./AboutHero";
import CTA from "./CTA";
import Team from "./Team";

export const metadata = {
  title: "About — AI-Powered Food Finder",
  description:
    "Discover who we are, our mission, values and the team behind the AI-Powered Food Finder.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b0f12] text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <Hero />
        <Features />
        <Team />
        <CTA />
        {/* <Footer /> */}
      </div>
    </main>
  );
}
