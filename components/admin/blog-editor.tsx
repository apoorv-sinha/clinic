"use client";

import React from "react"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), {
  ssr: false,
  loading: () => <div className="h-[400px] border rounded-lg bg-muted/30 animate-pulse" />,
});

interface BlogEditorProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string | null;
    category: string;
    author_name: string;
    published: boolean;
  };
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    cover_image: initialData?.cover_image || "",
    category: initialData?.category || "General Health",
    author_name: initialData?.author_name || "Dr. Mom",
    published: initialData?.published ?? true,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const supabase = createClient();
    const fileName = `covers/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading cover image:", error);
      alert("Failed to upload image. Please try again.");
      setUploadingImage(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    setFormData(prev => ({ ...prev, cover_image: urlData.publicUrl }));
    setUploadingImage(false);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = true) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to publish.");
      setLoading(false);
      return;
    }

    const blogData = {
      ...formData,
      published: publish,
      author_id: user.id,
      slug: formData.slug || generateSlug(formData.title),
    };

    let error;

    if (initialData?.id) {
      const { error: updateError } = await supabase
        .from("blogs")
        .update(blogData)
        .eq("id", initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("blogs")
        .insert(blogData);
      error = insertError;
    }

    if (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-xl font-bold text-foreground">
              {initialData ? "Edit Blog Post" : "New Blog Post"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading || !formData.title}
            >
              Save Draft
            </Button>
            <Button
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading || !formData.title || !formData.content}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter blog post title..."
                className="text-lg h-12"
                required
              />
            </div>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.cover_image ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={formData.cover_image || "/placeholder.svg"}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, cover_image: "" }))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="aspect-video rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload cover image</p>
                      </>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                />
              </CardContent>
            </Card>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description for previews..."
              />
            </div>

            {/* Meta Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Health">General Health</SelectItem>
                    <SelectItem value="Women's Health">{"Women's Health"}</SelectItem>
                    <SelectItem value="Diabetes Care">Diabetes Care</SelectItem>
                    <SelectItem value="Respiratory Health">Respiratory Health</SelectItem>
                    <SelectItem value="Nutrition">Nutrition</SelectItem>
                    <SelectItem value="Wellness Tips">Wellness Tips</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Select
                  value={formData.author_name}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, author_name: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Mom">Dr. Mom (Gynaecologist)</SelectItem>
                    <SelectItem value="Dr. Dad">Dr. Dad (General Physician)</SelectItem>
                    <SelectItem value="HealthFirst Team">HealthFirst Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/blog/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
