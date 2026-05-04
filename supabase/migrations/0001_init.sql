-- =========================================================================
-- Nara United — Initial schema, RLS, and storage policies
-- Apply via Supabase SQL editor or `supabase db push`.
-- =========================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ---------- Enums ----------
do $$ begin
  create type role as enum ('admin', 'editor', 'viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type player_position as enum ('GK', 'DF', 'MF', 'FW');
exception when duplicate_object then null; end $$;

do $$ begin
  create type match_status as enum ('upcoming', 'live', 'finished', 'postponed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type sponsor_tier as enum ('main', 'official', 'partner');
exception when duplicate_object then null; end $$;

do $$ begin
  create type news_category as enum ('match', 'transfer', 'community', 'announcement', 'interview');
exception when duplicate_object then null; end $$;

do $$ begin
  create type standings_source as enum ('manual', 'api');
exception when duplicate_object then null; end $$;

do $$ begin
  create type match_event_type as enum ('goal', 'assist', 'yellow_card', 'red_card', 'substitution');
exception when duplicate_object then null; end $$;

-- ---------- profiles (extends auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role role not null default 'viewer',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper: is_staff() -> editor or admin
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------- stadiums ----------
create table if not exists public.stadiums (
  id uuid primary key default gen_random_uuid(),
  name_th text not null,
  capacity integer,
  address_th text,
  latitude numeric(10, 8),
  longitude numeric(11, 8)
);

-- ---------- players ----------
create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_th text not null,
  jersey_number integer,
  position player_position not null,
  date_of_birth date,
  nationality text default 'ไทย',
  height_cm integer,
  weight_kg integer,
  photo_url text,
  bio_th text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists players_position_idx on public.players(position);
create index if not exists players_active_idx on public.players(is_active);

-- ---------- staff ----------
create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  name_th text not null,
  role_th text not null,
  photo_url text,
  bio_th text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- matches ----------
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  season text not null,
  competition text not null,
  round text,
  kickoff_at timestamptz not null,
  venue text,
  opponent text not null,
  opponent_logo_url text,
  is_home boolean not null default true,
  home_score integer,
  away_score integer,
  status match_status not null default 'upcoming',
  attendance integer,
  stadium_id uuid references public.stadiums(id) on delete set null,
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists matches_kickoff_idx on public.matches(kickoff_at);
create index if not exists matches_season_idx on public.matches(season);
create index if not exists matches_status_idx on public.matches(status);

-- ---------- match_events ----------
create table if not exists public.match_events (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid references public.players(id) on delete set null,
  type match_event_type not null,
  minute integer not null,
  note text
);
create index if not exists match_events_match_idx on public.match_events(match_id);

-- ---------- player_stats ----------
create table if not exists public.player_stats (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  season text not null,
  appearances integer not null default 0,
  goals integer not null default 0,
  assists integer not null default 0,
  yellow_cards integer not null default 0,
  red_cards integer not null default 0,
  minutes_played integer not null default 0,
  unique (player_id, season)
);

-- ---------- news ----------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_th text not null,
  excerpt_th text,
  content_json jsonb,
  content_html text,
  cover_url text,
  category news_category not null default 'announcement',
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  is_published boolean not null default false,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists news_published_idx on public.news(is_published, published_at desc);
create index if not exists news_category_idx on public.news(category);

-- ---------- standings ----------
create table if not exists public.standings (
  id uuid primary key default gen_random_uuid(),
  season text not null,
  team_name text not null,
  position integer not null,
  played integer not null default 0,
  won integer not null default 0,
  drawn integer not null default 0,
  lost integer not null default 0,
  goals_for integer not null default 0,
  goals_against integer not null default 0,
  goal_difference integer not null default 0,
  points integer not null default 0,
  source standings_source not null default 'manual',
  updated_at timestamptz not null default now(),
  unique (season, team_name)
);

-- ---------- sponsors ----------
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  tier sponsor_tier not null default 'partner',
  display_order integer not null default 0,
  is_active boolean not null default true
);

-- ---------- contact_messages ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- site_settings (singleton, id=1) ----------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  hero_match_id uuid references public.matches(id) on delete set null,
  hero_news_ids uuid[],
  maintenance_mode boolean not null default false,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ---------- updated_at triggers ----------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

do $$
declare t text;
begin
  for t in select unnest(array['players','matches','news','site_settings']) loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table public.profiles enable row level security;
alter table public.players enable row level security;
alter table public.staff enable row level security;
alter table public.stadiums enable row level security;
alter table public.matches enable row level security;
alter table public.match_events enable row level security;
alter table public.player_stats enable row level security;
alter table public.news enable row level security;
alter table public.standings enable row level security;
alter table public.sponsors enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- profiles: user can read/update own row; admin can read/update all
drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id or public.is_admin());

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- generic: public read / staff write
do $$
declare t text;
begin
  for t in select unnest(array[
    'players','staff','stadiums','matches','match_events',
    'player_stats','news','standings','sponsors','site_settings'
  ]) loop
    execute format('drop policy if exists %I_public_read on public.%I', t, t);
    execute format('create policy %I_public_read on public.%I for select using (true)', t, t);

    execute format('drop policy if exists %I_staff_write on public.%I', t, t);
    execute format('create policy %I_staff_write on public.%I for all using (public.is_staff()) with check (public.is_staff())', t, t);
  end loop;
end $$;

-- contact_messages: anonymous insert; staff read/update; admin delete
drop policy if exists contact_anon_insert on public.contact_messages;
create policy contact_anon_insert on public.contact_messages
  for insert with check (true);

drop policy if exists contact_staff_read on public.contact_messages;
create policy contact_staff_read on public.contact_messages
  for select using (public.is_staff());

drop policy if exists contact_staff_update on public.contact_messages;
create policy contact_staff_update on public.contact_messages
  for update using (public.is_staff()) with check (public.is_staff());

drop policy if exists contact_admin_delete on public.contact_messages;
create policy contact_admin_delete on public.contact_messages
  for delete using (public.is_admin());

-- =========================================================================
-- Storage buckets + policies
-- =========================================================================
insert into storage.buckets (id, name, public)
values
  ('players', 'players', true),
  ('news', 'news', true),
  ('sponsors', 'sponsors', true),
  ('staff', 'staff', true)
on conflict (id) do nothing;

-- Public read for these buckets
drop policy if exists "Public read club assets" on storage.objects;
create policy "Public read club assets" on storage.objects
  for select using (bucket_id in ('players','news','sponsors','staff'));

-- Staff can upload/update/delete in these buckets
drop policy if exists "Staff write club assets" on storage.objects;
create policy "Staff write club assets" on storage.objects
  for all
  using (bucket_id in ('players','news','sponsors','staff') and public.is_staff())
  with check (bucket_id in ('players','news','sponsors','staff') and public.is_staff());
