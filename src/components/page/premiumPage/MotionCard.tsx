import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
export interface MotionCardProps {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export function MotionCard({
  title,
  price,
  features,
  highlight,
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 shadow-md ${
        highlight ? "bg-[#FF6b35] text-white" : "bg-white  text-[#FF6b35]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-xl font-semibold ${
              highlight ? "text-white" : "text-[#FF6b35] dark:text-white"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 text-sm ${
              highlight ? "text-emerald-100" : "text-slate-500"
            }`}
          >
            Best for
            {title === "Premium + Restaurant"
              ? " restaurants & businesses"
              : " food explorers"}
          </p>
        </div>
        <div className="text-right">
          <div
            className={`text-2xl font-bold ${
              highlight ? "text-white" : "text-[#FF6b35] dark:text-white"
            }`}
          >
            {price}
          </div>
          <div
            className={`text-xs ${
              highlight ? "text-emerald-100" : "text-slate-500"
            }`}
          >
            /month
          </div>
        </div>
      </div>

      <ul
        className={`mt-4 space-y-2 ${
          highlight ? "text-emerald-50" : "text-[#FF6b35] dark:text-slate-300"
        }`}
      >
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <Check size={16} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 ">
        <Button className="bg-slate-50 text-[#FF6b35]">
          {highlight ? (
            <Link href="/premium/position">Get Premium </Link>
          ) : (
            "Choose"
          )}
        </Button>
      </div>
    </motion.div>
  );
}
