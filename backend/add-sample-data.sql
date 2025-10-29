-- Add sample data to fix organization issues
-- Run this in Supabase SQL Editor after running fix-missing-columns.sql

-- Insert sample organization
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

-- Insert sample spaces for the organization
INSERT INTO spaces (name, description, space_type, organization_id)
VALUES 
    ('Highway Section A', 'Main highway maintenance section', 'Highway', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('City Roads District 1', 'Urban road network', 'Urban', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('Rural Roads Zone', 'Rural road maintenance', 'Rural', '08de069f-4324-4fee-85f8-fb6d8a41b02f')
ON CONFLICT DO NOTHING;

-- Update user organization if needed
UPDATE users 
SET organization = 'Sample Road Authority'
WHERE organization IS NULL OR organization = '';
