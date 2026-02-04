-- Create storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload images
create policy "Allow authenticated uploads"
on storage.objects for insert
to authenticated
with check (bucket_id = 'blog-images');

-- Allow public read access to blog images
create policy "Allow public read access"
on storage.objects for select
to public
using (bucket_id = 'blog-images');

-- Allow authenticated users to delete their own uploads
create policy "Allow authenticated deletes"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-images');
