import { useState } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Mobile Gallery - Only shown on mobile */}
      <div className="md:hidden bg-card">
        <div className="grid grid-cols-3 gap-1 p-2">
          {/* //todo: remove mock functionality */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-sm overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-${1600000000000 + i}?w=200&h=200&fit=crop`}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/200x200/f0f0f0/999999?text=Image+${i + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-foreground">
              interiology
            </h1>
          </div>

          {/* Desktop Contact Info */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+91 72783 85837</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>+91 72783 85837</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary font-semibold' : ''}`}>
              Home
            </Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary font-semibold' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* Contact Button, Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact">
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex"
                data-testid="button-contact"
              >
                Contact Us
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/" 
                className={`text-sm font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary font-semibold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/contact" 
                className={`text-sm font-medium hover:text-primary transition-colors ${location === '/contact' ? 'text-primary font-semibold' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                <Phone className="w-4 h-4" />
                <span>+91 72783 85837</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>+91 72783 85837</span>
              </div>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-fit"
                  data-testid="button-contact-mobile"
                >
                  Contact Us
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}