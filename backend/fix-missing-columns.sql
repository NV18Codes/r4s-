-- Fix missing columns in Supabase database
-- Run this in Supabase SQL Editor

-- Add missing columns to inspections table
ALTER TABLE inspections 
ADD COLUMN IF NOT EXISTS original_image_url TEXT,
ADD COLUMN IF NOT EXISTS annotated_image_url TEXT,
ADD COLUMN IF NOT EXISTS image_filename VARCHAR(255),
ADD COLUMN IF NOT EXISTS crack_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS crack_severity VARCHAR(20) DEFAULT 'Low',
ADD COLUMN IF NOT EXISTS crack_data JSONB,
ADD COLUMN IF NOT EXISTS inspection_date TIMESTAMP WITH TIME ZONE;

-- Add missing column to spaces table
ALTER TABLE spaces 
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('road-images', 'road-images', true)
ON CONFLICT (id) DO NOTHING;

-- Grant permissions for storage
CREATE POLICY IF NOT EXISTS "Public read access for road images" ON storage.objects
FOR SELECT USING (bucket_id = 'road-images');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload road images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'road-images' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Users can update their own road images" ON storage.objects
FOR UPDATE USING (bucket_id = 'road-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY IF NOT EXISTS "Users can delete their own road images" ON storage.objects
FOR DELETE USING (bucket_id = 'road-images' AND auth.uid()::text = (storage.foldername(name))[1]);
