"use client";

import { useEffect } from 'react';

export function GADebug() {
  useEffect(() => {
    // Check if gtag is available
    const checkGtag = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        console.log('✅ Google Analytics loaded successfully');
        // Send a test event
        (window as any).gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href
        });
      } else {
        console.log('❌ Google Analytics not loaded');
      }
    };

    // Check immediately and after a delay
    checkGtag();
    const timer = setTimeout(checkGtag, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}