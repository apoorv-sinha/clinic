import { Droplets, Moon, Apple, Activity } from "lucide-react";

const tips = [
  {
    icon: Droplets,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily. Proper hydration supports all bodily functions and helps maintain energy levels.",
  },
  {
    icon: Moon,
    title: "Quality Sleep",
    description: "Aim for 7-8 hours of quality sleep. Good sleep is essential for immune function, mental clarity, and overall health.",
  },
  {
    icon: Apple,
    title: "Balanced Nutrition",
    description: "Eat a variety of whole foods, including plenty of fruits, vegetables, lean proteins, and whole grains.",
  },
  {
    icon: Activity,
    title: "Regular Exercise",
    description: "Get at least 30 minutes of moderate physical activity most days. Exercise benefits both body and mind.",
  },
];

export function HealthTips() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Daily Wellness</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Quick health tips from our doctors
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <tip.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
