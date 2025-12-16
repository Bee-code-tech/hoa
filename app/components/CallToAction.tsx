import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'

export function CallToAction() {
  return (
    <section className="py-20 sm:py-32 bg-brand-light">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-brand-secondary sm:text-4xl">
            Ready to advance your career?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-brand-secondary/80">
            Join thousands of learners today and start your journey to success.
          </p>
          <Button href="/register" color="primary" className="mt-10">
            Get 6 months free
          </Button>
        </div>
      </Container>
    </section>
  );
}