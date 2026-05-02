create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(guest_name) between 1 and 100),
  attending boolean not null,
  guests_count smallint not null default 1 check (guests_count between 0 and 10),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

create policy "anyone can submit rsvp"
  on public.rsvps for insert
  to anon, authenticated
  with check (true);

create policy "anyone can read rsvps"
  on public.rsvps for select
  to anon, authenticated
  using (true);