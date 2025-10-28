-- Updated Supabase Schema for RoadsIntel with Image Storage
-- Run this in Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'Inspector',
    organization VARCHAR(255),
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spaces table
CREATE TABLE IF NOT EXISTS spaces (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    space_type VARCHAR(100),
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create asset_types table
CREATE TABLE IF NOT EXISTS asset_types (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    asset_type_id UUID REFERENCES asset_types(id),
    space_id UUID REFERENCES spaces(id),
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inspections table with image storage
CREATE TABLE IF NOT EXISTS inspections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    inspector VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Scheduled',
    
    -- Image storage fields
    original_image_url TEXT,
    annotated_image_url TEXT,
    image_filename VARCHAR(255),
    
    -- Crack detection results
    crack_count INTEGER DEFAULT 0,
    crack_severity VARCHAR(20) DEFAULT 'Low',
    crack_data JSONB, -- Store crack coordinates and details
    
    -- Additional fields
    inspection_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Create work_orders table
CREATE TABLE IF NOT EXISTS work_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    inspection_id UUID REFERENCES inspections(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'Medium',
    status VARCHAR(50) DEFAULT 'Open',
    assigned_to VARCHAR(255),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Create checklists table
CREATE TABLE IF NOT EXISTS checklists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    items JSONB, -- Store checklist items as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    property_type VARCHAR(100),
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
CREATE POLICY "Enable all operations for all users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON organizations FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON spaces FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON asset_types FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON assets FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON inspections FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON work_orders FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON checklists FOR ALL USING (true);
CREATE POLICY "Enable all operations for all users" ON properties FOR ALL USING (true);

-- Insert sample data
INSERT INTO users (email, password, first_name, last_name, role, organization) VALUES
('admin@roadsintel.com', '$2a$10$eBuLzOs7o3HrhSKb86DD/uKd3LVtoH1GcS7jYoksWNvLxmBrxg.G6', 'Admin', 'User', 'Admin', 'RoadsIntel'),
('inspector@roadsintel.com', '$2a$10$eBuLzOs7o3HrhSKb86DD/uKd3LVtoH1GcS7jYoksWNvLxmBrxg.G6', 'Inspector', 'User', 'Inspector', 'RoadsIntel')
ON CONFLICT (email) DO NOTHING;

INSERT INTO organizations (name, description, contact_email) VALUES
('RoadsIntel Corporation', 'Leading road inspection technology company', 'contact@roadsintel.com')
ON CONFLICT (name) DO NOTHING;

INSERT INTO asset_types (name, description) VALUES
('Road Surface', 'Asphalt and concrete road surfaces'),
('Bridge', 'Bridge structures and components'),
('Signage', 'Road signs and traffic control devices')
ON CONFLICT DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('road-images', 'road-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'road-images');
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'road-images');
CREATE POLICY "Allow public updates" ON storage.objects FOR UPDATE USING (bucket_id = 'road-images');
CREATE POLICY "Allow public deletes" ON storage.objects FOR DELETE USING (bucket_id = 'road-images');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON spaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inspections_updated_at BEFORE UPDATE ON inspections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON work_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_checklists_updated_at BEFORE UPDATE ON checklists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
