-- Create a default admin user inside the auth.users table
INSERT INTO auth.users (
  id, 
  instance_id, 
  role, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  raw_app_meta_data, 
  raw_user_meta_data, 
  created_at, 
  updated_at,
  aud
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'admin@nooritransport.in',
  crypt('NooriAdminSecurePass2026!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Seed this email into the public admin_emails table so the trigger matches it
INSERT INTO public.admin_emails (email) 
VALUES ('admin@nooritransport.in') 
ON CONFLICT (email) DO NOTHING;
