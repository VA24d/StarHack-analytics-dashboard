-- Seed data for testing the dashboard
-- Run this after creating tables

-- Insert sample users
INSERT INTO users (id, email, name, created_at, last_active) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'sarah.johnson@example.com', 'Sarah Johnson', NOW() - INTERVAL '60 days', NOW() - INTERVAL '2 minutes'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'michael.chen@example.com', 'Michael Chen', NOW() - INTERVAL '55 days', NOW() - INTERVAL '5 minutes'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'emily.rodriguez@example.com', 'Emily Rodriguez', NOW() - INTERVAL '50 days', NOW() - INTERVAL '12 minutes'),
  ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'david.kim@example.com', 'David Kim', NOW() - INTERVAL '45 days', NOW() - INTERVAL '18 minutes'),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'jessica.taylor@example.com', 'Jessica Taylor', NOW() - INTERVAL '40 days', NOW() - INTERVAL '25 minutes'),
  ('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'alex.martinez@example.com', 'Alex Martinez', NOW() - INTERVAL '35 days', NOW() - INTERVAL '32 minutes')
ON CONFLICT (email) DO NOTHING;

-- Insert daily metrics for the last 8 weeks
INSERT INTO daily_metrics (date, dau, mau, downloads, feature_adoption_rate) VALUES
  (CURRENT_DATE - INTERVAL '56 days', 12400, 45000, 8500, 45.5),
  (CURRENT_DATE - INTERVAL '49 days', 14200, 48500, 9200, 48.2),
  (CURRENT_DATE - INTERVAL '42 days', 15800, 52000, 10100, 51.8),
  (CURRENT_DATE - INTERVAL '35 days', 17600, 56200, 11300, 54.6),
  (CURRENT_DATE - INTERVAL '28 days', 19200, 61000, 12600, 57.3),
  (CURRENT_DATE - INTERVAL '21 days', 21500, 66500, 13900, 59.8),
  (CURRENT_DATE - INTERVAL '14 days', 23800, 72000, 14800, 61.2),
  (CURRENT_DATE - INTERVAL '7 days', 26400, 78500, 15300, 62.0)
ON CONFLICT (date) DO NOTHING;

-- Insert gamification metrics
INSERT INTO gamification_metrics (date, active_challenges, achievements_unlocked, rewards_claimed, streak_participants) VALUES
  (CURRENT_DATE, 47, 12845, 8932, 5621)
ON CONFLICT (date) DO NOTHING;

-- Insert sample challenges
INSERT INTO challenges (name, description, category, points, active) VALUES
  ('30-Day Wellness Challenge', 'Complete daily wellness activities for 30 days', 'Health', 500, true),
  ('Mindful Meditation', 'Practice meditation for 7 consecutive days', 'Wellness', 200, true),
  ('Fitness Warrior', 'Log 20 workout sessions', 'Fitness', 300, true),
  ('Healthy Eating Streak', 'Track healthy meals for 14 days', 'Nutrition', 250, true)
ON CONFLICT DO NOTHING;

-- Insert recent user activities
INSERT INTO user_activities (user_id, user_name, action, category, activity_type, created_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sarah Johnson', 'Completed "30-Day Wellness Challenge"', 'Health', 'achievement', NOW() - INTERVAL '2 minutes'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Michael Chen', 'Unlocked "Fitness Warrior" badge', 'Achievement', 'achievement', NOW() - INTERVAL '5 minutes'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Emily Rodriguez', 'Claimed 500 wellness points reward', 'Rewards', 'reward', NOW() - INTERVAL '12 minutes'),
  ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'David Kim', 'Started "Mindful Meditation" challenge', 'Wellness', 'challenge', NOW() - INTERVAL '18 minutes'),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Jessica Taylor', 'Reached 50-day activity streak', 'Streak', 'achievement', NOW() - INTERVAL '25 minutes'),
  ('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Alex Martinez', 'Joined "Team Fitness" community', 'Social', 'social', NOW() - INTERVAL '32 minutes');
