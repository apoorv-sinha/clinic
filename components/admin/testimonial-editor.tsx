"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Star } from "lucide-react";
import Link from "next/link";

interface TestimonialEditorProps {
  initialData?: {
    id: string;
    patient_name: string;
    patient_initials: string;
    testimonial_text: string;
    rating: number;
    department: string;
    treatment_type: string;
    published: boolean;
  };
}

export default function TestimonialEditor({ initialData }: TestimonialEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    patient_name: initialData?.patient_name || "",
    patient_initials: initialData?.patient_initials || "",
    testimonial_text: initialData?.testimonial_text || "",
    rating: initialData?.rating || 5,
    department: initialData?.department || "General Medicine",
    treatment_type: initialData?.treatment_type || "",
    published: initialData?.published ?? true,
  });

  const generateInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      patient_name: name,
      patient_initials: prev.patient_initials || generateInitials(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = true) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to save.");
      setLoading(false);
      return;
    }

    const testimonialData = {
      ...formData,
      published: publish,
      author_id: user.id,
      patient_initials: formData.patient_initials || generateInitials(formData.patient_name),
    };

    let error;

    if (initialData?.id) {
      const { error: updateError } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("testimonials")
        .insert(testimonialData);
      error = insertError;
    }

    if (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-xl font-bold text-foreground">
              {initialData ? "Edit Testimonial" : "New Testimonial"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading || !formData.patient_name}
            >
              Save Draft
            </Button>
            <Button
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading || !formData.patient_name || !formData.testimonial_text}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patient_name">Patient Name</Label>
              <Input
                id="patient_name"
                value={formData.patient_name}
                onChange={handleNameChange}
                placeholder="Enter patient name..."
                required
              />
              <p className="text-xs text-muted-foreground">
                For privacy, only initials will be shown publicly
              </p>
            </div>

            {/* Patient Initials */}
            <div className="space-y-2">
              <Label htmlFor="patient_initials">Display Initials</Label>
              <Input
                id="patient_initials"
                value={formData.patient_initials}
                onChange={(e) => setFormData(prev => ({ ...prev, patient_initials: e.target.value.toUpperCase() }))}
                placeholder="AB"
                maxLength={3}
                className="w-24"
              />
            </div>

            {/* Department & Treatment */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Gynaecology">Gynaecology</SelectItem>
                    <SelectItem value="Pulmonology">Pulmonology</SelectItem>
                    <SelectItem value="Diabetes Care">Diabetes Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment_type">Treatment Type (Optional)</Label>
                <Input
                  id="treatment_type"
                  value={formData.treatment_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, treatment_type: e.target.value }))}
                  placeholder="e.g., Prenatal Care"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="space-y-2">
              <Label htmlFor="testimonial_text">Testimonial</Label>
              <Textarea
                id="testimonial_text"
                value={formData.testimonial_text}
                onChange={(e) => setFormData(prev => ({ ...prev, testimonial_text: e.target.value }))}
                placeholder="Enter the patient's testimonial..."
                rows={6}
                required
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
