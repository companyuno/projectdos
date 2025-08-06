-- Create storage bucket for thesis uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'thesis-uploads',
  'thesis-uploads',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/ogg']
) ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'thesis-uploads' AND
  auth.role() = 'authenticated'
);

-- Create policy to allow public downloads
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT USING (
  bucket_id = 'thesis-uploads'
); 

-- Create storage bucket for startup submission files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('startup-submissions', 'startup-submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload startup submission files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'startup-submissions' 
    AND auth.uid() IS NOT NULL
  );

-- Allow public access to view uploaded files
CREATE POLICY "Allow public access to startup submission files" ON storage.objects
  FOR SELECT USING (bucket_id = 'startup-submissions');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update startup submission files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'startup-submissions' 
    AND auth.uid() IS NOT NULL
  );

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete startup submission files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'startup-submissions' 
    AND auth.uid() IS NOT NULL
  ); 