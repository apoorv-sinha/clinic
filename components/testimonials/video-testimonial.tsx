"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoTestimonial() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Featured Story</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Hear from our patients
            </h2>
          </div>

          {/* Video Placeholder */}
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl bg-foreground/5 shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-foreground/10">
              <Button
                size="lg"
                className="h-16 w-16 rounded-full"
                onClick={() => {
                  // Video play functionality would go here
                }}
              >
                <Play className="h-8 w-8 fill-current" />
                <span className="sr-only">Play video testimonial</span>
              </Button>
              <p className="text-sm font-medium text-muted-foreground">Watch Patient Story</p>
            </div>
            
            {/* Video placeholder content */}
            <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-card/90 p-4 backdrop-blur-sm">
              <p className="font-semibold text-foreground">{"\"A Journey to Motherhood\""}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Watch how the Sharmas helped Priya & Rahul realize their dream of becoming parents after years of trying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
