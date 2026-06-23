create type product_type as enum ('course', 'mastermind');

create table purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product product_type not null,
  stripe_customer_id text not null,
  stripe_checkout_session_id text not null unique,
  stripe_subscription_id text,
  status text not null default 'active', -- active | canceled | past_due
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product)
);

alter table purchases enable row level security;

create policy "Users read their own purchases" on purchases
  for select using (auth.uid() = user_id);

-- No insert/update/delete policy for the authenticated/anon roles:
-- only the webhook (service_role, which bypasses RLS) writes to this table.
