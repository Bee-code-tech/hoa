import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-hero px-4 py-20">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
          Ready to Start Your Security Career?
        </h2>
        <p className="mb-8 text-hero-muted">
          Join thousands of professionals who have advanced their careers with our accredited courses.
          Flexible schedules, expert trainers, job placement support.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 bg-gold px-8 text-foreground hover:bg-gold-light">
            Browse All Courses <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-hero-muted/30 text-hero-foreground hover:bg-primary/10">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
