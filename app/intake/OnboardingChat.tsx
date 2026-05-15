'use client';

/**
 * OnboardingChat — the chat shell that hosts the interactive intake.
 *
 * Layout: fixed-viewport CSS grid (`100dvh`, `grid-rows-[auto_minmax(0,1fr)_auto]`)
 *   - top row: sticky header with brand, progress dots, language switcher
 *   - middle row: scrollable conversation (AI Elements Conversation, which
 *     uses StickToBottom for auto-scroll + "scroll to latest" chip) +
 *     desktop progress sidebar
 *   - bottom row: footer slot. Holds the active widget when one is up,
 *     otherwise the small "X/Y topics covered" counter.
 *
 * Smoothness pass:
 *   - assistant_text_delta is rAF-batched (one React update per frame
 *     instead of one per token) — kills jitter on long streaming msgs
 *   - each Message animates in once via Framer Motion (opacity + 4px slide)
 *   - prefers-reduced-motion → all motion stripped
 *   - thinking indicator (`ThinkingShimmer`) only shows after 350 ms grace,
 *     so fast Anthropic responses don't flash a loader
 *   - chain-of-thought block surfaces silent state-tool calls
 *     (save_answer / update_goal_status / request_resume_link) above the
 *     assistant turn that emitted them.
 *
 * Stream protocol (mirrored in [types.ts](./types.ts) `StreamEvent`):
 *   - assistant_text_delta + assistant_text_done — typing
 *   - widget — UI to render in the footer slot
 *   - goal_update — fills the progress dots
 *   - chain_step — internal-tool trace (save_answer / update_goal_status / ...)
 *   - done — conversation closed; submit endpoint fires server-side
 *
 * Until Web-backend ships /api/intake/*, this component runs against
 * MOCK_PERSONALIZATION_JSON + a local mock dispatcher that walks through
 * each widget kind. Set `useMock = false` once the routes are live.
 */

import * as React from 'react';
import { ChevronDown, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought';
import { Shimmer } from '@/components/ai-elements/shimmer';

import type {
  AnyWidget,
  ChainStep,
  ChatMessage,
  IntakePersonalization,
  IntakeState,
  Language,
  StreamEvent,
  WidgetSubmission,
} from './types';

import { TextWidget } from './widgets/TextWidget';
import { LongTextVoiceWidget } from './widgets/LongTextVoiceWidget';
import { SingleSelectWidget } from './widgets/SingleSelectWidget';
import { MultiSelectWidget } from './widgets/MultiSelectWidget';
import { SliderWidget } from './widgets/SliderWidget';
import { ConfirmWidget } from './widgets/ConfirmWidget';
import { SystemPickerWidget } from './widgets/SystemPickerWidget';
import { ClosingSummaryWidget } from './widgets/ClosingSummaryWidget';

/* ------------------------------------------------------------------ *
 * Mock personalization payload — replaced by /api/intake/state in
 * production. Stays in source so the page works standalone during
 * Web-backend's parallel build.
 * ------------------------------------------------------------------ */

export const MOCK_PERSONALIZATION_JSON: IntakePersonalization = {
  flavor: 'paying_client',
  intake_compactness: 'full',
  client_slug: 'acme-hvac',
  client_legal_name: 'Acme HVAC BVBA',
  language: 'nl',
  sector: 'hvac',
  primary_contact: {
    first_name: 'Jan',
    last_name: 'Janssens',
    email: 'jan@acme.be',
    role: 'zaakvoerder',
  },
  company_website: 'https://acme.be',
  maturity_score: 55,
  maturity_confidence: 'medium',
  maturity_signal:
    'Heeft geëxperimenteerd met ChatGPT voor offertes. Wil quote-opvolging automatiseren maar heeft nog geen Make/Zapier geprobeerd.',
  stated_vision: 'Wil offerte-opvolging end-to-end automatiseren.',
  sales_call_highlights: [
    '2 dagen/week kwijt aan offerte-opvolging',
    'Werkt met Teamleader + Yuki + Outlook 365',
    '8 medewerkers, 1 kantoor + 2 bestelwagens',
  ],
  pre_filled: {
    team_size: { value: 8, source: 'sales-call', confidence: 'high' },
    primary_pain_hint: { value: 'offerte-opvolging', source: 'sales-call' },
  },
  system_options: {
    crm: [
      { name: 'Teamleader', domain: 'teamleader.eu', tier: 'primary' },
      { name: 'HubSpot', domain: 'hubspot.com' },
      { name: 'Pipedrive', domain: 'pipedrive.com' },
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'Odoo', domain: 'odoo.com' },
      { name: 'Monday', domain: 'monday.com' },
    ],
    email: [
      { name: 'Google Workspace', domain: 'google.com' },
      { name: 'Outlook 365', domain: 'microsoft.com' },
    ],
    bookkeeping: [
      { name: 'Yuki', domain: 'yuki.nl', tier: 'primary' },
      { name: 'Exact', domain: 'exact.com' },
      { name: 'Octopus', domain: 'octopus.be' },
      { name: 'Billit', domain: 'billit.eu' },
    ],
  },
  goal_emphasis: {
    operational_reality: 'standard',
    value_drains: 'deep_probe',
    ai_maturity: 'standard',
    system_landscape: 'standard',
    economic_stakes: 'deep_probe',
    magic_wand: 'standard',
  },
  minted_at: '2026-05-14T09:30:00Z',
  minted_by_operator: 'alex@finitsolutions.be',
};

/* ------------------------------------------------------------------ *
 * Header copy per language.
 * ------------------------------------------------------------------ */

const HEADER: Record<Language, { eyebrow: string; welcomeBack: string }> = {
  nl: { eyebrow: 'Finit OS intake', welcomeBack: 'Welkom terug' },
  fr: { eyebrow: 'Intake Finit OS', welcomeBack: 'Bon retour' },
  en: { eyebrow: 'Finit OS intake', welcomeBack: 'Welcome back' },
};

