"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Dr. Priya Sharma is simply the best gynaecologist I have ever consulted. She made my high-risk pregnancy journey smooth and stress-free. Her expertise and caring nature gave me confidence throughout.",
    author: "Ananya Mehta",
    role: "New Mother",
    category: "gynaecology",
    rating: 5,
  },
  {
    quote: "I have been managing my diabetes with Dr. Rajesh for 8 years now. His comprehensive approach including diet, exercise, and medication has helped me maintain healthy blood sugar levels consistently.",
    author: "Vikram Singh",
    role: "Diabetes Patient",
    category: "diabetes",
    rating: 5,
  },
  {
    quote: "The entire team at HealthFirst is wonderful. From the receptionist to the doctors, everyone treats you with respect and genuine care. It feels like visiting family.",
    author: "Meera Patel",
    role: "Regular Patient",
    category: "general",
    rating: 5,
  },
  {
    quote: "Dr. Rajesh diagnosed my sleep apnea when other doctors couldn't figure out why I was always tired. The treatment has changed my life completely. I finally feel energetic again.",
    author: "Arjun Kapoor",
    role: "Pulmonology Patient",
    category: "pulmonology",
    rating: 5,
  },
  {
    quote: "After years of trying to conceive, Dr. Priya helped us become parents. Her patience and expertise in infertility treatment gave us hope when we had almost given up.",
    author: "Priya & Rahul Kumar",
    role: "Happy Parents",
    category: "gynaecology",
    rating: 5,
  },
  {
    quote: "The clinic is very clean and modern. Online appointment booking is convenient, and waiting times are reasonable. The doctors take time to explain everything clearly.",
    author: "Sunita Verma",
    role: "First-time Patient",
    category: "general",
    rating: 5,
  },
  {
    quote: "My mother's chronic asthma is now well-controlled thanks to Dr. Rajesh. He adjusted her medications and taught us proper inhaler techniques. Her quality of life has improved significantly.",
    author: "Amit Sharma",
    role: "Family Member",
    category: "pulmonology",
    rating: 5,
  },
  {
    quote: "I was nervous about my first gynaec visit, but Dr. Priya made me feel comfortable immediately. She explained everything and answered all my questions patiently. Highly recommended for young women.",
    author: "Neha Gupta",
    role: "Young Patient",
    category: "gynaecology",
    rating: 5,
  },
  {
    quote: "Dr. Rajesh helped my father manage both his diabetes and respiratory issues together. The coordinated care approach here is excellent - no running between different clinics.",
    author: "Sanjay Reddy",
    role: "Family Caregiver",
    category: "diabetes",
    rating: 5,
  },
];

const categories = [
  { id: "all", label: "All Reviews" },
  { id: "gynaecology", label: "Gynaecology" },
  { id: "pulmonology", label: "Pulmonology" },
  { id: "diabetes", label: "Diabetes Care" },
  { id: "general", label: "General" },
];

export function TestimonialsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTestimonials = activeCategory === "all"
    ? testimonials
    : testimonials.filter((t) => t.category === activeCategory);

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
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
      </div>
    </section>
  );
}
