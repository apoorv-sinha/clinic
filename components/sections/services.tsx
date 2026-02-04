import { Heart, Stethoscope, Activity, Pill } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Gynaecology",
    description: "Comprehensive women's health services including prenatal care, routine check-ups, and specialized treatments for all stages of life.",
    features: ["Prenatal & Postnatal Care", "Routine Health Screenings", "Family Planning", "Menopause Management"],
  },
  {
    icon: Activity,
    title: "Pulmonology",
    description: "Expert respiratory care for conditions like asthma, COPD, sleep disorders, and other lung-related issues.",
    features: ["Asthma Management", "COPD Treatment", "Sleep Apnea Care", "Pulmonary Function Tests"],
  },
  {
    icon: Pill,
    title: "Diabetes Care",
    description: "Personalized diabetes management programs focusing on lifestyle, medication, and continuous monitoring.",
    features: ["Type 1 & 2 Management", "Insulin Therapy", "Diet & Lifestyle Guidance", "Complication Prevention"],
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Primary healthcare services for all ages, from routine check-ups to managing chronic conditions.",
    features: ["Routine Check-ups", "Preventive Care", "Chronic Disease Management", "Health Screenings"],
  },
];

export function ServicesSection() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Specialties</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Comprehensive healthcare for your entire family
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From specialized treatments to routine care, we provide a full spectrum of medical services.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
