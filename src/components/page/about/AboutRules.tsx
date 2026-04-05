"use client";

import { motion } from "framer-motion";
import { User, Crown, Shield } from "lucide-react";

export default function AboutRules() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto space-y-16 rounded-3xl border border-orange-100/70 bg-white/80 px-4 py-12 md:px-8 md:py-14 shadow-xl shadow-cyan-100/40 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            User{" "}
            <span className="bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
              Roles
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Food Book supports multiple user roles, each designed to provide
            tailored features and responsibilities.
          </p>
        </motion.div>

        {/* Guest Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl border border-cyan-100 bg-gradient-to-r from-orange-50 via-white to-cyan-50 px-6 py-4 text-center text-slate-600 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-300"
        >
          <p>
            Visitors can browse the <strong>Home</strong>,{" "}
            <strong>About</strong>,<strong> FAQ</strong>, and{" "}
            <strong>Contact</strong> pages without logging in.
          </p>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Regular User */}
          <RoleCard
            icon={<User />}
            title="Regular User"
            items={[
              "Create and share food-related posts",
              "Add dish details (name, description, image, location)",
              "Like, comment, and share posts",
              "Browse all public pages and posts",
              "Access a personal dashboard",
              "Manage profile, posts, and comments",
            ]}
          />

          {/* Premium User */}
          <RoleCard
            icon={<Crown />}
            title="Premium User"
            highlight
            items={[
              "All regular user features",
              "Access to premium-only pages",
              "Add and manage one restaurant",
              "Update restaurant details and specialties",
              "Add and manage menu items and dishes",
              "Full dashboard access",
            ]}
          />

          {/* Admin */}
          <RoleCard
            icon={<Shield />}
            title="Admin"
            items={[
              "Manage users and posts",
              "Approve or remove posts and comments",
              "Manage categories and user accounts",
              "View platform analytics",
              "Generate coupons",
              "Restore soft-deleted items",
              "Activate, deactivate, or delete users",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* Reusable Role Card */
function RoleCard({
  icon,
  title,
  items,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`rounded-2xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg
        ${
          highlight
            ? "border-orange-300/60 bg-gradient-to-br from-orange-100/90 via-amber-50 to-cyan-100/80 dark:border-orange-400/40 dark:from-orange-900/40 dark:via-slate-900 dark:to-cyan-900/40"
            : "border-cyan-100 bg-gradient-to-br from-white via-white to-cyan-50 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
        }
      `}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`p-3 rounded-xl ${
            highlight
              ? "bg-orange-500 text-white"
              : "bg-cyan-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      </div>

      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-orange-500">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
