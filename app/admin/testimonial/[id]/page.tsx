import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import TestimonialEditor from "@/components/admin/testimonial-editor";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!testimonial) {
    notFound();
  }

  return <TestimonialEditor initialData={testimonial} />;
}
