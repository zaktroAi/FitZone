-- Run in Supabase SQL editor. Then add yourself as admin (see README).
create table admins (user_id uuid primary key references auth.users on delete cascade);
create table plans (id uuid primary key default gen_random_uuid(), name text not null, price numeric not null check (price >= 0), period text not null default 'month', features text not null default '', featured boolean not null default false, active boolean not null default true, sort int not null default 0);
create table trainers (id uuid primary key default gen_random_uuid(), name text not null, role text not null, bio text not null default '', active boolean not null default true, sort int not null default 0);
create table programs (id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', active boolean not null default true, sort int not null default 0);
create table content (key text primary key, value text not null);
create table enquiries (id uuid primary key default gen_random_uuid(), name text not null check (length(name) between 2 and 100), email text not null check (length(email) between 5 and 200), phone text check (length(phone) <= 30), plan text check (length(plan) <= 100), message text not null check (length(message) between 5 and 2000), status text not null default 'new' check (status in ('new','contacted','closed')), created_at timestamptz not null default now());

create function is_admin() returns boolean language sql stable security invoker set search_path = public as $$ select exists (select 1 from admins where user_id = auth.uid()) $$;

alter table admins enable row level security;
create policy "own admin row" on admins for select to authenticated using (user_id = auth.uid());
do $$ declare t text; begin
  foreach t in array array['plans','trainers','programs','content','enquiries'] loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "admin all" on %I for all to authenticated using (is_admin()) with check (is_admin())', t);
  end loop;
  foreach t in array array['plans','trainers','programs'] loop
    execute format('create policy "public read active" on %I for select to anon, authenticated using (active)', t);
  end loop;
end $$;
create policy "public read content" on content for select to anon, authenticated using (true);
create policy "public create enquiry" on enquiries for insert to anon, authenticated with check (status = 'new');

insert into programs (title, description, sort) values
('Strength Training','Barbell-focused progressive programs for raw strength.',1),
('Weight Training','Machine and free-weight plans for size and shape.',2),
('Cardio','Treadmills, rowers and conditioning for endurance.',3),
('Personal Training','One-to-one coaching built around your goals.',4),
('Functional Fitness','Movement-based training for everyday power.',5);
insert into plans (name, price, period, features, featured, sort) values
('Basic',29,'month',E'Gym floor access\nLocker room',false,1),
('Pro',49,'month',E'Everything in Basic\nGroup classes\nCardio zone',true,2),
('Elite',89,'month',E'Everything in Pro\n2 PT sessions/month\nPriority booking',false,3);
-- Sample rows above are placeholders: edit prices in /admin.


