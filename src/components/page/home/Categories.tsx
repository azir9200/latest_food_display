"use client";
import { Button } from "@/components/ui/button";
import { getAllCategory } from "@/services/categoryService";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CategoryType = {
  id: string;
  name: string;
  image?: string;
  _count?: {
    posts: number;
  };
};

const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategory();
      setCategories(result.data || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const skeletons = Array.from({ length: 8 });

  return (
    <div className="py-8 bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-2">
            Explore by Category
            <Sparkles className="text-orange-500 h-6 w-6" />
          </h2>

          <Link href="/allpost">
            <Button
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white 
             hover:from-white hover:to-white hover:text-orange-600 
             font-semibold shadow-md hover:shadow-lg 
             transition-all duration-300 flex items-center gap-2 px-4 py-2"
            >
              All Categories <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="h-48 rounded-2xl bg-orange-200/40 animate-pulse"
                ></div>
              ))
            : categories?.slice(0, 8).map((category: CategoryType) => (
                <div
                  key={category.id}
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-orange-200 hover:border-orange-400"
                >
                  {/* Category Image */}
                  <Image
                    height={500}
                    width={500}
                    src={category.image || "/default.jpg"}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Pixel colorful glow border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-[linear-gradient(45deg,rgba(255,107,53,0.9),rgba(255,187,0,0.8))] mix-blend-overlay"></div>

                  {/* Text Area */}
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-md">
                      {category?._count?.posts || 0} spots
                    </p>

                    {/* Cute Category Tag */}
                    <div className="mt-2 inline-block bg-white/20 text-white px-3 py-1 text-xs rounded-full backdrop-blur-md shadow">
                      Explore Now →
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
