"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Left: copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 self-start rounded-full bg-transparent">
            <Sparkles className="w-7 h-7 text-yellow-500" />
            <span
              className="text-2xl font-medium"
              style={{ color: "var(--accent,#F7C948)" }}
            >
              AI-Powered Food Finder
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Find the perfect meal — instantly.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            We combine human taste understanding with advanced AI to suggest
            dishes and restaurants tailored to your mood, diet and location.
            Minimal friction. Luxurious results.
          </p>

          <div className="flex gap-4 items-center">
            <a
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 bg-[color:var(--accent,#F7C948)] text-black font-semibold shadow-md hover:shadow-lg transition"
              href="/allpost"
            >
              Explore dishes
            </a>

            <a
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm"
              href="/contact"
            >
              Contact sales
            </a>
          </div>
        </div>

        {/* Right: decorative card */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.98, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white/60 to-slate-50 dark:from-[#0f1720]/70 dark:to-[#071018] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="rounded-xl overflow-hidden bg-[#f8f7f6] dark:bg-[#071018]">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">How it works</h3>
                <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-4 list-decimal">
                  <li>Tell us your mood, ingredients, or upload a photo.</li>
                  <li>AI ranks the best matches from nearby restaurants.</li>
                  <li>Filter by diet, allergy, price or delivery time.</li>
                </ol>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Personalized picks
                    </p>
                    <p className="font-medium">Top 5 curated for you</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Confidence
                    </p>
                    <p className="font-semibold">89%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
