-- UPDATE SOUTH AFRICAN ROAD AUTHORITIES AND FREEWAYS
-- Run this in Supabase SQL Editor to update with correct SA road names

-- 1. Update organizations with proper South African road authorities
UPDATE organizations 
SET 
    name = 'SANRAL',
    description = 'South African National Roads Agency Limited',
    address = '48 Tambotie Avenue, Val de Grace, Pretoria, 0184',
    contact_email = 'info@sanral.co.za',
    contact_phone = '+27 12 426 6200'
WHERE id = '08de069f-4324-4fee-85f8-fb6d8a41b02f';

-- 2. Add JRA (Johannesburg Roads Agency)
INSERT INTO organizations (id, name, description, address, contact_email, contact_phone)
VALUES (
    'jra-org-id-001',
    'JRA',
    'Johannesburg Roads Agency',
    '66 Pixley Seme Street, Johannesburg, 2001',
    'info@jra.org.za',
    '+27 11 298 5000'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Add RTMC (Road Traffic Management Corporation)
INSERT INTO organizations (id, name, description, address, contact_email, contact_phone)
VALUES (
    'rtmc-org-id-001',
    'RTMC',
    'Road Traffic Management Corporation',
    '238 Oak Avenue, Randburg, 2194',
    'info@rtmc.co.za',
    '+27 11 789 2000'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Update spaces with proper South African freeway names
UPDATE spaces 
SET 
    name = 'Freeway N12',
    description = 'N12 Freeway maintenance section',
    space_type = 'Freeway'
WHERE name = 'Highway Section A' AND organization_id = '08de069f-4324-4fee-85f8-fb6d8a41b02f';

UPDATE spaces 
SET 
    name = 'Freeway N3',
    description = 'N3 Freeway maintenance section',
    space_type = 'Freeway'
WHERE name = 'City Roads District 1' AND organization_id = '08de069f-4324-4fee-85f8-fb6d8a41b02f';

UPDATE spaces 
SET 
    name = 'Freeway M2',
    description = 'M2 Freeway maintenance section',
    space_type = 'Freeway'
WHERE name = 'Rural Roads Zone' AND organization_id = '08de069f-4324-4fee-85f8-fb6d8a41b02f';

-- 5. Add additional freeways for SANRAL
INSERT INTO spaces (name, description, space_type, organization_id)
VALUES 
    ('Freeway M3', 'M3 Freeway maintenance section', 'Freeway', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('R55', 'R55 Regional road maintenance', 'Regional', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('N1', 'N1 Freeway maintenance section', 'Freeway', '08de069f-4324-4fee-85f8-fb6d8a41b02f'),
    ('N2', 'N2 Freeway maintenance section', 'Freeway', '08de069f-4324-4fee-85f8-fb6d8a41b02f')
ON CONFLICT DO NOTHING;

-- 6. Add spaces for JRA
INSERT INTO spaces (name, description, space_type, organization_id)
VALUES 
    ('M1 Freeway', 'M1 Freeway Johannesburg section', 'Freeway', 'jra-org-id-001'),
    ('M2 Freeway', 'M2 Freeway Johannesburg section', 'Freeway', 'jra-org-id-001'),
    ('R24', 'R24 Regional road Johannesburg', 'Regional', 'jra-org-id-001'),
    ('R21', 'R21 Regional road Johannesburg', 'Regional', 'jra-org-id-001')
ON CONFLICT DO NOTHING;

-- 7. Add spaces for RTMC
INSERT INTO spaces (name, description, space_type, organization_id)
VALUES 
    ('Traffic Management N1', 'N1 Traffic management section', 'Traffic', 'rtmc-org-id-001'),
    ('Traffic Management N3', 'N3 Traffic management section', 'Traffic', 'rtmc-org-id-001'),
    ('Traffic Management M1', 'M1 Traffic management section', 'Traffic', 'rtmc-org-id-001')
ON CONFLICT DO NOTHING;

-- 8. Update user organization references
UPDATE users 
SET organization = 'SANRAL'
WHERE organization = 'Sample Road Authority';

-- Success message
SELECT 'South African road authorities and freeways updated successfully!' as result;
