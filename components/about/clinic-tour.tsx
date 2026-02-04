import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export function ClinicTour() {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <MapPin className="h-12 w-12 text-primary-foreground/80" />
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl text-balance">
            Visit our state-of-the-art facility
          </h2>
          <p className="max-w-xl text-lg text-primary-foreground/80">
            We invite you to experience our modern clinic firsthand. Schedule a visit to meet our team and see our facilities before your first appointment.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="/#appointment">
                <Calendar className="h-5 w-5" />
                Book a Visit
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a
                href="https://maps.google.com/?q=123+Healthcare+Avenue"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
