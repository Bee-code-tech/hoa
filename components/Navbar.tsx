"use client";

import { Home, BookOpen, MapPin, FileText, Phone, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-icon.png";

const navLinks = [
  { label: "Home", icon: Home, href: "#" },
  { label: "Courses", icon: BookOpen, href: "#courses" },
  { label: "Locations", icon: MapPin, href: "#locations" },
  { label: "Blog", icon: FileText, href: "#blog" },
  { label: "Contact", icon: Phone, href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl rounded-full border border-border/60 bg-white px-5 py-2.5 shadow-lg">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo.src} alt="HOA Services" className="h-9 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-navy">HOA</span>
              <span className="text-[9px] font-medium tracking-widest uppercase text-gold">Learning</span>
            </div>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <User className="h-4 w-4" /> Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-3 border-t border-border/70 pt-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" className="flex-1 gap-1.5">
                  <User className="h-4 w-4" /> Sign In
                </Button>
                <Button size="sm" className="flex-1">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;