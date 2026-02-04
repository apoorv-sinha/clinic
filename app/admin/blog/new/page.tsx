import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BlogEditor from "@/components/admin/blog-editor";

export default async function NewBlogPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  return <BlogEditor />;
}
