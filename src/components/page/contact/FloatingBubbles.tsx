"use client";

import { motion } from "framer-motion";

const bubbles = Array.from({ length: 12 }).map((_, i) => ({
  size: 40 + Math.random() * 70,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
}));

export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.15, 1],
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: b.delay,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-amber-300/40 dark:bg-amber-600/30 blur-xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
          }}
        />
      ))}
    </div>
  );
}
