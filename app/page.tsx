import { Header } from '@/app/components/Header'
import { Hero } from '@/app/components/Hero'
import { Features } from '@/app/components/Features'
import { CourseCategories } from '@/app/components/CourseCategories'
import { PopularCourses } from '@/app/components/PopularCourses'
import { Testimonials } from '@/app/components/Testimonials'
import { Pricing } from '@/app/components/Pricing'
import { FAQ } from '@/app/components/FAQ'
import { CallToAction } from '@/app/components/CallToAction'
import { Footer } from '@/app/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light relative">
      <Header />
      <main>
        <Hero />
        <Features />
        <CourseCategories />
        <PopularCourses />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}