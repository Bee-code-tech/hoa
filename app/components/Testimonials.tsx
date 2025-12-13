import { Container } from '@/app/components/Container'

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Engineer",
    content: "This course completely transformed my career prospects. The instructors were knowledgeable and the content was perfectly structured for practical application. I went from a junior developer to a senior position within 6 months of completing the program!",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Project Manager",
    content: "As someone transitioning from marketing to tech, I found the curriculum incredibly comprehensive yet accessible. The hands-on projects helped me build a portfolio that impressed hiring managers. Highly recommend to anyone looking to pivot their career.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Cybersecurity Analyst",
    content: "The security courses here are unmatched in depth and relevance. I've taken many certifications, but the practical approach and real-world scenarios presented in these courses gave me the confidence to tackle complex security challenges at my organization.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Loved by learners worldwide.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Our platform is so effective that people can't help but fall in love with learning. 
            Simplicity is easy when you have expert instructors and well-structured content.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {testimonials.slice(columnIndex * 1, columnIndex * 1 + 1).map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          "{testimonial.content}"
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <svg 
                                key={rating} 
                                className={`h-5 w-5 ${rating < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}