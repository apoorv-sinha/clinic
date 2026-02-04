import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { DoctorsSection } from "@/components/sections/doctors";
import { TestimonialPreview } from "@/components/sections/testimonial-preview";
import { AppointmentSection } from "@/components/sections/appointment";
import { NewsletterSection } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <DoctorsSection />
        <TestimonialPreview />
        <AppointmentSection />
        <NewsletterSection />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
