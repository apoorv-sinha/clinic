import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg lg:p-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
            Ready to experience the difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join thousands of satisfied patients who trust HealthFirst for their healthcare needs. Book your appointment today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/#appointment">
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a
                href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
