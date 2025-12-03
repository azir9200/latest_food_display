import { Star } from "lucide-react";
import { HeroProps } from "@/types/heroProps";
import AiForm from "./AiForm";

export function Hero({
  heading = {
    line1: "Find Your Perfect",
    line2: "Delicious Food Dish",
  },
  description = [
    "Our advanced AI technology analyzes your taste and demand",
    "appetite, and choice to match you with the best Delicious Dish",
    "in seconds.",
  ],

  stats = [
    { value: "50K+", label: "Dish Display" },
    { value: "1000+", label: "User and Premium" },
    {
      value: "4.9",
      label: "Users Rating",
      icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" />,
    },
  ],
}: HeroProps) {
  return (
    <div className="w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0 "
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #ffffff 30%, #9ca3af 100%)",
        }}
      />
      {/* Content Container */}
      <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-[51px] leading-[60px]">{heading.line1}</h1>
                <h1 className="text-[51px] leading-[60px]">{heading.line2}</h1>
              </div>

              {/* Description */}
              <div className="space-y-1 text-[17px] leading-7 text-gray-600">
                {description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-[25.5px] leading-9">{stat.value}</p>
                      {stat.icon}
                    </div>
                    <p className="text-[13.6px] leading-6 text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form Card */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[559.929px] rounded-2xl ">
                {/* Card Header */}
                <div className="inline-flex items-center gap-3 self-start rounded-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                  <span className="text-[22.9px] font-semibold">
                    AI-Powered Food Finder
                  </span>
                </div>
                <AiForm />

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="text-center text-sm leading-5 text-gray-600">
                    ✨ Powered by advanced AI algorithms for accurate food
                    matching
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
