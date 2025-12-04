"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  MessageCircle,
  Star,
  Store,
  Flag,
  Rocket,
  HelpCircle,
} from "lucide-react";
import FloatingBubbles from "./FloatingBubbles";

export default function ContactPage() {
  const contactOptions = [
    {
      icon: <MessageCircle size={28} />,
      title: "Give Us Feedback",
      desc: "Share your ideas to improve our service, features, or design.",
      link: "/about",
    },
    {
      icon: <Star size={28} />,
      title: "Suggest a Dish",
      desc: "Tell us about unique dishes from your area for global discovery.",
      link: "/allpost",
    },
    {
      icon: <Store size={28} />,
      title: "Restaurant Partnership",
      desc: "Partner with us, improve your listing, or get support.",
      link: "/about",
    },
    {
      icon: <Rocket size={28} />,
      title: "Advertise With Us",
      desc: "Promote your restaurant or food business to global users.",
      link: "/allpost",
    },
    {
      icon: <Flag size={28} />,
      title: "Report a Problem",
      desc: "Found an issue with a post or restaurant? Let us know.",
      link: "/premium",
    },
    {
      icon: <HelpCircle size={28} />,
      title: "Need Help?",
      desc: "Get assistance with your account, posts, or restaurant profile.",
      link: "/faq",
    },
  ];

  const exploreLinks = [
    { name: "Home", href: "/" },
    { name: "Discover Dishes", href: "/allpost" },
    { name: "Restaurants", href: "/restaurant" },
    { name: "Submit Dish", href: "/allpost" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-16 overflow-hidden">
      {/* Background Animation */}
      <FloatingBubbles />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            We are Here to Help
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            Whether you are a food lover or a restaurant owner, our team is
            ready to assist you, listen to your ideas, and help you grow in the
            global food community.
          </p>
        </motion.div>

        {/* CONTACT OPTION CARDS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24">
          {contactOptions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -6 }}
            >
              <Link href={item.link}>
                <Card className="shadow-md hover:shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl transition cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center text-amber-500 dark:text-amber-300 mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="p-10">
              <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">
                Send Us a Message
              </h2>

              <form className="grid gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label>Your Name</Label>
                  <Input placeholder="John Doe" className="mt-1" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Label>Message Category</Label>
                  <select className="p-3 border rounded-md bg-white dark:bg-gray-700 mt-1">
                    <option>General Question</option>
                    <option>Restaurant Partnership</option>
                    <option>Dish Suggestion</option>
                    <option>Advertising / Promotion</option>
                    <option>Technical Support</option>
                    <option>Report an Issue</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <Label>Your Message</Label>
                  <Textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="mt-1"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <Button className="w-full text-lg py-6">Send Message</Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* EXPLORE OTHER PAGES */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Explore More
          </h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {exploreLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-5 py-3 rounded-lg bg-amber-100 dark:bg-amber-600/30 text-gray-900 dark:text-white hover:scale-105 transition"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