const GOALS: { id: string; label_nl: string; label_fr: string; label_en: string }[] = [
  { id: 'operational_reality', label_nl: 'Week-ritme', label_fr: 'Rythme', label_en: 'Weekly rhythm' },
  { id: 'value_drains', label_nl: 'Tijdvreters', label_fr: 'Pertes de temps', label_en: 'Value drains' },
  { id: 'ai_maturity', label_nl: 'AI-niveau', label_fr: 'Niveau IA', label_en: 'AI maturity' },
  { id: 'system_landscape', label_nl: 'Systemen', label_fr: 'Systèmes', label_en: 'Systems' },
  { id: 'economic_stakes', label_nl: 'Inzet', label_fr: 'Enjeux', label_en: 'Stakes' },
  { id: 'magic_wand', label_nl: 'Magic wand', label_fr: 'Baguette magique', label_en: 'Magic wand' },
];

/* ------------------------------------------------------------------ *
 * Thinking-indicator copy — cycling verbs per language. Same family
 * as Claude's "Spelunking…" / GPT's "Thinking…" feel.
 * ------------------------------------------------------------------ */

const THINKING_VERBS: Record<Language, string[]> = {
  nl: ['Aan het denken', 'Aan het samenvatten', 'Antwoord verwerken', 'Vraag voorbereiden'],
  en: ['Thinking', 'Reasoning', 'Saving your answer', 'Preparing next question'],
  fr: ['Réflexion', 'Analyse', 'Enregistrement', 'Préparation'],
};

interface Props {
  token: string;
  /** Server-provided initial state. If omitted, falls back to MOCK_PERSONALIZATION_JSON. */
  initial?: IntakeState | null;
  /** Set false in production once /api/intake/chat is live. */
  useMock?: boolean;
}

