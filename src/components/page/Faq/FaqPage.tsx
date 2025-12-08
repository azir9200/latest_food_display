"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { faqItems } from "./FaqItems";
import { categories } from "./category";

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs = faqItems.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-Food Book-darkblue mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about Food Book, our services,
              and how to make the most of your street food discovery experience.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={`text-sm ${
                    activeCategory === category.id
                      ? " bg-[#EB6535] hover:bg-[#EB6535]/90"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-500">
                  No matching questions found.
                </p>
                <Button
                  className="mt-4 bg-Food Book-orange hover:bg-Food Book-orange/90"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="pt-2 pb-4">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

          <div className="mt-12 bg-Food Book-lightgray p-6 rounded-lg border text-center">
            <h3 className="text-xl font-semibold text-Food Book-darkblue mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you with any questions or
              concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" passHref>
                <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90">
                  Contact Support
                </Button>
              </Link>

              <Link href="/contact" passHref>
                <Button variant="outline">Submit a Request</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
