-- ============================================================
-- Versio: Recreate tables with uuid columns + RLS policies
-- Safe to run on empty tables. Drops and recreates all tables.
-- ============================================================

-- ─── Drop existing tables ────────────────────────────────────
DROP TABLE IF EXISTS streaks   CASCADE;
DROP TABLE IF EXISTS check_ins CASCADE;
DROP TABLE IF EXISTS goals     CASCADE;
DROP TABLE IF EXISTS struggles CASCADE;
DROP TABLE IF EXISTS profiles  CASCADE;

-- ─── Recreate with uuid primary keys ────────────────────────

CREATE TABLE profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  email       text        NOT NULL,
  full_name   text,
  avatar_url  text,
  username    text UNIQUE
);

CREATE TABLE struggles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text        NOT NULL,
  description text,
  category    text,
  resolved    boolean     NOT NULL DEFAULT false
);

CREATE TABLE goals (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text        NOT NULL,
  description text,
  target_date date,
  completed   boolean     NOT NULL DEFAULT false,
  progress    integer     NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100)
);

CREATE TABLE check_ins (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood       integer     NOT NULL CHECK (mood >= 1 AND mood <= 10),
  notes      text,
  date       date        NOT NULL DEFAULT current_date,
  UNIQUE (user_id, date)
);

CREATE TABLE streaks (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  user_id        uuid        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak integer     NOT NULL DEFAULT 0,
  longest_streak integer     NOT NULL DEFAULT 0,
  last_check_in  date
);

-- ─── Row Level Security ──────────────────────────────────────

ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE struggles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals     ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks   ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- struggles
CREATE POLICY "Users can view own struggles"   ON struggles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own struggles" ON struggles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own struggles" ON struggles FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own struggles" ON struggles FOR DELETE USING (auth.uid() = user_id);

-- goals
CREATE POLICY "Users can view own goals"   ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON goals FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- check_ins
CREATE POLICY "Users can view own check_ins"   ON check_ins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own check_ins" ON check_ins FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own check_ins" ON check_ins FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own check_ins" ON check_ins FOR DELETE USING (auth.uid() = user_id);

-- streaks
CREATE POLICY "Users can view own streaks"   ON streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streaks" ON streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streaks" ON streaks FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─── Auto-create profile + streak on signup ──────────────────

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
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
