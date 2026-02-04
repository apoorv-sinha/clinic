import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author_name: string;
  created_at: string;
}

interface FeaturedPostProps {
  blog: Blog | null;
}

// Default featured post when no DB content
const defaultFeatured = {
  title: "Complete guide to a healthy pregnancy: What every expecting mother should know",
  slug: "healthy-pregnancy-guide",
  excerpt: "Pregnancy is a beautiful journey that requires proper care and attention. In this comprehensive guide, Dr. Mom shares essential tips for prenatal nutrition, exercise, common concerns, and preparing for delivery.",
  cover_image: "/images/blog-pregnancy.jpg",
  category: "Women's Health",
  author_name: "Dr. Mom",
  content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export function FeaturedPost({ blog }: FeaturedPostProps) {
  const post = blog || defaultFeatured;
  const readingTime = Math.ceil((post.content?.split(/\s+/).length || 200) / 200);

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">Featured Article</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg:min-h-[400px]">
            <Image
              src={post.cover_image || "/images/blog-pregnancy.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author_name}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>

            <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl text-balance">
              {post.title}
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-6">
              <Button className="gap-2" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Read Full Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
