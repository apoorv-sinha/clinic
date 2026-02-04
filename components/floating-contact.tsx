"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BD5A]"
        asChild
      >
        <a
          href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </a>
      </Button>
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
        asChild
      >
        <a href="tel:+919876543210" aria-label="Call us">
          <Phone className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
}
