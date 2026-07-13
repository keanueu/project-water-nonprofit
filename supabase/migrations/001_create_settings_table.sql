-- Create settings table for admin panel configuration
-- Run this in your Supabase SQL Editor to enable settings persistence

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Only service role can access settings (admin API routes use service role)
CREATE POLICY "Service role only" ON settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('organization', '{"name": "Project Water", "ein": "26-1455510", "email": "contact@projectwater.org", "phone": "+1 (603) 555-0123", "address": "17 Depot Street, 2nd Floor\nConcord, NH 03301\nUnited States"}'),
  ('notifications', '{"newDonations": true, "failedPayments": true, "campaignMilestones": true, "weeklyReports": true}')
ON CONFLICT (key) DO NOTHING;
