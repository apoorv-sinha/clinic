"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, Award, Heart, Briefcase } from "lucide-react";

const doctors = [
  {
    id: "priya",
    name: "Dr. Priya Sharma",
    role: "Gynaecologist & Obstetrician",
    image: "/images/doctor-female.jpg",
    bio: "Dr. Priya Sharma is a renowned gynaecologist with over 25 years of experience in women's healthcare. Her expertise spans high-risk pregnancies, minimally invasive surgeries, and comprehensive prenatal care. She has delivered over 5,000 babies and is known for her compassionate approach to patient care.",
    education: [
      "MBBS - All India Institute of Medical Sciences, Delhi",
      "MD (Obstetrics & Gynaecology) - PGIMER, Chandigarh",
      "FRCOG - Royal College of Obstetricians, UK",
    ],
    achievements: [
      "Best Gynaecologist Award - Medical Association 2018",
      "Published 25+ research papers in international journals",
      "Regular speaker at national medical conferences",
    ],
    philosophy: "Every woman deserves to feel heard, respected, and cared for during every stage of her life. I believe in empowering my patients with knowledge and treating them as partners in their healthcare journey.",
  },
  {
    id: "rajesh",
    name: "Dr. Rajesh Sharma",
    role: "General Physician & Pulmonologist",
    image: "/images/doctor-male.jpg",
    bio: "Dr. Rajesh Sharma brings 28 years of medical expertise with specializations in pulmonology and diabetes management. His holistic approach combines modern medicine with lifestyle modifications, helping thousands of patients achieve better health outcomes.",
    education: [
      "MBBS - Maulana Azad Medical College, Delhi",
      "MD (Internal Medicine) - AIIMS, Delhi",
      "DM (Pulmonology) - PGIMER, Chandigarh",
    ],
    achievements: [
      "Excellence in Diabetes Care Award 2020",
      "Pioneer in telemedicine adoption during COVID-19",
      "Trained 100+ junior doctors over his career",
    ],
    philosophy: "Good health is not just the absence of disease—it's about living your best life. I work with my patients to understand their unique challenges and create sustainable solutions that fit their lifestyle.",
  },
];

export function DoctorProfiles() {
  const [activeDoctor, setActiveDoctor] = useState(doctors[0]);
  const [activeTab, setActiveTab] = useState<"bio" | "education" | "achievements" | "philosophy">("bio");

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Meet Our Doctors</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            The expertise behind your care
          </h2>
        </div>

        <div className="mt-12 lg:mt-16">
          {/* Doctor Selector */}
          <div className="flex justify-center gap-6 md:gap-12">
            {doctors.map((doctor) => (
              <button
                type="button"
                key={doctor.id}
                onClick={() => {
                  setActiveDoctor(doctor);
                  setActiveTab("bio");
                }}
                className={cn(
                  "group flex flex-col items-center gap-3 transition-all",
                  activeDoctor.id === doctor.id ? "scale-105" : "opacity-60 hover:opacity-100"
                )}
              >
                <div
                  className={cn(
                    "relative h-24 w-24 overflow-hidden rounded-full border-4 transition-all md:h-32 md:w-32",
                    activeDoctor.id === doctor.id ? "border-primary" : "border-transparent"
                  )}
                >
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{doctor.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Profile Content */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-lg lg:p-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {[
                { id: "bio", label: "Biography", icon: Briefcase },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "achievements", label: "Achievements", icon: Award },
                { id: "philosophy", label: "Philosophy", icon: Heart },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6 min-h-[200px] animate-in fade-in duration-300">
              {activeTab === "bio" && (
                <p className="text-lg leading-relaxed text-muted-foreground">{activeDoctor.bio}</p>
              )}

              {activeTab === "education" && (
                <ul className="space-y-4">
                  {activeDoctor.education.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "achievements" && (
                <ul className="space-y-4">
                  {activeDoctor.achievements.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Award className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "philosophy" && (
                <blockquote className="border-l-4 border-primary pl-6 text-lg italic leading-relaxed text-muted-foreground">
                  {'"'}{activeDoctor.philosophy}{'"'}
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
