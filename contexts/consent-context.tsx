"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  ConsentChoices,
  defaultChoices,
  getStoredConsent,
  saveConsent,
  applyConsentMode,
  pushDataLayerEvent,
} from '@/lib/consent';

interface ConsentContextType {
  choices: ConsentChoices;
  hasConsent: boolean;
  showBanner: boolean;
  showSettings: boolean;
  updateChoices: (newChoices: ConsentChoices, source: 'banner' | 'settings') => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

// The banner never shows on load: only after the first scroll or 10 seconds.
const BANNER_DELAY_MS = 10_000;

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

interface ConsentProviderProps {
  children: ReactNode;
}

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [choices, setChoices] = useState<ConsentChoices>(defaultChoices);
  const [hasConsent, setHasConsent] = useState(false);
  const [bannerDue, setBannerDue] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const showBanner = bannerDue && !hasConsent && !showSettings;

  useEffect(() => {
    // Nothing tracking-related is in layout.tsx. A stored choice is applied
    // here; applyConsentMode only loads GTM when that choice allows it.
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      setChoices(storedConsent.choices);
      setHasConsent(true);
      applyConsentMode(storedConsent.choices);
      pushDataLayerEvent('consent_loaded', storedConsent.choices, storedConsent.source);
      return;
    }

    // No choice yet: show the banner on the first scroll (any scroll
    // container, hence capture) or after BANNER_DELAY_MS, whichever is first.
    const reveal = () => setBannerDue(true);
    const timer = window.setTimeout(reveal, BANNER_DELAY_MS);
    document.addEventListener('scroll', reveal, { capture: true, passive: true, once: true });
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('scroll', reveal, { capture: true });
    };
  }, []);

  // Conditionally load Leadinfo when analytics consent is granted
  useEffect(() => {
    if (hasConsent && choices.statistics) {
      loadLeadinfo();
    }
  }, [hasConsent, choices.statistics]);

  // Scripts that already run (GTM, Leadinfo) can't be unloaded. After a
  // withdrawal we reload, so the page starts again with only what is allowed.
  const reloadIfWithdrawn = (next: ConsentChoices) => {
    if ((choices.statistics && !next.statistics) || (choices.marketing && !next.marketing)) {
      window.location.reload();
    }
  };

  const updateChoices = (newChoices: ConsentChoices, source: 'banner' | 'settings') => {
    setChoices(newChoices);
    setHasConsent(true);
    setShowSettings(false);

    saveConsent(newChoices, source);
    applyConsentMode(newChoices);
    pushDataLayerEvent('consent_update', newChoices, source);
    reloadIfWithdrawn(newChoices);
  };

  const acceptAll = () => {
    const allAccepted: ConsentChoices = {
      essential: true,
      statistics: true,
      marketing: true,
      social: true,
    };

    setChoices(allAccepted);
    setHasConsent(true);
    setShowSettings(false);
    saveConsent(allAccepted, 'banner');
    applyConsentMode(allAccepted);
    pushDataLayerEvent('consent_accept_all', allAccepted, 'banner');
  };

  const rejectAll = () => {
    setChoices(defaultChoices);
    setHasConsent(true);
    setShowSettings(false);
    saveConsent(defaultChoices, 'banner');
    applyConsentMode(defaultChoices);
    pushDataLayerEvent('consent_reject_all', defaultChoices, 'banner');
    reloadIfWithdrawn(defaultChoices);
  };

  // The banner hides itself while the settings modal is open (see showBanner)
  // and comes back after closing it as long as no choice was made.
  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const closeBanner = () => {
    setBannerDue(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        choices,
        hasConsent,
        showBanner,
        showSettings,
        updateChoices,
        acceptAll,
        rejectAll,
        openSettings,
        closeSettings,
        closeBanner,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

/**
 * Dynamically load Leadinfo tracking script.
 * Only called when the user has granted analytics consent.
 */
function loadLeadinfo(): void {
  if (typeof window === 'undefined') return;
  // Prevent double-loading
  if ((window as any).leadinfo) return;

  const w = window as any;
  w.GlobalLeadinfoNamespace = w.GlobalLeadinfoNamespace || [];
  w.GlobalLeadinfoNamespace.push('leadinfo');
  w.leadinfo = function () {
    (w.leadinfo.q = w.leadinfo.q || []).push(arguments);
  };
  w.leadinfo.t = w.leadinfo.t || 'LI-696FBC0B74395';
  w.leadinfo.q = w.leadinfo.q || [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.leadinfo.net/ping.js';
  document.head.appendChild(script);
}
