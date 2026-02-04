"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Managing Type 2 Diabetes: A Lifestyle Approach",
    excerpt: "Learn how diet, exercise, and lifestyle modifications can help you manage Type 2 diabetes effectively without relying solely on medication.",
    image: "/images/blog-diabetes.jpg",
    category: "Diabetes",
    author: "Dr. Rajesh Sharma",
    readTime: "6 min",
    date: "Jan 28, 2024",
  },
  {
    title: "Breathing Exercises for Better Lung Health",
    excerpt: "Simple breathing techniques that can improve your lung capacity, reduce stress, and help manage respiratory conditions.",
    image: "/images/blog-breathing.jpg",
    category: "Pulmonology",
    author: "Dr. Rajesh Sharma",
    readTime: "5 min",
    date: "Jan 20, 2024",
  },
  {
    title: "Understanding PCOS: Symptoms and Treatment Options",
    excerpt: "A comprehensive look at Polycystic Ovary Syndrome, its symptoms, diagnosis, and the various treatment approaches available.",
    image: "/images/hero-clinic.jpg",
    category: "Gynaecology",
    author: "Dr. Priya Sharma",
    readTime: "7 min",
    date: "Jan 15, 2024",
  },
  {
    title: "The Importance of Regular Health Check-ups",
    excerpt: "Why preventive health screenings are crucial for early detection and maintaining optimal health at every age.",
    image: "/images/clinic-exterior.jpg",
    category: "General Health",
    author: "Dr. Rajesh Sharma",
    readTime: "4 min",
    date: "Jan 10, 2024",
  },
  {
    title: "Preparing for Your First Pregnancy",
    excerpt: "Essential steps to take before conception to ensure a healthy pregnancy, from nutrition to lifestyle changes.",
    image: "/images/blog-pregnancy.jpg",
    category: "Gynaecology",
    author: "Dr. Priya Sharma",
    readTime: "6 min",
    date: "Jan 5, 2024",
  },
  {
    title: "Sleep Apnea: Signs You Shouldn't Ignore",
    excerpt: "Understanding the warning signs of sleep apnea and why seeking treatment is essential for your overall health.",
    image: "/images/blog-breathing.jpg",
    category: "Pulmonology",
    author: "Dr. Rajesh Sharma",
    readTime: "5 min",
    date: "Dec 28, 2023",
  },
];

const categories = [
  "All",
  "Gynaecology",
  "Pulmonology",
  "Diabetes",
  "General Health",
];

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

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
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
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
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="mt-3 font-serif text-lg font-semibold text-foreground line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
