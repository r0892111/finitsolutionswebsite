"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Hide navbar completely on voice-to-crm page
  if (pathname === "/voice-to-crm") {
    return null;
  }
  const navItems = [
    { name: "Diensten", href: "/diensten" },
    { name: "Blog", href: "/blog" },
    { name: "Over Ons", href: "/about" },
  ];
  const handleContactClick = () => {
    // If we're already on the homepage, just scroll to contact
    if (pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      window.location.href = "/#contact";
    }
    setIsOpen(false); // Close mobile menu if open
  };
  return (
    <header
      className={cn(
        `fixed ${
          scrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-white/80 backdrop-blur-sm shadow-sm"
        } top-0 w-full z-50 transition-all duration-300`
      )}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center justify-center h-full py-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-8 w-auto relative flex items-center">
                <Image
                  src="/Finit Logo Blue@4x.png"
                  alt="Finit Solutions Logo"
                  width={120}
                  height={32}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="lg:flex hidden items-center bg-gray-900/10 backdrop-blur-sm rounded-full px-2 py-1 mr-6 border border-gray-200/50 shadow-sm">
          <div className="lg:flex hidden items-center bg-gray-900/10 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-200/50 shadow-sm absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/diensten"
              className="px-6 py-2 text-[12px] font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all duration-200"
            >
              Tailored IT Solutions
            </Link>
            <Link
              href="/marketplace"
              className="px-6 py-2 text-[12px] font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all duration-200"
            >
              Marketplace
            </Link>
            <Link
              href="/about"
              className="px-6 py-2 text-[12px] font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all duration-200"
            >
              About Us
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {/* Navigation Pills Container */}

          </nav>
          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="hover:bg-transparent text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ease-in-out z-40",
          isOpen
            ? "top-20 opacity-100 visible"
            : "-top-full opacity-0 invisible"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}