-- COMPLETE DATABASE FIX FOR ROADSINTEL
-- Run this in Supabase SQL Editor to fix all issues

-- 1. Add missing columns to inspections table
DO $$ 
BEGIN
    -- Add original_image_url column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'original_image_url') THEN
        ALTER TABLE inspections ADD COLUMN original_image_url TEXT;
    END IF;
    
    -- Add annotated_image_url column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'annotated_image_url') THEN
        ALTER TABLE inspections ADD COLUMN annotated_image_url TEXT;
    END IF;
    
    -- Add image_filename column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'image_filename') THEN
        ALTER TABLE inspections ADD COLUMN image_filename VARCHAR(255);
    END IF;
    
    -- Add crack_count column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'crack_count') THEN
        ALTER TABLE inspections ADD COLUMN crack_count INTEGER DEFAULT 0;
    END IF;
    
    -- Add crack_severity column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'crack_severity') THEN
        ALTER TABLE inspections ADD COLUMN crack_severity VARCHAR(20) DEFAULT 'Low';
    END IF;
    
    -- Add crack_data column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'crack_data') THEN
        ALTER TABLE inspections ADD COLUMN crack_data JSONB;
    END IF;
    
    -- Add inspection_date column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'inspection_date') THEN
        ALTER TABLE inspections ADD COLUMN inspection_date TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 2. Add missing column to spaces table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'spaces' AND column_name = 'organization_id') THEN
        ALTER TABLE spaces ADD COLUMN organization_id UUID REFERENCES organizations(id);
    END IF;
END $$;

-- 3. Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('road-images', 'road-images', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Grant permissions for storage
DO $$ 
BEGIN
    -- Public read access
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public read access for road images') THEN
        CREATE POLICY "Public read access for road images" ON storage.objects
        FOR SELECT USING (bucket_id = 'road-images');
    END IF;
    
    -- Authenticated users can upload
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Authenticated users can upload road images') THEN
        CREATE POLICY "Authenticated users can upload road images" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'road-images' AND auth.role() = 'authenticated');
    END IF;
    
    -- Users can update their own images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Users can update their own road images') THEN
        CREATE POLICY "Users can update their own road images" ON storage.objects
        FOR UPDATE USING (bucket_id = 'road-images' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;
    
    -- Users can delete their own images
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Users can delete their own road images') THEN
        CREATE POLICY "Users can delete their own road images" ON storage.objects
        FOR DELETE USING (bucket_id = 'road-images' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;
END $$;

-- 5. Insert sample organization
INSERT INTO organizations (id, name, description, address, contact_email, contact_phone)
VALUES (
    '08de069f-4324-4fee-85f8-fb6d8a41b02f',
    'Sample Road Authority',
    'Main road maintenance organization',
    '123 Main Street, City',
    'contact@roadauthority.com',
    '+27 11 123 4567'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert sample spaces
INSERT INTO spaces (name, description, space_type, organization_id)
VALUES 
    ('Highway Section A', 'Main highway maintenance section', 'Highway', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('City Roads District 1', 'Urban road network', 'Urban', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('Rural Roads Zone', 'Rural road maintenance', 'Rural', '08de069f-4324-4fee-85f8-fb6d8a41b02f')
ON CONFLICT DO NOTHING;

-- 7. Update user organization if needed
UPDATE users 
SET organization = 'Sample Road Authority'
WHERE organization IS NULL OR organization = '';

-- Success message
SELECT 'Database schema fixed successfully! All columns added and sample data inserted.' as result;
