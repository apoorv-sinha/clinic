-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'General',
  author TEXT DEFAULT 'Dr. Team',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  department TEXT DEFAULT 'General Medicine',
  initials TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_emails table to whitelist admin users
CREATE TABLE IF NOT EXISTS public.admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Anyone can read published blogs" ON public.blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Anyone can read published testimonials" ON public.testimonials
  FOR SELECT USING (published = true);

-- Admin policies - admins can do everything
-- Check if user email is in admin_emails table
CREATE POLICY "Admins can read all blogs" ON public.blogs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can insert blogs" ON public.blogs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update blogs" ON public.blogs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete blogs" ON public.blogs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Same for testimonials
CREATE POLICY "Admins can read all testimonials" ON public.testimonials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can update testimonials" ON public.testimonials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Admins can delete testimonials" ON public.testimonials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Admin emails table - only admins can read
CREATE POLICY "Admins can read admin_emails" ON public.admin_emails
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_emails ae
      WHERE ae.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_department ON public.testimonials(department);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blogs updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
