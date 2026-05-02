# Nara United — Football Club Website

เว็บไซต์ทางการของสโมสรฟุตบอลนราฯ ยูไนเต็ด (Est. 2010) — Next.js 16 + Supabase + Tailwind v4

## คุณสมบัติหลัก

**หน้าบ้าน (`/`)**
- หน้าแรก: แมตช์ถัดไป + ผลล่าสุด + ข่าว + สปอนเซอร์
- โปรแกรมและผลการแข่งขัน (`/fixtures`)
- รายชื่อนักเตะแยกตำแหน่ง (`/squad`) + โปรไฟล์รายบุคคล
- ข่าวสาร (`/news`) พร้อมเนื้อหา HTML จาก rich-text editor
- ตารางคะแนน + ดาวซัลโวสูงสุด (`/table`)
- เกี่ยวกับสโมสร / ประวัติ / สนาม / ทีมงาน (`/about/*`)
- ฟอร์มติดต่อสโมสร (`/contact`) — ส่งเข้าตาราง `contact_messages`

**หลังบ้าน (`/admin`)**
- เข้าสู่ระบบด้วย Supabase Auth (email/password)
- Role-based: `admin` / `editor` / `viewer`
- จัดการเต็มรูปแบบ: นักเตะ, แมตช์, ข่าว (พร้อม Tiptap editor + อัปโหลดรูปสู่ Supabase Storage), ตารางคะแนน, สปอนเซอร์, ทีมงาน, ข้อความติดต่อ
- จัดการผู้ใช้ + บทบาท (admin เท่านั้น)
- Sync ตารางคะแนนผ่าน Thai League API (เปิดใช้ภายหลัง — ดู `lib/external/thai-league.ts`)

## การติดตั้ง

```bash
npm install
cp .env.local.example .env.local   # กรอกค่าจาก Supabase project
```

## ตั้งค่า Supabase

1. สร้างโปรเจกต์ใหม่ที่ https://supabase.com
2. ไปที่ **SQL Editor** → เปิดไฟล์ `supabase/migrations/0001_init.sql` → รันทั้งหมด
3. (ทางเลือก) รัน `supabase/seed.sql` เพื่อใส่ข้อมูลตัวอย่าง
4. คัดลอก URL + anon key + service-role key ไปใส่ใน `.env.local`
5. **สร้างผู้ใช้ admin คนแรก:**
   - Authentication → Users → Add user (กรอก email + password)
   - SQL Editor:
     ```sql
     update public.profiles set role = 'admin' where email = 'YOUR_EMAIL';
     ```
6. รันโปรเจกต์: `npm run dev` → เปิด http://localhost:3000/admin/login

## คำสั่งหลัก

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build (พร้อม type-check)
npm run start    # Run production build
npm run lint     # ESLint
```

## โครงสร้างหลัก

```
app/
  (public)/        — หน้าบ้าน (Header/Footer ในตัว)
  admin/
    login/         — หน้า login (ไม่มี sidebar)
    (app)/         — admin shell + sidebar (ต้อง login)
  api/cron/sync/   — endpoint รับ cron job (Bearer CRON_SECRET)
  sitemap.ts, robots.ts, not-found.tsx
components/
  layout/, shared/, features/, admin/
lib/
  env.ts                       — รวม env + isSupabaseConfigured()
  supabase/{client,server,admin}.ts
  auth/{require-role,session}.ts
  queries/                     — read-only fetchers (Server Components)
  external/thai-league.ts      — API integration stub
  utils/{cn,date,slug}.ts
types/database.ts              — TS types ตาม schema
supabase/
  migrations/0001_init.sql     — Full schema + RLS + Storage buckets
  seed.sql                     — ข้อมูลตัวอย่าง
proxy.ts                       — Next 16 middleware (ป้องกัน /admin/*)
```

## หมายเหตุทางเทคนิค

- **Next.js 16 breaking changes**: `cookies()`/`params`/`searchParams` เป็น async, ไฟล์ `proxy.ts` (เดิม middleware.ts) export ชื่อ `proxy`, `turbopack` config อยู่ระดับบนสุดของ `next.config.ts`
- **Tailwind v4**: ใช้ `@theme` block ใน `app/globals.css` — ไม่มี `tailwind.config`. Typography plugin โหลดผ่าน `@plugin "@tailwindcss/typography"`
- **Supabase clients ไม่ได้ใส่ TypeScript generics** เพื่อความง่าย — ถ้าต้องการ type-safe เต็มขั้น ให้รัน `npx supabase gen types typescript --project-id YOUR_ID > types/database.ts`
- **Storage buckets** ที่สร้างอัตโนมัติ: `players`, `news`, `sponsors`, `staff` — public read, staff write เท่านั้น
- **RLS เปิดทุกตาราง**: public select เนื้อหาเผยแพร่ได้, staff เขียนได้, anon ส่ง contact form ได้

## งานที่แนะนำเพิ่มในอนาคต

- เพิ่ม `loading.tsx` / `error.tsx` ในแต่ละ route segment เพื่อ skeleton/UX ที่ดีขึ้น
- รัน `supabase gen types` เพื่อ type-safe queries
- เปิดใช้ Thai League API จริง: ใส่ค่า `THAI_LEAGUE_API_BASE` + `THAI_LEAGUE_API_KEY` แล้วต่อปุ่ม Sync ในหน้า `/admin/standings`
- ตั้ง cron job ภายนอก (Vercel Cron / GitHub Actions) ยิง POST ไปที่ `/api/cron/sync?season=2025-26` พร้อม header `Authorization: Bearer $CRON_SECRET`
- เพิ่ม `match_events` editor ใน admin (โครง schema มีอยู่แล้ว)
- เพิ่ม `next-intl` หากต้องการรองรับภาษาอังกฤษในอนาคต
