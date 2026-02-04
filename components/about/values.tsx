import { Heart, Shield, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "We believe healthcare is about people, not just procedures. Every patient receives the warmth and understanding they deserve.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "We maintain the highest ethical standards, ensuring transparent communication and honest medical advice.",
  },
  {
    icon: Users,
    title: "Patient Partnership",
    description: "We empower our patients with knowledge and involve them in every decision about their health.",
  },
  {
    icon: Sparkles,
    title: "Excellence Always",
    description: "We continuously update our skills and facilities to provide the best possible care using modern techniques.",
  },
];

export function Values() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Values</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Principles that guide our care
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            These core values define who we are and how we serve our patients every single day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
