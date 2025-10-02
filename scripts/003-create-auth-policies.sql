-- Row Level Security (RLS) policies for secure data access
-- Run this after connecting Supabase to enable proper security

-- Enable RLS on all tables
ALTER TABLE user_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamification_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
-- Admin users can view all analytics data

-- Policy for user_metrics
CREATE POLICY "Admin users can view all user metrics"
ON user_metrics
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM admin_users
  )
);

-- Policy for feature_usage
CREATE POLICY "Admin users can view all feature usage"
ON feature_usage
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM admin_users
  )
);

-- Policy for gamification_data
CREATE POLICY "Admin users can view all gamification data"
ON gamification_data
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM admin_users
  )
);

-- Policy for user_activities
CREATE POLICY "Admin users can view all user activities"
ON user_activities
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM admin_users
  )
);

-- Create admin_users table to manage who can access the dashboard
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO admin_users (email) VALUES ('admin@youmatter.com');

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can view admin list
CREATE POLICY "Admins can view admin list"
ON admin_users
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    SELECT email FROM admin_users
  )
);
