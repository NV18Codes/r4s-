-- RoadsIntel Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  organization VARCHAR(255),
  phone_number VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Spaces table
CREATE TABLE spaces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  space_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Assets table
CREATE TABLE assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  asset_type VARCHAR(100),
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Inspections table
CREATE TABLE inspections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  inspector VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Scheduled',
  image_path VARCHAR(500),
  original_name VARCHAR(255),
  crack_count INTEGER DEFAULT 0,
  severity VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Work Orders table
CREATE TABLE work_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  inspection_id UUID REFERENCES inspections(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(50) DEFAULT 'Open',
  assigned_to VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Asset Types table
CREATE TABLE asset_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Checklists table
CREATE TABLE checklists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Properties table
CREATE TABLE properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  property_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_inspections_status ON inspections(status);
CREATE INDEX idx_work_orders_status ON work_orders(status);
CREATE INDEX idx_work_orders_priority ON work_orders(priority);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (allow all for now - customize as needed)
CREATE POLICY "Allow all operations for authenticated users" ON users
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON organizations
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON spaces
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON assets
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON inspections
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON work_orders
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON asset_types
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON checklists
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON properties
  FOR ALL USING (true);

-- Insert sample data
INSERT INTO users (email, password, first_name, last_name, role, organization, phone_number, address) VALUES
('admin@roadsintel.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'Admin', 'RoadsIntel', '1234567890', 'Admin Address'),
('inspector@roadsintel.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Inspector', 'Inspector', 'RoadsIntel', '1234567891', 'Inspector Address');

-- Note: The password hash above is for 'password' - change this in production!
