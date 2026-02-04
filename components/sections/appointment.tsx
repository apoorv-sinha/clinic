"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Phone, MapPin, CheckCircle } from "lucide-react";

export function AppointmentSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="appointment" className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Book An Appointment</span>
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl text-balance">
              Schedule your visit today
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Take the first step towards better health. Book an appointment with our specialists and receive personalized care tailored to your needs.
            </p>

            <div className="mt-4 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Working Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: 10:00 AM - 2:00 PM (Emergencies)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Contact Numbers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Appointments: +91 98765 43210</p>
                  <p className="text-sm text-muted-foreground">Emergency: +91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Clinic Location</h3>
                  <p className="mt-1 text-sm text-muted-foreground">123 Healthcare Avenue,</p>
                  <p className="text-sm text-muted-foreground">Medical District, City - 110001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground">We have received your appointment request. Our team will contact you shortly to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gynaecology">Gynaecology</SelectItem>
                        <SelectItem value="pulmonology">Pulmonology</SelectItem>
                        <SelectItem value="diabetes">Diabetes Care</SelectItem>
                        <SelectItem value="general">General Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your symptoms or reason for visit..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="mt-2 gap-2">
                  <Calendar className="h-5 w-5" />
                  Request Appointment
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy. We will contact you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
