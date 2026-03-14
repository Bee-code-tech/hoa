"use client";

import { Home, BookOpen, MapPin, FileText, Phone, Menu, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-icon.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const navLinks = [
  { label: "Home", icon: Home, href: "#" },
  { label: "Courses", icon: BookOpen, href: "#courses" },
  { label: "Locations", icon: MapPin, href: "#locations" },
  { label: "Blog", icon: FileText, href: "#blog" },
  { label: "Contact", icon: Phone, href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<any>(null);

  useGSAP(() => {
    // Initial state: menu is zero height and invisible
    gsap.set(menuRef.current, { height: 0, opacity: 0, overflow: "hidden", display: "none" });

    timeline.current = gsap.timeline({ paused: true })
      .to(navRef.current, {
        borderRadius: "16px",
        duration: 0.5,
        ease: "power2.inOut"
      })
      .set(menuRef.current, { display: "block" })
      .to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        paddingTop: "12px",
        marginTop: "12px"
      }, ">-0.1")
      .from(".mobile-link", {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out"
      }, "<0.3");
  }, { scope: containerRef });

  useEffect(() => {
    if (mobileOpen) {
      timeline.current?.play();
    } else {
      timeline.current?.reverse();
    }
  }, [mobileOpen]);

  return (
    <div ref={containerRef} className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        ref={navRef}
        className="w-full max-w-5xl rounded-full border border-border/60 bg-white px-5 py-2.5 shadow-lg overflow-hidden"
      >
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
            <Link href="/login">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <User className="h-4 w-4" /> Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div ref={menuRef} className="border-t border-border/70 md:hidden">
          <div className="flex flex-col gap-1 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
            <div className="mobile-link flex gap-2 pt-2">
              <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full gap-1.5">
                  <User className="h-4 w-4" /> Sign In
                </Button>
              </Link>
              <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;