export function OnboardingChat({ token, initial, useMock = true }: Props) {
  // Defensive: a partial `initial` (object exists, but `.personalization`
  // is missing — usually a wire-shape drift from /api/intake/state) would
  // crash on first render. Fall back to mock if the personalization slot
  // is empty, not just if the whole object is.
  const initialState: IntakeState = initial?.personalization
    ? initial
    : { token, personalization: MOCK_PERSONALIZATION_JSON, goal_status: {} };
  const [language, setLanguage] = React.useState<Language>(initialState.personalization.language);

  // Reload-resume: if the server has Anthropic conversation history saved
  // (state.messages from prior turns), rebuild the visible chat bubbles
  // before the conversation kicks off so the user sees their prior
  // exchanges instead of a blank shell.
  const initialMessages = React.useMemo<ChatMessage[]>(() => {
    if (useMock) return [];
    const raw = (initialState.state?.messages as unknown) ?? [];
    if (!Array.isArray(raw)) return [];
    return rebuildChatHistory(raw, initialState.personalization.language);
  }, [useMock, initialState.state, initialState.personalization.language]);

  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [activeWidget, setActiveWidget] = React.useState<AnyWidget | null>(null);
  const [goalStatus, setGoalStatus] = React.useState<Record<string, 'open' | 'probing' | 'satisfied'>>(
    initialState.goal_status,
  );
  const [thinking, setThinking] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const aborterRef = React.useRef<AbortController | null>(null);
  // rAF batching for assistant_text_delta — one React update per frame.
  const pendingDeltaRef = React.useRef('');
  const rafScheduledRef = React.useRef(false);
  // 350 ms grace before showing the thinking indicator (Claude's trick).
  const thinkingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Kick the conversation off on mount. On resume, the server's op:'start'
  // path closes out any pending widget tool_use and re-prompts the user.
  React.useEffect(() => {
    void startConversation();
    return () => {
      aborterRef.current?.abort();
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------------ *
   * Streaming-delta batcher — buffers tokens between rAF ticks
   * so React re-renders at most once per frame.
   * ------------------------------------------------------------ */

  const flushDelta = React.useCallback(() => {
    const delta = pendingDeltaRef.current;
    pendingDeltaRef.current = '';
    rafScheduledRef.current = false;
    if (!delta) return;
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === 'assistant' && last.streaming) {
        const updated: ChatMessage = { ...last, text: (last.text ?? '') + delta };
        return [...prev.slice(0, -1), updated];
      }
      return [
        ...prev,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: 'assistant',
          text: delta,
          streaming: true,
        },
      ];
    });
  }, []);

  const queueDelta = React.useCallback(
    (text: string) => {
      pendingDeltaRef.current += text;
      if (rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      if (typeof window === 'undefined') {
        flushDelta();
        return;
      }
      window.requestAnimationFrame(flushDelta);
    },
    [flushDelta],
  );

  /* ------------------------------------------------------------ *
   * Thinking-indicator gating (350 ms grace).
   * ------------------------------------------------------------ */

  const beginThinking = React.useCallback(() => {
    if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    thinkingTimerRef.current = setTimeout(() => setThinking(true), 350);
  }, []);

  const cancelThinking = React.useCallback(() => {
    if (thinkingTimerRef.current) {
      clearTimeout(thinkingTimerRef.current);
      thinkingTimerRef.current = null;
    }
    setThinking(false);
  }, []);

  /* ------------------------------------------------------------ *
   * Stream-event handling
   * ------------------------------------------------------------ */

  const handleStreamEvent = (event: StreamEvent) => {
    // Debug breadcrumb — keep until intake is rock-solid. The browser
    // console makes it easy to confirm which events arrived for a given
    // turn (and in what order) when a widget mysteriously doesn't show.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.debug('[intake] event', event.type, event);
    }
    // Any real event means the model is responding — drop the loader.
    if (event.type !== 'error') cancelThinking();

    if (event.type === 'assistant_text_delta') {
      queueDelta(event.text);
    } else if (event.type === 'assistant_text_done') {
      // Flush any in-flight delta synchronously before marking done.
      flushDelta();
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant' && last.streaming) {
          return [...prev.slice(0, -1), { ...last, streaming: false }];
        }
        return prev;
      });
    } else if (event.type === 'chain_step') {
      const step: ChainStep = {
        tool: event.tool,
        label: event.label,
        status: event.status,
      };
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        // Attach to the current streaming assistant message; otherwise
        // open a new trace-only assistant bubble that the subsequent
        // text/widget turn will fill.
        if (last && last.role === 'assistant' && last.streaming) {
          return [
            ...prev.slice(0, -1),
            { ...last, chain_steps: [...(last.chain_steps ?? []), step] },
          ];
        }
        return [
          ...prev,
          {
            id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            role: 'assistant',
            streaming: true,
            chain_steps: [step],
          },
        ];
      });
    } else if (event.type === 'widget') {
      setActiveWidget(event.widget);
    } else if (event.type === 'goal_update') {
      setGoalStatus((prev) => ({ ...prev, [event.goal_id]: event.status }));
    } else if (event.type === 'done') {
      setDone(true);
      setActiveWidget(null);
    } else if (event.type === 'error') {
      cancelThinking();
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          role: 'system',
          text: event.message,
        },
      ]);
    }
  };

  /* ------------------------------------------------------------ *
   * Server bridge — real fetch + SSE consumption when not mocked.
   * ------------------------------------------------------------ */

  const sendToServer = async (body: Record<string, unknown>): Promise<void> => {
    aborterRef.current?.abort();
    const ac = new AbortController();
    aborterRef.current = ac;
    beginThinking();
    try {
      const res = await fetch('/api/intake/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, language, ...body }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        // Try to surface the actual server error instead of a bare status
        // code — saves us guessing in the next round of debugging.
        let detail = '';
        try {
          const errBody = await res.clone().json();
          detail = ` — ${JSON.stringify(errBody)}`;
        } catch {
          try {
            detail = ` — ${(await res.clone().text()).slice(0, 200)}`;
          } catch {
            /* ignore */
          }
        }
        throw new Error(`stream error: ${res.status}${detail}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buf += decoder.decode(value, { stream: true });
        // Parse SSE-style "data: <json>\n\n" frames
        const frames = buf.split('\n\n');
        buf = frames.pop() ?? '';
        for (const frame of frames) {
          const line = frame.replace(/^data:\s*/, '').trim();
          if (!line) continue;
          try {
            const evt = JSON.parse(line) as StreamEvent;
            handleStreamEvent(evt);
          } catch (err) {
            console.warn('parse-sse-frame', err, line);
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('stream-error', err);
        handleStreamEvent({ type: 'error', message: 'Verbinding viel weg. Herlaad alstublieft.' });
      }
    } finally {
      flushDelta();
      cancelThinking();
    }
  };

  /* ------------------------------------------------------------ *
   * Mock dispatcher — exercises all widget kinds locally so the UI
   * is dogfoodable before Web-backend's routes land.
   * ------------------------------------------------------------ */

  const mockStep = React.useRef(0);
  const mockDispatch = async () => {
    beginThinking();
    await new Promise((r) => setTimeout(r, 600));

    const steps: (() => StreamEvent[])[] = [
      // Step 0 — opening + first widget (text)
      () => [
        ...streamSentence(
          `Hi ${initialState.personalization.primary_contact?.first_name ?? ''}, leuk dat je er bent. Ik ga je in zo'n 20-25 minuten een paar dingen vragen over hoe ${initialState.personalization.client_legal_name ?? 'jullie'} werkt. Geen verkeerde antwoorden, je mag ook altijd "weet ik niet" zeggen.`,
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-1',
            kind: 'ask_text',
            goal_id: 'operational_reality',
            prompt: 'Wat zou je zeggen, in twee zinnen, dat een typische maandag bij jullie inhoudt?',
            placeholder: 'Bv. ochtend planning, namiddag offertes en interventies...',
            max_length: 300,
          },
        },
        { type: 'goal_update', goal_id: 'operational_reality', status: 'probing' },
      ],
      // Step 1 — long-text-voice (with mock chain_step trace)
      () => [
        {
          type: 'chain_step',
          tool: 'save_answer',
          label: 'Antwoord opslaan (operational_reality)',
          status: 'complete',
        },
        ...streamSentence(
          "Top, dat helpt enorm. Eén ding dat me opviel bij Karel's notities: 'offerte-opvolging' kwam meermaals terug. Kan je me daar wat meer over vertellen, het mag uitgebreid, en je mag het ook gewoon inspreken.",
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-2',
            kind: 'ask_long_text_voice',
            goal_id: 'value_drains',
            prompt: 'Hoe verloopt offerte-opvolging vandaag, van eerste contact tot getekende offerte?',
            placeholder: 'Wie doet wat, in welk systeem, hoe vaak...',
            voice_enabled: true,
          },
        },
        { type: 'goal_update', goal_id: 'value_drains', status: 'probing' },
      ],
      // Step 2 — single-select
      () => [
        {
          type: 'chain_step',
          tool: 'save_answer',
          label: 'Antwoord opslaan (value_drains)',
          status: 'complete',
        },
        ...streamSentence(
          'Helder. Even tussendoor, hoe zou jij jullie huidig AI-gebruik typeren?',
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-3',
            kind: 'ask_single_select',
            goal_id: 'ai_maturity',
            prompt: 'Wat klopt het meest?',
            options: [
              { value: 'none', label: 'Nog niets', description: 'We hebben nog niets met AI gedaan' },
              { value: 'chatgpt-personal', label: 'ChatGPT, persoonlijk', description: 'Eén of twee mensen gebruiken het ad hoc' },
              { value: 'chatgpt-team', label: 'ChatGPT, team-breed', description: 'Meerdere mensen, vaste taken' },
              { value: 'automations', label: 'Eerste automations', description: 'Make / Zapier / custom geprobeerd' },
            ],
            allow_other_text: true,
          },
        },
        { type: 'goal_update', goal_id: 'ai_maturity', status: 'probing' },
      ],
      // Step 3 — system_picker (the centerpiece)
      () => [
        ...streamSentence(
          'Helemaal duidelijk. Laten we even snel jullie systemen aanstippen, zodat we straks weten wie waar inhaakt.',
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-4',
            kind: 'system_picker',
            goal_id: 'system_landscape',
            category: 'crm',
            category_label_nl: 'CRM, verkoop en offertes',
            prompt: 'Welk CRM gebruiken jullie?',
            options: initialState.personalization.system_options?.crm ?? [],
            allow_multi: true,
            allow_other_text: true,
            allow_none: true,
            allow_unsure_probe_at_kickoff: true,
            ask_admin_contact: true,
          },
        },
        { type: 'goal_update', goal_id: 'system_landscape', status: 'probing' },
      ],
      // Step 4 — multi-select
      () => [
        ...streamSentence('En welke daarvan gebruik je het meest op een typische dag?'),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-5',
            kind: 'ask_multi_select',
            goal_id: 'system_landscape',
            prompt: 'Kies wat je dagelijks aanraakt',
            options: [
              { value: 'email', label: 'Mailbox' },
              { value: 'crm', label: 'CRM' },
              { value: 'bookkeeping', label: 'Boekhouding' },
              { value: 'docs', label: 'Documenten / Drive' },
              { value: 'chat', label: 'Interne chat' },
            ],
            min: 1,
            max: 4,
            allow_other_text: true,
          },
        },
      ],
      // Step 5 — slider
      () => [
        ...streamSentence(
          'Even een gevoelige, maar het is enkel om de ROI eerlijk te berekenen, niets meer. Wat denk je dat een uur van jouw tijd ongeveer waard is voor het bedrijf?',
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-6',
            kind: 'ask_slider',
            goal_id: 'economic_stakes',
            prompt: 'Hour-value (zaakvoerder)',
            min: 50,
            max: 250,
            step: 5,
            unit: 'EUR/u',
            default_value: 120,
            anchor_labels: [
              { value: 80, label: 'Operationeel' },
              { value: 120, label: 'Management' },
              { value: 180, label: 'Strategisch' },
            ],
          },
        },
        { type: 'goal_update', goal_id: 'economic_stakes', status: 'probing' },
      ],
      // Step 6 — confirm
      () => [
        ...streamSentence('Karel had genoteerd dat jullie 8 mensen zijn, klopt dat?'),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-7',
            kind: 'ask_confirm',
            prompt: 'Aantal medewerkers',
            pre_filled_value: 8,
            options: ['ja', 'ongeveer', 'nee'],
          },
        },
      ],
      // Step 7 — closing summary
      () => [
        ...streamSentence(
          'Mooi, ik heb genoeg om mee verder te gaan. Hier is wat ik heb opgeschreven, kijk even of het klopt.',
        ),
        {
          type: 'widget',
          widget: {
            widget_id: 'w-8',
            kind: 'closing_summary',
            summary: [
              { goal: 'Week-ritme', captured: 'Maandag = planning, dinsdag-donderdag = interventies, vrijdag = administratie + offertes.', confidence: 'high' },
              { goal: 'Tijdvreters', captured: 'Offerte-opvolging, ~2 dagen/week, jij zelf, in Teamleader + Outlook.', confidence: 'high' },
              { goal: 'AI-niveau', captured: 'ChatGPT persoonlijk, geen automations geprobeerd.', confidence: 'medium' },
              { goal: 'Systemen', captured: 'Teamleader, Yuki, Outlook 365, plus 1 onbekend (TBD voor kickoff).', confidence: 'medium' },
              { goal: 'Inzet', captured: 'Zaakvoerder ~120 EUR/u, manager-tier nog onzeker.', confidence: 'low' },
              { goal: 'Magic wand', captured: 'Offerte-opvolging automatisch, omdat het de duurste leakage is.', confidence: 'high' },
            ],
            missing: ['Manager hour-value', 'Admin voor één CRM categorie'],
            prompt: 'Klopt dit overzicht?',
          },
        },
        { type: 'goal_update', goal_id: 'magic_wand', status: 'satisfied' },
        { type: 'goal_update', goal_id: 'operational_reality', status: 'satisfied' },
        { type: 'goal_update', goal_id: 'value_drains', status: 'satisfied' },
        { type: 'goal_update', goal_id: 'ai_maturity', status: 'satisfied' },
        { type: 'goal_update', goal_id: 'system_landscape', status: 'satisfied' },
        { type: 'goal_update', goal_id: 'economic_stakes', status: 'satisfied' },
      ],
      // Step 8 — done
      () => [
        ...streamSentence(
          'Top, ik stuur dit even door naar Alex. Je krijgt zo een e-mail met een korte synthese. Bedankt voor de tijd.',
        ),
        { type: 'done' },
      ],
    ];

    const step = steps[mockStep.current];
    if (!step) {
      cancelThinking();
      return;
    }
    mockStep.current += 1;
    const events = step();
    for (const evt of events) {
      // simulate streaming gap
      await new Promise((r) => setTimeout(r, evt.type === 'assistant_text_delta' ? 12 : 60));
      handleStreamEvent(evt);
    }
    // Make sure last delta gets flushed and indicator is off.
    flushDelta();
    cancelThinking();
  };

  const startConversation = async () => {
    if (useMock) return mockDispatch();
    await sendToServer({ op: 'start' });
  };

  const submitWidget = async (submission: WidgetSubmission) => {
    // Persist what the user picked into the chat thread as a "user bubble"
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: 'user',
        submission,
        text: renderSubmissionPreview(submission, language),
      },
    ]);
    setActiveWidget(null);
    if (useMock) {
      return mockDispatch();
    }
    await sendToServer({ op: 'submit_widget', submission });
  };

  /* ------------------------------------------------------------ *
   * Render
   * ------------------------------------------------------------ */

  const totalGoals = GOALS.length;
  const satisfied = GOALS.filter((g) => goalStatus[g.id] === 'satisfied').length;
  const probing = GOALS.filter((g) => goalStatus[g.id] === 'probing').length;
  const reduced = useReducedMotion();

  return (
    <div className="grid h-[100dvh] grid-rows-[auto_minmax(0,1fr)_auto] bg-[#FDFBF7] text-[#2A2620]">
      {/* Header */}
      <header className="z-20 border-b border-[#E8E6DC] bg-[#FDFBF7]/85 backdrop-blur supports-[backdrop-filter]:bg-[#FDFBF7]/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1A2D63] text-[#FDFBF7] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.20),0_2px_4px_rgba(20,30,60,0.18)]"
              aria-hidden="true"
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[#697597]">
                {HEADER[language].eyebrow}
              </p>
              <p className="truncate text-[0.875rem] font-semibold text-[#1A2D63]">
                {initialState.personalization.client_legal_name ?? 'Finit OS'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ProgressDots goals={GOALS} status={goalStatus} language={language} />
            <LanguageSwitcher value={language} onChange={setLanguage} />
          </div>
        </div>
        {initial?.resumed ? (
          <div className="border-t border-[#C9D0E2] bg-[#F2F4FA]">
            <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2 md:px-6">
              <div className="rounded-full bg-[#1A2D63] p-1.5 text-[#FDFBF7]">
                <RotateCcw className="h-3.5 w-3.5" />
              </div>
              <p className="text-[0.875rem] text-[#1A2D63]">
                <span className="font-semibold">{HEADER[language].welcomeBack}.</span>{' '}
                {initial.resumed.assistant_text}
              </p>
            </div>
          </div>
        ) : null}
      </header>

      {/* Middle row — conversation + sidebar. min-h-0 + overflow-hidden so the
          Conversation's StickToBottom can claim the available height without
          dragging the page along with it. The active widget renders INLINE
          at the bottom of the message list — keeps it impossible to hide
          behind a layout bug, and StickToBottom keeps it auto-scrolled into
          view. */}
      <div className="min-h-0 w-full overflow-hidden">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 lg:px-6">
          <div className="relative flex min-h-0 flex-col">
            <Conversation aria-live="polite">
              <ConversationContent className="mx-auto w-full max-w-2xl px-4 md:px-0">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <MessageRow key={m.id} message={m} reduced={!!reduced} />
                  ))}
                </AnimatePresence>
                {thinking ? <ThinkingShimmer language={language} /> : null}
                {activeWidget ? (
                  <div className="pt-1">
                    <WidgetSlot
                      widget={activeWidget}
                      language={language}
                      token={token}
                      onSubmit={submitWidget}
                    />
                  </div>
                ) : null}
                {done ? <DoneCallout language={language} /> : null}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          </div>
          <ProgressSidebar goals={GOALS} status={goalStatus} language={language} />
        </div>
      </div>

      {/* Footer — always-visible status strip. Shows topic counter, thinking
          state, current widget kind for diagnostics, and the re-prompt
          escape hatch if the agent goes silent. */}
      <footer className="border-t border-[#E8E6DC] bg-[#FDFBF7]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 md:px-6">
          <p className="text-[0.6875rem] text-[#76706A]">
            {satisfied}/{totalGoals}{' '}
            {language === 'nl'
              ? "thema's afgerond"
              : language === 'fr'
                ? 'thèmes terminés'
                : 'topics covered'}
            {probing > 0 ? (
              <span className="ml-1 text-[#697597]">
                ({probing}{' '}
                {language === 'nl' ? 'lopend' : language === 'fr' ? 'en cours' : 'in progress'})
              </span>
            ) : null}
            {thinking ? (
              <span className="ml-2 text-[#697597]">
                · {language === 'nl' ? 'bezig…' : language === 'fr' ? 'en cours…' : 'thinking…'}
              </span>
            ) : null}
            <span className="ml-2 font-mono text-[#94908A]">
              · widget={activeWidget?.kind ?? 'null'}
            </span>
          </p>
          {!done && !thinking && !activeWidget && messages.length > 0 && !useMock ? (
            <button
              type="button"
              onClick={() => void sendToServer({ op: 'start' })}
              className="rounded-md border border-[#C9D0E2] bg-[#FFFEFA] px-2.5 py-1 text-[0.6875rem] font-medium text-[#1A2D63] transition-colors hover:bg-[#F2F4FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63]"
            >
              {language === 'nl'
                ? 'Geen invoerveld? Vraag opnieuw'
                : language === 'fr'
                  ? 'Pas de champ ? Reposer la question'
                  : 'No input? Re-prompt'}
            </button>
          ) : null}
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Sub-components
 * ------------------------------------------------------------------ */

