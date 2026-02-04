import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import BlogEditor from "@/components/admin/blog-editor";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (!blog) {
    notFound();
  }

  return <BlogEditor initialData={blog} />;
}
