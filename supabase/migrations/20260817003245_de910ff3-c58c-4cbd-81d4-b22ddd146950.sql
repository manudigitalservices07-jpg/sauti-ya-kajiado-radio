
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- auto profile + admin bootstrap
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (NEW.id,
          COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1)),
          COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;

  IF lower(NEW.email) = 'kajiadobusradio@busradio.local' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- REPORTS (listener submissions)
CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  phone text,
  email text,
  location text,
  category text NOT NULL DEFAULT 'News tip',
  title text NOT NULL,
  details text NOT NULL,
  media_urls text[] NOT NULL DEFAULT '{}',
  media_kind text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reports TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can report" ON public.reports FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read reports" ON public.reports FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update reports" ON public.reports FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete reports" ON public.reports FOR DELETE TO authenticated USING (public.is_admin());

-- BOOKINGS
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  organisation text,
  session_type text NOT NULL DEFAULT 'Studio interview',
  preferred_date date,
  preferred_time text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can book" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read bookings" ON public.bookings FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete bookings" ON public.bookings FOR DELETE TO authenticated USING (public.is_admin());

-- COMMENTS
CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target text NOT NULL DEFAULT 'general',
  author_name text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  content text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.comments TO anon, authenticated;
GRANT SELECT ON public.comments TO anon, authenticated;
GRANT UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can comment" ON public.comments FOR INSERT TO anon, authenticated WITH CHECK (approved = false);
CREATE POLICY "approved comments public" ON public.comments FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "admins read all comments" ON public.comments FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins moderate comments" ON public.comments FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete comments" ON public.comments FOR DELETE TO authenticated USING (public.is_admin());

-- NEWS POSTS
CREATE TABLE public.news_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'County News',
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text,
  author text NOT NULL DEFAULT 'Bus Radio Newsroom',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news_posts TO authenticated;
GRANT ALL ON public.news_posts TO service_role;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published news public" ON public.news_posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "admins read all news" ON public.news_posts FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins write news" ON public.news_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admins update news" ON public.news_posts FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete news" ON public.news_posts FOR DELETE TO authenticated USING (public.is_admin());

-- SHOW POSTS
CREATE TABLE public.show_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Talk Shows',
  host text NOT NULL DEFAULT 'Bus Radio',
  days text NOT NULL DEFAULT '',
  time_slot text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT 'Kiswahili',
  description text NOT NULL DEFAULT '',
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.show_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.show_posts TO authenticated;
GRANT ALL ON public.show_posts TO service_role;
ALTER TABLE public.show_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published shows public" ON public.show_posts FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "admins read all shows" ON public.show_posts FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins write shows" ON public.show_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admins update shows" ON public.show_posts FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete shows" ON public.show_posts FOR DELETE TO authenticated USING (public.is_admin());

-- LIVE LINKS
CREATE TABLE public.live_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  platform text NOT NULL DEFAULT 'Facebook',
  url text NOT NULL,
  description text,
  is_live boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.live_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.live_links TO authenticated;
GRANT ALL ON public.live_links TO service_role;
ALTER TABLE public.live_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published links public" ON public.live_links FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "admins read all links" ON public.live_links FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins write links" ON public.live_links FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admins update links" ON public.live_links FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "admins delete links" ON public.live_links FOR DELETE TO authenticated USING (public.is_admin());

-- COMMUNITY CHAT
CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.chat_messages TO authenticated;
GRANT DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read chat" ON public.chat_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "members send chat" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own or admin delete chat" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.is_admin());

ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

INSERT INTO public.live_links (title, platform, url, description, is_live) VALUES
('Bus Radio Live — Facebook session', 'Facebook', 'https://www.facebook.com/share/v/1EUY36jNjR/', 'Recent live broadcast from the Bus Radio 99.9FM studio and field team.', false),
('Bus Radio Live — Community coverage', 'Facebook', 'https://www.facebook.com/share/v/1EaTu4uyAx/', 'Live community coverage from Kajiado County.', false);
