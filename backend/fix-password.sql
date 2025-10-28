-- Fix the password hashes in Supabase
-- Run this in Supabase SQL Editor

-- The correct bcrypt hash for password 'password' is:
UPDATE users 
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'admin@roadsintel.com';

UPDATE users 
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE email = 'inspector@roadsintel.com';

-- Or if users don't exist, create them:
INSERT INTO users (email, password, first_name, last_name, role, organization, phone_number, address) 
VALUES
('admin@roadsintel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', 'Admin', 'RoadsIntel', '1234567890', 'Admin Address')
ON CONFLICT (email) DO UPDATE SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

INSERT INTO users (email, password, first_name, last_name, role, organization, phone_number, address) 
VALUES
('inspector@roadsintel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John', 'Inspector', 'Inspector', 'RoadsIntel', '1234567891/ph', 'Inspector Address')
ON CONFLICT (email) DO UPDATE SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

-- Password for both users is: password
