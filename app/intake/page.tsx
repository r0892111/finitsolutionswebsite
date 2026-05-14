'use client';

/**
 * /intake — the magic-link landing page for the Finit OS conversational intake.
 *
 * Per [intake-flow spec § Web app routes](../../../finit-os/docs/specs/intake-flow.md):
 *   - Reads ?t=<opaque-token>
 *   - 404 / blocked state if no token
 *   - Pulls personalization from /api/intake/state?t=<token> (Web-backend route).
 *     If that route is not yet live, falls back to MOCK_PERSONALIZATION_JSON
 *     embedded in OnboardingChat so this page works standalone during the
 *     parallel build.
 *
 * The page is intentionally hidden, no link from the public site points
 * here, see [CLAUDE.md](../../CLAUDE.md) constraint "no visible buttons".
 */

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Sparkles } from 'lucide-react';

import OnboardingChat from './OnboardingChat';
import type { IntakeState, IntakeStateResponse } from './types';

export const dynamic = 'force-static';

export default function IntakePage() {
  return (
    <React.Suspense fallback={<Booting />}>
      <IntakeInner />
    </React.Suspense>
  );
}

function IntakeInner() {
  const search = useSearchParams();
  const token = (search?.get('t') ?? '').trim();
  const [state, setState] = React.useState<IntakeState | null | 'pending'>('pending');
  const [error, setError] = React.useState<string | null>(null);
  const [useMock, setUseMock] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!token) {
        setState(null);
        return;
      }
      try {
        const res = await fetch(`/api/intake/state?t=${encodeURIComponent(token)}`, {
          credentials: 'same-origin',
        });
        if (res.status === 404) {
          // Distinguish "token not in DB" (real backend, JSON body) from
          // "API route not deployed yet" (dev mode, HTML 404 page) — fall
          // through to mock in the latter case so the page is dogfoodable
          // on the widgets branch before the backend lands.
          const ct = res.headers.get('content-type') ?? '';
          if (ct.includes('application/json')) {
            if (!cancelled) setError('not_found');
          } else {
            console.info('intake-state: backend not deployed, using mock');
            if (!cancelled) setState(null);
          }
          return;
        }
        if (res.status === 410) {
          if (!cancelled) setError('expired');
          return;
        }
        if (!res.ok) {
          // Route not deployed yet — keep the mock dispatcher running so the
          // UI is still usable during parallel build. Web-backend's job is to
          // make this branch unnecessary.
          console.info('intake-state: backend not ready, using mock');
          if (!cancelled) setState(null); // null => let OnboardingChat use MOCK
          return;
        }
        const data = (await res.json()) as IntakeStateResponse;
        // Defensive guard against wire-shape drift (e.g. backend returns
        // snake_case column names instead of the camelCase contract). A
        // partial object would crash OnboardingChat at first render —
        // safer to fall through to mock and surface the issue in console.
        if (!data?.personalization?.language) {
          console.warn(
            'intake-state: response missing personalization.language — falling back to mock',
            data,
          );
          if (!cancelled) setState(null);
          return;
        }
        const normalized: IntakeState = {
          token,
          personalization: data.personalization,
          goal_status: data.goal_status ?? {},
          state: data.state ?? {},
        };
        if (!cancelled) {
          setState(normalized);
          setUseMock(false);
        }
      } catch (err) {
        console.warn('intake-state-fetch', err);
        if (!cancelled) setState(null); // fall back to mock
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!token) {
    return <NotFound reason="no_token" />;
  }
  if (error === 'not_found') return <NotFound reason="not_found" />;
  if (error === 'expired') return <NotFound reason="expired" />;
  if (state === 'pending') return <Booting />;

  return <OnboardingChat token={token} initial={state} useMock={useMock} />;
}

/* ------------------------------------------------------------------ *
 * Shells
 * ------------------------------------------------------------------ */

function Booting() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] p-6 text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A2D63] text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_8px_18px_-4px_rgba(20,30,60,0.30)]"
        aria-hidden="true"
      >
        <Sparkles className="h-5 w-5 animate-pulse" />
      </div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">Finit OS</p>
      <p className="mt-1 text-[0.9375rem] text-[#57514A]">Even bezig met laden...</p>
    </div>
  );
}

function NotFound({ reason }: { reason: 'no_token' | 'not_found' | 'expired' }) {
  const copy = (() => {
    if (reason === 'expired') {
      return {
        title: 'Deze link is verlopen',
        body: 'Vraag Alex om een nieuwe link en we gaan verder waar je gebleven was.',
      };
    }
    if (reason === 'not_found') {
      return {
        title: 'Deze link werkt niet meer',
        body: 'Vraag Alex om een nieuwe magic-link.',
      };
    }
    return {
      title: 'Niets te zien hier',
      body: 'Je hebt een magic-link nodig om dit te openen.',
    };
  })();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] p-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8E6DC] bg-[#FFFEFA] text-[#A04A2A] shadow-[0_1px_2px_rgba(60,50,30,0.06),0_8px_18px_-6px_rgba(60,50,30,0.12)]">
        <AlertCircle className="h-5 w-5" />
      </div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">Finit OS</p>
      <h1 className="mt-1 text-[1.25rem] font-semibold text-[#322D26]">{copy.title}</h1>
      <p className="mt-2 max-w-sm text-[0.9375rem] text-[#57514A]">{copy.body}</p>
    </div>
  );
}
