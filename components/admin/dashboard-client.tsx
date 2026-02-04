"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  FileText, 
  MessageSquare, 
  LogOut,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

interface Testimonial {
  id: string;
  patient_name: string;
  department: string;
  published: boolean;
  created_at: string;
}

interface AdminDashboardClientProps {
  user: User;
  initialBlogs: Blog[];
  initialTestimonials: Testimonial[];
}

export default function AdminDashboardClient({ 
  user, 
  initialBlogs, 
  initialTestimonials 
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    const supabase = createClient();
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    
    if (!error) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    const supabase = createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    
    if (!error) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Logged in as {user.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/admin/blog/new">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <PlusCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif">Add New Blog Post</CardTitle>
                <CardDescription>
                  Create health articles, tips, and updates for your patients
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/admin/testimonial/new">
            <Card className="hover:border-primary transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif">Add New Testimonial</CardTitle>
                <CardDescription>
                  Add patient testimonials and reviews to build trust
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Blogs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-serif flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Blog Posts
                </CardTitle>
                <CardDescription>Manage your published articles</CardDescription>
              </div>
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {blogs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No blog posts yet. Create your first one!
                </p>
              ) : (
                <div className="space-y-3">
                  {blogs.map((blog) => (
                    <div 
                      key={blog.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{blog.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(blog.created_at).toLocaleDateString()}
                          {!blog.published && (
                            <span className="ml-2 text-amber-600">(Draft)</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={`/blog/${blog.slug}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${blog.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteBlog(blog.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Testimonials */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-serif flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Testimonials
                </CardTitle>
                <CardDescription>Patient reviews and feedback</CardDescription>
              </div>
              <Link href="/admin/testimonials">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {testimonials.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No testimonials yet. Add your first one!
                </p>
              ) : (
                <div className="space-y-3">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{testimonial.patient_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.department} - {new Date(testimonial.created_at).toLocaleDateString()}
                          {!testimonial.published && (
                            <span className="ml-2 text-amber-600">(Draft)</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/testimonial/${testimonial.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => deleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