function MessageRow({ message, reduced }: { message: ChatMessage; reduced: boolean }) {
  const anim = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
      };

  if (message.role === 'assistant') {
    const hasText = !!message.text && message.text.length > 0;
    const hasSteps = !!message.chain_steps && message.chain_steps.length > 0;
    if (!hasText && !hasSteps) return null;
    return (
      <motion.div className="flex items-start gap-2" {...anim}>
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[#FDFBF7]">
          <Sparkles className="h-2.5 w-2.5" />
        </div>
        <div className="flex min-w-0 max-w-[90%] flex-1 flex-col gap-1">
          {hasSteps ? <ChainOfThoughtBlock steps={message.chain_steps!} /> : null}
          {hasText ? <AssistantBubble text={message.text!} streaming={!!message.streaming} /> : null}
        </div>
      </motion.div>
    );
  }
  if (message.role === 'system') {
    return (
      <motion.div
        className="rounded-md border border-[#E8DCC9] bg-[#FAF5EC] px-2.5 py-1 text-center text-[0.6875rem] text-[#74532A]"
        {...anim}
      >
        {message.text}
      </motion.div>
    );
  }
  // user
  return (
    <motion.div className="flex items-start justify-end gap-2" {...anim}>
      <div className="max-w-[78%] rounded-xl rounded-tr-sm bg-[#1A2D63] px-3 py-1.5 text-[#FDFBF7] shadow-[0_2px_6px_-2px_rgba(20,30,60,0.22)]">
        <p className="whitespace-pre-wrap text-[0.75rem] leading-[1.5]">{message.text}</p>
      </div>
    </motion.div>
  );
}

