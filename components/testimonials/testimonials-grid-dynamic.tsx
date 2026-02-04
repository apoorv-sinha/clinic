"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  patient_name: string;
  patient_initials: string;
  testimonial_text: string;
  rating: number;
  department: string;
  treatment_type: string;
}

// Fallback static testimonials
const staticTestimonials: Testimonial[] = [
  {
    id: "static-1",
    patient_name: "Ananya M.",
    patient_initials: "AM",
    testimonial_text: "Dr. Mom is simply the best gynaecologist I have ever consulted. She made my high-risk pregnancy journey smooth and stress-free. Her expertise and caring nature gave me confidence throughout.",
    rating: 5,
    department: "Gynaecology",
    treatment_type: "Pregnancy Care",
  },
  {
    id: "static-2",
    patient_name: "Vikram S.",
    patient_initials: "VS",
    testimonial_text: "I have been managing my diabetes with Dr. Dad for 8 years now. His comprehensive approach including diet, exercise, and medication has helped me maintain healthy blood sugar levels consistently.",
    rating: 5,
    department: "Diabetes Care",
    treatment_type: "Diabetes Management",
  },
  {
    id: "static-3",
    patient_name: "Meera P.",
    patient_initials: "MP",
    testimonial_text: "The entire team at HealthFirst is wonderful. From the receptionist to the doctors, everyone treats you with respect and genuine care. It feels like visiting family.",
    rating: 5,
    department: "General Medicine",
    treatment_type: "General Checkup",
  },
  {
    id: "static-4",
    patient_name: "Arjun K.",
    patient_initials: "AK",
    testimonial_text: "Dr. Dad diagnosed my sleep apnea when other doctors couldn't figure out why I was always tired. The treatment has changed my life completely. I finally feel energetic again.",
    rating: 5,
    department: "Pulmonology",
    treatment_type: "Sleep Apnea",
  },
  {
    id: "static-5",
    patient_name: "Priya & Rahul K.",
    patient_initials: "PK",
    testimonial_text: "After years of trying to conceive, Dr. Mom helped us become parents. Her patience and expertise in infertility treatment gave us hope when we had almost given up.",
    rating: 5,
    department: "Gynaecology",
    treatment_type: "Fertility Treatment",
  },
  {
    id: "static-6",
    patient_name: "Sunita V.",
    patient_initials: "SV",
    testimonial_text: "The clinic is very clean and modern. Online appointment booking is convenient, and waiting times are reasonable. The doctors take time to explain everything clearly.",
    rating: 5,
    department: "General Medicine",
    treatment_type: "Consultation",
  },
];

const categories = [
  { id: "all", label: "All Reviews" },
  { id: "Gynaecology", label: "Gynaecology" },
  { id: "Pulmonology", label: "Pulmonology" },
  { id: "Diabetes Care", label: "Diabetes Care" },
  { id: "General Medicine", label: "General Medicine" },
];

interface TestimonialsGridDynamicProps {
  testimonials: Testimonial[];
}

export function TestimonialsGridDynamic({ testimonials }: TestimonialsGridDynamicProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Use DB testimonials if available, otherwise show static
  const allTestimonials = testimonials.length > 0 ? testimonials : staticTestimonials;

  const filteredTestimonials = activeCategory === "all"
    ? allTestimonials
    : allTestimonials.filter((t) => t.department === activeCategory);

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
              key={testimonial.id}
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
                {'"'}{testimonial.testimonial_text}{'"'}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.patient_initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.patient_name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.department}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="mt-12 text-center py-12">
            <p className="text-muted-foreground">No testimonials found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
