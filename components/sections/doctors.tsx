import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Priya Sharma",
    role: "Gynaecologist & Obstetrician",
    image: "/images/doctor-female.jpg",
    qualifications: "MBBS, MD (Obs & Gyn), FRCOG",
    experience: "25+ years experience",
    specialties: ["High-Risk Pregnancy", "Minimally Invasive Surgery", "Infertility"],
  },
  {
    name: "Dr. Rajesh Sharma",
    role: "General Physician & Pulmonologist",
    image: "/images/doctor-male.jpg",
    qualifications: "MBBS, MD (Medicine), DM (Pulmonology)",
    experience: "28+ years experience",
    specialties: ["Diabetes Management", "Respiratory Care", "Preventive Medicine"],
  },
];

export function DoctorsSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Meet Our Doctors</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Experienced specialists dedicated to your care
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our team brings together decades of expertise in multiple medical specialties.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:gap-12">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground">{doctor.name}</h3>
                <p className="mt-1 text-base font-medium text-primary">{doctor.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{doctor.qualifications}</p>
                <p className="text-sm font-medium text-accent">{doctor.experience}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
            <Link href="/about">
              Learn More About Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
