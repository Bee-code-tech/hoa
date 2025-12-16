'use client'

import { useState } from "react"
import { Container } from '@/app/components/Container'

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "You can enroll in any course by browsing our catalog, selecting the course you're interested in, and clicking the 'Enroll Now' button. You'll need to create an account if you haven't already, and then proceed to payment. Once enrolled, you'll have immediate access to all course materials."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Yes, all our certificates are industry-recognized and backed by our partnerships with leading professional organizations. Many of our courses offer certificates that are accredited by relevant industry bodies, and we provide documentation to verify the authenticity of all certificates issued."
  },
  {
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and works seamlessly on desktops, tablets, and smartphones. You can download course materials for offline viewing and sync your progress across all your devices."
  },
  {
    question: "What if I'm not satisfied with a course?",
    answer: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with your purchase for any reason, simply contact our support team within 30 days and we'll issue a full refund. We want you to be completely confident in your learning investment."
  },
  {
    question: "How often are courses updated?",
    answer: "We regularly update our course content to ensure it remains current with industry standards and best practices. Our instructors continuously review and refresh materials, typically updating courses annually or whenever significant changes occur in the field."
  },
  {
    question: "Do you offer corporate training solutions?",
    answer: "Yes, our Enterprise plan includes comprehensive corporate training solutions with customizable learning paths, team progress tracking, and dedicated account management. Contact our sales team to discuss how we can tailor a solution for your organization's specific needs."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-brand-light">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-brand-secondary sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-brand-secondary/80">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-brand-accent/30 rounded-2xl">
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-brand-secondary">{faq.question}</span>
                  <svg 
                    className={`h-6 w-6 text-brand-secondary/70 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-brand-secondary/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}