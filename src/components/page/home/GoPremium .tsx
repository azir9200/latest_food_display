import { Button } from "@/components/ui/button";
import Link from "next/link";

const GoPremium = () => {
  return (
    <div className="rounded-2xl overflow-hidden border border-orange-200/70 bg-gradient-to-br from-[#212121] via-[#2c1f1a] to-[#1b2b2f] shadow-2xl shadow-orange-100/40 dark:border-slate-700 dark:shadow-none">
      <div className="relative py-8 px-6 md:p-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#22d3ee]/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Become a Premium Member Today!
          </h2>
          <p className="text-gray-300 mb-8">
            Unlock exclusive food spots, get priority access to new listings,
            and support our community of food enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/premium"}>
              <Button className="bg-gradient-to-r from-amber-300 to-yellow-400 cursor-pointer text-black hover:from-amber-400 hover:to-yellow-500 px-8 py-6 text-lg">
                Go Premium
              </Button>
            </Link>
            <Link href={"/faq"}>
              <Button
                variant="outline"
                className="border-orange-300/70 bg-orange-500/80 text-white hover:bg-orange-500 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoPremium;
