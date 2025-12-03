// components/Team.tsx
"use client";
import { motion } from "framer-motion";

const people = [
  {
    name: "Amina Rahman",
    role: "Founder & Product",
    bio: "Designer turned builder focused on delightful food discovery.",
  },
  {
    name: "Samir Chowdhury",
    role: "Head of ML",
    bio: "Machine learning engineer with a taste for great curry.",
  },
  {
    name: "Layla Santos",
    role: "Design Lead",
    bio: "Designing minimal interfaces that feel luxurious.",
  },
];

export default function Team() {
  return (
    <section className="mt-16">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold mb-6"
      >
        Meet the team
      </motion.h3>

      <div className="grid sm:grid-cols-3 gap-6">
        {people.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5 border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-[#071018]/40"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#122026] dark:to-[#0b1820] flex items-center justify-center text-xl">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {p.role}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {p.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
