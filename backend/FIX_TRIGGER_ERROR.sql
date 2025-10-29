-- FIX TRIGGER ERROR: Add missing updated_at columns
-- Run this in Supabase SQL Editor to fix the trigger error

-- 1. Add missing updated_at columns to all tables
DO $$ 
BEGIN
    -- Add updated_at to users table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_at') THEN
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to organizations table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'organizations' AND column_name = 'updated_at') THEN
        ALTER TABLE organizations ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to spaces table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'spaces' AND column_name = 'updated_at') THEN
        ALTER TABLE spaces ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to asset_types table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'asset_types' AND column_name = 'updated_at') THEN
        ALTER TABLE asset_types ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to assets table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assets' AND column_name = 'updated_at') THEN
        ALTER TABLE assets ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to inspections table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inspections' AND column_name = 'updated_at') THEN
        ALTER TABLE inspections ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to work_orders table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'work_orders' AND column_name = 'updated_at') THEN
        ALTER TABLE work_orders ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to checklists table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'checklists' AND column_name = 'updated_at') THEN
        ALTER TABLE checklists ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at to properties table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'updated_at') THEN
        ALTER TABLE properties ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- 2. Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
DROP TRIGGER IF EXISTS update_spaces_updated_at ON spaces;
DROP TRIGGER IF EXISTS update_assets_updated_at ON assets;
DROP TRIGGER IF EXISTS update_inspections_updated_at ON inspections;
DROP TRIGGER IF EXISTS update_work_orders_updated_at ON work_orders;
DROP TRIGGER IF EXISTS update_checklists_updated_at ON checklists;
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;

-- 3. Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if updated_at column exists before trying to update it
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = TG_TABLE_NAME AND column_name = 'updated_at') THEN
        NEW.updated_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Recreate triggers for tables that have updated_at columns
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON organizations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spaces_updated_at 
    BEFORE UPDATE ON spaces 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at 
    BEFORE UPDATE ON assets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inspections_updated_at 
    BEFORE UPDATE ON inspections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_orders_updated_at 
    BEFORE UPDATE ON work_orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklists_updated_at 
    BEFORE UPDATE ON checklists 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at 
    BEFORE UPDATE ON properties 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Trigger error fixed! All updated_at columns added and triggers recreated.' as result;
