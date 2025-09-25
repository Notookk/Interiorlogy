import { useEffect, useState } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import localLogo from "@assets/generated_images/logo.png";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [logoBroken, setLogoBroken] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for nav blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true } as any);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/60 supports-[backdrop-filter]:backdrop-blur-md border-b border-border/40 shadow-md"
          : "bg-transparent"
      }`}
    >
      {/* Mobile backdrop */}
      {isMenuOpen && (
        <div
          aria-hidden
          className="fixed inset-0 z-40 bg-background/40 supports-[backdrop-filter]:backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/">
              {logoBroken ? (
                <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#fde63e] via-[#f8d64e] to-[#fde63e] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(253,230,62,0.25)]">
                  Interiorlogy
                </h1>
              ) : (
                <img
                  src={localLogo}
                  alt="Interiorlogy logo"
                  className="h-10 w-auto object-contain select-none drop-shadow-md"
                  loading="eager"
                  onError={() => setLogoBroken(true)}
                />
              )}
            </Link>
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden md:flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 72783 85837</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>+91 72783 85837</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`group relative text-sm font-medium transition-colors ${
                  location === href
                    ? "text-foreground/80"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-[#fde63e] via-[#f8d64e] to-[#fde63e] transition-all duration-300 ${
                    location === href ? "w-full" : "group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex relative overflow-hidden group rounded-lg 
                bg-background/10 backdrop-blur-md border-[#e6d781]/30
                hover:shadow-[0_0_20px_rgba(230,215,129,0.25)] 
                hover:-translate-y-0.5 transition-all duration-400"
              >
                <span className="relative z-10">Contact Us</span>
                <span
                  aria-hidden
                  className="absolute top-0 left-[-150%] h-full w-[50%] skew-x-12 
                  bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-transform duration-700 ease-out 
                  group-hover:translate-x-[260%]"
                />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t relative z-50 bg-background/80 supports-[backdrop-filter]:backdrop-blur-md shadow-lg"
            >
              <nav className="flex flex-col gap-5">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-base font-medium transition-colors ${
                      location === href
                        ? "text-foreground/80"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t">
                  <Phone className="w-4 h-4" />
                  <span>+91 72783 85837</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>+91 72783 85837</span>
                </div>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit relative overflow-hidden group rounded-lg mt-2
                    bg-background/10 backdrop-blur-md border-[#e6d781]/30
                    hover:shadow-[0_0_20px_rgba(230,215,129,0.25)] 
                    hover:-translate-y-0.5 transition-all duration-400"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <span
                      aria-hidden
                      className="absolute top-0 left-[-150%] h-full w-[50%] skew-x-12 
                      bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-transform duration-700 ease-out 
                      group-hover:translate-x-[260%]"
                    />
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
