"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, User, ArrowRight } from "lucide-react";

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

// Fallback static posts for when DB is empty
const staticBlogPosts = [
  {
    id: "static-1",
    title: "Managing Type 2 Diabetes: A Lifestyle Approach",
    slug: "managing-type-2-diabetes",
    excerpt: "Learn how diet, exercise, and lifestyle modifications can help you manage Type 2 diabetes effectively without relying solely on medication.",
    content: "",
    cover_image: "/images/blog-diabetes.jpg",
    category: "Diabetes Care",
    author_name: "Dr. Dad",
    created_at: new Date().toISOString(),
  },
  {
    id: "static-2",
    title: "Breathing Exercises for Better Lung Health",
    slug: "breathing-exercises-lung-health",
    excerpt: "Simple breathing techniques that can improve your lung capacity, reduce stress, and help manage respiratory conditions.",
    content: "",
    cover_image: "/images/blog-breathing.jpg",
    category: "Respiratory Health",
    author_name: "Dr. Dad",
    created_at: new Date().toISOString(),
  },
  {
    id: "static-3",
    title: "Understanding PCOS: Symptoms and Treatment Options",
    slug: "understanding-pcos",
    excerpt: "A comprehensive look at Polycystic Ovary Syndrome, its symptoms, diagnosis, and the various treatment approaches available.",
    content: "",
    cover_image: "/images/hero-clinic.jpg",
    category: "Women's Health",
    author_name: "Dr. Mom",
    created_at: new Date().toISOString(),
  },
  {
    id: "static-4",
    title: "The Importance of Regular Health Check-ups",
    slug: "importance-health-checkups",
    excerpt: "Why preventive health screenings are crucial for early detection and maintaining optimal health at every age.",
    content: "",
    cover_image: "/images/clinic-exterior.jpg",
    category: "General Health",
    author_name: "Dr. Dad",
    created_at: new Date().toISOString(),
  },
  {
    id: "static-5",
    title: "Preparing for Your First Pregnancy",
    slug: "preparing-first-pregnancy",
    excerpt: "Essential steps to take before conception to ensure a healthy pregnancy, from nutrition to lifestyle changes.",
    content: "",
    cover_image: "/images/blog-pregnancy.jpg",
    category: "Women's Health",
    author_name: "Dr. Mom",
    created_at: new Date().toISOString(),
  },
];

const categories = [
  "All",
  "Women's Health",
  "Respiratory Health",
  "Diabetes Care",
  "General Health",
];

interface BlogGridDynamicProps {
  blogs: Blog[];
}

export function BlogGridDynamic({ blogs }: BlogGridDynamicProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Use DB blogs if available, otherwise show static posts
  const allPosts = blogs.length > 0 ? blogs : staticBlogPosts;

  const filteredPosts = activeCategory === "All"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  const calculateReadTime = (content: string) => {
    const wordCount = content?.split(/\s+/).length || 0;
    return `${Math.max(1, Math.ceil(wordCount / 200))} min`;
  };

  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Latest Articles
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-card/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.cover_image || "/images/hero-clinic.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {calculateReadTime(post.content)}
                  </span>
                </div>
                
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="mt-10 text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
