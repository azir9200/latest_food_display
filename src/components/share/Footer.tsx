import Link from "next/link";
import {
  Facebook,
  Instagram,
  InstagramIcon,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white mt-16 px-4 md:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto py-14 space-y-10">
        {/* Brand + About */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#FF6B35] p-2 rounded-full shadow-md shadow-orange-500/20">
                <div className="w-7 h-7 flex items-center justify-center text-white font-bold">
                  FB
                </div>
              </div>
              <span className="text-xl font-bold tracking-wide">Food Book</span>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Discover delicious street food, trending dishes, and hidden gems
              around the world.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Link
                href="/"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FF6B35] transition"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="/"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FF6B35] transition"
              >
                <Instagram className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="/"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FF6B35] transition"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="/"
                className="p-2 bg-white/10 rounded-full hover:bg-[#FF6B35] transition"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
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
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { name: "Help Center", link: "/contact" },
                { name: "FAQ", link: "/faq" },
                { name: "Contact Us", link: "/contact" },
                { name: "Terms & Conditions", link: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for trending dishes and latest food discoveries.
            </p>

            <form className="flex items-center bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 w-full bg-transparent text-sm outline-none placeholder-gray-300"
              />
              <Link href="/signup">
                <button
                  type="button"
                  className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Join
                </button>
              </Link>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Food Book. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
