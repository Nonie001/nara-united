-- Optional sample data. Run after 0001_init.sql.

insert into public.stadiums (id, name_th, capacity, address_th)
values (
  '00000000-0000-0000-0000-000000000001',
  'สนามกีฬากลางจังหวัดนราธิวาส',
  10000,
  'อ.เมือง จ.นราธิวาส'
) on conflict do nothing;

insert into public.players (slug, name_th, jersey_number, position, nationality, is_active)
values
  ('player-1', 'นักเตะ ตัวอย่าง 1', 1, 'GK', 'ไทย', true),
  ('player-2', 'นักเตะ ตัวอย่าง 2', 4, 'DF', 'ไทย', true),
  ('player-3', 'นักเตะ ตัวอย่าง 3', 8, 'MF', 'ไทย', true),
  ('player-4', 'นักเตะ ตัวอย่าง 4', 9, 'FW', 'ไทย', true),
  ('player-5', 'นักเตะ ตัวอย่าง 5', 10, 'FW', 'ไทย', true)
on conflict (slug) do nothing;

insert into public.matches (season, competition, kickoff_at, opponent, is_home, status, venue)
values
  ('2025-26', 'Thai League 3', now() + interval '3 days', 'ตัวอย่าง เอฟซี', true, 'upcoming', 'สนามกีฬากลางนราธิวาส'),
  ('2025-26', 'Thai League 3', now() - interval '4 days', 'ตัวอย่าง ยูไนเต็ด', false, 'finished', 'เยือน')
on conflict do nothing;

update public.matches
set home_score = 2, away_score = 1
where status = 'finished' and home_score is null;

insert into public.standings (season, team_name, position, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, source)
values
  ('2025-26', 'Nara United', 1, 5, 4, 1, 0, 12, 4, 8, 13, 'manual'),
  ('2025-26', 'ตัวอย่าง เอฟซี', 2, 5, 3, 1, 1, 9, 5, 4, 10, 'manual'),
  ('2025-26', 'ตัวอย่าง ยูไนเต็ด', 3, 5, 2, 2, 1, 7, 6, 1, 8, 'manual')
on conflict (season, team_name) do nothing;

insert into public.sponsors (name, tier, display_order, is_active)
values
  ('สปอนเซอร์หลัก', 'main', 1, true),
  ('สปอนเซอร์อย่างเป็นทางการ', 'official', 2, true),
  ('พาร์ทเนอร์', 'partner', 3, true)
on conflict do nothing;

insert into public.staff (name_th, role_th, display_order)
values
  ('โค้ชใหญ่', 'หัวหน้าผู้ฝึกสอน', 1),
  ('ผู้ช่วยโค้ช', 'ผู้ช่วยผู้ฝึกสอน', 2),
  ('โค้ชผู้รักษาประตู', 'โค้ชผู้รักษาประตู', 3)
on conflict do nothing;

insert into public.news (slug, title_th, excerpt_th, content_html, category, is_published, published_at)
values
  ('welcome', 'ยินดีต้อนรับสู่เว็บไซต์ใหม่ของ Nara United',
   'เปิดตัวเว็บไซต์ทางการของสโมสร พร้อมข่าวสาร โปรแกรม และข้อมูลนักเตะ',
   '<p>ยินดีต้อนรับเข้าสู่เว็บไซต์ใหม่ของสโมสรฟุตบอล Nara United</p>',
   'announcement', true, now())
on conflict (slug) do nothing;
