import * as Components from "@/app/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Components.Header />
      <main>
        <Components.Hero />
        <Components.CourseCategories />
        <Components.Features />
        <Components.Testimonials />
        <Components.Pricing />
        <Components.FAQ />
        <Components.CallToAction />
      </main>
      <Components.Footer />
    </div>
  );
}