-- Records which course modules a user has unlocked, and when. The `unlocked_at`
-- timestamps drive the drip pacing: a user may unlock only one new module per
-- calendar day, and only in sequence (next = max(module_number) + 1). The rules
-- are enforced server-side in `unlockNextModule`; this table is the source of
-- truth they read and write.
create table course_unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_number int not null check (module_number between 1 and 11),
  unlocked_at timestamptz not null default now(),
  unique (user_id, module_number)
);

alter table course_unlocks enable row level security;

create policy "Users read their own unlocks" on course_unlocks
  for select using (auth.uid() = user_id);

-- No insert/update/delete policy for the authenticated/anon roles: only the
-- server fn (service_role, which bypasses RLS) writes here, so the sequential +
-- daily unlock rules can't be bypassed from the client.
