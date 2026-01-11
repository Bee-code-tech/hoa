

export default function HurakHome() {
  return (
    <div className="font-sans text-gray-900">
      
      <Header />
      <SubNav/>
      <Hero />
      <TrustBadges />
      <CourseShowcase />
      <FeaturedTopics/>
      <BusinessSection />
      <TeachSection />
      <SupportSection />
      <Footer/>
    </div>
  );
}


import CourseShowcase from "./component.tsx/Courseshowcase";
import FeaturedTopics from "./component.tsx/FeaturedTopics";
import Footer from "./component.tsx/Footer";
import Header from "./component.tsx/Hero";
import SubNav from "./component.tsx/subnav";
import SupportSection from "./component.tsx/SupportSection";
import TrustBadges from "./component.tsx/TrustBadge";



function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Desktop layout: text overlayed on image */}
        <div className="relative hidden lg:block">
          <img
            className="w-full h-125 object-cover rounded-2xl"
            src="https://hurak-training-uploads.s3.eu-west-2.amazonaws.com/uploads/admin-cms/homepage-uploads/68713ebe61021_banner.webp"
            alt="Student"
          />
          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-3xl px-8 bg-white">
              <h1 className="text-4xl font-bold leading-tight text-black">
                Find Accredited Training Courses Across the UK
              </h1>
              <p className="mt-6 text-black text-xl">
                Book accredited CITB Site Safety Plus training, CSCS card courses,
                Construction NVQs, CPCS training, SIA security courses, First Aid and
                more – all in one place.
              </p>
              <div className="mt-8">
                <button className="bg-blue-900 text-white text-lg px-6 py-3 rounded-md font-medium">
                  Search for courses
                </button>
              </div>
              <div className="mt-6 text-xl text-black">
                Rated <span className="font-semibold text-blue-900">Excellent</span>{" "}
                <div className="text-3xl text-blue-900">★★★★★</div>
                <div className="pb-2">Based on reviews from major platforms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout: image first, then text */}
        <div className="lg:hidden flex flex-col items-start gap-6">
          <img
            className="w-full h-60 object-cover rounded-2xl"
            src="https://hurak-training-uploads.s3.eu-west-2.amazonaws.com/uploads/admin-cms/homepage-uploads/68713ebe61021_banner.webp"
            alt="Student"
          />
          <h1 className="text-3xl font-bold leading-tight">
            Find Accredited Training Courses Across the UK
          </h1>
          <p className="text-gray-600 text-lg">
            Book accredited CITB Site Safety Plus training, CSCS card courses,
            Construction NVQs, CPCS training, SIA security courses, First Aid and
            more – all in one place.
          </p>
          <button className="bg-blue-900 text-white text-lg px-6 py-3 rounded-full font-medium">
            Search for courses
          </button>
          <div className="text-lg text-gray-600">
            Rated <span className="font-semibold text-blue-900">Excellent</span>{" "}
            <span className="text-2xl text-blue-900">★★★★★</span>
          </div>
        </div>
      </div>
    </section>
  );
}




function BusinessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* Image Column */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <img
            className="rounded-xl max-w-sm w-full object-cover"
            src="/upskill-business-image-686cee4033f81.webp"
            alt="Upskill your team"
          />
        </div>

        {/* Text Column */}
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold">Upskill your team with HOA</h2>
          <ul className="mt-4 text-gray-600 text-xl space-y-2">
            <li>• Save time and hassle by managing all your customer data in one place</li>
            <li>• Spend less time worrying about managing your team and more time growing your business.</li>
            <li>• It's free! You can use it as much or as little as you want.</li>
          </ul>
          <button className="mt-6 bg-blue-900 text-lg text-white px-6 py-3 rounded-md">
            Get HOA Business
          </button>
        </div>

      </div>
    </section>
  );
}





function TeachSection() {
  return (
      <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
       
         <img
          className="rounded-xl"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        /> <div>
          
          <h2 className="text-3xl font-bold">Teach with HOA</h2>
         <div className="text-gray-700 text-xl p-2">Join HOA and list your courses for Free! Whether you’re an instructor or company, we provide the tools and skill for you to teach with no hassle.</div>
          <button className="mt-6 bg-blue-900 text-lg text-white px-6 py-3 rounded-md">
            Start Teaching Today
          </button>
        </div>
      
      </div>
    </section>
  );
}



