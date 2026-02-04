export function TestimonialsHero() {
    return (
      <section className="bg-secondary py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Patient Stories</span>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl text-balance">
              Real experiences from real patients
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our greatest reward is the trust our patients place in us. Here are some of their stories and experiences with HealthFirst Clinic.
            </p>
            
            {/* Rating Summary */}
            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border bg-card px-6 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">4.9/5</span>
              <span className="text-muted-foreground">from 500+ reviews</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  