"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Bell } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
            <Mail className="h-7 w-7 text-primary-foreground" />
          </div>
          
          <h2 className="font-serif text-3xl font-semibold text-primary-foreground md:text-4xl">
            Subscribe to our newsletter
          </h2>
          
          <p className="mt-4 text-lg text-primary-foreground/80">
            Get the latest health tips, clinic updates, and exclusive wellness content delivered straight to your inbox. No spam, just valuable insights.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-3 text-primary-foreground">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 sm:max-w-sm"
              />
              <Button type="submit" variant="secondary" size="lg" className="h-12 gap-2">
                <Bell className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-sm text-primary-foreground/60">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
