"use client";

import { useRef } from "react";
import { Award, MapPin, Clock, Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { icon: Award, label: "Accredited Courses", value: "25+" },
  { icon: MapPin, label: "UK Locations", value: "50+" },
  { icon: Clock, label: "Same Day Results", value: "Fast" },
  { icon: Star, label: "Student Rating", value: "4.9/5" },
];

const StatsBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".stat-item", {
       y: 20,
       opacity: 0,
       stagger: 0.1,
       duration: 0.8,
       ease: "power3.out",
       scrollTrigger: {
         trigger: containerRef.current,
         start: "top 90%",
       }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="border-b bg-card py-8">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
