-- Hub-VSL: eigen, anonieme kijkmeting (wens Alex, 20/11/2026).
--
-- Eén rij per kijkbeurt. Het id is een willekeurig nummer dat de speler bij elke
-- start maakt en alleen in het geheugen van de pagina houdt (geen cookie, geen
-- localStorage). Geen IP-adres, geen user-agent, niets dat naar een persoon leidt.
-- Spoelen kan niet in de speler, dus de verste seconde is meteen de retentie.
--
-- RLS staat aan zonder policies: alleen de service role (de Netlify-functies
-- vsl-meting en vsl-cijfers) kan lezen en schrijven.

create table if not exists public.hub_vsl_kijkbeurten (
  id uuid primary key,
  video text not null,
  gestart_op timestamptz not null default now(),
  bijgewerkt_op timestamptz not null default now(),
  start_seconde real not null default 0,
  verste_seconde real not null default 0,
  duur real,
  bron text not null default 'direct',
  reel text,
  apparaat text not null check (apparaat in ('gsm', 'desktop')),
  kwaliteit text,
  hervat boolean not null default false,
  formulier_verstuurd boolean not null default false
);

alter table public.hub_vsl_kijkbeurten enable row level security;

create index if not exists hub_vsl_kijkbeurten_gestart_op_idx
  on public.hub_vsl_kijkbeurten (gestart_op desc);

-- Hartslag van de speler: nieuwe kijkbeurt aanmaken of de bestaande bijwerken.
-- De verste seconde gaat alleen omhoog (greatest), nooit terug.
create or replace function public.hub_vsl_hartslag(
  p_id uuid,
  p_video text,
  p_start real,
  p_verste real,
  p_duur real,
  p_bron text,
  p_reel text,
  p_apparaat text,
  p_kwaliteit text,
  p_hervat boolean
) returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.hub_vsl_kijkbeurten as k
    (id, video, start_seconde, verste_seconde, duur, bron, reel, apparaat, kwaliteit, hervat)
  values
    (p_id, p_video, p_start, greatest(p_start, p_verste), p_duur, p_bron, p_reel, p_apparaat, p_kwaliteit, p_hervat)
  on conflict (id) do update set
    verste_seconde = greatest(k.verste_seconde, excluded.verste_seconde),
    duur = coalesce(excluded.duur, k.duur),
    kwaliteit = coalesce(excluded.kwaliteit, k.kwaliteit),
    bijgewerkt_op = now();
$$;

revoke all on function public.hub_vsl_hartslag(uuid, text, real, real, real, text, text, text, text, boolean) from public, anon, authenticated;
grant execute on function public.hub_vsl_hartslag(uuid, text, real, real, real, text, text, text, text, boolean) to service_role;
