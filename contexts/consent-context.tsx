"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  ConsentChoices, 
  ConsentData, 
  defaultChoices, 
  getStoredConsent, 
  saveConsent, 
  applyConsentMode, 
  pushDataLayerEvent,
  initializeConsentMode
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize consent mode as early as possible
    initializeConsentMode();
    
    // Check for existing consent
    const storedConsent = getStoredConsent();
    
    if (storedConsent) {
      setChoices(storedConsent.choices);
      setHasConsent(true);
      applyConsentMode(storedConsent.choices);
      pushDataLayerEvent('consent_loaded', storedConsent.choices, storedConsent.source);
    } else {
      setShowBanner(true);
    }
  }, []);

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
    
    updateChoices(allAccepted, 'banner');
    pushDataLayerEvent('consent_accept_all', allAccepted, 'banner');
  };

  const rejectAll = () => {
    updateChoices(defaultChoices, 'banner');
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