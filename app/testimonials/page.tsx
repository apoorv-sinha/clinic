import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero";
import { TestimonialsGridDynamic } from "@/components/testimonials/testimonials-grid-dynamic";
import { CtaBanner } from "@/components/testimonials/cta-banner";
import { FloatingContact } from "@/components/floating-contact";

export default function TestimonialsPage() {
  return (
    <>
      <Header />
      <main>
        <TestimonialsHero />
        <TestimonialsGridDynamic testimonials={[]} />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

