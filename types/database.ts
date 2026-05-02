// Generated/typed view of the database schema.
// Update this file as the schema evolves. For full type safety later, replace
// with output from `supabase gen types typescript`.

export type Role = "admin" | "editor" | "viewer";
export type Position = "GK" | "DF" | "MF" | "FW";
export type MatchStatus = "upcoming" | "live" | "finished" | "postponed";
export type SponsorTier = "main" | "official" | "partner";
export type NewsCategory =
  | "match"
  | "transfer"
  | "community"
  | "announcement"
  | "interview";
export type StandingsSource = "manual" | "api";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  created_at: string;
}

export interface Player {
  id: string;
  slug: string;
  name_th: string;
  jersey_number: number | null;
  position: Position;
  date_of_birth: string | null;
  nationality: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_url: string | null;
  bio_th: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  name_th: string;
  role_th: string;
  photo_url: string | null;
  bio_th: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Stadium {
  id: string;
  name_th: string;
  capacity: number | null;
  address_th: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface Match {
  id: string;
  season: string;
  competition: string;
  round: string | null;
  kickoff_at: string;
  venue: string | null;
  opponent: string;
  opponent_logo_url: string | null;
  is_home: boolean;
  home_score: number | null;
  away_score: number | null;
  status: MatchStatus;
  attendance: number | null;
  stadium_id: string | null;
  external_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface MatchEvent {
  id: string;
  match_id: string;
  player_id: string | null;
  type: "goal" | "assist" | "yellow_card" | "red_card" | "substitution";
  minute: number;
  note: string | null;
}

export interface PlayerStats {
  id: string;
  player_id: string;
  season: string;
  appearances: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
  minutes_played: number;
}

export interface News {
  id: string;
  slug: string;
  title_th: string;
  excerpt_th: string | null;
  content_json: unknown | null;
  content_html: string | null;
  cover_url: string | null;
  category: NewsCategory;
  author_id: string | null;
  published_at: string | null;
  is_published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Standing {
  id: string;
  season: string;
  team_name: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  source: StandingsSource;
  updated_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: SponsorTier;
  display_order: number;
  is_active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: number;
  hero_match_id: string | null;
  hero_news_ids: string[] | null;
  maintenance_mode: boolean;
  updated_at: string;
}

// Generic Database shape compatible with @supabase/supabase-js.
type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      profiles: Table<Profile>;
      players: Table<Player>;
      staff: Table<Staff>;
      stadiums: Table<Stadium>;
      matches: Table<Match>;
      match_events: Table<MatchEvent>;
      player_stats: Table<PlayerStats>;
      news: Table<News>;
      standings: Table<Standing>;
      sponsors: Table<Sponsor>;
      contact_messages: Table<ContactMessage>;
      site_settings: Table<SiteSettings>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      role: Role;
      position: Position;
      match_status: MatchStatus;
      sponsor_tier: SponsorTier;
      news_category: NewsCategory;
      standings_source: StandingsSource;
    };
    CompositeTypes: Record<string, never>;
  };
}
