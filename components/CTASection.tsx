"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    gsap.from(".cta-button", {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      delay: 0.3,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-hero px-4 py-20">
      <div className="cta-content container mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
          Ready to Start Your Security Career?
        </h2>
        <p className="mb-8 text-hero-muted">
          Join thousands of professionals who have advanced their careers with our accredited courses.
          Flexible schedules, expert trainers, job placement support.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="cta-button">
            <Button size="lg" className="gap-2 bg-gold px-8 text-foreground hover:bg-gold-light">
              Browse All Courses <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="cta-button">
            <Button size="lg" variant="outline" className="border-hero-muted/30 text-hero-foreground hover:bg-primary/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
