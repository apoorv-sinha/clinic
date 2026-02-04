import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/dashboard-client";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  // Fetch recent blogs and testimonials
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <AdminDashboardClient 
      user={user} 
      initialBlogs={blogs || []} 
      initialTestimonials={testimonials || []} 
    />
  );
}
