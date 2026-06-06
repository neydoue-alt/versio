-- ============================================================
-- Row Level Security policies for Versio
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- ─── Fix column types to uuid ───────────────────────────────
-- auth.uid() returns uuid; id/user_id columns must also be uuid.
-- These ALTER statements are safe if the tables are empty.
-- If you have existing rows, drop and recreate the tables instead.

ALTER TABLE profiles
  ALTER COLUMN id SET DATA TYPE uuid USING id::text::uuid;

ALTER TABLE struggles
  ALTER COLUMN id      SET DATA TYPE uuid USING id::text::uuid,
  ALTER COLUMN user_id SET DATA TYPE uuid USING user_id::text::uuid;

ALTER TABLE goals
  ALTER COLUMN id      SET DATA TYPE uuid USING id::text::uuid,
  ALTER COLUMN user_id SET DATA TYPE uuid USING user_id::text::uuid;

ALTER TABLE check_ins
  ALTER COLUMN id      SET DATA TYPE uuid USING id::text::uuid,
  ALTER COLUMN user_id SET DATA TYPE uuid USING user_id::text::uuid;

ALTER TABLE streaks
  ALTER COLUMN id      SET DATA TYPE uuid USING id::text::uuid,
  ALTER COLUMN user_id SET DATA TYPE uuid USING user_id::text::uuid;

-- ─── profiles ───────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ─── struggles ──────────────────────────────────────────────
ALTER TABLE struggles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own struggles"
  ON struggles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own struggles"
  ON struggles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own struggles"
  ON struggles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own struggles"
  ON struggles FOR DELETE
  USING (auth.uid() = user_id);

-- ─── goals ──────────────────────────────────────────────────
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own goals"
  ON goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON goals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON goals FOR DELETE
  USING (auth.uid() = user_id);

-- ─── check_ins ──────────────────────────────────────────────
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own check_ins"
  ON check_ins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check_ins"
  ON check_ins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check_ins"
  ON check_ins FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own check_ins"
  ON check_ins FOR DELETE
  USING (auth.uid() = user_id);

-- ─── streaks ────────────────────────────────────────────────
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
  ON streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
  ON streaks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── Auto-create profile on signup ──────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.streaks (user_id, current_streak, longest_streak)
  VALUES (NEW.id, 0, 0)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
