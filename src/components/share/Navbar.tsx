"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, logout } from "@/services/AuthService";
import { IUser } from "@/types";
import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };
  const handleLogout = async () => {
    logout();
    setUser(null);
    router.push("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();

      setUser(user);
    };

    fetchData();
  }, []);

  return (
    <nav className="sticky top-0 bg-slate-200 shadow-md z-50 px-2 md:px-0">
      <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#FF6b35] rounded-full p-1">
            <div className="w-6 h-6 text-white flex items-center justify-center font-bold">
              SG
            </div>
          </div>
          <span className="text-xl font-poppins font-bold   text-[#333333]">
            Food Book
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/allpost"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            AllPost
          </Link>
          <Link
            href="/restaurant"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Restaurant
          </Link>

          <Link
            href="/about"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/premium"
            className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Premium
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/dashboard"
              className="  text-[#333333] hover:text-[#FF6b35] transition-colors"
            >
              Dashboard
            </Link>
          )}
          {user?.role === "USER" ||
            (user?.role === "ADMIN" && user.isPremium && (
              <Link
                href="/manage-restaurant"
                className=" text-[#333333] hover:text-[#FF6b35] transition-colors"
              >
                Manage Restaurant
              </Link>
            ))}
        </div>

        {/* Desktop Search & Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-12 w-12 border-2 border-Food Book-orange cursor-pointer">
                      <AvatarImage src={user?.image || ""} alt="User" />
                      <AvatarFallback>NB </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <p
                      onClick={() => handleLogout()}
                      className="  text-[#333333] flex items-center gap-1 hover:text-[#FF6b35] transition-colors cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={"login"}>
                <Button
                  variant="ghost"
                  className="  text-[#333333]  transition-colors"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button className="bg-[#FF6b35] text-white hover:bg-[#FF6b35]/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden   text-[#333333]"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {(isMenuOpen || isMenuAnimating) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isMenuAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Dark Background Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleMenu}
          ></div>
          {/* Menu Panel */}
          <div
            className={`absolute right-30 top-50 h-content w-2/4 max-w-sm bg-white rounded-md shadow-xl p-6 transform transition-transform duration-300 ${
              isMenuAnimating ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <Link
                href="/"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <Link
                href="/allpost"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                All Posts
              </Link>
              <Link
                href="/allpost"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                Restaurant
              </Link>
              <Link
                href="/premium"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                Premium
              </Link>

              <Link
                href="/about"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              {user?.role === "ADMIN" && (
                <Link
                  href="/dashboard"
                  className="text-2xl font-semibold text-[#333333] hover:text-[#FF6b35]"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              )}

              {user?.role === "USER" ||
                (user?.role === "ADMIN" && user.isPremium && (
                  <Link
                    href="/manage-restaurant"
                    className=" text-2xl font-semibold text-[#333333] hover:text-[#FF6b35] transition-colors"
                  >
                    Manage Restaurant
                  </Link>
                ))}

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 w-full max-w-xs mx-auto">
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-xl text-[#333333] hover:text-[#FF6b35] w-full mt-4"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button
                        variant="ghost"
                        onClick={toggleMenu}
                        className="text-xl text-[#333333] hover:text-[#FF6b35] w-full mt-4"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/signup" className="w-full">
                      <Button className="bg-[#FF6b35] text-xl text-white hover:bg-[#FF6b35]/90 w-full mt-2">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
