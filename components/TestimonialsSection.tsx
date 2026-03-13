"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "James R.",
    role: "Door Supervisor",
    quote: "Got my SIA badge within weeks of completing the course. The instructors were brilliant and really prepared me for the job.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "CCTV Operator",
    quote: "Flexible scheduling meant I could train around my current job. Now I'm working in a role I actually enjoy.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Security Manager",
    quote: "I've sent multiple team members here for training. Consistent quality and great value every time.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".testimonials-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonials-header",
        start: "top 85%",
      }
    });

    gsap.from(".testimonial-card", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-card py-20 px-4">
      <div className="container mx-auto">
        <div className="testimonials-header mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">Testimonials</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What Our Students Say
          </h2>
        </div>
        <div className="testimonials-grid grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card rounded-xl border p-6">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
