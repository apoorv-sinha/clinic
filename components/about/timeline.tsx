"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "1999",
    title: "The Beginning",
    description: "Dr. Priya and Dr. Rajesh opened a small clinic with just two consultation rooms and a shared vision of compassionate healthcare.",
  },
  {
    year: "2005",
    title: "Growing Family",
    description: "Expanded to a larger facility with dedicated departments for gynaecology and general medicine, serving over 2,000 patients.",
  },
  {
    year: "2010",
    title: "Specialty Focus",
    description: "Dr. Rajesh completed his DM in Pulmonology, adding respiratory care to our specialties. Launched diabetes management program.",
  },
  {
    year: "2015",
    title: "Modern Facilities",
    description: "Moved to our current state-of-the-art facility with advanced diagnostic equipment and comfortable patient amenities.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Introduced telemedicine services during the pandemic, ensuring continuous care for our patients when they needed us most.",
  },
  {
    year: "2024",
    title: "Today & Beyond",
    description: "Celebrating 25 years of service with over 10,000 happy patients. Continuing to innovate while keeping our patient-first philosophy.",
  },
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Journey</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            25 years of dedicated care
          </h2>
        </div>

        {/* Interactive Timeline */}
        <div className="mt-12 lg:mt-16">
          {/* Year Navigation */}
          <div className="flex items-center justify-center gap-4 overflow-x-auto pb-4 md:gap-8">
            {milestones.map((milestone, index) => (
              <button
                type="button"
                key={milestone.year}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative flex flex-col items-center gap-2 transition-all",
                  activeIndex === index ? "scale-110" : "opacity-60 hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "text-lg font-bold transition-colors md:text-xl",
                    activeIndex === index ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {milestone.year}
                </span>
                <span
                  className={cn(
                    "h-3 w-3 rounded-full transition-all",
                    activeIndex === index ? "bg-primary scale-125" : "bg-muted-foreground/30"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Progress Line */}
          <div className="relative mx-auto mt-2 h-1 max-w-2xl bg-muted">
            <div
              className="absolute h-full bg-primary transition-all duration-500"
              style={{ width: `${(activeIndex / (milestones.length - 1)) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <div
              key={activeIndex}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                {milestones[activeIndex].title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {milestones[activeIndex].description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex(Math.min(milestones.length - 1, activeIndex + 1))}
              disabled={activeIndex === milestones.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