function AssistantBubble({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <div
      className="min-w-0 max-w-full rounded-xl rounded-tl-sm border border-[#E8E6DC] bg-[#FFFEFA] px-3 py-1.5 shadow-[0_1px_2px_rgba(60,50,30,0.03)]"
      style={{ overflowAnchor: 'none' }}
    >
      <p className="whitespace-pre-wrap text-[0.75rem] leading-[1.5] text-[#2A2620]">
        {text}
        {streaming ? (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[2px] animate-pulse rounded-sm bg-[#1A2D63] align-middle"
          />
        ) : null}
      </p>
    </div>
  );
}

function ChainOfThoughtBlock({ steps }: { steps: ChainStep[] }) {
  return (
    <ChainOfThought defaultOpen={false}>
      <ChainOfThoughtHeader>
        Wat ik intern deed ·{' '}
        <span className="font-semibold text-[#1A2D63]">{steps.length}</span>
      </ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        {steps.map((s, idx) => (
          <ChainOfThoughtStep
            key={`${s.tool}-${idx}`}
            label={s.label}
            status={s.status === 'active' ? 'active' : 'complete'}
          />
        ))}
      </ChainOfThoughtContent>
    </ChainOfThought>
  );
}

function ThinkingShimmer({ language }: { language: Language }) {
  const verbs = THINKING_VERBS[language];
  const [i, setI] = React.useState(0);
  const reduced = useReducedMotion();
  React.useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((x) => (x + 1) % verbs.length), 1500);
    return () => clearInterval(t);
  }, [verbs.length, reduced]);
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[#FDFBF7]">
        <Sparkles className="h-2.5 w-2.5" />
      </div>
      <div className="pt-0.5 text-[0.75rem] leading-[1.5]">
        <Shimmer duration={1.6} spread={2}>
          {`${verbs[i]}…`}
        </Shimmer>
      </div>
    </div>
  );
}

