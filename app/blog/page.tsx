import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";
import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogGridDynamic } from "@/components/blog/blog-grid-dynamic";
import { NewsletterSignup } from "@/components/blog/newsletter-signup";
import { HealthTips } from "@/components/blog/health-tips";

export const metadata: Metadata = {
  title: "Health Blog & Newsletter | HealthFirst Clinic",
  description: "Expert health tips, medical insights, and wellness advice from our experienced doctors.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const featuredBlog = blogs?.[0] || null;
  const remainingBlogs = blogs?.slice(1) || [];

  return (
    <>
      <Header />
      <main>
        <BlogHero />
        <FeaturedPost blog={featuredBlog} />
        <BlogGridDynamic blogs={remainingBlogs} />
        <NewsletterSignup />
        <HealthTips />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
