// components/Features.tsx
'use client';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';

const features = [
  {
    title: 'Smart Recommendations',
    desc: 'AI suggests dishes based on taste, time of day and past preferences.',
    icon: '🍽',
  },
  {
    title: 'Diet & Allergy Safe',
    desc: 'Powerful filters keep recommendations compatible with dietary needs.',
    icon: '🥗',
  },
  {
    title: 'Photo-Based Search',
    desc: 'Upload a photo of a dish and find where to get it nearby.',
    icon: '📸',
  },
  {
    title: 'Real-Time Availability',
    desc: 'See live restaurant availability and estimated delivery times.',
    icon: '⏱️',
  },
];

export default function Features() {
  return (
    <section className="mt-12 grid gap-8">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-2xl font-semibold"
      >
        What we offer
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <AnimatedCard key={i} index={i} title={f.title} desc={f.desc} emoji={f.icon} />
        ))}
      </div>
    </section>
  );
}
