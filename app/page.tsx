import { Hero } from '@/app/components/Hero'
import { Features } from '@/app/components/Features'
import { CourseCategories } from '@/app/components/CourseCategories'
import { PopularCourses } from '@/app/components/PopularCourses'
import { Testimonials } from '@/app/components/Testimonials'
import { Pricing } from '@/app/components/Pricing'
import { FAQ } from '@/app/components/FAQ'
import { CallToAction } from '@/app/components/CallToAction'
import { Footer, Header } from './components'

export default function Home() {
  return (
    <>
     <Header />
      <Hero />
      <CourseCategories />
      <Features />
      <PopularCourses />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CallToAction />
      <Footer />
    </>
  )
}