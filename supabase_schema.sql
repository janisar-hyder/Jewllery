-- Run this in your Supabase SQL Editor

-- 1. Create the products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text,
  category text,
  price numeric NOT NULL DEFAULT 0,
  badge text,
  description text,
  images text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow public read access to everyone
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

-- 4. Create Policy: Allow all modifications (insert/update/delete) ONLY for authenticated users
CREATE POLICY "Enable modify access for authenticated users only" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Turn on Realtime for the products table
alter publication supabase_realtime add table products;

-- ==========================================
-- CREATE ADMIN USER IN AUTH.USERS DIRECTLY
-- ==========================================

-- 1. Insert into auth.users
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@sufrah.com',
  crypt('Asif-Sufrah-000', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) RETURNING id;

-- Note: Copy the generated 'id' from the query above.
-- Then, uncomment and run the following query replacing 'YOUR-NEW-USER-ID' with the copied ID:

INSERT INTO auth.identities (
  id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  '74c4c8ef-303b-498d-a2bb-f931f194d531',
  '74c4c8ef-303b-498d-a2bb-f931f194d531',
  format('{"sub":"%s","email":"admin@sufrah.com"}', '74c4c8ef-303b-498d-a2bb-f931f194d531')::jsonb,
  'email',
  now(),
  now(),
  now()
);
