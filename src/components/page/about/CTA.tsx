// components/CTA.tsx
"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="mt-16 mb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.995 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-8 bg-gradient-to-r from-white/60 to-slate-50 dark:from-[#071018]/60 dark:to-[#071018]/40 border border-slate-100 dark:border-slate-800 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold">
              Ready to simplify food choices?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Start a pilot, integrate our API, or try our app — and see
              recommendations that actually help.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              className="inline-block px-6 py-3 bg-[color:var(--accent,#F7C948)] rounded-full font-semibold"
              href="/request-demo"
            >
              Request demo
            </a>
            <a
              className="inline-block px-6 py-3 border rounded-full"
              href="/pricing"
            >
              See pricing
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
