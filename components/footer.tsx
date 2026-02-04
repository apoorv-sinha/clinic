import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                  HealthFirst
                </span>
                <span className="text-xs text-muted-foreground">Family Clinic</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Providing comprehensive healthcare with compassion and expertise for over 25 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
              <Link href="/testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Our Services</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Gynaecology</span>
              <span className="text-sm text-muted-foreground">Pulmonology</span>
              <span className="text-sm text-muted-foreground">Diabetes Care</span>
              <span className="text-sm text-muted-foreground">General Medicine</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:contact@healthfirst.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@healthfirst.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>123 Healthcare Avenue, Medical District, City - 110001</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthFirst Clinic. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer