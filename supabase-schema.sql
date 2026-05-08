-- ============================================================
-- RepurposeAI — Supabase SQL Setup
-- Run this entire file in your Supabase project's SQL Editor
-- ============================================================

-- 1. Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  stripe_customer_id text unique,
  created_at timestamptz default now()
);

-- 2. Subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan text not null default 'free',
  status text not null default 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Usage logs table
create table public.usage_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  platforms text[] not null,
  input_length int not null,
  created_at timestamptz default now()
);

create index usage_logs_user_month on public.usage_logs (user_id, created_at);

-- 4. Row Level Security
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_logs enable row level security;

create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);

create policy "Users can view own usage"   on public.usage_logs for select using (auth.uid() = user_id);
create policy "Users can insert own usage" on public.usage_logs for insert with check (auth.uid() = user_id);

-- 5. Auto-create profile + free subscription on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
