"use client";

import { useRef } from "react";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-security.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const highlights = [
  "SIA Accredited Courses",
  "Flexible Scheduling",
  "Job Placement Support",
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8 })
      .from(".hero-title", { y: 40, opacity: 0, stagger: 0.2 }, "-=0.6")
      .from(".hero-description", { y: 20, opacity: 0 }, "-=0.7")
      .from(".hero-highlight", { x: -20, opacity: 0, stagger: 0.1 }, "-=0.8")
      .from(".hero-button", { y: 20, opacity: 0, stagger: 0.15 }, "-=0.7")
      .from(".hero-image-container", { scale: 0.95, opacity: 0, duration: 1.2 }, "-=1.2")
      .from(".hero-floating-card", { y: 30, opacity: 0, stagger: 0.2 }, "-=1");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-hero pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-dark/95 to-navy/80" />

      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          rgba(255,255,255,0.08) 40px,
          rgba(255,255,255,0.08) 41px
        )`
      }} />

      {/* Hex/grid dot pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle, rgba(197,165,90,0.5) 1.2px, transparent 1.2px),
          radial-gradient(circle, rgba(197,165,90,0.3) 1.2px, transparent 1.2px)`,
        backgroundSize: '48px 48px',
        backgroundPosition: '0 0, 24px 24px'
      }} />

      {/* Subtle radial glow */}
      <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
      <div className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-navy/20 blur-[100px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left content */}
          <div className="text-center md:text-left">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Trusted by 10,000+ security professionals
            </div>

            <h1 className="hero-title mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-hero-foreground md:text-5xl lg:text-6xl">
              Build Your Career in
              <span className="block text-gold">Professional Security</span>
            </h1>

            <p className="hero-description mb-8 mx-auto md:mx-0 max-w-lg text-lg leading-relaxed text-hero-muted">
              Industry-accredited training in Door Supervision, CCTV Operations, 
              Close Protection and more. Get certified, get hired — with full support 
              from enrolment to employment.
            </p>

            <div className="mb-8 flex flex-col gap-2 items-center md:items-start">
              {highlights.map((item) => (
                <div key={item} className="hero-highlight flex items-center gap-2 text-sm text-hero-muted">
                  <CheckCircle className="h-4 w-4 text-gold" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="hero-button">
                <Button size="lg" className="gap-2 bg-gold px-8 text-foreground hover:bg-gold-light">
                  Browse Courses <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="hero-button">
                <Button size="lg" variant="outline" className="gap-2 border-hero-muted/30 text-hero-foreground hover:bg-primary/10">
                  <Play className="h-4 w-4" /> Watch Overview
                </Button>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="hero-image-container relative hidden md:block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={heroImage.src}
                alt="Professional security officer"
                className="h-[480px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="hero-floating-card absolute -bottom-4 -left-6 rounded-xl border bg-card p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">4.9/5</p>
              <p className="text-xs text-muted-foreground">Student Rating</p>
              <div className="mt-1 flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="hero-floating-card absolute -right-4 top-8 rounded-xl border bg-card p-4 shadow-lg">
              <p className="text-2xl font-bold text-primary">25+</p>
              <p className="text-xs text-muted-foreground">Accredited Courses</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;