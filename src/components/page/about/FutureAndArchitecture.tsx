"use client";

import { motion } from "framer-motion";
import {
  Users,
  Star,
  Search,
  ShieldCheck,
  Smartphone,
  Server,
  Database,
  Image as ImageIcon,
} from "lucide-react";

export default function FutureAndArchitecture() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto space-y-24 rounded-3xl border border-cyan-100/70 bg-white/80 px-4 py-12 md:px-8 md:py-14 shadow-xl shadow-orange-100/40 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-none">
        {/* ================= Future Improvements ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
            Future Improvements
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Planned enhancements for future versions of Food Book
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Users />,
              title: "Advanced User Features",
              items: [
                "Follow users and personalized feed",
                "Save or bookmark favourite dishes",
                "User profile pages with post history",
              ],
            },
            {
              icon: <Star />,
              title: "Premium Features",
              items: [
                "Highlighted or featured posts",
                "Advanced post analytics",
                "Ad-free experience",
              ],
            },
            {
              icon: <Search />,
              title: "Search & Discovery",
              items: [
                "Search by dish, location, or category",
                "Filter by popularity, rating, or recent uploads",
                "Map-based food discovery",
              ],
            },
            {
              icon: <ShieldCheck />,
              title: "Performance & Security",
              items: [
                "Image optimization & faster loading",
                "JWT refresh tokens & rate limiting",
                "Email verification & password reset",
              ],
            },
            {
              icon: <Smartphone />,
              title: "Mobile & Integrations",
              items: [
                "Mobile app (React Native / Flutter)",
                "Social media sharing",
                "Push notifications",
              ],
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white via-white to-orange-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 dark:bg-slate-700 dark:text-orange-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
              </div>

              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ================= System Architecture ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
            System Architecture
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            High-level overview of the Food Book platform
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Server />,
              title: "Frontend",
              items: [
                "Built with React / Next.js",
                "Handles UI and user interactions",
                "Form validation and responsive design",
                "Communicates via REST APIs",
              ],
            },
            {
              icon: <ShieldCheck />,
              title: "Backend",
              items: [
                "Node.js with Express",
                "Business logic and authentication",
                "Role-based access control",
                "RESTful APIs",
              ],
            },
            {
              icon: <Database />,
              title: "Database",
              items: [
                "MongoDB / PostgreSQL / MySQL",
                "Stores users, roles, and posts",
                "Comments, likes, and locations",
              ],
            },
            {
              icon: <ShieldCheck />,
              title: "Authentication & Security",
              items: [
                "JWT-based authentication",
                "Role-based authorization",
                "Password hashing and validation",
              ],
            },
            {
              icon: <ImageIcon />,
              title: "Media Storage",
              items: [
                "Cloud storage (Cloudinary / AWS S3)",
                "Optimized image handling",
                "Image URLs stored in database",
              ],
            },
          ].map((arch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-white via-white to-cyan-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-cyan-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
                  {arch.icon}
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                  {arch.title}
                </h3>
              </div>

              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {arch.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-600 dark:text-cyan-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
