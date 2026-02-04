import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Dr. Priya Sharma provided exceptional care during my pregnancy. Her expertise and compassionate approach made all the difference.",
    author: "Ananya M.",
    role: "New Mother",
  },
  {
    quote: "Dr. Rajesh helped me manage my diabetes effectively. His comprehensive approach and regular follow-ups have transformed my health.",
    author: "Vikram S.",
    role: "Diabetes Patient",
  },
  {
    quote: "The entire team at HealthFirst is wonderful. From reception to the doctors, everyone is professional and caring.",
    author: "Meera P.",
    role: "Regular Patient",
  },
];

export function TestimonialPreview() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Testimonials</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            What our patients say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {'"'}{testimonial.quote}{'"'}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-2 bg-transparent" asChild>
            <Link href="/testimonials">
              View All Testimonials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
