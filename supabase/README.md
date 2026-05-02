# Supabase Setup — Nara United

## 1. Create a project
- Go to https://supabase.com → New Project
- Region: Singapore (closest to Thailand)
- Save the **Project URL**, **anon key**, and **service_role key**

## 2. Configure environment variables
Copy values into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 3. Apply the schema
In the Supabase Dashboard → **SQL Editor**:
1. Open `supabase/migrations/0001_init.sql` and run it.
2. (Optional) Open `supabase/seed.sql` and run it for sample data.

## 4. Create the first admin user
1. Dashboard → **Authentication** → **Users** → **Add user** → email/password
2. After it's created, in SQL Editor run:
   ```sql
   update public.profiles
   set role = 'admin'
   where email = 'YOUR_EMAIL@example.com';
   ```
3. Visit `/admin/login` and sign in.

## 5. Storage
The migration creates 4 public buckets: `players`, `news`, `sponsors`, `staff`.
Public read; only authenticated staff (admin/editor) can write.

## 6. Promote/demote users
```sql
update public.profiles set role = 'editor' where email = '...';
update public.profiles set role = 'viewer' where email = '...';
```
