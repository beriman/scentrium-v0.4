-- Add 2FA columns to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_2fa_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS otp_secret VARCHAR(255);
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS otp_expires_at TIMESTAMPTZ;

-- Add publication for realtime
alter publication supabase_realtime add table users;