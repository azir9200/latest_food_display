import Features from "./AboutFeatures";
import AboutRules from "./AboutRules";
import CTA from "./CTA";
import Description from "./Description";
import FutureAndArchitecture from "./FutureAndArchitecture";
import Team from "./Team";

export const metadata = {
  title: "About — AI-Powered Food Finder",
  description:
    "Discover who we are, our mission, values and the team behind the AI-Powered Food Finder.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-white to-cyan-50 text-slate-900 dark:from-[#0b0f12] dark:via-[#0b0f12] dark:to-[#0f1720] dark:text-slate-100">
      <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/20" />
      <div className="pointer-events-none absolute top-96 -right-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/20" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/15" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <Description />
        <Features />
        <AboutRules />
        <FutureAndArchitecture />
        <Team />
        <CTA />
      </div>
    </main>
  );
}
