import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Story</span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl text-balance">
              A legacy of care, built on trust
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Founded in 1999 by Dr. Priya Sharma and Dr. Rajesh Sharma, HealthFirst Clinic began as a small family practice with a big dream: to provide exceptional, patient-centered healthcare to our community.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Over 25 years later, we have grown into a multi-specialty clinic while maintaining the personal touch and dedication that defined our earliest days. Every patient who walks through our doors is treated like family.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/clinic-exterior.jpg"
                alt="HealthFirst Clinic building"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl border border-border bg-card p-6 shadow-lg">
              <p className="font-serif text-3xl font-bold text-primary">25+</p>
              <p className="text-sm text-muted-foreground">Years Serving Our Community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
