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
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Consent defaults are already set by the inline script in layout.tsx
    // (runs before GTM loads). Stored consent is also restored by an inline
    // script so GTM starts with the correct consent state immediately.
    // Here we just sync React state with what's in localStorage.
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      setChoices(storedConsent.choices);
      setHasConsent(true);
      // Re-apply consent mode to ensure React and GTM are in sync
      applyConsentMode(storedConsent.choices);
      pushDataLayerEvent('consent_loaded', storedConsent.choices, storedConsent.source);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Conditionally load Leadinfo when analytics consent is granted
  useEffect(() => {
    if (hasConsent && choices.statistics) {
      loadLeadinfo();
    }
  }, [hasConsent, choices.statistics]);

  const updateChoices = (newChoices: ConsentChoices, source: 'banner' | 'settings') => {
    setChoices(newChoices);
    setHasConsent(true);
    setShowBanner(false);
    setShowSettings(false);

    saveConsent(newChoices, source);
    applyConsentMode(newChoices);
    pushDataLayerEvent('consent_update', newChoices, source);
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
    setShowBanner(false);
    setShowSettings(false);
    saveConsent(allAccepted, 'banner');
    applyConsentMode(allAccepted);
    pushDataLayerEvent('consent_accept_all', allAccepted, 'banner');
  };

  const rejectAll = () => {
    setChoices(defaultChoices);
    setHasConsent(true);
    setShowBanner(false);
    setShowSettings(false);
    saveConsent(defaultChoices, 'banner');
    applyConsentMode(defaultChoices);
    pushDataLayerEvent('consent_reject_all', defaultChoices, 'banner');
  };

  const openSettings = () => {
    setShowSettings(true);
    setShowBanner(false);
  };

  const closeSettings = () => {
    setShowSettings(false);
    if (!hasConsent) {
      setShowBanner(true);
    }
  };

  const closeBanner = () => {
    setShowBanner(false);
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
