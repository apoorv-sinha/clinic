import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: blog } = await supabase
    .from("blogs")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${blog.title} | HealthFirst Clinic Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!blog) {
    notFound();
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from("blogs")
    .select("id, title, slug, cover_image, category, created_at")
    .eq("published", true)
    .eq("category", blog.category)
    .neq("id", blog.id)
    .limit(3);

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative">
          {blog.cover_image ? (
            <div className="relative h-[40vh] md:h-[50vh]">
              <Image
                src={blog.cover_image || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          ) : (
            <div className="h-32 bg-gradient-to-b from-muted to-background" />
          )}
          
          <div className="container mx-auto px-4">
            <div className={`max-w-3xl mx-auto ${blog.cover_image ? "-mt-32 relative z-10" : "pt-8"}`}>
              <Link href="/blog">
                <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                {blog.category}
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <article 
                className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary transition-colors">
                      {post.cover_image && (
                        <div className="relative aspect-video">
                          <Image
                            src={post.cover_image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-xs font-medium text-primary">{post.category}</span>
                        <h3 className="font-serif font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Have Questions About This Topic?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our doctors are here to help. Book a consultation to discuss your health concerns.
            </p>
            <Link href="/#appointment">
              <Button size="lg">Book an Appointment</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
