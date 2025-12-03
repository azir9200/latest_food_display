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
      className="rounded-xl border border-slate-100 dark:border-slate-800 p-5 bg-white/60 dark:bg-[#071018]/60 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{emoji}</div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
