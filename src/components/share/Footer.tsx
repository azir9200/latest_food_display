import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { getCurrentUser } from "@/services/AuthService";

const Footer = async () => {
  const user = await getCurrentUser();
  return (
    <footer className="relative mt-20 px-5 md:px-8 overflow-hidden">
      {/* 🔥 Floating Gradient Lights */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* 🌫 Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-t border-white/10"></div>

      <div className="relative max-w-7xl mx-auto py-16 space-y-14">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* BRAND */}
          <div className="space-y-4 flex flex-col items-center md:items-start animate-fadeIn">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl shadow-lg shadow-orange-500/40 animate-glow">
                <div className="w-8 h-8 flex items-center justify-center font-bold text-white">
                  FB
                </div>
              </div>
              <span className="text-xl font-bold tracking-wide text-orange-700 drop-shadow-sm">
                Food Book
              </span>
            </div>

            <p className="text-white text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Discover delicious street food, trending dishes, and hidden gems
              around the world.
            </p>

            <div className="flex gap-4 mt-5 justify-center md:justify-start">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="/"
                  className="p-4 rounded-full bg-orange-600 hover:bg-orange-950 
                             backdrop-blur-md transition-all hover:scale-110 shadow 
                             border border-white/10 hover:border-white/30 animate-float"
                >
                  <Icon size={24} className="text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col items-center md:items-start animate-fadeIn delay-100">
            <h3 className="text-lg font-semibold text-orange-700  mb-4 drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Explore", link: "/faq" },
                { name: "Categories", link: "/allpost" },
                { name: "Premium", link: "/premium" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-black hover:text-orange-700  hover:underline text-xl transition-all hover:tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="flex flex-col items-center md:items-start animate-fadeIn delay-200">
            <h3 className="text-lg font-semibold text-orange-700  mb-4 drop-shadow-sm">
              Support
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Help Center", link: "/contact" },
                { name: "FAQ", link: "/faq" },
                { name: "Contact Us", link: "/contact" },
                { name: "Terms & Conditions", link: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-gray-700  hover:text-orange-600 hover:underline  text-sm transition-all hover:tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="flex flex-col items-center md:items-start animate-fadeIn delay-300">
            <h3 className="text-lg font-semibold text-orange-700 mb-4 drop-shadow-sm">
              Stay Updated
            </h3>

            <p className="text-gray-700 text-sm mb-4 max-w-xs mx-auto md:mx-0">
              Subscribe for trending dishes and food discoveries.
            </p>

            <form
              className="flex items-center bg-white/10 backdrop-blur-xl 
                         rounded-full overflow-hidden border border-white/10 
                         hover:border-white/30 transition-all w-full max-w-xs mx-auto md:mx-0"
            >
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center cursor-pointer"
                >
                  {" "}
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 w-full bg-transparent text-sm outline-none text-white placeholder-gray-600"
                  />
                  <button
                    type="button"
                    className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm text-white font-semibold hover:opacity-90 transition-all"
                  >
                    Join
                  </button>{" "}
                </Link>
              ) : (
                <Link
                  href={"/signup"}
                  className="flex items-center cursor-pointer"
                >
                  {" "}
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 w-full bg-transparent text-sm outline-none text-white placeholder-gray-600"
                  />
                  <button
                    type="button"
                    className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm text-white font-semibold hover:opacity-90 transition-all"
                  >
                    Join
                  </button>{" "}
                </Link>
              )}
              
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 text-center text-orange-700 text-sm  pb-2 animate-fadeIn delay-500">
          © {new Date().getFullYear()} Food Book. All Rights Reserved.
        </div>
      </div>

      {/* ANIMATION CSS */}
      <style>
        {`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 12px rgba(255, 90, 30, 0.25); }
          50% { box-shadow: 0 0 22px rgba(255, 90, 30, 0.5); }
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s forwards ease-out;
        }
        .animate-fadeIn.delay-100 { animation-delay: 0.1s; }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeIn.delay-300 { animation-delay: 0.3s; }
        .animate-fadeIn.delay-500 { animation-delay: 0.5s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </footer>
  );
};

export default Footer;
