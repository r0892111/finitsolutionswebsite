export interface ConsentChoices {
  essential: boolean;
  statistics: boolean;
  marketing: boolean;
  social: boolean;
}

export interface ConsentData {
  version: number;
  timestamp: string;
  expiry: string;
  choices: ConsentChoices;
  source: 'banner' | 'settings';
  tcf: null;
}

export interface ConsentLogEntry {
  ts: string;
  action: 'accept_all' | 'reject_all' | 'save';
  choices: ConsentChoices;
  version: number;
}

const CONSENT_KEY = 'fs_cookie_consent_v1';
const CONSENT_LOG_KEY = 'fs_cookie_consent_log_v1';
const CONSENT_VERSION = 1;
const CONSENT_DURATION_MONTHS = 6;
const MAX_LOG_ENTRIES = 50;

export const defaultChoices: ConsentChoices = {
  essential: true,
  statistics: false,
  marketing: false,
  social: false,
};

export function getConsentExpiry(): string {
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + CONSENT_DURATION_MONTHS);
  return expiry.toISOString();
}

export function isConsentExpired(expiry: string): boolean {
  return new Date() > new Date(expiry);
}

export function getStoredConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const data: ConsentData = JSON.parse(stored);
    
    // Check if expired
    if (isConsentExpired(data.expiry)) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

export function saveConsent(choices: ConsentChoices, source: 'banner' | 'settings'): void {
  if (typeof window === 'undefined') return;
  
  const now = new Date().toISOString();
  const consentData: ConsentData = {
    version: CONSENT_VERSION,
    timestamp: now,
    expiry: getConsentExpiry(),
    choices,
    source,
    tcf: null,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
  
  // Log the consent change
  logConsentChange(choices, source === 'banner' ? 
    (choices.statistics && choices.marketing && choices.social ? 'accept_all' : 
     (!choices.statistics && !choices.marketing && !choices.social ? 'reject_all' : 'save')) : 'save');
}

export function logConsentChange(choices: ConsentChoices, action: 'accept_all' | 'reject_all' | 'save'): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingLog = localStorage.getItem(CONSENT_LOG_KEY);
    const log: ConsentLogEntry[] = existingLog ? JSON.parse(existingLog) : [];
    
    const entry: ConsentLogEntry = {
      ts: new Date().toISOString(),
      action,
      choices,
      version: CONSENT_VERSION,
    };
    
    log.unshift(entry);
    
    // Keep only the last MAX_LOG_ENTRIES
    if (log.length > MAX_LOG_ENTRIES) {
      log.splice(MAX_LOG_ENTRIES);
    }
    
    localStorage.setItem(CONSENT_LOG_KEY, JSON.stringify(log));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function applyConsentMode(choices: ConsentChoices): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  
  (window as any).gtag('consent', 'update', {
    'analytics_storage': choices.statistics ? 'granted' : 'denied',
    'ad_storage': choices.marketing ? 'granted' : 'denied',
    'ad_user_data': choices.marketing ? 'granted' : 'denied',
    'ad_personalization': choices.marketing ? 'granted' : 'denied',
  });
}

export function pushDataLayerEvent(event: string, choices: ConsentChoices, source?: string): void {
  if (typeof window === 'undefined' || !(window as any).dataLayer) return;
  
  (window as any).dataLayer.push({
    event,
    consent: choices,
    source,
    timestamp: Date.now(),
  });
}

export function initializeConsentMode(): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return;
  
  // Set default consent state (denied for all non-essential)
  (window as any).gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500,
  });
}