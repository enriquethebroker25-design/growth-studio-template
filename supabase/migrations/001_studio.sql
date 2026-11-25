-- Run only in the dedicated Growth Studio project.
create table if not exists public.studio_documents (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  revision bigint not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.studio_documents enable row level security;
create policy own_document on public.studio_documents for select to authenticated using ((select auth.uid()) = user_id);
revoke all on public.studio_documents from anon, authenticated;
grant select on public.studio_documents to authenticated;
-- All writes pass through an atomic compare-and-swap, never a blind upsert.
create or replace function public.save_studio(expected_revision bigint, new_payload jsonb)
returns bigint language plpgsql security definer set search_path = '' as $$
declare next_revision bigint;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(new_payload) <> 'object' or octet_length(new_payload::text) > 5000000 then raise exception 'Invalid payload'; end if;
  if expected_revision = 0 then
    insert into public.studio_documents(user_id,payload) values(auth.uid(),new_payload)
    on conflict do nothing returning revision into next_revision;
  else
    update public.studio_documents set payload=new_payload, revision=revision+1, updated_at=now()
    where user_id=auth.uid() and revision=expected_revision returning revision into next_revision;
  end if;
  if next_revision is null then raise exception 'STUDIO_CONFLICT'; end if;
  return next_revision;
end;
$$;
revoke all on function public.save_studio(bigint,jsonb) from public,anon;
grant execute on function public.save_studio(bigint,jsonb) to authenticated;
