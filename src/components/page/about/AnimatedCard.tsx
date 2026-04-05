// components/AnimatedCard.tsx
"use client";
import { motion } from "framer-motion";

export default function AnimatedCard({
  title,
  desc,
  emoji,
  index = 0,
}: {
  title: string;
  desc: string;
  emoji: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="rounded-2xl border border-orange-100 p-5 bg-gradient-to-br from-white via-white to-amber-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl rounded-xl bg-orange-100 px-3 py-2 dark:bg-slate-700">
          {emoji}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
