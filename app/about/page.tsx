import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";
import { AboutHero } from "@/components/about/about-hero";
import { Timeline } from "@/components/about/timeline";
import { DoctorProfiles } from "@/components/about/doctor-profiles";
import { Values } from "@/components/about/values";
import { ClinicTour } from "@/components/about/clinic-tour";

export const metadata: Metadata = {
  title: "About Us | HealthFirst Clinic",
  description: "Learn about our experienced medical team, our journey, and our commitment to exceptional healthcare.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <Timeline />
        <DoctorProfiles />
        <Values />
        <ClinicTour />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
