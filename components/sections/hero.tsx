"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-foreground">Trusted by 10,000+ patients</span>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Your health deserves exceptional care
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Expert healthcare combining gynaecology, pulmonology, diabetes management, and general medicine under one roof. Experience compassionate care from our experienced specialists.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="#appointment">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
                <Link href="/about">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">25+ Years</span>
                  <span className="text-xs text-muted-foreground">Experience</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">Board Certified</span>
                  <span className="text-xs text-muted-foreground">Specialists</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-clinic.jpg"
                alt="HealthFirst Clinic interior"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-lg md:p-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-card bg-primary/20" />
                  <div className="h-10 w-10 rounded-full border-2 border-card bg-accent/20" />
                  <div className="h-10 w-10 rounded-full border-2 border-card bg-primary/30" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground">4.9/5 Rating</p>
                  <p className="text-xs text-muted-foreground">From 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