function DoneCallout({ language }: { language: Language }) {
  return (
    <div className="rounded-xl border border-[#C9D0E2] bg-[#F2F4FA] p-3.5 text-center">
      <p className="text-[0.75rem] font-medium text-[#1A2D63]">
        {language === 'nl'
          ? 'Bedankt, je antwoorden zijn veilig opgeslagen.'
          : language === 'fr'
            ? 'Merci, vos réponses sont enregistrées.'
            : 'Thanks, your answers are safely stored.'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Reload-resume helper — rebuild ChatMessage[] from server-side
 * Anthropic MessageParam[] so a page refresh shows the prior chat.
 *
 * Skips kickoff/resume strings ("Hallo, ik ben er..." etc — these are
 * synthetic protocol nudges, not real user content) and tool_use
 * blocks (widgets are transient UI; the user already answered them
 * via the matching tool_result). Renders text from assistant blocks
 * and reconstructs user submissions from tool_result payloads.
 * ------------------------------------------------------------------ */

type AnthropicTextBlock = { type: 'text'; text: string };
type AnthropicToolUseBlock = { type: 'tool_use'; id: string; name: string; input: unknown };
type AnthropicToolResultBlock = {
  type: 'tool_result';
  tool_use_id: string;
  content: string | unknown[];
};
type AnthropicContentBlock =
  | AnthropicTextBlock
  | AnthropicToolUseBlock
  | AnthropicToolResultBlock;
type AnthropicMessageParam = {
  role: 'user' | 'assistant';
  content: string | AnthropicContentBlock[];
};

const KICKOFF_PHRASES = new Set([
  'Hallo, ik ben er. We kunnen beginnen.',
  'Hi, I\'m ready to start.',
  "Bonjour, je suis prêt(e). Allons-y.",
  'Ik ben terug. Laten we verder gaan waar we gebleven waren.',
  "I'm back. Let's pick up where we left off.",
  'Je reprends. Reprenons là où nous nous étions arrêtés.',
]);

function rebuildChatHistory(
  raw: unknown[],
  language: Language,
): ChatMessage[] {
  const out: ChatMessage[] = [];
  let counter = 0;
  for (const msgRaw of raw) {
    if (!msgRaw || typeof msgRaw !== 'object') continue;
    const msg = msgRaw as AnthropicMessageParam;
    if (msg.role === 'assistant') {
      const blocks = Array.isArray(msg.content) ? msg.content : [];
      const textParts: string[] = [];
      if (typeof msg.content === 'string') {
        textParts.push(msg.content);
      } else {
        for (const block of blocks) {
          if (block && (block as AnthropicTextBlock).type === 'text') {
            textParts.push((block as AnthropicTextBlock).text);
          }
        }
      }
      const text = textParts.join('\n').trim();
      if (text && text !== '(no content)') {
        out.push({
          id: `restored-a-${counter++}`,
          role: 'assistant',
          text,
        });
      }
    } else if (msg.role === 'user') {
      // Pure-string user content (kickoff / resume nudges / synthetic
      // system-reminders the edge function injects when the model
      // skipped a widget). None of these are real user content —
      // they're protocol scaffolding and shouldn't render as bubbles.
      if (typeof msg.content === 'string') {
        const trimmed = msg.content.trim();
        if (!trimmed) continue;
        if (KICKOFF_PHRASES.has(trimmed)) continue;
        // Server-injected reminders are wrapped in <system-reminder> tags.
        if (trimmed.startsWith('<system-reminder>')) continue;
        out.push({
          id: `restored-u-${counter++}`,
          role: 'user',
          text: trimmed,
        });
        continue;
      }
      // Array content — find tool_result blocks; each is either a widget
      // answer (real user input) or a synthetic protocol nudge from the
      // edge function (e.g. "User did not respond yet…" auto-resolves
      // when the page is reloaded with a pending tool_use). Only the
      // former is real user content — render only those.
      const blocks = Array.isArray(msg.content) ? msg.content : [];
      for (const block of blocks) {
        if (!block || (block as AnthropicContentBlock).type !== 'tool_result') continue;
        const tr = block as AnthropicToolResultBlock;
        const contentStr = typeof tr.content === 'string' ? tr.content : '';
        if (!contentStr || contentStr === '{"ok":true}') continue;
        try {
          const parsed = JSON.parse(contentStr) as WidgetSubmission;
          if (parsed && typeof parsed === 'object' && 'value' in parsed) {
            out.push({
              id: `restored-u-${counter++}`,
              role: 'user',
              submission: parsed,
              text: renderSubmissionPreview(parsed, language),
            });
          }
        } catch {
          /* synthetic protocol nudge — skip; not real user content */
        }
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Progress UI — compact dots in the header for mobile, full sidebar
 * (cards with label, status pill, captured-answer preview) on desktop.
 * ------------------------------------------------------------------ */

function ProgressDots({
  goals,
  status,
  language,
}: {
  goals: typeof GOALS;
  status: Record<string, 'open' | 'probing' | 'satisfied'>;
  language: Language;
}) {
  return (
    <div className="hidden items-center gap-1.5 rounded-full border border-[#E8E6DC] bg-[#FDFBF7] px-2 py-1.5 sm:inline-flex lg:!hidden">
      {goals.map((g) => {
        const s = status[g.id];
        const label = language === 'nl' ? g.label_nl : language === 'fr' ? g.label_fr : g.label_en;
        return (
          <span
            key={g.id}
            title={label}
            aria-label={`${label}: ${s ?? 'open'}`}
            className={[
              'h-2 w-2 rounded-full transition-all',
              s === 'satisfied'
                ? 'bg-[#1A2D63] scale-100'
                : s === 'probing'
                  ? 'bg-[#757F9E] scale-100 ring-2 ring-[#C9D0E2]'
                  : 'bg-[#D8D5C7] scale-90',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}

/**
 * Full progress sidebar — shown lg+ next to the chat. Each goal is a
 * card with label, short description, status pill, and (when satisfied)
 * a tiny check. Marine palette only — no other accent hues.
 */
function ProgressSidebar({
  goals,
  status,
  language,
}: {
  goals: typeof GOALS;
  status: Record<string, 'open' | 'probing' | 'satisfied'>;
  language: Language;
}) {
  const total = goals.length;
  const satisfied = goals.filter((g) => status[g.id] === 'satisfied').length;
  const probing = goals.filter((g) => status[g.id] === 'probing').length;
  const pct = Math.round((satisfied / total) * 100);

  const goalDescriptions: Record<string, { nl: string; fr: string; en: string }> = {
    operational_reality: {
      nl: 'Hoe ziet een typische week eruit?',
      fr: 'À quoi ressemble une semaine type ?',
      en: 'What does a typical week look like?',
    },
    value_drains: {
      nl: 'Waar lekt er tijd weg?',
      fr: 'Où le temps fuit-il ?',
      en: 'Where does time leak away?',
    },
    ai_maturity: {
      nl: 'Wat hebben jullie al geprobeerd?',
      fr: "Qu'avez-vous déjà essayé ?",
      en: 'What have you tried already?',
    },
    system_landscape: {
      nl: 'Welke tools draaien er?',
      fr: 'Quels outils utilisez-vous ?',
      en: 'Which tools are in play?',
    },
    economic_stakes: {
      nl: 'Wat kost het echt?',
      fr: 'Quel est le coût réel ?',
      en: 'What does it really cost?',
    },
    magic_wand: {
      nl: 'Eén proces, automatisch — welk?',
      fr: 'Un processus automatique — lequel ?',
      en: 'One process, automated — which?',
    },
  };

  const headerCopy = {
    nl: { title: 'Voortgang', counter: `${satisfied}/${total} thema's afgerond` },
    fr: { title: 'Progression', counter: `${satisfied}/${total} thèmes terminés` },
    en: { title: 'Progress', counter: `${satisfied}/${total} topics covered` },
  }[language];

  const statusPill = (s: 'open' | 'probing' | 'satisfied' | undefined) => {
    if (s === 'satisfied') {
      return {
        text: language === 'nl' ? 'Klaar' : language === 'fr' ? 'Fait' : 'Done',
        cls: 'bg-[#1A2D63] text-[#FDFBF7]',
      };
    }
    if (s === 'probing') {
      return {
        text: language === 'nl' ? 'Bezig' : language === 'fr' ? 'En cours' : 'In progress',
        cls: 'bg-[#E5E9F4] text-[#1A2D63]',
      };
    }
    return {
      text: language === 'nl' ? 'Te doen' : language === 'fr' ? 'À faire' : 'To do',
      cls: 'bg-[#F2EFE6] text-[#76706A]',
    };
  };

  return (
    <aside className="hidden lg:block w-[300px] shrink-0 overflow-y-auto">
      <div className="flex flex-col gap-3 py-6 pr-2">
        {/* Heading + bar */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#697597]">
              {headerCopy.title}
            </h2>
            <span className="text-[0.75rem] text-[#76706A]">{pct}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE9DA]">
            <div
              className="h-full rounded-full bg-[#1A2D63] transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-[0.75rem] text-[#76706A]">
            {headerCopy.counter}
            {probing > 0 ? (
              <span className="ml-1 text-[#697597]">
                ({probing} {language === 'nl' ? 'lopend' : language === 'fr' ? 'en cours' : 'active'})
              </span>
            ) : null}
          </p>
        </div>

        {/* Goal cards */}
        <ol className="flex flex-col gap-2">
          {goals.map((g, i) => {
            const s = status[g.id];
            const label = language === 'nl' ? g.label_nl : language === 'fr' ? g.label_fr : g.label_en;
            const desc = goalDescriptions[g.id]?.[language] ?? '';
            const pill = statusPill(s);
            const isActive = s === 'probing';
            const isDone = s === 'satisfied';
            return (
              <li
                key={g.id}
                className={[
                  'group relative rounded-xl border px-3.5 py-3 transition-all',
                  isDone
                    ? 'border-[#C9D0E2] bg-[#F2F4FA]'
                    : isActive
                      ? 'border-[#C9D0E2] bg-[#FFFEFA] shadow-[0_1px_2px_rgba(60,50,30,0.04),0_8px_16px_-10px_rgba(20,30,60,0.12)]'
                      : 'border-[#E8E6DC] bg-[#FFFEFA]',
                ].join(' ')}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className={[
                      'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-semibold transition-colors',
                      isDone
                        ? 'bg-[#1A2D63] text-[#FDFBF7]'
                        : isActive
                          ? 'bg-[#FDFBF7] text-[#1A2D63] ring-2 ring-[#1A2D63]'
                          : 'bg-[#F2EFE6] text-[#A29B92]',
                    ].join(' ')}
                  >
                    {isDone ? '✓' : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={[
                          'text-[0.875rem] font-semibold leading-snug',
                          isDone ? 'text-[#1A2D63]' : 'text-[#322D26]',
                        ].join(' ')}
                      >
                        {label}
                      </p>
                      <span
                        className={[
                          'shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.04em]',
                          pill.cls,
                        ].join(' ')}
                      >
                        {pill.text}
                      </span>
                    </div>
                    {desc ? (
                      <p className="mt-0.5 text-[0.75rem] leading-relaxed text-[#76706A]">
                        {desc}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

function LanguageSwitcher({
  value,
  onChange,
}: {
  value: Language;
  onChange: (l: Language) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-full border border-[#E8E6DC] bg-[#FDFBF7] px-2.5 py-1 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#57514A] transition-colors hover:border-[#D8D5C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A2D63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
      >
        {value}
        <ChevronDown className="h-3 w-3" />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-30 mt-2 w-28 overflow-hidden rounded-lg border border-[#E8E6DC] bg-[#FFFEFA] shadow-[0_10px_30px_-12px_rgba(60,50,30,0.20),0_4px_8px_-2px_rgba(60,50,30,0.10)]"
        >
          {(['nl', 'fr', 'en'] as Language[]).map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === value}
                onClick={() => {
                  onChange(l);
                  setOpen(false);
                }}
                className={[
                  'flex w-full items-center justify-between px-3 py-1.5 text-left text-[0.8125rem] font-medium uppercase tracking-[0.08em] transition-colors',
                  l === value ? 'bg-[#F2F4FA] text-[#1A2D63]' : 'text-[#57514A] hover:bg-[#F5F3EC]',
                ].join(' ')}
              >
                {l}
                {l === value ? <span aria-hidden="true">·</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function WidgetSlot({
  widget,
  language,
  token,
  onSubmit,
}: {
  widget: AnyWidget;
  language: Language;
  token: string;
  onSubmit: (submission: WidgetSubmission) => void;
}) {
  const wrap = <T,>(value: T) =>
    ({
      widget_id: widget.widget_id,
      kind: widget.kind,
      value: value as never,
      goal_id: widget.goal_id,
    }) as WidgetSubmission;

  switch (widget.kind) {
    case 'ask_text':
      return (
        <div className="animate-fade-in">
          <TextWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'ask_long_text_voice':
      return (
        <div className="animate-fade-in">
          <LongTextVoiceWidget
            widget={widget}
            language={language}
            token={token}
            onSubmit={(v) => onSubmit(wrap(v))}
          />
        </div>
      );
    case 'ask_single_select':
      return (
        <div className="animate-fade-in">
          <SingleSelectWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'ask_multi_select':
      return (
        <div className="animate-fade-in">
          <MultiSelectWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'ask_slider':
      return (
        <div className="animate-fade-in">
          <SliderWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'ask_confirm':
      return (
        <div className="animate-fade-in">
          <ConfirmWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'system_picker':
      return (
        <div className="animate-fade-in">
          <SystemPickerWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    case 'closing_summary':
      return (
        <div className="animate-fade-in">
          <ClosingSummaryWidget widget={widget} language={language} onSubmit={(v) => onSubmit(wrap(v))} />
        </div>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function renderSubmissionPreview(submission: WidgetSubmission, language: Language): string {
  const v = submission.value;
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? (language === 'nl' ? 'ja' : language === 'fr' ? 'oui' : 'yes') : language === 'nl' ? 'nee' : language === 'fr' ? 'non' : 'no';
  if (Array.isArray(v)) return v.join(', ');
  if (v && typeof v === 'object') {
    if ('selected' in v) {
      const sp = v as { selected: { name: string }[]; none_selected: boolean; unsure_probe_at_kickoff: boolean };
      if (sp.none_selected) return language === 'nl' ? '— geen —' : language === 'fr' ? '— aucun —' : '— none —';
      if (sp.unsure_probe_at_kickoff) return language === 'nl' ? '— niet zeker, voor kickoff —' : language === 'fr' ? '— pas sûr, pour le kickoff —' : '— unsure, save for kickoff —';
      return sp.selected.map((s) => s.name).join(', ');
    }
    if ('proceed' in v) {
      return language === 'nl' ? 'Klaar' : language === 'fr' ? 'Terminé' : 'Done';
    }
    if ('choice' in v) {
      return String((v as { choice: string }).choice);
    }
  }
  return '...';
}

/** Build a list of small assistant_text_delta events to simulate streaming. */
function streamSentence(text: string): StreamEvent[] {
  const chunks = text.split(/(\s+)/); // keep whitespace
  const events: StreamEvent[] = chunks.map((c) => ({ type: 'assistant_text_delta', text: c }));
  events.push({ type: 'assistant_text_done' });
  return events;
}

export default OnboardingChat;
