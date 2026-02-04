import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TestimonialEditor from "@/components/admin/testimonial-editor";

export default async function NewTestimonialPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  return <TestimonialEditor />;
}
