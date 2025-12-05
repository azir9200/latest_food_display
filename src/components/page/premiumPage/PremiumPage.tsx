"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { MotionCard } from "./MotionCard";
import { benefits, features } from "./helper";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 py-16">
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 items-center justify-between"
        >
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              FoodFinder <span className="text-[#FF6b35]">Premium</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Unlock unlimited food discoveries, special restaurant offers, and
              powerful tools for restaurant owners. Perfect for food lovers and
              businesses who want more reach.
            </p>

            <div className="mt-6 flex gap-3">
              <Button className="bg-[#FF6b35]" asChild>
                <Link href="http://localhost:3000/premium/position">
                  Get Premium
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#compare">Compare Plans</Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Badge>14-day trial</Badge>
              <span className="text-sm text-slate-500">
                No credit card required
              </span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <Image
                src="https://i.ibb.co/0y0VgVS9/premium.jpg"
                height={600}
                width={600}
                alt="Premium food feed"
                className="w-full h-64 object-cover"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* Benefits section */}
        <section className="mt-16">
          <h2 className="text-2xl text-[#FF6b35] font-semibold">
            What is Premium?
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
            Premium gives you an uninterrupted, ad-light experience with extra
            features tailored for food explorers and restaurant owners. Below
            youll find details about membership types, benefits, and how to
            upgrade.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {benefits.map((b) => (
              <Card key={b.id} className="p-4">
                <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="text-[#FF6b35]">{b.icon}</span>
                    {b.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {b.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing and CTA */}
        <section id="pricing" className="mt-16">
          <h2 className="text-2xl text-[#FF6b35] font-semibold">Pricing</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
            Simple, transparent pricing. Monthly and yearly plans available with
            a discount for annual billing. All plans include a 14-day free trial
            for new customers.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <MotionCard
              title="Regular"
              price="Free"
              features={["Limited feed", "Basic search"]}
              highlight={false}
            />
            <MotionCard
              title="Premium"
              price="$6.99 / month"
              features={[...features.slice(0, 4), "Priority features"]}
              highlight={true}
            />
            <MotionCard
              title="Premium + Restaurant"
              price="$19.99 / month"
              features={[
                ...features,
                "Claim & manage restaurant page",
                "Restaurant analytics",
              ]}
              highlight={false}
            />
          </div>

          <div className="mt-8 text-sm text-slate-500">
            <strong>Can a premium member be a restaurant owner?</strong>
            <p className="mt-2">
              Yes — a premium account is primarily for individual members who
              want unlimited access. If you are a restaurant owner we offer a
              Premium + Restaurant plan (or a separate claim process) that gives
              you owner tools such as analytics, post promotion, menu links, and
              the ability to respond to customers. We recommend verifying the
              business during onboarding.
            </p>
          </div>
        </section>

        {/* In-depth feature list and comparison */}
        <section id="compare" className="mt-16">
          <h2 className="text-2xl font-semibold">Compare plans</h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="p-3">Features</th>
                  <th className="p-3">Regular</th>
                  <th className="p-3">Premium</th>
                  <th className="p-3">Premium + Restaurant</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Feed access",
                  "Image uploads",
                  "Save favourites",
                  "Advanced search",
                  "Restaurant claim",
                  "Analytics & promotions",
                ].map((f) => (
                  <tr key={f} className="border-t">
                    <td className="p-3">{f}</td>
                    <td className="p-3">
                      {f === "Feed access"
                        ? "Limited"
                        : f === "Advanced search"
                        ? "Basic"
                        : "No"}
                    </td>
                    <td className="p-3">
                      {f === "Restaurant claim" ? "Apply" : "Yes"}
                    </td>
                    <td className="p-3">Yes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="text-2xl text-[#FF6b35] font-semibold">FAQ</h2>
          <Tabs defaultValue="q1" className="mt-4 text-[#FF6b35]">
            <TabsList>
              <TabsTrigger value="q1">
                What is included in the trial?
              </TabsTrigger>
              <TabsTrigger value="q2">How do I claim a restaurant?</TabsTrigger>
              <TabsTrigger value="q3">Can I downgrade?</TabsTrigger>
            </TabsList>
            <TabsContent value="q1">
              <p className="text-slate-600 dark:text-slate-300">
                14-day trial includes full Premium access. No credit card
                required for trial signup.
              </p>
            </TabsContent>
            <TabsContent value="q2">
              <p className="text-slate-600 dark:text-slate-300">
                To claim a restaurant you must be a verified owner. The process
                includes verifying your business email, a small verification
                step (document or photo), and optionally a short phone call with
                our team.
              </p>
            </TabsContent>
            <TabsContent value="q3">
              <p className="text-slate-600 dark:text-slate-300">
                Yes — you can downgrade at any time. Refund policy depends on
                local laws and billing cycles.
              </p>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA / Footer */}
        <section className="mt-16 py-12 rounded-xl bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-inner">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">
                Ready to level up your food discovery?
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Start your free trial and explore everything FoodFinder Premium
                has to offer.
              </p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-[#FF6b35] ">
                <Link href="/signup">Start free trial</Link>
              </Button>
              <Button className="text-[#FF6b35]" variant="outline">
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-sm text-slate-500">
          <p>
            Questions?{" "}
            <Link href="/help" className="underline">
              Visit our help centre
            </Link>{" "}
            or email{" "}
            <a href="mailto:support@foodfinder.example" className="underline">
              support@foodfinder.example
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
